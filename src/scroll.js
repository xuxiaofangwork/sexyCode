
var win = window,
	doc = win.document;



// scrollTop + innerHeight == documentHeight
// calculate scrollbar scroll percent;
var progress = function(){
	var
		body = doc.body,

		htm = doc.documentElement,

		// get scrollTop value: (firefox & chorme) || safari || ie;
		top = htm.scrollTop || win.pageYOffset || body.scrollTop,

		// get browser visually height;
		visual = win.innerHeight,

		// get document height;
		docHeight = win.Math.max( body.scrollHeight, body.offsetHeight, 
			htm.clientHeight, htm.scrollHeight, htm.offsetHeight ),

		percent = win.Math.floor(top/(docHeight-visual)*100);


		var pro = doc.getElementById('progress');
		pro.style.width = percent + '%';
};


/**
 * @escription: 设置滚动事件节流和最低执行时长;
 * @param  {number} delay: 功能函数多久执行一次；
 * @param  {number} least: 功能函数最低多久执行一次；
 * @param {function} fn: 要执行的功能函数，以回调的形式传入；
 * @return {undefined} 无返回值;
 */
var func = function(delay, least, fn){
	var timer,
		previous;

	return function(e){
		var now = Date.now();

		// set least time for execute;
		previous || (previous = now);

		if(now - previous > least){
			clearTimeout(timer);
			previous = now;
			fn && fn();

		}else{
			clearTimeout(timer);
			timer = setTimeout(function(){
				fn && fn();
			}, delay);
		}
	}
};

window.addEventListener('scroll', func(300, 100, progress));








