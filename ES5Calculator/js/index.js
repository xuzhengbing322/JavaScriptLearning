// 普通开发
// // 获取DOM节点
// var oCalculator = document.getElementsByClassName('J_calculator')[0],
//     oResult = oCalculator.getElementsByClassName('result')[0],
//     fInput = oCalculator.getElementsByTagName('input')[0],
//     sInput = oCalculator.getElementsByTagName('input')[1],
//     oButtonGroup = oCalculator.getElementsByClassName('button-group')[0];

// // 给button节点设置点击事件
// oButtonGroup.addEventListener('click', onBtnClick, false)

// // 事件处理
// function onBtnClick(ev) {
//     // e.target可以获取到点击的节点，tar.tagName获取节点的标签名。
//     var e = ev || window.event,
//         tar = e.target || e.srcElement,
//         tagName = tar.tagName.toLowerCase();

//     if (tagName === 'button') {
//         //获取input的值（用正则去除空格，并且如果为NaN则返回0）
//         var method = tar.getAttribute('data-method'),
//             fVal = Number(fInput.value.replace(/\s+/g,'')) || 0,
//             sVal = Number(sInput.value.replace(/\s+/g,'')) || 0;

//         switch (method) {
//             case 'plus':
//                 oResult.innerText = fVal + sVal;
//                 break;
//             case 'minus':
//                 oResult.innerText = fVal - sVal;
//                 break;
//             case 'mul':
//                 oResult.innerText = fVal * sVal;
//                 break;
//             case 'div':
//                 oResult.innerText = fVal / sVal;
//                 break;
//             default:
//                 break;

//         }
//     }
// }
// 模块化开发
;
(function (doc, tools, compute) {
    // document是window中的参数。按照模块化思想，应该是引用window中的document。通过传参实现，因为形参相当于是函数内部临时变量。
    var oCalculator = doc.getElementsByClassName('J_calculator')[0],
        oResult = oCalculator.getElementsByClassName('result')[0],
        oInput = oCalculator.getElementsByTagName('input'),
        oButtonGroup = oCalculator.getElementsByClassName('button-group')[0];
    // 模块初始化函数：管理模块要运行的函数
    var init = function () {
        bindEvent()
    }

    // 模块绑定事件函数：管理所有的事件处理函数
    function bindEvent() {
        oButtonGroup.addEventListener('click', onBtnClick, false)
    }

    // button点击事件：
    function onBtnClick(ev) {
        var tar = tools.getTarget(ev),
            tagName = tar.tagName.toLowerCase();

        if (tagName === 'button') {
            // 封装tools，避免代码冗余
            var method = tar.getAttribute('data-method'),
                fVal = tools.digitalize(oInput[0].value),
                sVal = tools.digitalize(oInput[1].value);

            // var computeResult = compute(method, fVal, sVal)
            // renderResult(computeResult)
            renderResult(compute[method](fVal,sVal))
        }
    }

    // 计算button点击事件的数据


    // 渲染compute计算的结果
    function renderResult(result) {
        oResult.innerText = result
    }

    // 函数自执行就会执行init函数
    init()
}(document, tools, compute))