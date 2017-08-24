var
	win = window,
	doc = win.document,

	/**
	 * description: 用于嗅探浏览器，浏览器版本；浏览器模仿较多，嗅探结果仅做参考；
	 * return: 如果为移动端，返回undefined, pc端返回浏览器和浏览器版本;
	 */
	browser = function(){
		// 不支持移动端检测;
		if(/mobile/.test(win.navigator.userAgent)) return;

		var
			agent = win.navigator.userAgent,
			// 判定ie浏览器，ie8、ie9、ie10、ie11;
			ie8 = /msie 8/i.test(agent) && 'ie8',
			ie9 = /msie 9/i.test(agent) && 'ie9',
			ie10 = /msie 10/i.test(agent) && 'ie10',
			ie11 = /Trident\/7.0; rv 11.0/i.test(agent) && 'ie11',

			// 判定edge和edge版本号，版本号仅匹配主版本号;
			edge = /edge\/\d+/i.test(agent)
			? 'edge' + /edge\/(\d+)/i.exec(agent)[1]
			: false,

			// 判定chrome和chrome版本号，版本号仅匹配主版本号;
			chrome = /chrome\/\d+/i.test(agent) && !edge
			? 'chrome' + /chrome\/(\d+)/i.exec(agent)[1]
			: false,

			// 判定firefox和firefox版本号，版本号仅匹配主版本号;
			firefox = /firefox\/\d+/i.test(agent)
			? 'firefox' + /firefox\/(\d+)/i.test(agent)[1]
			: false,

			// 判定safari和Safari版本号，版本号仅匹配主版本号;
			safari = /safari\/\d+/i.test(agent) && !chrome && !edge
			? 'safari' + /safari\/(\d+)/i.exec(agent)
			: false,

			// 判定opera和opera版本号，版本号仅匹配主版本号；
			opera = /^opera\/\d+/i.test(agent)
			? 'opera' + /^opera\/(\d+)/i.exec(agent)
			: false;

		return ie8 || ie9 || ie10 || ie11 || edge
		|| chrome || firefox || safari || opera;
	};
