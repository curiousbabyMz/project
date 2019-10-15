var deff = (x, y) => {
	return x !== y;
}
export default class {
	constructor(obj) {
		this.states = {};
		this.watchs = {};
		if (obj) {
			this.setState(obj);
		}
	}
	setState(obj) {
		Object.keys(obj).map(each => {
			if (this.states[each]) {
				this.states[each] = obj[each];
			} else {
				this.watchs[each] = [];
				let that = this;
				Object.defineProperty(this.states, each, {
					enmuerable: true,
					configurable: true,
					set(newVal) {
						console.log(this);
						if (deff(newVal, obj[each])) {
							obj[each] = newVal;
							// console.log(that.watchs);
							that.watchs[each].map(({
								obj,
								key,
								fn
							}) => {
								if (fn) {
									fn(newVal)
								} else {
									obj[key] = newVal;
								}
							})
						}
					},
					get() {
						return obj[each];
					}
				})
				Object.defineProperty(this, each, {
					enmuerable: true,
					configurable: true,
					set(newVal) {
						// console.log(this);
						this.states[each] = newVal;
					},
					get() {
						return obj[each]
					}
				})
			}
		})
	}
	setWatch(obj, key, keyword, fn = null) {
		if (this[keyword] !== undefined) {
			obj[key] = this[keyword];
			this.watchs[keyword].push({
				obj,
				key,
				fn
			});
		} else {
			throw Error(`state of ${key} is no defind`);
		}
	}
}
