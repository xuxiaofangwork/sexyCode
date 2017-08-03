var
	win = window,
	doc = win.document,
	// 声明变量_sexy储存原有sexy;
	_sexy = window.sexy,

	/**
	 * ＠description: 此方法是为了解决命名冲突, 仅支持后执行冲突;
	 * @param:  {string} spaceName: 传一个字符串作为域名，替换域名为传入的字符串;
	 * @return {undefined} 无返回值;
	 */
	conflict = function(spaceName){
		if(typeof spaceName != 'string') return new Error('参数错误！');
		if(!_sexy) return console.log('no conflict!');
		win[spaceName] = sexy;
		win.sexy = _sexy;
	};

