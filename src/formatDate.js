
/**
 * @description: 此方法用于格式化时间戳，返回格式化后的时间;
 * @param { Number|String } t: 传入的需要格式化的时间、时间戳;
 * @param { String } format: 格式化的格式, eg: 'YY-MM-DD hh-mm-ss';
 * @return { String } 返回格式化后的时间字符串;
 */

const formatDate = function(t, format) {
	let formater = format;
    let date = new Date(t);
    let fn = function(n) { return n < 10 ? '0' + n : n; };
    let rep = function(a, b) { return formater.replace(a, b); };
	let map = {
		'YY': date.getFullYear(),		// 年份
		'MM': fn(date.getMonth() + 1),		// 月份
		'DD': fn(date.getDate()),				// 日期
		'hh': fn(date.getHours()),		// 小时
		'mm': fn(date.getMinutes()),	// 分钟
		'ss': fn(date.getSeconds())		// 秒钟
	};

	formater = rep('YY', map.YY);
	formater = rep('MM', map.MM);
	formater = rep('DD', map.DD);
	formater = rep('hh', map.hh);
	formater = rep('mm', map.mm);
	formater = rep('ss', map.ss);

	return formater;
}


















