class MVVM {
    constructor (el, data) {
        // 找到app节点
        this.el = document.querySelector(el);
        // this._data = data;
        this.data = data;
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

    // 将数据转换成响应式数据
    initData () {
        const _this = this;
        /*创建空对象。通过Object.defineProperty()实现数据劫持，读取data相当于是在读取_data，
修改data相当于是在修改_data。这就是将数据转变成响应式数据。_data是渲染到视图的数据对象，
data是input操作的数据对象。
存疑：？？？为什么input不直接操作_data中的数据。这样就不用做数据劫持。
        
        */ 
        // this.data = {};

        // // 循环视图数据对象_data，获取对象的key
        // for (let key in this._data) {
        //     // 将key和对应的值赋给空对象，在读和写时要增加操作。
        //     Object.defineProperty(this.data, key, {
        //         get () {
        //             console.log('获取数据： ', key, _this._data[key])
        //             // this原本指向的是data对象，而非实例对象，因此要进行this指向转换。
        //             return _this._data[key]
        //         },
        //         set (newValue) {
        //             console.log('设置数据：', key, newValue)
        //             // 把input输入的值赋值给节点的innerHTML，即更改视图界面中的值
        //             _this.domPool[key].innerHTML = newValue
        //             // 更改视图数据对象_data中相应的值。
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

    bindDom (el) {
        // 获取参数的子节点
        const childNodes = el.childNodes;
        // 遍历子节点，获取span节点的innerText
        childNodes.forEach(item => {
            // nodeType等于3，它就是文本节点。即<span>x</span>中的x
            if (item.nodeType === 3) {
                // 获取文本节点的值
                const _value = item.nodeValue

                // 去除文本节点值的空格，如果结果有长度，则证明节点有值，则判断节点值是否为{{}}
                if (_value.trim().length) {
                    // 通过正则检测节点值是否为{{}}
                    let _isvalid = /\{\{(.+?)\}\}/.test(_value)
                    if (_isvalid) {
                        // console.log(item.nodeValue)
                        // 如果节点值是{{}}，则用正则匹配节点值，获取数组_key中的属性，即{{x}}中的x。这个x就是data和_data对象的key
                        const _key = _value.match(/\{\{(.+?)\}\}/)[1].trim();
                        // console.log(_key)
                        /*给节点池domPool添加属性，key为_key，value就是
                        当前文本节点（<span>x</span>中的x）的parentNode（<span></span）。
                        每当{{x}}中的x变更的时候，就替换span.innerText为data[_key]。
                        这样节点和响应式数据就绑定上了。
                        */ 
                        this.domPool[_key] = item.parentNode;
                        item.parentNode.innerText = this.data[_key] || undefined
                    }
                }
            }
            //如果当前的节点有子节点，拿它就再递归执行bindDom()，获取子节点中的子节点。如此遍历所有的节点，获取span。
            item.childNodes && this.bindDom(item)
        })
    }

    bindInput (el) {
        // 获取所有的input标签
        const _allInputs = el.querySelectorAll('input');

        _allInputs.forEach(input => {
            // 获取input标签中v-model属性的value，同时这些属性也是data的键名。
            const _vModel = input.getAttribute('v-model');
            
            if (_vModel) {
                input.addEventListener('keyup', this.handleInput.bind(this, _vModel, input), false)
            }
        })
    }

    /*给input绑定事件函数，输入的input.value赋给data[key]，data经过defineProperty()的处理，
    修改data的同时也会修改_data。_data就是渲染到视图的数据对象。
    */ 
    handleInput (key, input) {
        const _value = input.value;
        this.data[key] = _value
    }

    setDate (key, value) {
        this.data[key] = value;
    }
}

/**
 * 1、将数据转换成响应式的数据，Object.defineProperty  Proxy
 * 2、通过keyup绑定所有的input的输入，事件处理函数的绑定，函数的作用就是改变数据。
 * 3、相关的DOM节点和响应式数据相互绑定，操作数据的某个属性，对应的DOM就改变。
 * 
 *      key所对应的value是span节点。每当name所对应的value改变，那么就可以通过key访问到对应的
 *span节点，也就是改变span节点的innerText
 *      {
 *          'name': span节点
 *      }
 *      3.1、形成上述的对象。
 * */ 