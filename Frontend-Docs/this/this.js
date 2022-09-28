// const a = 1;
// const obj = {
//   a: 2,
//   b: function() {
//     return (this === obj);
//   }
// };
// console.log(obj.b()); // true


const obj = {
  outerFunc: function() {
    const self = this

    function innerFunc(){
      console.log( this == obj)  //  false
      console.log( self == obj)  // true
    }
    return innerFunc  // 返回内部函数
  }
}
//This code will return inner function and won't execute
const inner = obj.outerFunc()
// Invoke 调用 inner Function here
inner()

