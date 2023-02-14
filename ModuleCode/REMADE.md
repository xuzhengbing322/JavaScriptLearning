# 模块化发展历史
    1、IE6之前浏览器内核没有独立的JS引擎，javascript代码通过渲染引擎运行，所以几行javascript代码就能
让页面奔溃。IE6之后，浏览器内核就有独立的JS引擎，程序员将所有的javascript代码写在html页面中的
<script type='text/javascript'></script>中。
    2、随着html中的javascript代码越来越多，程序员将javascript代码全部写在js的文件中，然后在html页面
中用<script src="js/index.js"></script>来引入js文件，从而使用javascript代码。
    3、随着js文件中的javascript代码越来越多，每个html页面都要引入这个非常大的js文件。程序员就给每个
html文件设置自己的js文件，然后引入。此时的模块化就是以html页面为基准来分成不同的javascript块。
    4、有些html会共用相同的javascript代码，每个js文件都写相同的javascript代码就会导致严重的冗余。因
此程序员将多个html页面共用的javascript代码提取到一个common.js文件，即为公共文件，然后引用即可。
这种方式存在三个问题：common.js过大，加载顺序问题，污染全局问题。
    （1）可随着common.js文件的内容越来越多。然而有些html页面只需要用common.js中某一段代码，却需要
引用common.js中全部的代码，导致页面引入了很多无用的javascript代码。（2）当html页面越来越多，公共的js文件也越来越多，一个html文件很可能会引用多个js文件。系统从上往下逐一执行<script></script>，因此js文件必须按照程序的逻辑排序，不然程序会报错。（3）同一个html文件中的<script></script>共用同一个JS作用域，即全局作用域。所有的<script></script>引入的js文件中声明的全局变量和函数，都直接暴露在全局作用域中。这很容易出现重名问题导致变量覆盖。也就是说，在全局作用域中声明数据类型的变量会污染全局，而声明其他可控的变量，例如模块名，就不会构成污染全局。
    5、通过立即执行函数可以解决污染全局问题。函数执行的时候有自己的执行期上下文和作用域。全局作用域无法直
接访问函数作用域中的内容。程序员在立即执行函数中编写代码，是在函数执行上下文中编写代码。立即执行函数执行后通过return将函数的执行结果返回并赋值给全局作用域中变量moduleX，由此形成闭包。立即执行函数的作用域并不会随着函数执行结束而销毁，通过变量moduleX可以访问到立即执行函数中的变量和函数。
        HTML文件中的<script></script>共用同一个JS作用域，即全局作用域。后面的<script></script>可
以调用前面<script></script>中的变量。因此可以把接收前面立即执行函数的返回结果的变量，作为后面立即执行函数的实参，从而后者可以使用前者中的变量。这样就解决了加载依赖问题，但依旧存在执行顺序问题。
    6、以上就是通过javascript本身的功能实现的模块化。随后NodeJS诞生后，程序员可以通过module.exports
来导出用立即执行函数书写的模块。然后再另一个js文件中用require('.....')来引入模块，并将其赋给变量。这样程序员就可以通过变量来调用导入模块中的变量和函数。这种依赖NodeJS实现的导入导出解决了加载顺序问题，html只需要引入主index.js文件即可。
    CommonJS是一种源于NodeJS的模块化规范，所以只能在NodeJS中运行。CommonJS使用同步方法，所有js文件都
是同步完成加载。CommonJS每次require引用一个文件，都会创建一个模块实例，即js的实例，以便使用。CommonJS有缓存机制，只要模块被引用一次，那这个模块就会被缓存。如果下次使用模块的时候，模块没有更改，那就使用缓存中的这个模块。
    7、由于CommonJS在浏览器中运行不了，所以造出了AMD（Asynchronous Module Definition）来实现浏览
器上的导入导出模块。定义模块：define(moduleName, [module], factory); moduleName是模块名，[module]是这个模块依赖的模块名，factory是回调函数，它相当于是立即执行函数，factory函数内是这个模块里面需要干什么。引入模块：require([module], callback)。实现AMD的是RequireJS
    8、随后ES6官方推出了自己的模块化。导出模块：1、默认暴露export default xxx。2、集体暴露export {}
导入模块：1、import 接收模块的变量名 from '模块文件路径'。2、集体导入import {模块名} from '模块文件路径'。
    commonJS和ES6的区别：1、commonjs模块导出的是变量的拷贝。因此无论变量值如何改变，导入时接收到的依旧
是原始变量的拷贝。然而，ES6模块导出的是变量的引用。也就是说，导入的变量就是导出的变量。导入的变量是导出模块操作完成后的变量。2、commonjs运行在服务端，commonjs模块是在运行时加载，即require的时候才会加载模块。es6模块是在编译时加载。也就是说，es6的模块本身就是模块，只是浏览器不支持，所以需要webpack环境去编译它。它在编译了以后就已经存在了，运行的时候实际上并不是运行的原来写的模块，而是它编译好的程序。

