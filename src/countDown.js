let win = window;
let doc = win.document;


/**
 * @description: 倒计时函数，用于渲染页面倒计时;次函数为雏形，具体根据项目需要修改；
 * @param: [Object] options: 对象，内含一个t属性，是未来某个时间的时间戳，其余属性自定;
 * @return: [Function] 返回一个promise实例; 
 */
let countDown = function(options){
    return new Promise(function(resolve, reject){
        let h, m, t;    // 剩余的时、分、秒
        let that = options;
        let remain = that.t - Date.now();
        // 倒计时逻辑
        let fn = function () {
            console.log(h + ':' + m + ':' + s);
            if (+s > 0) { // 秒钟大于0处理
                +s <= 10 ? (s = '0' + (s - 1)) : (s = s - 1);

            } else {
                if (+m > 0) { // 分钟大于0处理
                    s = 59;
                    +m <= 10 ? (m = '0' + (m - 1)) : (m = m - 1);
                    
                }else{
                    if (+h > 0) { // 小时大于0处理
                        m = 59;
                        s = 59;
                        +h <= 10 ? (h = '0' + (h - 1)) : (h = h - 1);

                    }else{
                        h = '00';
                        m = '00';
                        s = '00';
                    }
                }
            }

            // 根据vue渲染需要传入；
            // that.h = h;
            // that.m = m;
            // that.s = s;
            if (h == 0 && m == 0 && s == 0) {
                setTimeout(function(){
                    console.log(h + ':' + m + ':' + s);
                    resolve();
                }, 1000);
            } else {
                setTimeout(fn, 1000);
            }
        }

        if (remain <= 0){
            return resolve();

        }else{
            // 计算剩余小时数;
            h = Math.floor(remain/1000/3600);
            // 小时数小于10,自动补充为俩位;
            (h < 10) && (h = '0' + h);
            // 计算剩余分钟数;
            m = ((remain / 1000 % 3600) - (remain / 1000 % 60))/60;
            // 分钟数小于10,自动补充为俩位;
            (m < 10) && (m = '0' + m);
            // 计算剩余秒数;
            s = Math.round(remain / 1000 % 60);
            // 秒钟数小于10,自动补充为俩位;
            (s < 10) && (s = '0' + s);

            // 执行倒计时;
            setTimeout(fn, 1000);
        }
    });
}


















// let countDown = function (t, h, m, s) {
//     return new Promise(function (resolve) {
//         let now = Date.now();

//         if (t - now <= 0) {
//             return resolve();

//         } else {
//             let date = new Date(t);
//             let newDate = new Date(now);

//             h = date.getHours() - newDate.getHours();
//             m = date.getMinutes() - newDate.getMinutes();
//             s = date.getSeconds() - newDate.getSeconds();

//             let timer = setTimeout(function () {
//                 s == 0 ? (s-=1) : (s = 59);
//                 if(+s != 0){
//                     s < 10 ? (s = '0' + s - 1) : (s = s - 1);

//                 }else{
//                     s = 59;
//                 }


//             }, 1000);
//         }
//     });
// }



