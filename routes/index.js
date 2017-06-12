const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const co = require('co');
const config=require("../config/config.json");

nightmare
    .goto(config.serch_link)
    .type(config.search_input, config.type_key)
    .click(config.submit)
    .wait(config.wait_element)
    .wait(1000);
    if(config.deep!==0){
        let elements=config.deep_ele;
        gotoLinkAsync(elements);

    }else {
        nightmare.end();
    }

function gotoLinkAsync(elements) {
    let ret = null;
    try {
           co(function *() {
               for(let area of elements) {
                   ret = yield nightmare.wait(area)
                       .evaluate(function (area) {
                           return document.querySelector(area).href;
                       }, area)
                       .then(function (result) {
                           console.log(result);
                           nightmare.goto(result).forward();
                       });
               }
               yield nightmare.end()
           });
        }
    catch(e) {
        console.log(e)
    }
}