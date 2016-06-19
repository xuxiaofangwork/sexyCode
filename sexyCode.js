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
	var setRem = function(){
		var timing,
			refreshRem = function(){
				var rem,
					fontSize,
					viewport = doc.querySelector('meta[name="viewport"]'),
					dpr = win.Math.floor((win.devicePixelRatio || 1) > 3 ? 3 : win.devicePixelRatio || 1) || 1,
					html = doc.querySelector('html'),
					scale = 1 / dpr ,
					wid = html.getBoundingClientRect().width,
					metaStr = 'width=device-width,initial-scale=' + scale + ',user-scalable=no';

				if(!!viewport){
					// viewport.content = metaStr;  考虑兼容性，使用下面setAttribute;
					viewport.setAttribute('content', metaStr);
				}else{
					viewport = doc.createElement('meta');
					viewport.setAttribute('name', 'viewport');
					viewport.setAttribute('content', metaStr);
					doc.head.appendChild(viewport);
				};

				// plus 下2倍是否可行，需要测试，若可行，可以拿掉三倍方案;
				switch(dpr) {
					case 1:
						rem = wid > 640 ? 640/(320/100) : wid/(320/100);
						fontSize = (wid-320)/(320/(16-12)) + 12 > 16 ? 16 : (wid-320)/(320/(16-12)) + 12;
						break;
					case 2:
						rem = wid > 1280 ? 1280/(320/100) : wid/(320/100);
						fontSize = (wid-640)/(640/(32-24)) + 24 > 32 ? 32 : (wid-640)/(640/(32-24)) + 24;
						break;
					case 3:
						rem = wid > 1920 ? 1920/(320/100) : wid/(320/100);
						fontSize = (wid-960)/(960/(48-36)) + 36 > 48 ? 48 : (wid-960)/(960/(48-36)) + 36;
						break;
				}
				
				html.setAttribute('data-dpr', dpr);
				html.style.fontSize = rem + 'px';
				doc.body.style.fontSize = fontSize + 'px';
			};

		refreshRem();

		win.addEventListener('resize', function(){
			win.clearTimeout(timing);
			timing = win.setTimeout(refreshRem, 400);
		}, false);

		return  this;
	};

	var scroll = (function(){
		var SexyBar = function(el){

			var bar = this;

			this.el = doc.querySelector(el);
			this.parent = this.el.parentNode;
			this.startY = 0;
			this.disY = 0;		
			this.matY = 0;		// transform 的当前值
			this.viewportTop = this.el.getBoundingClientRect().top;
			this.parent.style.overflowY = "hidden";
			this.el.addEventListener('touchstart', function(e){bar.start.call(bar,e)}, false);
			this.el.addEventListener('touchmove', function(e){bar.move.call(bar,e)}, false);
			this.el.addEventListener('touchend', function(e){bar.end.call(bar,e)}, false);
		};

		SexyBar.prototype = {
			constructor: SexyBar,
			// get the current transform value
			getMatrix: function(){
				var trs = this.hasPro('transform');
				var str = this.el.style[trs];
				if(str === ""){
					this.matY = 0;
				}else{
					this.matY = +(str.match(/-?\d+/g)[5]);
				}
			},

			// judge css property isn`t support;
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

			// 获取元素滚动范围 根据元素与父元素高度的差值计算
			moveRange: function(){
				var elHeight = win.parseFloat(win.getComputedStyle(this.el,null).height),
					parentHeight = win.parseFloat(win.getComputedStyle(this.parent,null).height);
				return elHeight - parentHeight; // 返回元素与父元素的差值
			},

			// 移动到一个位置;
			scrollTo: function(distance){
				var trsf = this.hasPro('transform');
				this.el.style[trsf] = 'matrix(1,0,0,1,0,' + distance + ')';
			},

			// 点击时执行的函数;
			start: function(e){
				e.stopPropagation();
				var trsi = this.hasPro('transition');
				// this.viewportTop = this.el.getBoundingClientRect().top;
				this.startY = e.touches[0].pageY;
				this.el.style[trsi] = "transform 0s cubic-bezier(0.1, 0.57, 0.1, 1)";
				// startT = win.Date.now();
			},

			// 滑动时执行的函数;
			move: function(e){
				e.stopPropagation();
				e.preventDefault(); // h5页面需要加上这句，取消浏览器默认橡皮筋效果; app内可以拿掉(是否去掉无意义,默认冒泡);
				this.disY = e.touches[0].pageY - this.startY;
				this.startY = e.touches[0].pageY;
				this.getMatrix();
				this.scrollTo(this.matY + this.disY);
			},

			// 触摸结束时执行的函数;
			end: function(e){
				e.stopPropagation();
				var ran = this.moveRange(),
					trsi = this.hasPro('transition'),
					trsf = this.hasPro('transform'),
					sty = this.el.style;
				if(this.matY > 0 || ran < 0){
					sty[trsi] = "transform .6s cubic-bezier(0.1, 0.57, 0.1, 1)";
					sty[trsf] = 'matrix(1,0,0,1,0,0)';
				}else if(Math.abs(this.matY) >= (ran + this.viewportTop)){ // 如果移动的值大于差值，不允许移动;
					sty[trsi] = "transform .6s cubic-bezier(0.1, 0.57, 0.1, 1)";
					sty[trsf] = 'matrix(1,0,0,1,0,' + (-ran-this.viewportTop) + ')';
				}
			}
		};

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









