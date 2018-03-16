/*
 *  name : sexyCode.js;
 *  
 *	detail : my private js widget for page;
 *
 *  require : sexyCode.css;
 *
 *  date : 2015-12-22 14:57;
 *
 *	author : HaoXiaodan(xuxiaofangwork@163.com);
 * 
*/

;(function(win,undefined){

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

	// 设置 rem 适应各种屏幕, 根据 dpr 设置跟字体大小;
	// 采用rem响应式布局时，当设置viewport缩放时（测试缩放小于1），标签内的文档达到一定长度时，文本字体大小会失控，
	// 不会按照继承字体大小的缩放正常比例显示，会偏大；解决方法： 将标签设置为position:absolute；
	var setRem = function(){
		var timing,
			refreshRem = function(){
				var rem,
					wid,
					fontSize,
					html = doc.querySelector('html'),
					viewport = doc.querySelector('meta[name="viewport"]'),
					//  图片太大, 加载过慢, 取消了三倍方案  2和3统一用2的方案，其余用1的方案;
					dpr = win.Math.floor(win.devicePixelRatio || 1) > 2 ? 2 : win.Math.floor(win.devicePixelRatio || 1),
					// scale = 1 / dpr, // 持续优化淘汰了此变量;
					metaStr = 'width=device-width,initial-scale=' + 1 / dpr + ',user-scalable=no';

				if(!!viewport){
					// viewport.content = metaStr;  考虑兼容性，使用下面setAttribute;
					viewport.setAttribute('content', metaStr);
				}else{
					viewport = doc.createElement('meta');
					viewport.setAttribute('name', 'viewport');
					viewport.setAttribute('content', metaStr);
					doc.head.appendChild(viewport);
				};

				// after set viewport get the width;
				wid = html.getBoundingClientRect().width;

				// rem在1倍屏标准宽度取320标准字体大小为100px，根据屏幕大小根据标准比例计算rem大小，最大宽度为640;
				// fontSize在1倍屏标准宽度320下为12px，最大宽度640下为16px;
				switch(dpr) {
					case 1:
						rem = wid > 640 ? 640/(320/100) : wid/(320/100);
						fontSize = (wid-320)/(320/(16-12)) + 12 > 16 ? 16 : (wid-320)/(320/(16-12)) + 12;
						break;
					case 2:
						rem = wid > 1280 ? 1280/(320/100) : wid/(320/100);
						fontSize = (wid-640)/(640/(32-24)) + 24 > 32 ? 32 : (wid-640)/(640/(32-24)) + 24;
						break;
					// 取消三倍方案;
					// case 3:
					// 	rem = wid > 1920 ? 1920/(320/100) : wid/(320/100);
					// 	fontSize = (wid-960)/(960/(48-36)) + 36 > 48 ? 48 : (wid-960)/(960/(48-36)) + 36;
					// 	break;
					default: // 默认一倍屏处理;
						rem = wid > 640 ? 640/(320/100) : wid/(320/100);
						fontSize = (wid-320)/(320/(16-12)) + 12 > 16 ? 16 : (wid-320)/(320/(16-12)) + 12;
						break;
				}
				
				html.setAttribute('data-dpr', dpr);
				html.style.fontSize = rem + 'px';
				doc.body.style.fontSize = Math.floor(fontSize) + 'px';
			};

		if(doc.readyState === "interactive" || doc.readyState === "complete"){
			refreshRem();
		}else{
			doc.addEventListener('DOMContentLoaded', function(){
				refreshRem();
			});
		}
		
		// 火狐手机端滚动条滚动会触发resize事件;使用需拿掉此事件;如果模拟滚动轴可以使用此事件;
		// win.addEventListener('resize', function(){
		// 	win.clearTimeout(timing);
		// 	timing = win.setTimeout(refreshRem, 400);
		// }, false);

		return  this;
	};

	var scroll = (function(){
		var SexyBar = function(el){

			this.el = doc.querySelector(el);
			this.parent = this.el.parentNode;
			this.startX = 0;	// begin X location
			this.startY = 0;	// begin Y location
			this.disY = 0;		// move distance Y
			this.matY = 0;		// transform 的当前值
			this.disX = 0;		// move distance X

			var bar = this,
				methods = {
					// get the current transform value
					getMatrix: function(){
						var trs = methods.hasPro('transform');
						var str = bar.el.style[trs];
						if(str === ""){
							bar.matY = 0;
						}else{
							bar.matY = +(str.match(/-?\d+/g)[5]);
						}
					},

					// judge prefix property;
					hasPro: function(pro){
						var elStyle = document.createElement('div').style,
							vendors = ['webkit', 'Moz', 'ms', 'O'],
						    is = pro in elStyle,
						    privatePro,
							i = 0,
							l = vendors.length;

						if(!is){
							for ( ; i < l; i++ ) {
								privatePro = vendors[i] + pro.replace(/.?/i, pro[0].toUpperCase());
								if ( privatePro in elStyle ) return privatePro;
							}
							return false;
						}

						return pro;
					},

					range: function(){
						var elHeight = win.parseFloat(win.getComputedStyle(bar.el,null).height),
							parentHeight = win.parseFloat(win.getComputedStyle(bar.parent,null).height);
						return elHeight - parentHeight; // return distance of this element & parent element;
					},

					// scroll a location;
					scrollTo: function(dis){
						var trsf = methods.hasPro('transform');
						bar.el.style[trsf] = 'matrix(1,0,0,1,0,' + dis + ')';
					},

					// 点击时执行的函数;
					start: function(e){
						e.stopPropagation();
						var trsi = methods.hasPro('transition');
						bar.startY = e.touches[0].pageY;
						bar.startX = e.touches[0].pageX;
						bar.el.style[trsi] = "transform 0s cubic-bezier(0.1, 0.57, 0.1, 1)";
						bar.el.addEventListener('touchmove', methods.move); // addEventListener 默认冒泡触发,若第三个参数为false,可省略;
						bar.el.addEventListener('touchend', methods.end);
					},

					// 滑动时执行的函数;
					move: function(e){
						e.stopPropagation();
						e.preventDefault();		// 清除浏览器头尾隐藏显示;
						bar.disX = e.touches[0].pageX - bar.startX;
						bar.disY = e.touches[0].pageY - bar.startY; 
						bar.startX = e.touches[0].pageX;
						bar.startY = e.touches[0].pageY;
						if(Math.abs(bar.disY) > Math.abs(bar.disX)){
							methods.getMatrix();
							methods.scrollTo(bar.matY + bar.disY);
						}
					},

					// 触摸结束时执行的函数;
					end: function(e){
						e.stopPropagation();
						var ran = methods.range(), 
							trsi = methods.hasPro('transition'),
							trsf = methods.hasPro('transform'),
							sty = bar.el.style;
						if(bar.matY > 0 || ran < 0){
							sty[trsi] = "transform .6s cubic-bezier(0.1, 0.57, 0.1, 1)";
							sty[trsf] = 'matrix(1,0,0,1,0,0)';
						}else if(Math.abs(bar.matY) >= ran){ // 如果移动的值大于差值，不允许移动;(ran + this.viewportTop)
							sty[trsi] = "transform .6s cubic-bezier(0.1, 0.57, 0.1, 1)";
							sty[trsf] = 'matrix(1,0,0,1,0,' + (-ran) + ')'; //-this.viewportTop
						}

						bar.el.removeEventListener('touchmove', methods.move);
						bar.el.removeEventListener('touchend', methods.end);
					}
				};

			this.el.addEventListener('touchstart', methods.start);
		}

		return SexyBar;
	})();

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
		var tim,
			toast,
			inner,
			s = second || 3000,
			text = txt || '(⊙ｏ⊙)...！',
			str = '<span>' + text + '</span>',
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
		// if(typeof title !== 'string' || typeof content !== 'string') return;
		var popBox,
			til = title || '小提示',
			cont = content || '(⊙ｏ⊙)...！',
			isPoped = doc.querySelector("[sexy-widget='popBox']"),
			dom =  '<h4 class="sexy-ellipsis">' + til + '</h4><p class="sexy-multiple">' + cont + '</p><input type="button" value="确定">';

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
		noConflict: noConflict,
		SexyBar: scroll
	};


	return win.sexy = win.Object.freeze(obj);
})(window);









