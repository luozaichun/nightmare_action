const Nightmare = require('nightmare');
require('nightmare-window-manager')(Nightmare);
const nightmare = Nightmare({show:true});
const co = require('co');
const config=require("../config/config.json");
/*const file=require("../util/readFile");*/
const wait=require("../util/random");
/*let data=file.fileData(config.file);*/
console.log(wait.waitRand());
let child_nightmare = Nightmare({show:true});


co(function *() {
    console.log(111)
    var title = yield nightmare
        .windowManager()
        .goto(config.serch_link)
        .evaluate(()=> {
            document.getElementById("#bdfm").setAttribute("target","_self");
           /* document.querySelectorAll("#bdfm").value;*/
        })
        .then((result)=>{
            console.log(result)
        });
       /* .type(config.search_input, "you")
        .click(config.submit)
        .waitWindowLoad()
        .currentWindow()
        .focusWindow(1)
        .windows()
        .evaluateWindow(function(parameter) {
            return document.title + ' -- ' + parameter;
        }, 'testparameter').then((result)=>{
            console.log(111,result)
        });*/
    console.log(title)
});



























/*
nightmare
    .windowManager()
    .goto(config.serch_link)
    .type(config.search_input, data.type_key)
    .wait(wait.waitRand())
    .click(config.submit)
    .waitWindowLoad()
    .currentWindow()
    .windows()
    .then(function(window){
        console.log(window[1].url)
        child_nightmare.evaluate(function() {
            window.location.href="http://music.163.com/#/playlist?id=755809279&_hash=songlist-479223503"
        }).waitWindowLoad()
            .click("#content_left h3.t")
            .evaluate(function() {
                return document.querySelectorAll("#content_left h3.t a").href;
            })
            .then(function(title) {
                console.log(1111)
                console.log(title)
            });
    })
*/








    /*.then(function(window){
        let chooseEle=config.main_ele;
        nightmare
            /!*.goto(window[1].url)*!/
            .evaluate(function () {
                var x=document.querySelectorAll("#content_left h3.t a").href;
                /!*var arr = [];
                for (var i = 0; i < 3; i++) {
                    var child = x[i].childNodes[0].innerHTML;
                    arr.push(child);
                }*!/
                return x;
            })
            .then(function (result) {
                console.log(result)
                if (config.type === 1) {
                    let step=null;
                    try {
                        co(function *() {
                            for (let selector of result) {
                                step = yield child_nightmare
                                    .click("");
                            }
                            yield child_nightmare.end()
                        });
                    }catch(e) {
                        console.log(e)
                    }
                }
                else {
                    let elements = config.deep_ele;
                    /!*gotoLinkAsync(elements);*!/
                    /!* nightmare.wait(config.wait_time)
                     .end()
                     .catch(function (error) {
                     console.error('Search failed:', error);
                     });*!/
                }



            });
    })*/




function gotoLinkAsync(elements) {
    let ret = null;
    try {
           co(function *() {
               for(let selector of elements) {
                   console.log(selector)
                   ret = yield nightmare.wait(selector)
                       .evaluate(function (selector) {
                           return document.querySelector(selector).href;
                       }, selector)
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