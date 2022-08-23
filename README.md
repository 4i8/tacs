<div align="center">
  <p>
 <a href="https://www.npmjs.com/package/tacs"><img  src="https://github.com/4i8/tacs/raw/master/front/logo.png" width="400" alt="tacs" /></a>
  </p>
  <p>
 <a href="https://github.com/arosteam"><img src="https://img.shields.io/static/v1?label=powered%20by&message=Aros&color=000636&style=for-the-badge&logo=Windows%20Terminal&logoColor=fff"/></a>
 <a href="https://www.npmjs.com/package/tacs"><img src="https://img.shields.io/npm/v/tacs.svg?style=for-the-badge" alt="NPM version" /></a>
 <a href="https://www.npmjs.com/package/tacs"><img src="https://img.shields.io/npm/dt/tacs.svg?maxAge=3600&style=for-the-badge" alt="NPM downloads" /></a>
  </p>
</div>

# **Task Conveyor System**

tacs: Task Conveyor System is a system that can be used to run a series of functions in a sequential order.

- very helpful for automation or express.js development tasks
- very useful for running a series of functions in a sequential order

## Gif Example By Dribbble

  <p>
 <a href="https://dribbble.com/"><img  src="https://github.com/4i8/tacs/raw/master/front/By%20Dribbble.gif" width="400" alt="tacs" /></a>
  </p>

# **Installation**

```sh-session
npm install tacs
yarn add tacs
```

# **Updates**

```
+ Added: add index in callback $lab() like this $lab((data, index)=>{})
+ Replaced To: setTimeout(tacs.next, 1000);
- Removed: tacs.next(1000);
- Removed: tacs.restart();
+ Replaced To: tacs.add(tacs.get().added);
```

# **How to use**

```js
const conveyor = require("tacs");
const tacs = new conveyor();
```

# **Example**

### [Go To Documentation](#documentation)

```js
const conveyor = require("tacs");
const tacs = new conveyor();
tacs.$lab((data, index) => {
  if (data.name.length >= 1) {
    console.log(data.name, index);
    tacs.next(); //if you need to add timeout use this : setTimeout(tacs.next, 1000);//second
  }
});
tacs.add([
  {
    name: "JavaScript",
    id: 1,
  },
  {
    name: "Objective-C",
    id: 2,
  },
  {
    name: "C",
    id: 3,
  },
  {
    name: "C++",
    id: 4,
  },
  {
    name: "C#",
    id: 5,
  },
  {
    name: "Java",
    id: 6,
  },
  {
    name: "Python",
    id: 7,
  },
]);
tacs.add([
  {
    name: "John",
    age: 30,
  },
  {
    name: "Mary",
    age: 25,
  },
  {
    name: "Mike",
    age: 20,
  },
  {
    name: "Jane",
    age: 35,
  },
  {
    name: "Joe",
    age: 40,
  },
]);
//you can use this to add a delay between each function
setTimeout(() => {
  tacs.add([{ name: "Arth", age: "unknown" }]);
}, 5000);
```

## documentation

<table>
  <tr>
    <th>Method</th>
    <th>Description</th>
    <th>explain</th>
  <tr>
    <td>$lab()</td>
    <td>this is $lab function that will be emit when you add data or when you call next</td>
    <td><a href=#lab>Go to example</a></td>
  </tr>
   <tr>
    <td>next()</td>
    <td>go to next index if you set timeout use like this : setTimeout(tacs.next, 1000);//second</td>
    <td><a href=#next>Go to example</a></td>
  </tr>
     <tr>
    <td>add()</td>
    <td>add data to the conveyor {data} is an array</td>
    <td><a href=#add>Go to example</a></td>
  </tr>
    <tr>
    <td>sleep()</td>
    <td>sleep the conveyor {timeout} milliseconds later after timeout is over it wil be next automatically</td>
    <td><a href=#sleep>Go to example</a></td>
  </tr>
   <tr>
    <td>on()</td>
    <td>The events</td>
    <td><a href=#on>Go to example</a></td>
  </tr> 
  <tr>
    <td>end()</td>
    <td>end the conveyor use this if you use this you can't use next() or any other function</td>
    <td><a href=#end>Go to example</a></td>
  </tr>
   <tr>
    <td>get()</td>
    <td>get Added Data or option</td>
    <td><a href=#get>Go to example</a></td>
  </tr>
</table>

# **details**

```js
const conveyor = require("tacs");
const tacs = new conveyor();
```

### **lab**

```js
//this is $lab function that will be emit when you add data or when you call next
tacs.$lab((data, index) => {
  console.log(data, index); //index is the index of the data in the array
  tacs.next(); //if you need to add timeout use this : setTimeout(tacs.next, 1000);//second
});
```

### **next**

```js
//go to next index
tacs.next(); //if you need to add timeout use this : setTimeout(tacs.next, 1000);//second
```

### **add**

```js
//if you want to add data to the conveyor use this
// This is an example of adding data to the conveyor
//Array
tacs.add(["JavaScript", "C", "C++", "C#", "Java", "Python"]);
//Object
tacs.add({
  name: "John",
  age: 30,
  city: "New York",
});
//String or Number or any other type
tacs.add("Arth");
```

### **sleep**

```js
//sleep the conveyor {timeout} milliseconds later after timeout is over it wil be next automatically
tacs.sleep(1000); //sleep for 1 second
```

### **on**

```js
//The events
tacs.on("add", (data) => {
  console.log(data); //data is an array
});
```

### **restart**

```js
//if you want to restart the conveyor use this and it will restart from the first index
tacs.add(tacs.get().added);
```

### **end**

```js
//end the conveyor use this if you use this you can't use next() or any other function
tacs.end();
```

### **get**

```js
//if you want get Added Data or option
tacs.get().added; //Array: returns an array with the added data
tacs.get().option; //String: returns the last option
```

## Links

- [Twiter](https://twitter.com/onlyarth)
- [Github](https://github.com/4i8)

## License

- [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)
