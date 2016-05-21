/*
 *  name : sexyCode.js;
 *  
 *	detail : my private js widget for page;
 *
 *  require : sexyCode.css
 *
 *  date : 2015-12-22 14:57;
 *
 *	author : HaoXiaodan(xuxiaofangwork@163.com);
 * 
*/

(function(win,undefined){

	"use strict";

	var version = "1.0.0";

	var doc = win.document;

	var _sexy = win.sexy; // 此处声明变量_sexy保存原有的sexy;

	// 参数 string类型 还原原先的sexy 把此处全局名称修改为传入的参数;
	var noConflict = function(spaceName){
		if(typeof spaceName !== "string") return;	//检查参数
		if(window.sexy){
			window.sexy = _sexy;
			window[spaceName] = sexy;
		}
		return this;	//保持链式调用,返回this对象;
	};

	var setRem = function(){
		var set = function(){
			var rate = 320/100,
				html = doc.querySelector('html'),
				wid = html.getBoundingClientRect().width;

			wid > 640 && (wid = 640);
			wid < 320 && (wid = 320);
			html.style.fontSize = wid/rate + 'px';
		};

		set();

		win.addEventListener('resize', function(){
			win.clearTimeout(tim);
			var tim = win.setTimeout(set ,500);
		}, 400);
	}；			

	// 获取url中的参数;
	var getParams = function(){
	    var i,
	    	l,
	    	item,
	    	name,
	    	value,
	    	items,
	    	params = {},
	    	str = location.search;
	    if(str === "") return params;

	    str = str.substring(1);
	    items = str.split('&');
	    l = items.length;
	    for(i = 0; i<l; i+=1){
	    	item = items[i].split('=');
	    	name = decodeURIComponent(item[0]);
	    	value = decodeURIComponent(item[1]);
	    	if(name.length) params[name] = value;
	    };
	    return params;
	};


	// 参数为要提示的文本、显示时间; 类型为：字符串、数字;
	var toast = function(txt, second){
		if(typeof txt !== 'string' || typeof second !== 'number') return;
		var tim,
			toast,
			inner,
			s = second || 3000,
			str = '<span>' + txt + '</span>',
			is = doc.querySelector('[sexy-widget="toast"]');

		if(is){
			is.innerHTML = str;
			is.style.display = "block";
		}else{
			toast = doc.createElement('div');
			toast.setAttribute('sexy-widget', 'toast');
			toast.innerHTML = str;
			doc.body.appendChild(toast);
		}

		win.clearTimeout(tim);
		tim = win.setTimeout(function(){
			(is||toast).style.display = 'none';
		}, s);

		return this;
	};

	// 参数为布尔值 false, 用于取消遮罩, 参数存在且为false, 将隐藏遮罩;
	var mask = function(hide){
		if(hide !== undefined && hide !== false) return;
		var mask,
			is = doc.querySelector("[sexy-widget='mask']");

		if(is){
			hide === false ? is.style.display = 'none' : is.style.display = 'block';
		}else{
			mask = doc.createElement('div');
			mask.setAttribute('sexy-widget', 'mask');
			doc.body.appendChild(mask);
		}

		return this;
	};

	// 弹出框，参数为title、content；弹窗的标题和提示内容，类型都为字符串型;
	// 对mask有依赖;
	// 此方法带有回调函数，且是单次绑定，同一页面中有回调函数只能单次使用;
	var popBox = function(title, content, callback){
		if(typeof title !== 'string' || typeof content !== 'string') return;
		var popBox,
			isPoped = doc.querySelector("[sexy-widget='popBox']"),
			dom =  '<h4 class="sexy-ellipsis">' + title + '</h4><p class="sexy-multiple">' + content + '</p><input type="button" value="确定">';

		if(isPoped !== null){
			isPoped.innerHTML = dom;
			mask();
			isPoped.style.display = 'block';
		}else {
			popBox = doc.createElement('div');
			popBox.setAttribute('sexy-widget', 'popBox');
			popBox.innerHTML = dom;
			mask();
			document.body.appendChild(popBox);

			// add event hide box; dom 创建以后不插入页面就可以添加事件监听; 此处使用先插入,后添加监听;
			popBox.addEventListener('click', function(e){
				if(e.target === doc.querySelector("[sexy-widget='popBox']>input")){
					this.style.display = 'none';
					mask(false);
					if(callback) callback();
				}
			}, false);
		}

		return this;
	};

	var obj = {
		mask: mask,
		toast: toast,
		popBox: popBox,
		setRem: setRem,
		version: version, 
		noConflict: noConflict
	};


	return win.sexy = win.Object.freeze(obj);

})(window);









