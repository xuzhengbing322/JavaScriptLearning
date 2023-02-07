;(function (doc, tools) {

    var Tab = function (options) {
        // oTab和oPage节点只是用于寻找其他节点，而不会被操作。因此不需要放到实例对象中。
        var oTab = doc.querySelector(options.el)
            oPage = oTab.getElementsByClassName('page')[0];
        this.oNav = oTab.getElementsByClassName('nav')[0];
        this.oNavItems = this.oNav.getElementsByClassName('nav-item')
        this.oPageItems = oPage.getElementsByClassName('page-item');

        this.curIdx = 0;

        // 避免代码中直接出现字符串
        this.classObject = options.classNameObjcet
    }

    Tab.prototype.init = function () {
        this.bindEvent()
    }

    Tab.prototype.bindEvent = function () {
        /*点击事件onNavClick应该是绑定在实例对象中，而非this.oNav节点中。addEventListener()
        方法的this默认指向this.oNav，因此需要转换this指向。
        */ 
        this.oNav.addEventListener('click', this.onNavClick.bind(this), false)
    }

    Tab.prototype.onNavClick = function (ev) {
        // 事件代理：通过事件，找到标签，再找到class属性值
        var tar = tools.getTarget(ev)
            className = tar.className;

        if(className === 'nav-item') {
            // curIdx表示具有current的节点的数组序号。清楚当前节点的current
            // this.oNavItems[this.curIdx].className = 'nav-item';
            // this.oPageItems[this.curIdx].className = 'page-item'
            /*获取当前点击节点的数组序号。call改变this指向，将[].indexOf变为this.oNavItems.indexOf
            tar是点击的标签，即this.oNavItems[tar].indexOf的序号。
            */ 
            this.setCurrent(this.curIdx, 'remove');
            this.curIdx = [].indexOf.call(this.oNavItems, tar);
            this.setCurrent(this.curIdx, 'add')
            // 给点击的节点添加current
            // this.oNavItems[this.curIdx].className += ' current';
            // this.oPageItems[this.curIdx].className += ' current'
        }
    }

    Tab.prototype.setCurrent = function (index, field) {
        switch (field) {
            case 'remove':
                this.oNavItems[index].className = this.classObject.navItem.origin;
                this.oPageItems[index].className = this.classObject.pageItem.origin;
                break;
            case 'add':
                this.oNavItems[index].className = this.classObject.navItem.current;
                this.oPageItems[index].className = this.classObject.pageItem.current;
                break;
            default:
                break;
        }
    }

    window.Tab = Tab

}(document, initTools))