JSON.parse

JSON Stringify



----



First, here's a JSON object:

```json
{
  "name": "Jane Doe",
  "favorite-game": "Stardew Valley",
  "subscriber": false
}
```

 JSON 对象和常规 JavaScript 对象（也称为对象字面量 object literal ）之间的主要区别在于**引号**。

 JSON 对象中的所有键和字符串类型值都必须用**双引号 (")** 括起来。



JavaScript 对象字面量更灵活一些 , 可用单引号 , 或者不使用任何类型的引号作为键。

```js
const profile = {
  name: 'Jane Doe',
  'favorite-game': 'Stardew Valley',
  subscriber: false
}
```



在 fetch 等请求中 , 如果 interface 发回了 JSON 字符串 , 

可以直接使用 ` .json()`  方法，可将 JSON 响应自动解析为可用的 JavaScript 对象文字或数组。  like this  : 

```js
$ interface return : 
{"name":"Jane Doe","favorite-game":"Stardew Valley","subscriber":false}

fetch('https://api.chucknorris.io/jokes/random?category=dev')
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => console.log(data));
```



# JSON.stringify

字符串化

`JSON.stringify()` also works with arrays.

```js
const newJoke = {
  categories: ['dev'],
  value: "Chuck Norris's keyboard is made up entirely of Cmd keys because Chuck Norris is always in command."
};

console.log(JSON.stringify(newJoke)); // {"categories":["dev"],"value":"Chuck Norris's keyboard is made up entirely of Cmd keys because Chuck Norris is always in command."}

console.log(typeof JSON.stringify(newJoke)); // string
```





# JSON.parse

`JSON.parse() ` 采用 JSON 字符串并将其解析为 JavaScript 对象文字或数组



```js
const jokesFile1 = readFile('./jokes.json');
const jokes1 = JSON.parse(jokesFile1);

console.log(jokes1[0].value);   // "Chuck..."
```