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
