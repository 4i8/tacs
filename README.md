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

Tacs is Task Conveyor System is a system that can be used to run a series of functions in a sequential order.

- very helpful for automation or express.js development tasks
- very useful for running a series of functions in a sequential order
- very useful for running a series of functions in a parallel order

## Gif Example By Dribbble

  <p>
 <a href="https://dribbble.com/"><img  src="https://github.com/4i8/tacs/raw/master/front/By%20Dribbble.gif" width="400" alt="tacs" /></a>
  </p>

- [Documentation](#documentation)
- [Updates](#Updates)
- [Installation](#installation)
- [Usage](#Usage)
  - [Example](#Example)
- [Method](#Method)
  - [$lab](#lab)
  - [next](#next)
  - [add](#add)
  - [sleep](#sleep)
  - [on](#on)
  - [kill](#kill)
  - [get](#get)
    - [added](#added)
    - [option](#option)
    - [remove](#remove)
    - [exist](#exist)

# **Installation**

```sh-session
npm install tacs
yarn add tacs
```

# **Usage**

```js
const conveyor = require("tacs");
const tacs = new conveyor();
```

# **Updates**

> @latest

```
+ add reject if conveyor is sleeping
+ add resolve in next() in latest index (Bug Resolve)
```

# **Example**

### [Go To Documentation](#documentation)

#### **Try**

```js
const conveyor = require("tacs");
const tacs = new conveyor();
tacs.$lab((element, index, remove) => {
  /*if you use 
    remove
    function like this
    tacs.get({
    name: "C",
  }).remove();  you will need this condition */
  //If you don't use function remove then you don't need this condition
  if (remove) {
    console.log("This Element is Remove:\n", element);
    return tacs.next();
  }
  if (element.name.length >= 1) {
    console.log(element.name, index);
    tacs.next().catch((err) => {
      console.log(err);
      //Conveyor is kill ! you should create new conveyor or Conveyor is sleeping !
      /*use catch if you use kill() or sleep() method in your code */
      //If you don't use kill() or sleep() in your code then you don't need this catch
    });
    //if you want set timeout for this function include next method in setTimeout function
  }
});
tacs
  .add([
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
  ])
  .catch((err) => {
    console.log(err);
    //Conveyor is kill ! you should create new conveyor or Conveyor is sleeping !
    /*use catch if you use kill() or sleep() method in your code */
    //If you don't use kill() or sleep() in your code then you don't need this catch
  });
tacs
  .add([
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
    console.log(err);
    //Conveyor is kill ! you should create new conveyor or Conveyor is sleeping !
    /*use catch if you use kill() or sleep() method in your code */
    //If you don't use kill() or sleep() in your code then you don't need this catch
  });
//if you want remove element from the list use this
tacs
  .get({
    name: "Joe",
    //or you can use this
    /*
    name: "Joe",
    age: 40,
    */
  })
  .remove();
//you can use this to add a delay between each function
setTimeout(() => {
  tacs.add([{ name: "Arth", age: "unknown" }]).catch((err) => {
    console.log(err);
    //Conveyor is kill ! you should create new conveyor or Conveyor is sleeping !
    /*use catch if you use kill() or sleep() method in your code */
    //If you don't use kill() or sleep() in your code then you don't need this catch
  });
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
    <td>this is $lab function that will be emit when you add element or when you call next</td>
    <td><a href=#lab>Go to example</a></td>
  </tr>
   <tr>
    <td>next()</td>
    <td>go to next index</td>
    <td><a href=#next>Go to example</a></td>
  </tr>
     <tr>
    <td>add()</td>
    <td>add element to the conveyor {element} is an array</td>
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
    <td>kill()</td>
    <td>kill the conveyor use this if you use this you can't use next() or any other function</td>
    <td><a href=#kill>Go to example</a></td>
  </tr>
   <tr>
    <td>get()</td>
    <td>get Added Data or option or remove or exist</td>
    <td><a href=#get>Go to example</a></td>
  </tr>
</table>

# **Method**

```js
const conveyor = require("tacs");
const tacs = new conveyor();
```

### **lab**

```js
//this is $lab function that will be emit when you add element or when you call next
tacs.$lab((element, index, remove) => {
  console.log(element, index, remove); //index is the index of the element in the array
  //remove is a boolean if you use this function like this tacs.get(Element).remove(); you will need this condition
  //If you don't use function remove then you don't need this condition
  if (remove) {
    console.log("This Element is Remove:\n", element);
    tacs.next().catch((err) => {
      console.log(err);
      //Conveyor is kill ! you should create new conveyor or Conveyor is sleeping !
      /*use catch if you use kill() or sleep() method in your code */
      //If you don't use kill() or sleep() in your code then you don't need this catch
    });
    //if you want set timeout for this function include next method in setTimeout function
    return;
  }
  tacs.next().catch((err) => {
    console.log(err);
    //Conveyor is kill ! you should create new conveyor or Conveyor is sleeping !
    /*use catch if you use kill() or sleep() method in your code */
    //If you don't use kill() or sleep() in your code then you don't need this catch
  });
  //if you want set timeout for this function include next method in setTimeout function
});
```

### **next**

```js
//go to next index
tacs.next().catch((err) => {
  console.log(err);
  //Conveyor is kill ! you should create new conveyor or Conveyor is sleeping !
  /*use catch if you use kill() or sleep() method in your code */
  //If you don't use kill() or sleep() in your code then you don't need this catch
});
//if you want set timeout for this function include next method in setTimeout function
```

### **add**

```js
//if you want to add element to the conveyor use this
// This is an example of adding element to the conveyor
//Array
tacs.add(["JavaScript", "C", "C++", "C#", "Java", "Python"]).catch((err) => {
  console.log(err);
  //Conveyor is kill ! you should create new conveyor or Conveyor is sleeping !
  /*use catch if you use kill() or sleep() method in your code */
  //If you don't use kill() or sleep() in your code then you don't need this catch
});
//Object
tacs
  .add({
    name: "John",
    age: 30,
    city: "New York",
  })
  .catch((err) => {
    console.log(err);
    //Conveyor is kill ! you should create new conveyor or Conveyor is sleeping !
    /*use catch if you use kill() or sleep() method in your code */
    //If you don't use kill() or sleep() in your code then you don't need this catch
  });
//String or Number or any other type
tacs.add("Arth").catch((err) => {
  console.log(err);
  //Conveyor is kill ! you should create new conveyor or Conveyor is sleeping !
  /*use catch if you use kill() or sleep() method in your code */
  //If you don't use kill() or sleep() in your code then you don't need this catch
});
```

### **sleep**

```js
//sleep the conveyor {timeout} milliseconds later after timeout is over it wil be next automatically
tacs.sleep(1000); //sleep for 1 second
```

### **on**

```js
//The events
tacs.on("add", (element) => {
  console.log(element); //element is an array
});
tacs.on("end", (element) => {
  console.log(element); //Array: all the element in the conveyor
});
```

### **restart**

```js
//if you want to restart the conveyor use this and it will restart from the first index
tacs.add(tacs.get().added).catch((err) => {
  console.log(err);
  //Conveyor is kill ! you should create new conveyor or Conveyor is sleeping !
  /*use catch if you use kill() or sleep() method in your code */
  //If you don't use kill() or sleep() in your code then you don't need this catch
});
```

### **kill**

```js
//kill the conveyor use this if you use this you can't use next() or any other function
tacs.kill();
```

### **get**

> #### **added**

```js
tacs.get().added; //Array: returns an array with the added element
```

> #### **option**

```js
tacs.get().option; //String: returns the last option
```

> #### **remove**

```js
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
