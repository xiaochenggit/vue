export function saveToLocal (id, key, val) {
	// 需要注意的是 存储的时候是 string 类型 还要判断有没有该对象
	let seller = window.localStorage.__seller__;
	if (!seller) {
		seller = {};
		seller[id] = {};
	} else {
		seller = JSON.parse(seller);
		if (!seller[id]) {
			seller[id] = {};
		}
	}
	seller[id][key] = val;
	window.localStorage.__seller__ = JSON.stringify(seller);
};
export function loadFromLocal (id, key, def) {
	// def 是默认值,数据先要解析成 json 在判断有没有数据，没有返回 def
	var seller = window.localStorage.__seller__;
	if (!seller) {
		return def;
	}
	seller = JSON.parse(seller)[id];
	if (!seller) {
		return def;
	}
	var ret = seller[key];
	return ret || def;
}
