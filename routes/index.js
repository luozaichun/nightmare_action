const Nightmare = require('nightmare');
require('nightmare-window-manager')(Nightmare);
const nightmare = Nightmare({show:true});
const co = require('co');
const config=require("../config/config.json");
const file=require("./account");
let data=file.fileData(config.file);

nightmare
    .windowManager()
    .goto(config.serch_link)
    .type(config.search_input, "游戏")
    .wait(config.wait_time)
    .click(config.submit)
    .waitWindowLoad()
    .currentWindow()
    .then(function(window){
        let chooseEle=config.main_ele;
        nightmare
            .goto(window.url)
            .evaluate(function (chooseEle) {
                var x=document.querySelectorAll(chooseEle);
                var arr = [];
                for (var i = 0; i < 3; i++) {
                    var child = x[i].childNodes[0].href;
                    arr.push(child);
                }
                return arr;
            }, chooseEle)
            .then(function (result) {
                if (config.type === 1) {

                    gotoLinkAsync(result,function (link) {
                        console.log(link)
                             yield nightmare.wait(config.wait_time)
                            .goto(link)
                            .forward()
                            .wait(config.wait_time)
                            .back();
                    });

                    /*let step=null;
                    try {
                        co(function *() {
                            for (let link of result) {
                                step = yield nightmare.wait(config.wait_time)
                                    .goto(link)
                                    .forward()
                                    .wait(config.wait_time)
                                    .back();
                            }
                            yield nightmare.end()
                        });
                    }catch(e) {
                        console.log(e)
                    }*/
                }
                else {
                    let elements = config.deep_ele;
                    gotoLinkAsync(elements);
                    /* nightmare.wait(config.wait_time)
                     .end()
                     .catch(function (error) {
                     console.error('Search failed:', error);
                     });*/
                }



            });
    });




function gotoLinkAsync(elements,fun) {
    let ret = null;
    try {
           co(function *() {
               for(let selector of elements) {
                   ret = fun(selector);

                      /* yield nightmare.wait(selector)
                       .evaluate(function (selector) {
                           return document.querySelector(selector).href;
                       }, selector)
                       .then(function (result) {
                           console.log(result);
                           nightmare.goto(result).forward();
                       });*/
               }
               yield nightmare.end()
           });
        }
    catch(e) {
        console.log(e)
    }
}