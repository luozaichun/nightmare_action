let  randomBoth=function (Min, Max) {
    let Range = Max - Min;
    let Rand = Math.random();
    let num = Min + Math.round(Rand * Range);
    /*四舍五入*/
    return num;
};
let probability=randomBoth(1,100);
let wait_time;
/*概率*/
exports.waitRand = function () {
    if (probability<=70){
        wait_time=randomBoth(120,180);
    }else if(probability<=85){
        wait_time=randomBoth(180,500)
    }else {
        wait_time=randomBoth(100,120)
    }
    return wait_time;
};
