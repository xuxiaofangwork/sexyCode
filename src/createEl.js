var
	win = window,
	doc = win.document,
	_sexy = window.sexy,

	/**
	 * @description: 创建一个dom元素并插入页面相应位置，仅适用于追加式插入，不支持脚本插入，不建议插入css；
	 * @param  {dom collection} dom: 传入要插入此元素的父元素；
	 * @param  {string} str: 要插入的html字符串；
	 * @param  {string} tag: 此参数是为了避免重复插入设定的标记，此参数可不传；
	 * @return {undefined} 无返回值；
	 */
	createEl = function(dom, str, tag){
		var tags = {};

		return function(dom, str, tag){
			var cache = doc.createElement('div'),
				frag = doc.createDocumentFragment(),
				isTag = tag in tags;

			if(isTag) return console.log('此元素已标记插入！');
			cache.innerHTML = str;
			frag.appendChild(cache.children[0]);
			dom.appendChild(frag);
			tag && (tags[tag] = true);
		};
	}();
