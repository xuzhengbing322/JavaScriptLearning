// tools是个对象，digitalize是对象的属性
;var tools =  (function (){
    // 数字化
    function digitalize(str) {
        return Number(str.replace(/\s+/g, '')) || 0
    }
    // 目标标签
    function getTarget(ev) {
        var e = ev || window.event;
        return e.target || e.srcElement
    }

    return {
        digitalize,
        getTarget
    }
}())