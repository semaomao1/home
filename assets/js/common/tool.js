var agent = navigator.userAgent.toLowerCase();
window.isPc = function() {
    var result = agent.indexOf("Windows") > -1;
    return result;
}

window.isIOS = function() {
    let result = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || agent.indexOf("iphone") > -1 || agent.indexOf("ipad") > -1;
    return result;
}

window.isAnd = function() {
    var result = agent.indexOf("Android") > -1 || agent.indexOf("Adr") > -1 || agent.indexOf("android") > -1 || agent.indexOf("linux") > -1;
    return result;
}

window.isMobile = function() {
    if (document.documentElement.clientWidth < 738) {
        return true;
    }
    return false;
}

window.getRandom = function(arr) {
    let index = parseInt(Math.random() * arr.length);
    return arr[index];
}