const fs = require('fs');

const packagesToRemoveIntegrity = process.argv.slice(2);

fs.readFile('package-lock.json', 'utf8', (err, data) => {
  if (err) throw err;

  const modifiedData = packagesToRemoveIntegrity.reduce((acc, packageName) => {
    const regex = new RegExp(`"${packageName}"\\s*:\\s*{[^}]*"integrity":\\s*"[^"]*"[^}]*`, 'g');
    return acc.replace(regex, (match) => match.replace(/"integrity":\s*"[^"]*",/, ''));
  }, data);

  fs.writeFile('package-lock.json', modifiedData, 'utf8', (err) => {
    if (err) throw err;
    console.log('integrity values removed for specified packages', packagesToRemoveIntegrity);
  });
});