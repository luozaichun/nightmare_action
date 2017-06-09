const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const config=require("../config/config.json");

nightmare
    .goto(config.serch_link)
    .type(config.search_input, config.type_key)
    .click(config.submit)
    .wait(config.wait_element)
    .wait(500);
    if(config.deep>1){
        var _ele;
        config.click_ele.forEach((i) => {
            nightmare
                .click(i)
                .wait(1000)
/*
                .goto('http://www.baidu.com/link?url=iN9Z1579CVdlWqG4c7at8MOTgXOGf0JkpEdZFLqRUC_')
*/
                .click("#block-B .mod_focus-index_item[rseat='fcs_0_p3']")
                .wait(5000)
                .evaluate(function () {
                    return document.querySelector('a').innerHTML;
                })
                .end()
                .then(function (result) {
                    console.log(result);
                })
                .catch(function (error) {
                    console.error('Search failed:', error);
                });
                /*.goto(document.querySelector(i).href)*/
                // .wait(2000)
                /*.click(".topNavWrap-index a[title='iQIYI_logo']")*/
        });
       /* nightmare
            .evaluate(function () {
            return document.querySelector('a').innerHTML;
        })
            .end()
            .then(function (result) {
                console.log(result);
            })
            .catch(function (error) {
                console.error('Search failed:', error);
            });*/

    }else {
        nightmare.end();
    }
