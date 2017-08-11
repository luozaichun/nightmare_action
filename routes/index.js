const Nightmare = require('nightmare');
require('nightmare-window-manager')(Nightmare);
const nightmare = Nightmare({show: true});
const co = require('co');
const config = require("../config/config.json");
const file = require("../util/readFile");
const wait = require("../util/random");
let data = file.fileData(config.file);
console.log(wait.waitRand());
let child_nightmare = Nightmare({show: true});

nightmare
    .windowManager()
    .goto(config.serch_link)
    .type(config.search_input, data.type_key)
    .wait(wait.waitRand())
    .click(config.submit)
    .waitWindowLoad()
    .then((window) =>{
        let chooseEle = config.main_ele;
        nightmare
        .goto(window[1].url)
            .evaluate(() =>{
                let x = document.querySelectorAll("#content_left h3.t a").href;
                let arr = [];
                 for (let i = 0; i < 3; i++) {
                     let child = x[i].childNodes[0].innerHTML;
                 arr.push(child);
                 }
                return x;
            })
            .then((result)=>{
                console.log(result)
                if (config.type === 1) {
                    let step = null;
                    try {
                        co(function *() {
                            for (let selector of result) {
                                step = yield child_nightmare
                                    .click("");
                            }
                            yield child_nightmare.end()
                        });
                    } catch (e) {
                        console.log(e)
                    }
                }
                else {
                    let elements = config.deep_ele;
                    gotoLinkAsync(elements);
                     nightmare.wait(config.wait_time)
                     .end()
                     .catch(function (error) {
                     console.error('Search failed:', error);
                     });
                }


            });
    })


function gotoLinkAsync(elements) {
    let ret = null;
    try {
        co(function *() {
            for (let selector of elements) {
                console.log(selector)
                ret = yield nightmare.wait(selector)
                    .evaluate((selector) => {
                        return document.querySelector(selector).href;
                    }, selector)
                    .then((result) => {
                        console.log(result);
                        nightmare.goto(result).forward();
                    });
            }
            yield nightmare.end()
        });
    }
    catch (e) {
        console.log(e)
    }
}