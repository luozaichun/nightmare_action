const fs = require('fs');
const path=require('path');
let data = fs.readFileSync(path.join(__dirname, '../dir/test.txt'), 'utf8');
console.log(data);