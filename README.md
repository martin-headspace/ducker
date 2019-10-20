<h1 align="center">Welcome to Ducker Debug 🦆</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/a01334390/ducker#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/a01334390/ducker/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/a01334390/ducker/blob/master/LICENSE" target="_blank">
    <img alt="License: Apache-2.0" src="https://img.shields.io/github/license/a01334390/ducker" />
  </a>
</p>

<p> Simple CLI tool to debug a Node.js based Aplication.  </p>

### 🏠 [Homepage](https://github.com/a01334390/ducker#readme)

## Installation

```sh
npm i duckerdbg --save
```

## Usage
Ducker Debug can perform multiple debugging and utility functions. To use it in your application you just need to require it.
```js
  const ducker = require('./index')
```

### quack()
Base function of this package, it logs a message to the console by either using a custom <b>word</b> or by leaving it empty, by printing the name of the <b> calling function</b>.

#### Arguments
<ul>
  <li> word - <b>String</b> - String to print into the console. Leave empty to show the calling method's name</li>
  <li> debug - <b>Boolean</b> - Flag to indicate if the user requires a stack trace to be printed or not</li>
  <li> level - <b>Number</b> - Level of stack trace to be printed into the console</li>
  <li> detailed - <b>Boolean</b> - Flag to indicate if the full information of each step in the stack trace is required to be printed into the console </li>
</ul>

#### Use
```js
  ducker.quack()
  // 🦆 {Quack} > 

  ducker.quack('wow',true,3)
//   🦆 {Quack} > wow
// ┌─────────┬────────────────────────────────────────┬──────────────────────┬────────┬──────┐
// │ (index) │                fileName                │     functionName     │ column │ line │
// ├─────────┼────────────────────────────────────────┼──────────────────────┼────────┼──────┤
// │    0    │ '/Users/xxxx/Projects/ducker/index.js' │     'printStack'     │   32   │  54  │
// │    1    │ '/Users/xxxx/Projects/ducker/index.js' │    'Object.quack'    │   9    │  43  │
// │    2    │ '/Users/xxxx/Projects/ducker/test.js'  │ 'Object.<anonymous>' │   8    │  25  │
// └─────────┴────────────────────────────────────────┴──────────────────────┴────────┴──────┘
```

### check()
This method gives a detailed look at any object that is passed to it. 

#### Arguments
<ul>
  <li> value - <b>Any</b> - Any value or combination of values to be analyzed</li>
</ul>

#### Use
```js
  ducker.check(4)
  /**
   * This value is of type number
      -> Its value is 4
   */

   ducker.check([1,2,['wow',true,[{'a' : 2}]]])
   /*
   This value is of type object
  -> Array type 
  Arr[0]
    This value is of type number
      -> Its value is 1
  Arr[1]
    This value is of type number
      -> Its value is 2
  Arr[2]
    This value is of type object
      -> Array type 
      Arr[0]
        This value is of type string
          -> Its value is wow
      Arr[1]
        This value is of type boolean
          -> Its value is true
      Arr[2]
        This value is of type object
          -> Array type 
          Arr[0]
            This value is of type object
              ┌─────────┬─────┬───────┬──────────┐
              │ (index) │ Key │ Value │   Type   │
              ├─────────┼─────┼───────┼──────────┤
              │    0    │ 'a' │   2   │ 'number' │
              └─────────┴─────┴───────┴──────────┘
  */
   
```

### go() and stop()
These methods are used to profile an application. All is needed from them is to be placed at any point between two blocks of code.

#### Use
```js
  ducker.go()
  ducker.check([1,2,['wow',true,[{'a' : 2}]]])
  ducker.stop()
  /*
  ...
  🦆 {Quack}: 6.111ms
  */
```

### test()
This method allows you to make simple tests on sync or async code using an equality assertion. (Expected value is equal to Actual value)

#### Arguments
<ul>
  <li> testable - <b>Function</b> - Reference to the function to be tested. Must return any time of value</li>
  <li> args - <b>[Any]</b> - Array of values to be passed to the testable function. These can be of any type.</li>
  <li> expectedResult - <b>Any</b> - Value to be tested against the result of the previous function</li>
  <li> debug - <b>Boolean</b> - Flag to indicate if the user requires a stack trace to be printed or not</li>
  <li> level - <b>Number</b> - Level of stack trace to be printed into the console</li>
  <li> detailed - <b>Boolean</b> - Flag to indicate if the full information of each step in the stack trace is required to be printed into the console </li>
</ul>

#### Usage
```js
  function sum (a,b) {
    return a + b
  }

  ducker.test(sum,[2,2],4)
  /*
  🦆 {Quack}
  Function name: sum
    --Result
    Function Result: 4
    Expected Result: 4
    Test successful!
  */

 ducker.test(sum,[2,2],2)
 /*
  🦆 {Quack}
  Function name: sum
    --Result
    Function Result: 4
    Expected Result: 2
    Test failed!
 */
```

### rename()
This method allows you to rename an object's keynames. You only need to pass down the method and an object specifying the new name of the keys.

#### Arguments
<ul>
  <li> object - <b>Object</b> - This is the original object to be modified</li>
  <li> changes - <b>Object</b> - This is a map with the required changes to the keys in the original object</li>
</ul>

#### Returns
A new object with the same values for the changed keynames.

#### Usage
```js
  const user = { 'name' : 'Johny', 'age': 23}
  const changes = {'name': 'firstName'}
  ducker.rename(user,changes)
  // {'firstName' : 'Johny', 'age' : 23}
```

### xray()
This method allows you to analyze an object. Fit for the console.table() function to be better analyzed.

#### Arguments
<ul>
  <li> object - <b>Object</b> - The object to be analyzed by xray</li>
</ul>

### Usage
```js
  console.log(ducker.xray({ 'name' : 'Johny', 'age': 23}))
  /*
  [ { Key: 'name', Value: 'Johny', Type: 'string' },
  { Key: 'age', Value: 23, Type: 'number' } ]
  */

 console.table(ducker.xray({ 'name' : 'Johny', 'age': 23}))
/*
┌─────────┬────────┬─────────┬──────────┐
│ (index) │  Key   │  Value  │   Type   │
├─────────┼────────┼─────────┼──────────┤
│    0    │ 'name' │ 'Johny' │ 'string' │
│    1    │ 'age'  │   23    │ 'number' │
└─────────┴────────┴─────────┴──────────┘
*/
```

### random()
This method returns a random number.

#### Arguments
<ul>
  <li> floating - <b>Boolean</b> - Flag to determine if the number to be returned should be a floating number or an integer</li>
  <li> min - <b>Number</b> - Minimum limit to generate a number </li>
  <li> max - <b>Number</b> - Maximum limit to generate a number </li>
</ul>

#### Usage
```js
  ducker.random()
  // 8874205820570765

  ducker.random(true,4,10)
  // 5.868581947768592
```

#### fake()
This method creates an object with fake data based on an user provided schema. 

#### Arguments
This method only retrieves a schema as an object and can recognize multiple data types such as:
<ul>
  <li>name</li>
  <li>avatar</li>
  <li>email</li>
  <li>date of birth (dob)</li>
  <li>phone</li>
  <li>address (street,suite,city,zipcode,geo)</li>
  <li>website</li>
  <li>company (name,catchPhrase,bs)</li>
  <li>age</li>
  <li>number</li>
  <li>job</li>
  <li>blood</li>
  <li>color</li>
  <li>ip</li>
  <li>password</li>
  <li>title</li>
  <li>word</li>
  <li>sentence</li>
  <li>paragraphs</li>
  <age>
</ul>

#### Usage

```js
  ducker.fake({
    name: 'name',
    email: 'email',
    username: 'username',
    email: 'email',
    sentence: 'sentence',
    paragraphs: 'paragraphs',
    bloodT: 'blood',
    color: 'color',
    person : {
         name : 'name',
         age: 'age',
    }
})
/*
{ name: 'Beryl',
  email: 'Beryl61_Upton@gmail.com',
  username: 'Beryl61',
  sentence: 'Aut voluptatum sit qui minus nam.',
  paragraphs:
   'Dolores aut dolorum consequatur. Sunt praesentium quam voluptatibus harum voluptas. Aut debitis cupiditate a explicabo quae earum.\n \rSit aperiam assumenda veniam sit tenetur et ad odio odit. Quia at commodi odio voluptatum. Voluptatem est ratione. Nam repellendus dicta magni ipsam quasi ut nesciunt. Tempora consectetur cum ipsum consequatur inventore. Voluptas consequatur nulla dolorum est tempore excepturi.\n \rDolore et aut eos ut nisi aliquid qui aut. Voluptatem optio possimus sed deleniti consequatur qui odit. Corporis qui qui inventore saepe id doloremque. Repellat consectetur accusantium magnam repellendus praesentium. Assumenda dignissimos consequatur nemo exercitationem minima. Illo maxime enim placeat voluptas maxime ad voluptatibus doloremque hic.',
  bloodT: { type: 'O', rh: '-' },
  color: 'lime',
  person: { name: 'Dale', age: 48 } }
  */
```

#### stackoverflow()
This method takes an error message and creates an usable link to search for it on Stack Overflow.

#### Arguments
<ul>
  <li> error - <b>Error</b> - Non empty message retrieved from a try-catch block</li>
</ul>

#### Usage
```js
  try {
      JSON.parse({"foo": 1,})
  } catch(e){
      console.log(e)
      ducker.stackoverflow(e)
  }
  /*
  🦆 {Quack}
  Check on SO for Error > Unexpected token o in JSON at position 1
  http://stackoverflow.com/search?q=[js]+unexpected+token+o+in+json+at+position+1
  */
```

### searchable()
This method takes a simple sentence and converts it into an usable string to search on a web browser.

#### Arguments
<ul>
  <li> query - <b>String</b> - Non empty message</li>
  <li> website - <b>String</b> - google, duckduckgo, youtube, stackoverflow, bing, yahoo</li>
</ul>

#### Usage
```js
  ducker.searchable('Another one biTEs tHe duST','youtube')
  // https://www.youtube.com/results?search_query=another+one+bites+the+dust
```

## Author

👤 **Fernando Martin Garcia Del Angel**

* Github: [@a01334390](https://github.com/a01334390)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/a01334390/ducker/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Fernando Martin Garcia Del Angel](https://github.com/a01334390).<br />
This project is [Apache-2.0](https://github.com/a01334390/ducker/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_