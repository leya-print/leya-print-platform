const ymal = require('yaml');
const fs = require('node:fs');

const obj = ymal.parse(fs.readFileSync('./template-api-schema.yml', 'utf-8'));
fs.writeFileSync('./template-api-schema.json', JSON.stringify(obj, null, 2));
