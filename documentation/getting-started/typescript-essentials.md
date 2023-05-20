---
title: Typescript Essentials
sidebarDepth: 2
---

The following guide tries to highlight some of the key differences between C#, Javascript and Typescript. This is most useful for developers new to the web ecosystem.

Here are also some useful resources for learning how to write Typescript:  

- [Typescript Tutorial](https://www.typescripttutorial.net/)
- [Learn Typescript](https://www.tutorialsteacher.com/typescript)
- [Typescript Documentation](https://www.typescriptlang.org/docs/)

### Key differences between C#, Javascript or Typescript


**CSharp** or **C#** is a statically typed & compiled language. It means that **before** your code can run (or be executed) it has to be compiled - translated - into IL or CIL, an intermediate language that is a little closer to *machine code*. The important bit to understand here is that your code is analyzed and has to pass certain checks and rules that are **enforced** by the compiler. You will get compiler errors **in Unity** and your application not even start running if you write code that violates any of the rules of the C# language. You will not be able to enter Play-Mode with compiler errors.

**Javascript** on the other hand is interpreted at runtime. That means you can write code that is not valid and cause errors - but you will not see those errors *until your program runs* or tries to **execute** exactly that line that has the error. For example you can write `var points = 100; points += "hello world";` and nobody will complain *until* you run the code in a browser.

**Typescript** is a language designed by Microsoft that **compiles to javascript**  
It adds a lot of features like for example **type-safety**. That means when you write code in Typescript you *can* declare types and hence get errors at *compile-time* when you try to e.g. make invalid assignments or call methods with unexpected types. Read more about types in Javascript and Typescript below. 

### Types — or the lack thereof

**Vanilla Javascript** does (as of today) **not** have any concept of *types*: there is no guarantuee that a variable that you declared as `let points = 100` will still be a *number* later in your application. That means that in Javascript it is perfectly valid code to assign `points = new Vector3(100, 0, 0);` later in your code. Or even `points = null` or `points = myRandomObject` - you get the idea. This is all OK while you write the code **but** it may crash horrible when your code is executed because later you write `points -= 1` and **now** you get errors in the browser when your application is already running.

As mentioned above **Typescript** was created to help fix that problem by adding syntax for defining types.   

It is important to understand that you *basically* still write Javascript when you write Typescript and while it *is* possible to circumvent all type checking and safety checks by e.g. adding ``//@ts-ignore`` above a erroneous line or defining all types as ``any`` this is **definitely not recommneded**. Types are here to help you find errors before they actually happen. You really dont want to deploy your website to your server only to later get reports from users or visitors telling you your app crashed while it was running. 

While *vanilla Javascript* does not offer types you can still add type-annotations to your javascript variables, classes and methods by using **[JSDoc](https://jsdoc.app/)**.

### Variables

In C# you write variables either by using the type or the `var` keyword.   
For example you can either write `int points = 100;`  
or alternatively use `var` and let the compiler figure out the correct type for you: `var points = 100`

In Javascript or Typescript you have two modern options to declaring a variable.  
For a variable that you plan to re-assign use `let`, for example `let points = 100;`  
For a variable that you do not want to be able to re-assign use `const`, for example `const points = 100;`  
> *Be aware of var*   
  You might come across the `var` keyword in javascript as well but it is not recommended to use it and the modern replacement for it is `let`. Learn more about [var vs let](https://stackoverflow.com/a/11444416).

Please note that you *can* still assign values to variables declared with const if they are (for example) a custom type. Consider the following example:  

```ts
const myPosition : Vector3 = new Vector3(0, 0, 0);
myPosition.x = 100; // Assigning x is perfectly fine
```
The above is perfectly fine Typescript code because you don't re-assign `myPosition` but only the `x` member of `myPosition`. On the other hand the following example would **not**  be allowed and cause a runtime or typescript error:  
```ts
const myPosition : Vector3 = new Vector3(0, 0, 0);
myPosition = new Vector3(100, 0, 0); // ⚠ ASSIGNING TO CONST IS NOT ALLOWED
```

### Using or Importing Types

In Unity you usually add `using` statements at the top of you code to import specific namespaces from Assemblies that are references in your project or - in certain cases - you migth find yourself importing a specific type with a name from a namespace.   
See the following example:
```csharp
using UnityEngine;
// importing just a specific type and giving it a name
using MonoBehaviour = UnityEngine.MonoBehaviour;
```

This is how you do the same in Typescript to import specific types from a package:
```ts
import { Vector3 } from `three`
import { Behaviour } from `@needle-tools/engine`
```

You *can* also import all the types from a specific package by giving it a name which you might see here and there:
```ts
import * as THREE from `three`
const myVector : THREE.Vector3 = new THREE.Vector3(1, 2, 3);
```

### Primitive Types
*Vector2, Vector3, Vector4...*  
If you have a C# background you might be familiar with the difference between a class and a struct. While a class is a reference type a struct is a custom value type. Meaning it is, depending on the context, allocated on the stack and when being passed to a method by default a copy is created.   
Consider the following example in C#:

```csharp
void MyCallerMethod(){
    var position = new Vector3(0,0,0);
    MyExampleVectorMethod(position);
    UnityEngine.Debug.Log("Position.x is " + position.x); // Here x will be 0
}
void MyExampleVectorMethod(Vector3 position){
    position.x = 42;
}
```

A method is called with a Vector3 named position. Inside the method the passed in vector `position` is modified: x is set to 42. But in C# the original vector that is being passed into this method (see line 2) is **not** changed and x will **still** be 0 (line 4).  

The same is not true for Javascript/Typescript. Here we don't have custom value types, meaning if you come across a Vector in Needle Engine or three.js you will always have a reference type.   
Consider the following example in typescript:  
```ts
import { Vector3 } from "three"
function myCallerMethod() : void {
    const position = new Vector(0,0,0);
    myExampleVectorMethod(position);
    console.log("Position.x is " + position.x); // Here x will be 42
}
function myExampleVectorMethod(position: Vector3) : void {
    position.x = 42;
}
```
Do you see the difference? Because vectors and all custom objects *are* in fact reference types we will have modified the original `position` variable (line 3) and x is now 42.  


### Vector Maths and Operators

While in C# you can use operator overloading this is not available in Javascript unfortunately. This means that while you can multiply a Vector3 in C# like this: 

```csharp
var myFirstVector = new Vector3(1,1,1);
var myFactor = 100f;
myFirstVector *= myFactor;
// → myFirstVector is now 100, 100, 100
```

you have to use a method on the `Vector3.prototype` to archieve the same result (just with a  little more boilerplate code)

```ts
const myFirstVector : Vector3 = new Vector3(1, 1, 1)
const myFactor = 100f;
myFirstVector.multiplyScalar(myFactor);
// → myFirstVector is now 100, 100, 100
```

