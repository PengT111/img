/***
 * TODO:函数节流  [throttle]
 * @param {function} func 输入完成的回调函数
 * @param {number} delay 延迟时间
 */
export function throttle(func, delay) {
	let timer
	return (...args) => {
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			func.apply(this, args)
		}, delay)
	}
}
/**
//时间戳版
function throttle(func, wait) {
    let previous = 0;
    return function() {
        let now = Date.now();
        let context = this;
        let args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}
throttle(count,1000);
//定时器版
function throttle(func, wait) {
    let timeout;
    return function() {
        let context = this;
        let args = arguments;
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(context, args)
            }, wait)
        }
    }
}
 */
/**
 * 防抖
//例子1
function debounce(fn,delay=200){
	let timer = null;
	return function(){
		if(timer) clearTimeout(timer);
		timer = setTimeout(()=>{
			fn.apply(this,arguments);
			timer = null;
		},delay);
	}
}
//例子2
function debounce(func, wait) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
            func.apply(context, args)
            }, wait);
        }
}
 */

/**
 * TODO:验证函数  [testing]
 * @param {string} val  验证值
 * @param {string} type 验证的类型
 */
export function testing(val, type) {
	var flag
	var rule
	if (val == undefined) {
		alert("参数缺失")
		return
	}
	if (type == "mobile") {
		// 手机号码
		rule = /^1[3456789]\d{9}$/
	} else if (type == "username") {
		rule = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/
	} else if (type == "price") {
		// 价格：正浮点数
		rule = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/
	} else if (type == "password") {
		// 密码4-20字符
		rule = /^.{6,20}$/
	} else if (type == "num") {
		// 数量
		rule = /^([1-9][0-9]*)$/
	} else if (type == "idcard") {
		//身份证验证
		rule = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
	} else {
		// 非空验证1-50字符
		rule = /^.{1,50}$/
	}
	rule.test(val) ? (flag = true) : (flag = false)
	return flag
}

/**
 * TODO:获取url单个参数  [getParam ]
 * @param  {String} name
 * @param  {String} url   [default:location.href]
 * @return {String|Boolean}
 */
export function getParam(name, url) {
	if (typeof name !== "string") return false
	if (!url) url = window.location.href
	// 当遇到name[xx]时，对方括号做一下转义为 name\[xxx\]，因为下面还需要使用name做正则
	// eslint-disable-next-line no-useless-escape
	name = name.replace(/[\[\]]/g, "\\$&")
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
	var results = regex.exec(url)
	if (!results) return null
	if (!results[2]) return ""
	return decodeURIComponent(results[2].replace(/\+/g, " "))
}
