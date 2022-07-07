// @ts-check
'use strict'

const fs = require('fs');
const path = require('path');

/** @type {{[name: string]: { description: string, srcDirs: string[], srcName: string }}} */
const shortCuts = {
    template: {
        description: 'copy printing template',
        srcDirs: ['./web/designer/src/components/templates'],
        srcName: 'template-demo',
    },
};

const help = `
    * copies and renames files, folders and variables
    * 
    * searches for subfolders named <srcName> in <srcDirs> and copies them to <targetName>.
    * Then it renames all the files by replacing <srcName> with <targetName>.
    * It also replaces text in the files (like variable names). It tries to keep naming styles
    * (camelCase, PascalCase, kebab-case...). The naming style detection works best if <srcName> has at least 2 words
    * otherwise it will try to guess the right naming style (which might produce failures).

    USAGE:
    ------
    - 'node copy-rename.js <srcDir> <srcName> <targetName>'

    srcDir: directory containing the copy blueprint folder
    srcName: subfolder in <srcDir> containing the copy blueprint
    targetName: name for the new subfolder

    ALTERNATIVE USAGE:
    ------------------
    - 'node copy-rename.js <shortCutName> <targetName>'

    shortCutName: predefinied name of a shortcut:
    ${Object.entries(shortCuts).map(([name, {description}]) => `  * '${name}': ${description}
`).join('\n')}
`
const showHelp = () => console.log(help);

const args = process.argv.slice(2);
const arg0 = args.shift();
if (!arg0) {
    showHelp();
    process.exit(0);
}

const [srcDirs, srcName, targetName] = (() => {
    const shortCut = shortCuts[arg0];
    if (shortCut) {
        return [shortCut.srcDirs, shortCut.srcName, args[0]];
    } else return [
        [arg0], ...args
    ];
})();

if (!srcDirs || !srcName || !targetName) {
    showHelp();
    const actualArgs = { srcDirs, srcName, targetName };
    throw new Error(`missing required arguments (see usage above):\n`
        + `got: ${JSON.stringify(actualArgs, null, 4)}\n`
        + `missing: ${Object.entries(actualArgs).filter(([_, value]) => !value).map(([key]) => key)}\n\n`
    );
}

copyRename(srcDirs, srcName, targetName);

/**
 * copies and renames files, folders and variables
 * 
 * searches for subfolders named <srcName> in <srcDirs> and copies them to <targetName>.
 * Then it renames all the files by replacing <srcName> with <targetName>.
 * It also replaces text in the files (like variable names). It tries to keep naming styles
 * (camelCase, PascalCase, kebab-case...). The naming style detection works best if <srcName> has at least 2 words
 * otherwise it will try to guess the right naming style (which might produce failures).
 * 
 * @param {string[]} srcDirs parent directories that include the files to copy
 * @param {string} srcName 
 * @param {string} targetName 
 */
 function copyRename(srcDirs, srcName, targetName) {
    createLib();
    // shelljs.exec('npm run gen', { cwd: path.join(__dirname, 'testing/mock-backend2') });

    function createLib() {
        console.log(targetName);

        const src = nameVariantsOf(srcName);
        const target = nameVariantsOf(targetName);

        const allFiles = src.dirs.reduce((all, dir) => ({...all, ...getAllFiles(dir) }), {});

        console.log(JSON.stringify({
            src,
            target,
            allFiles,
        }, null, 2));

        processDir('', allFiles);

        /**
         * @param {string} libNameInkebabCase
         */
        function nameVariantsOf(libNameInkebabCase) {
            const kebabCase = libNameInkebabCase;
            const camelCase = kebabCase.replace(/-(\w)/g, (_, first) => first.toUpperCase());
            const pascalCase = camelCase[0].toUpperCase() + camelCase.substr(1);
            const textCase = kebabCase.replace(/-/g, ' ');

            const dirs = srcDirs.map((dir) => path.join(dir, kebabCase));

            return {
                kebabCase,
                camelCase,
                pascalCase,
                textCase,
                dirs,
            };
        }

        /**
         *
         * @typedef { { [key: string]: 'file' | BlueprintDir } } BlueprintDir
         */

        /**
         * @param {string} dir
         * @returns BlueprintDir
         */
        function getAllFiles(dir) {
            /** @type BlueprintDir */
            const files = {};
            const entries = fs.readdirSync(dir);
            entries.forEach((entry) => {
                const absPath = path.join(dir, entry);
                const isDir = fs.lstatSync(absPath).isDirectory();
                if (isDir) {
                    files[path.join(dir, entry)] = getAllFiles(absPath);
                } else {
                    files[path.join(dir, entry)] = 'file';
                }
            })
            return files;
        }

        /**
         * @param {string} filename
         * @returns {void}
         */
        function processFile(filename) {
            const fullPath = filename;
            const targetPath = filename.replace(matchAll(src.kebabCase), target.kebabCase)
            const origContents = fs.readFileSync(fullPath, 'utf-8');
            console.log('process file: ' + fullPath, typeof origContents + '\n -> ' + targetPath);
            const processedContents = processString(origContents);

            mkdir(path.dirname(targetPath));

            fs.writeFileSync(
                targetPath,
                processedContents,
            );
        }

        /**
         * @param {string} contents
         * @returns {string}
         */
        function processString(contents) {
            let updatedContents = contents;
            updatedContents = replaceLib(updatedContents, src, target);
            return updatedContents;
        }

        /**
         * @param {string} contents
         * @returns {string}
         */
        function replaceLib(contents, from, to) {
            return contents
                //      .replace(matchAll(from.distPath), to.distPath)
                //      .replace(matchAll(from.scopedName), '---scoped-name---')
                .replace(matchAll('/' + from.kebabCase), '/' + to.kebabCase)
                .replace(matchAll('-' + from.kebabCase), '-' + to.kebabCase)
                .replace(new RegExp(escapeRegExp(from.camelCase) + '(\\w)', 'g'), (_all, nextCharacter) => to.camelCase + nextCharacter)
                .replace(matchAll(from.pascalCase), to.pascalCase)
                .replace(matchAll(from.textCase), to.textCase)
                .replace(matchAll(from.camelCase), to.camelCase)
                .replace(matchAll(from.kebabCase), to.kebabCase)
                //      .replace(/---scoped-name---/g, to.scopedName)
        }

        /**
         * @param {string} dir
         * @param {BlueprintDir} contents
         * @returns {void}
         */
        function processDir(dir, contents) {
            console.log('process dir: ' + dir);

            Object.entries(contents).forEach(([key, value]) => {
                if (value === 'file') {
                    processFile(key);
                } else {
                    processDir(path.join(dir, key), value);
                }
            });
        }
    }

    function mkdir(dir) {
        const dirParts = dir.split(path.sep);
        let parent = './';
        dirParts.forEach((part) => {
            parent = path.join(parent, part);
            console.log('mkdir' + parent);
            try {
                fs.mkdirSync(parent);
            } catch (e) {
                if (parent === dir) {
                    console.log(`'${dir}' already exists`);
                }
            }
        });
    }

    // src: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
    function escapeRegExp(string) {
        return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    function matchAll(string) {
        return new RegExp(escapeRegExp(string), 'g');
    }
}