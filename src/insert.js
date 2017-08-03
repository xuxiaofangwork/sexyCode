var 
	win = window,
	doc = win.document,

	/**
	 * @description: 动态插入css样式和js脚本；
	 * @param  {string} type: 用于判定插入的类型是js、css还是link，值只能为script、link、style；
	 * @param  {string} addr: type为link和script时，值为url地址，type为style时，值为css字符串;
	 * @return {undefined} 函数无返回值或返回参数错误;
	 */
	insert = function(type, addr){
		var 
			addr,
			link,
			style,
			script;

		if(type == 'script'){
			script = doc.createElement('script');
			script['type'] = 'text/javascript';
			script['src'] = addr;
			doc.head.appendChild(script);

		}else if(type == 'link'){
			link = doc.createElement('link');
			link['rel'] = 'stylesheet';
			link['type'] = 'text/css';
			link['href'] = addr;
			doc.head.appendChild(link);

		}else if(type == 'style'){
			style = doc.createElement('style');
			style['type'] = 'text/css';
			style.innerHTML = addr;
			doc.head.appendChild(style);

		}else{
			return new Error('参数错误！');
		}
	};

