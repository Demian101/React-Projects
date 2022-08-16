## 柯里化的用途

柯里化实际是把简答的问题复杂化了，但是复杂化的同时，我们在使用函数时拥有了更加多的自由度。 而这里对于函数参数的自由处理，正是柯里化的核心所在。 柯里化本质上是降低通用性，提高适用性。来看一个例子：

我们工作中会遇到各种需要通过正则检验的需求，比如校验电话号码、校验邮箱、校验身份证号、校验密码等， 这时我们会封装一个通用函数 checkByRegExp ,接收两个参数，校验的正则对象和待校验的字符串

```scss
function checkByRegExp(regExp,string) {
    return regExp.test(string);  
}

checkByRegExp(/^1\d{10}$/, '18642838455'); // 校验电话号码
checkByRegExp(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, 'test@163.com'); // 校验邮箱
```

上面这段代码，乍一看没什么问题，可以满足我们所有通过正则检验的需求。 但是我们考虑这样一个问题，如果我们需要校验多个电话号码或者校验多个邮箱呢？

我们可能会这样做：

```scss
checkByRegExp(/^1\d{10}$/, '18642838455'); // 校验电话号码
checkByRegExp(/^1\d{10}$/, '13109840560'); // 校验电话号码
checkByRegExp(/^1\d{10}$/, '13204061212'); // 校验电话号码

checkByRegExp(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, 'test@163.com'); // 校验邮箱
checkByRegExp(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, 'test@qq.com'); // 校验邮箱
checkByRegExp(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, 'test@gmail.com'); // 校验邮箱
```

我们每次进行校验的时候都需要输入一串正则，再校验同一类型的数据时，相同的正则我们需要写多次， 这就导致我们在使用的时候效率低下，并且由于 checkByRegExp 函数本身是一个工具函数并没有任何意义， 一段时间后我们重新来看这些代码时，如果没有注释，我们必须通过检查正则的内容， 我们才能知道我们校验的是电话号码还是邮箱，还是别的什么。

此时，我们可以借助柯里化对 checkByRegExp 函数进行封装，以简化代码书写，提高代码可读性。

```scss
//进行柯里化
let _check = curry(checkByRegExp);
//生成工具函数，验证电话号码
let checkCellPhone = _check(/^1\d{10}$/);
//生成工具函数，验证邮箱
let checkEmail = _check(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);

checkCellPhone('18642838455'); // 校验电话号码
checkCellPhone('13109840560'); // 校验电话号码
checkCellPhone('13204061212'); // 校验电话号码

checkEmail('test@163.com'); // 校验邮箱
checkEmail('test@qq.com'); // 校验邮箱
checkEmail('test@gmail.com'); // 校验邮箱
```

再来看看通过柯里化封装后，我们的代码是不是变得又简洁又直观了呢。

经过柯里化后，我们生成了两个函数 checkCellPhone 和 checkEmail， checkCellPhone 函数只能验证传入的字符串是否是电话号码， checkEmail 函数只能验证传入的字符串是否是邮箱， 它们与 原函数 checkByRegExp 相比，从功能上通用性降低了，但适用性提升了。 柯里化的这种用途可以被理解为：**参数复用**





我们再来看一个例子

假定我们有这样一段数据：

```js
let list = [
    {
        name:'lucy'
    },
    {
        name:'jack'
    }
]
```

我们需要获取数据中的所有 name 属性的值，常规思路下，我们会这样实现:

```javascript
let names = list.map(function(item) {
  return item.name;
})
```

那么我们如何用柯里化的思维来实现呢



那么我们如何用柯里化的思维来实现呢

```js
let prop = curry(function(key,obj) {
    return obj[key];
})
let names = list.map(prop('name'))
```

看到这里，可能会有疑问，这么简单的例子，仅仅只是为了获取 name 的属性值，为何还要实现一个 prop 函数呢，这样太麻烦了吧。

换个思路 : prop 函数实现一次后，以后是可以多次使用的，所以我们在考虑代码复杂程度的时候，是可以将 prop 函数的实现去掉的。

我们实际的代码可以理解为只有一行 let names = list.map(prop('name'))

这么看来，通过柯里化的方式，我们的代码是不是变得更精简了，并且可读性更高了呢。



## 如何封装柯里化工具函


作者：云中桥
链接：https://juejin.cn/post/6844903882208837645
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。