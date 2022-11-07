<div align="center">
  <p>
 <a href="https://www.npmjs.com/package/tacs"><img  src="https://github.com/4i8/tacs/raw/master/front/logo.png" width="400" alt="tacs" /></a>
  </p>
  <p>
 <a href="https://www.npmjs.com/package/tacs"><img src="https://img.shields.io/npm/v/tacs.svg?style=for-the-badge" alt="NPM version" /></a>
 <a href="https://www.npmjs.com/package/tacs"><img src="https://img.shields.io/npm/dt/tacs.svg?maxAge=3600&style=for-the-badge" alt="NPM downloads" /></a>
  </p>
</div>

# **Task Conveyor System**

**tacs is a process management system inside the process (nodejs) to handle the huge amount of requests that need accuracy and slow down separately whatever and every time you do a push it will activate an algorithm ($lab), like a Conveyor System Imagine it yes this you can do that in your project**

- [Documentation](#documentation)
- [Updates](#Updates)
- [Installation](#installation)
- [Usage](#Usage)
  - [Example](#Example)
- [Method](#Method)
  - [$lab()](#lab)
  - [next()](#next)
  - [push()](#push)
  - [sleep()](#sleep)
  - [on()](#on)
  - [kill()](#kill)
  - [get()](#get)
    - [pushed](#pushed)
    - [option](#option)
    - [remove()](#remove)
    - [exist()](#exist)

# **Installation**

```sh-session
npm install tacs
yarn add tacs
```

# **Usage**

### CommonJS

```js
const { Conveyor, getConveyor } = require("tacs");
```

### ES6

```js
import { Conveyor, getConveyor } from "tacs";
```

# **Updates**

> @latest

```diff
+ push Key System
+ push getConveyor() method to get conveyor without the need for an module.exports constructor (see example)
+ remove() (Bug Resolve)
- add()
+ push() Replace For add()
- get().added
+ get().pushed Replace For get().added
+ sleep() (Bug Resolve)
+ drastic edit
- reject in sleep
``` 

# **Example**

### [Go To Documentation](#documentation)

#### **Try**

#### **this is a simple example on replit Try it**

<p><a href="https://replit.com/@onlyarth/tacs-try" title="Run on Replit badge"><img src="https://replit.com/badge/github/replit/codemirror-emacs" alt="Run on Replit badge" /></a></p>

## **First Example (Without Key System)**

```js
const { Conveyor } = require("tacs");
const tacs = new Conveyor();
tacs.$lab((element, index, remove) => {
  //To see how remove works go to the examples (see remove)
  if (remove) {
    console.log("This Element is Remove:\n", element);
    return tacs.next();
  }
  console.log(element, "My Index is: ", index);
  tacs.next().catch((err) => {
    console.log(err); //if you Kill the conveyor and you have a next() it will throw an error
  });
});
tacs
  .push([
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
  ])
  .catch((err) => {
    console.log(err); //if you Kill the conveyor and you have a push() it will throw an error
  });
//Every time you do a push it will activate $lab algorithm
```

## **Example (With Key System)**

### index.js

```js
const { Conveyor, getConveyor } = require("tacs");
const tacs = new Conveyor("employees"); //or getConveyor("employees", true);
tacs.$lab((element, index, remove) => {
  //To see how remove works go to the examples (see remove)
  if (remove) {
    console.log("This Element is Remove:\n", element);
    return tacs.next();
  }
  console.log(element, "My Index is: ", index);
  tacs.next().catch((err) => {
    console.log(err); //if you Kill the conveyor and you have a next() it will throw an error
  });
});
//Every time you do a push it will activate $lab algorithm
```

### another.js

```js
const { getConveyor } = require("tacs");
getConveyor("employees") //if you don't have a conveyor for this key it will throw an error
  .push([
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
  ])
  .catch((err) => {
    console.log(err); //if you Kill the conveyor and you have a push() it will throw an error
  });
```

## documentation

<table>
  <tr>
    <th>Method</th>
    <th>Description</th>
    <th>explain</th>
  <tr>
    <td>$lab()</td>
    <td>this is $lab function that will be emit when you push element or when you call next</td>
    <td><a href=#lab>Go to example</a></td>
  </tr>
   <tr>
    <td>next()</td>
    <td>go to next index</td>
    <td><a href=#next>Go to example</a></td>
  </tr>
     <tr>
    <td>push()</td>
    <td>push element to the conveyor {element} is an array</td>
    <td><a href=#push>Go to example</a></td>
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
    <td>kill()</td>
    <td>kill the conveyor use this if you use this you can't use next() or any other function</td>
    <td><a href=#kill>Go to example</a></td>
  </tr>
   <tr>
    <td>get()</td>
    <td>get pushed Data or option or remove or exist</td>
    <td><a href=#get>Go to example</a></td>
  </tr>
</table>

# **Method**

### **lab**

```js
//this is $lab function that will be emit when you push element or when you call next
tacs.$lab((element, index, remove) => {
  console.log(element, index, remove);
  //To see how remove works go to the examples (see remove)
  if (remove) {
    console.log("This Element is Remove:\n", element);
    tacs.next();
    //if you want set timeout for this function include next method in setTimeout function
    return;
  }
  tacs.next();
  //if you want set timeout for this function include next method in setTimeout function
});
```

### **next**

```js
//go to next index
tacs.next();
//if you want set timeout for this function include next method in setTimeout function
```

### **push**

```js
//push(Your Data)
//if you want to push element to the conveyor use this
// This is an example of pushing element to the conveyor
//Array
tacs.push(["JavaScript", "C", "C++", "C#", "Java", "Python"]);
//Object
tacs.push({
  name: "John",
  age: 30,
  city: "New York",
});
//String or Number or any other type
tacs.push("Arth");
```

### **sleep**

```js
//sleep the conveyor {timeout} milliseconds later after timeout is over it wil be next automatically
tacs.sleep(1000); //sleep for 1 second
```

### **on**

```js
//The events
tacs.on("push", (element) => {
  console.log(element); //element is an array
});
tacs.on("end", (element) => {
  console.log(element); //Array: all the element in the conveyor
});
```

### **restart**

```js
//if you want to restart the conveyor use this and it will restart from the first index
tacs.on("end", (element) => {
  tacs.push(tacs.get().pushed);
});
```

### **kill**

```js
//kill the conveyor use this if you use this you can't use next() or any other function
tacs.kill();
```

### **get**

> #### **pushed**

```js
tacs.get().pushed; //Array: returns an array with the pushed element
```

> #### **option**

```js
tacs.get().option; //String: returns the last option
```

> #### **remove**

```js
//remove the element from the conveyor and return remove parameter in $lab function
tacs.get(/*<Element>*/).remove(); //No Return: remove element from the array
//Some examples
tacs.get({ name: "Joe", age: 40 }).remove(); //remove element from the array
//or you can use this specitic value
tacs.get({ name: "Joe" }).remove(); //remove element from the array
//String or Number or any other type exmaple for string
tacs.get("JavaScript").remove(); //remove element from the array
```

> #### **exist**

```js
tacs.get(/*<Element>*/).exist(); //Boolean: returns true if the element exist in the array
//Some examples
tacs.get({ name: "Joe", age: 40 }).exist(); //returns true if the element exist in the array
//or you can use this specitic value
tacs.get({ name: "Joe" }).exist(); //returns true if the element exist in the array
//String or Number or any other type exmaple for string
tacs.get("JavaScript").exist(); //returns true if the element exist in the array
```

## Links

- [Twiter](https://twitter.com/onlyarth)
- [Github](https://github.com/4i8)

## License

- [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)
