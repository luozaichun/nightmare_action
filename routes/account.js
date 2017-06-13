const fs = require('fs');
const path=require('path');
exports.fileData = function (file) {
    let content = fs.readFileSync(path.join(__dirname,file), 'utf8');
    let data=JSON.parse(content);
    let length=parseInt(data.length-1);
    let n=Math.round(Math.random() * length);
    let result={
        "user":data[n].user?data[n].user:"",
        "paw":data[n].password?data[n].password:"",
        "type_key":data[n].key?data[n].key:""
    };
    console.log(result)
    return result;
};



