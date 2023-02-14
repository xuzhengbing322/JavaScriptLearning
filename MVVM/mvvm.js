class MVVM {
    // el是视图的根节点，获取根节点以便进行DOM节点操作。
    constructor (el, data) {
        // 找到app节点
        this.el = document.querySelector(el);
        // this._data = data;
        this.data = data;
        // 
        this.domPool = {};

        this.init();
    }

    init () {
        this.initData();
        this.initDom();
    }

    initDom () {
        this.bindDom(this.el)
        this.bindInput(this.el)

        //console.log(this.domPool)  //对象键名和节点就相互对应上了。
    }

    // 1、将数据转换成响应式数据
    initData () {
        // initData()被实例对象this调用，因此initData()的context中的默认this指向MVVM构造函数的实例对象
        const _this = this;
        /*在实例对象中创建data属性。data的属性全部源于数据_data的属性，并且每个属性设置了get/set函数。
因此访问和修改data的属性实际上是访问和设置_data中的属性。*/ 
        // this.data = {};

        /*_data是MVVM构造函数的实参data，即数据。遍历_data获取属性键名key，
通过Object.defineProperty()给实例对象中的data空对象添加所有的key属性，并且给每个key属性都
添加get/set函数。因此，访问访问和修改data的属性实际上是访问和设置_data中的属性。即data就从普通数据
变成响应式数据。
        
        */ 
        // for (let key in this._data) {
        //     Object.defineProperty(this.data, key, {
        //         get () {
        //             //this原本指向的是data对象，而非实例对象，因此要进行this指向转换。
        //             return _this._data[key]
        //         },
        //         set (newValue) {
        //             // 把input输入的值赋值给节点的innerHTML，即更改视图界面中的值
        //             _this.domPool[key].innerHTML = newValue
        //             _this._data[key] = newValue
        //         }
        //     })
        // }
        // console.log(this.data)

        this.data = new Proxy(this.data, {
            get (target, key) {
                return Reflect.get(target, key)
            },
            set (target, key, value) {
                _this.domPool[key].innerHTML = value;
                return Reflect.set(target, key, value);
            }
        })
    }

    // 绑定Dom节点
    bindDom (el) {
        // 获取参数的子节点
        const childNodes = el.childNodes;
        // 遍历子节点，获取span节点的innerText
        childNodes.forEach(item => {
            // item.nodeType === 3， item节点就是文本节点<span>x</span>中的x。
            if (item.nodeType === 3) {
                // item.nodeValue就是span节点的值
                const _value = item.nodeValue
                // 去除span节点值的空格，如果结果有长度，则证明节点有值。然后通过正则判断节点值是否为{{}}
                if (_value.trim().length) {
                    let _isvalid = /\{\{(.+?)\}\}/.test(_value)
                    if (_isvalid) {
                        /*通过正则匹配span节点值{{x}}的x。给节点池domPool添加属性，key为_key。
                        value就是当前文本节点（<span>x</span>中的x）的parentNode（<span></span）。
                        每当{{x}}中的x变更的时候，就替换span.innerText为data[_key]。
                        这样节点和响应式数据就绑定上了。
                        */ 
                        const _key = _value.match(/\{\{(.+?)\}\}/)[1].trim();
                        this.domPool[_key] = item.parentNode;
                        item.parentNode.innerText = this.data[_key] || undefined
                    }
                }
            }
            //如果当前的节点有子节点，就递归子节点item，获取所有子节点中的span。 
            item.childNodes && this.bindDom(item)
        })
    }

    // 2、给input绑定事件，并给事件设置相应的回调函数。el就是视图根节点#app。实现视图->数据
    bindInput (el) {
        // 获取根节点中所有的input标签的DOM节点
        const _allInputs = el.querySelectorAll('input');

        _allInputs.forEach(input => {
            // 获取input标签中v-model属性的value，value就是data的键名key，即_vModel就是data中的key
            const _vModel = input.getAttribute('v-model');
            if (_vModel) {
                /*给input标签添加keyup事件，事件回调函数是实例对象中的handleInput函数。
                事件处理函数中的this本来指向input标签，因此要将this指向转为实例对象this。
                handleInput函数的参数是_vModel（data的键名）和input标签的DOM节点
                */ 
                input.addEventListener('keyup', this.handleInput.bind(this, _vModel, input), false)
            }
        })
    }

    /*input.value就是input标签的value，即用户的输入值。将它赋给data[key]。data经过defineProperty()
响应式的处理，修改data中属性的值实际是修改_data中的属性的值。_data就是渲染到视图的数据对象。
    */ 
    handleInput (key, input) {
        const _value = input.value;
        this.data[key] = _value
    }

    setDate (key, value) {
        this.data[key] = value;
    }
}

