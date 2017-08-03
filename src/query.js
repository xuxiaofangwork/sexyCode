var win = window,
	doc = win.document,

	/**
	 * @description: 此方法用于获取url中的查询参数；
	 * @return {object} 函数返回一个对象，对象内容为查询参数的键值对，无参数返回空对象;
	 */
	query = function(){
		var i,
			len,
			item,
			name,
			value,
			items,
			params = {},
			str = location.search;

		if(str === "") return params;
		str = str.substring(1);
		items = str.split('&');
		len = items.length;

		for(i = 0; i<len; i+=1){
			item = items[i].split('=');
			name = decodeURIComponent(item[0]);
			value = decodeURIComponent(item[1]);
			if(name.length) params[name] = value;
		};

		return params;
	};
