// 导入：将模块插入到当前作用域。
/**1、默认导入
 * import defaultExport from "module-name";
 * defaultExport：导入模块的默认导出接口的引用名。module-name：要导入的模块，其通常是包含目标模块
的 .js 文件的相对或绝对路径名。
 * */ 

/**4、批量导入
 * import { export1 , export2 } from "module-name";
 * export1 , export2：被导入模块的导出接口的名称。
 * */ 

/**3、导入别名
 * import * as name from "module-name";
 * name：导入模块对象整体的别名，在引用导入模块时，它将作为一个命名空间来使用。
 * 
 * import { export as alias } from "module-name";
 * alias, aliasN：将引用指定的导入的名称。
 * */ 


// import { foo , bar } from "module-name/path/to/specific/un-exported/file";
// import { export1 , export2 as alias2 , [...] } from "module-name";
// import defaultExport, { export [ , [...] ] } from "module-name";
// import defaultExport, * as name from "module-name";
// import "module-name";

// 导出：
/**导出：
 * 在创建 JavaScript 模块时，export 语句用于从模块中导出实时绑定的函数、对象或原始值，以便其他程序可以
通过 import 语句使用它们。被导出的绑定值依然可以在本地进行修改。在使用 import 进行导入时，这些绑定值只
能被导入模块所读取，但在 export 导出模块中对这些绑定值进行修改，所修改的值也会实时地更新。
 * nameN：要导出的标识符（以便其他脚本通过 import 语句进行导入）。
 * 有两种不同的导出方式，命名导出和默认导出。你能够在每一个模块中定义多个命名导出，但是只允许有一个默认导出。
每种方式对应于上述的一种语法：




 
 * 导出单个特性：
export let name1, name2, …, nameN; // also var, const
export let name1 = …, name2 = …, …, nameN; // also var, const
export function FunctionName(){...}
export class ClassName {...}

 * 导出列表
export { name1, name2, …, nameN };

 * 重命名导出
export { variable1 as name1, variable2 as name2, …, nameN };

 * 解构导出并重命名
export const { name1, name2: bar } = o;

 * 默认导出
export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export { name1 as default, … };

 * 导出模块合集
export * from …; // does not set the default export
export * as name1 from …; // Draft ECMAScript® 2O21
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
export { default } from …;
* */ 