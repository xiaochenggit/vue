export function formateDate (date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (var key in o) {
		if (new RegExp('(' + key + ')').test(fmt)) {
			let str = o[key] + '';
			fmt = fmt.replace(RegExp.$1, (str.length === 1) ? '0' + str : str);
		}
	}
	return fmt;
}
/**
 * 解析url参数
 * ?id=12345&a=b
 * return Object {id:12345,a:b}
 */
export function urlParse () {
	let url = window.location.search;
	let obj = {};
	let reg = /[?&][^?&]+=[^?&]+/g;
	let arr = url.match(reg);
	arr.forEach(function (element, index) {
		let str = element.substring(1).split('=');
		let key = decodeURIComponent(str[0]);
		let val = decodeURIComponent(str[1]);
		obj[key] = val;
	});
	console.log(obj);
	return obj;
}
