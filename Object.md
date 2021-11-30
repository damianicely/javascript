# Objects
## Main Gotchas
***Arrow functions cannot be used as constructors.***
## Basics
### A basic object with one method
```js
let dog = {
  name: "Spot",
  numLegs: 4,
  sayLegs: function() {return "This dog has "+ dog.numLegs + " legs."}
};

dog.sayLegs();
```
Use `this` incase dog name changes

```js
let dog = {
  name: "Spot",
  numLegs: 4,
  sayLegs: function() {return "This dog has " + this.numLegs + " legs.";}
};

dog.sayLegs();
```
### Constructors
Constructors are functions that create new objects. They define properties and behaviors that will belong to the new object. Think of them as a blueprint for the creation of new objects.
    Constructors are defined with a capitalized name to distinguish them from other functions that are not constructors.
    Constructors use the keyword `this` to set properties of the object they will create. Inside the constructor, this refers to the new object it will create.
    Constructors define properties and behaviors instead of returning a value as other functions might.
```js
function Dog() {
  this.name = "Tripod";
  this.color = "Brown";
  this.numLegs = 3;
}
```
### Use a Constructor to Create Objects
NOTE: this inside the constructor always refers to the object being created.
Notice that the `new` operator is used when calling a constructor. This tells JavaScript to create a `new `instance of Bird called `blueBird`. Without the `new` operator, `this` inside the constructor would not point to the newly created object, giving unexpected results. Now `blueBird` has all the properties defined inside the `Bird` constructor
```js
function Bird() {
  this.name = "Albert";
  this.color  = "blue";
  this.numLegs = 2;
}

let blueBird = new Bird();
blueBird.name;
blueBird.color;
blueBird.numLegs;
```
Just like any other object, its properties can be accessed and modified:
```js
blueBird.name = 'Elvira';
blueBird.name;
```

### Verify an Object's Constructor with instanceof
Anytime a constructor function creates a new object, that object is said to be an instance of its constructor. JavaScript gives a convenient way to verify this with the `instanceof` operator. `instanceof` allows you to compare an object to a constructor, returning `true` or `false` based on whether or not that object was created with the constructor. Here's an example:
```js
let Bird = function(name, color) {
  this.name = name;
  this.color = color;
  this.numLegs = 2;
}

let crow = new Bird("Alexis", "black");
// This instanceof method would return true.
crow instanceof Bird;
```
If an object is created without using a constructor, instanceof will verify that it is not an instance of that constructor:
```js
let canary = {
  name: "Mildred",
  color: "Yellow",
  numLegs: 2
};

canary instanceof Bird;
// This instanceof method would return false.
```

### Understand Own Properties


In the following example, the `Bird` constructor defines two properties: `name` and `numLegs`:

```js
function Bird(name) {
  this.name  = name;
  this.numLegs = 2;
}

let duck = new Bird("Donald");
let canary = new Bird("Tweety");
```
`name` and `numLegs` are called ***own properties***, because they are defined directly on the instance object. That means that duck and canary each has its own separate copy of these properties. In fact every instance of `Bird` will have its own copy of these properties. The following code adds all of the own properties of `duck` to the array `ownProps`:
```js
let ownProps = [];

for (let property in duck) {
  if(duck.hasOwnProperty(property)) {
    ownProps.push(property);
  }
}

console.log(ownProps);
```
The console would display the value `["name", "numLegs"]`.

### Use Prototype Properties to Reduce Duplicate Code

Since `numLegs` will probably have the same value for all instances of `Bird`, you essentially have a duplicated variable `numLegs` inside each `Bird` instance.

This may not be an issue when there are only two instances, but imagine if there are millions of instances. That would be a lot of duplicated variables.

A better way is to use the `prototype` of `Bird`. Properties in the `prototype` are shared among ALL instances of `Bird`. Here's how to add `numLegs` to the `Bird` prototype:

```js
Bird.prototype.numLegs = 2;
```

Now all instances of `Bird` have the `numLegs` property.
```js
console.log(duck.numLegs);
console.log(canary.numLegs);
```
Since all instances automatically have the properties on the `prototype`, think of a `prototype` as a "recipe" for creating objects. Note that the `prototype` for duck and canary is part of the `Bird` constructor as Bird.`prototype`. Nearly every object in JavaScript has a `prototype` property which is part of the constructor function that created it.

### Iterate Over All Properties


You have now seen two kinds of properties: ***own properties*** and ***prototype properties***. Own properties are defined directly on the object instance itself. And prototype properties are defined on the `prototype`.
```js
function Bird(name) {
  this.name = name;  //own property
}

Bird.prototype.numLegs = 2; // prototype property

let duck = new Bird("Donald");
```
Here is how you add duck's own properties to the array `ownProps` and prototype properties to the array `prototypeProps`:
```js
let ownProps = [];
let prototypeProps = [];

for (let property in duck) {
  if(duck.hasOwnProperty(property)) {
    ownProps.push(property);
  } else {
    prototypeProps.push(property);
  }
}

console.log(ownProps);
console.log(prototypeProps);
```
`console.log(ownProps)` would display `["name"]` in the console, and `console.log(prototypeProps)` would display `["numLegs"]`.

## Understand the Constructor Property

There is a special `constructor` property located on the object instances `duck` and `beagle` that were created in the previous challenges:
```js
let duck = new Bird();
let beagle = new Dog();

console.log(duck.constructor === Bird); //true
console.log(beagle.constructor === Dog); //true
```
Note that the `constructor` property is a reference to the constructor function that created the instance. The advantage of the `constructor` property is that it's possible to check for this property to find out what kind of object it is. Here's an example of how this could be used:
```js
function joinBirdFraternity(candidate) {
  if(candidate.constructor === Bird)
    return true;
  else 
    return false;
  
}
```
Note: Since the `constructor` property can be overwritten (which will be covered in the next two challenges) it’s generally better to use the `instanceof` method to check the type of an object.

## Change the Prototype to a New ObjectPassed

Up until now you have been adding properties to the `prototype` individually:
```js
Bird.prototype.numLegs = 2;
```
This becomes tedious after more than a few properties.
```js
Bird.prototype.eat = function() {
  console.log("nom nom nom");
}

Bird.prototype.describe = function() {
  console.log("My name is " + this.name);
}
```
A more efficient way is to set the `prototype` to a new object that already contains the properties. This way, the properties are added all at once:
```js
Bird.prototype = {
  constructor: Bird, // see next section for why we need this
  numLegs: 2, 
  eat: function() {
    console.log("nom nom nom");
  },
  describe: function() {
    console.log("My name is " + this.name);
  }
};
```
### Remember to Set the Constructor Property when Changing the PrototypePassed

There is one crucial side effect of manually setting the prototype to a new object. It erases the `constructor` property! This property can be used to check which constructor function created the instance, but since the property has been overwritten, it now gives false results:
```js
duck.constructor === Bird; // false
duck.constructor === Object; // true
duck instanceof Bird; // true
```
To fix this, whenever a prototype is manually set to a new object, remember to define the `constructor` property:
```js
Bird.prototype = {
  constructor: Bird,
  numLegs: 2,
  eat: function() {
    console.log("nom nom nom");
  },
  describe: function() {
    console.log("My name is " + this.name); 
  }
};
```

### Understand Where an Object’s Prototype Comes From

Just like people inherit genes from their parents, an object inherits its prototype directly from the constructor function that created it. For example, here the Bird constructor creates the duck object:
```js
function Bird(name) {
  this.name = name;
}

let duck = new Bird("Donald");
```
`duck` inherits its `prototype` from the `Bird` constructor function. You can show this relationship with the `isPrototypeOf` method:
```js
Bird.prototype.isPrototypeOf(duck); // true
```

## Understand the Prototype Chain

All objects in JavaScript (with a few exceptions) have a `prototype`. Also, an object’s `prototype` itself is an object.
```js
function Bird(name) {
  this.name = name;
}

typeof Bird.prototype; // object
```
Because a `prototype` is an object, a `prototype` can have its own `prototype`! In this case, the `prototype` of `Bird.prototype` is `Object.prototype`:
```js
Object.prototype.isPrototypeOf(Bird.prototype);
```
How is this useful? You may recall the `hasOwnProperty` method from a previous challenge:
```js
let duck = new Bird("Donald");
duck.hasOwnProperty("name");
```
The `hasOwnProperty` method is defined in `Object.prototype`, which can be accessed by `Bird.prototype`, which can then be accessed by `duck`. This is an example of the `prototype` chain. In this `prototype` chain, `Bird` is the supertype for duck, while duck is the subtype. Object is a supertype for both `Bird` and `duck`. `Object` is a `supertype` for all objects in JavaScript. Therefore, any `object` can use the `hasOwnProperty` method.


## Use Inheritance So You Don't Repeat Yourself

There's a principle in programming called Don't Repeat Yourself (DRY). The reason repeated code is a problem is because any change requires fixing code in multiple places. This usually means more work for programmers and more room for errors.

Notice in the example below that the `describe` method is shared by `Bird` and `Dog`:
```js
Bird.prototype = {
  constructor: Bird,
  describe: function() {
    console.log("My name is " + this.name);
  }
};

Dog.prototype = {
  constructor: Dog,
  describe: function() {
    console.log("My name is " + this.name);
  }
};
```
The `describe` method is repeated in two places. The code can be edited to follow the **DRY** principle by creating a `supertype` (or parent) called `Animal`:
```js
function Animal() { };

Animal.prototype = {
  constructor: Animal, 
  describe: function() {
    console.log("My name is " + this.name);
  }
};
```
Since `Animal` includes the `describe` method, you can remove it from `Bird` and `Dog`:
```js
Bird.prototype = {
  constructor: Bird
};

Dog.prototype = {
  constructor: Dog
};
```
