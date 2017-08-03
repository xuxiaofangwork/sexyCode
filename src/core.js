(function(win, sexy){

	if(typeof define === 'function' && define.amd){
		// 兼容AMD规范;
		define(sexy);

	}else if(typeof exports === 'object'){
		// 兼容CMD规范;
		module.exports = sexy();

	}else{
		// 兼容浏览器命名空间模式;
		win.sexy = sexy(win);
	}

})(window, function(win, undefined){

	var
		// 防止命名空间冲突, 提前储存window.sexy;
		_sexy = win.sexy,

		// 声明控件版本号;
		version = '0.0.1',

		// 缓存document对象;
		doc = win.document;

		// 今天先写到这里，日后再补;

});