

//     ,---,                                  ,-.                     
//     .'  .' `\                            ,--/ /|                     
//   ,---.'     \          ,--,           ,--. :/ |             __  ,-. 
//   |   |  .`\  |       ,'_ /|           :  : ' /            ,' ,'/ /| 
//   :   : |  '  |  .--. |  | :    ,---.  |  '  /      ,---.  '  | |' | 
//   |   ' '  ;  :,'_ /| :  . |   /     \ '  |  :     /     \ |  |   ,' 
//   '   | ;  .  ||  ' | |  . .  /    / ' |  |   \   /    /  |'  :  /   
//   |   | :  |  '|  | ' |  | | .    ' /  '  : |. \ .    ' / ||  | '    
//   '   : | /  ; :  | : ;  ; | '   ; :__ |  | ' \ \'   ;   /|;  : |    
//   |   | '` ,/  '  :  `--'   \'   | '.'|'  : |--' '   |  / ||  , ;    
//   ;   :  .'    :  ,      .-./|   :    :;  |,'    |   :    | ---'     
//   |   ,.'       `--`----'     \   \  / '--'       \   \  /           
//   '---'                        `----'              `----'            
// Built by: Fernando Martin Garcia Del Angel
// Built because I was bored

/**
 * Libraries to use
 */
const StackTrace = require('stacktrace-js')
const clone = require('clone')
const faker = require('faker')
const ErrorParser = require('error-stack-parser')
const chalk = require('chalk')

/**
 * Quack
 */
const QUACK = '🦆 {Quack}'

/**
 * Quacks!
 * @param {string}      word        Word or Group to be Quacked
 * @param {boolean}     debug       Prints the stack or not
 * @param {number}      level       Number of leves of stack to print
 * @param {boolean}     detailed    Prints the complete stack trace 
 */
function quack(word = '', debug = false, level = 2, detailed = false) {
    console.log(QUACK+' > '+chalk.yellow(!word ? quack.caller.name : word))
    if (debug) {
        printStack(level, detailed)
    }
}

/**
 * Prints the stack into a simple, readable table
 * @param {number}  level    level of depth to print on the stack
 * @param {boolean} detailed prints the source or not
 */
function printStack(level, detailed) {
    if (level) {
        var stack = StackTrace.getSync().slice(0, level)
        for (var i = 0; i < stack.length; i++) {
            stack[i] = rename(stack[i], {
                columnNumber: 'column',
                lineNumber: 'line',
            })
            if (!detailed) {
                delete stack[i].source
            }
        }
        console.table(stack)
    }
}

/**
 * Verifies wether value is truthy or not
 * @param {any} value Value tested for being truthy 
 */
function check(value) {
    let type = ''
    console.log('This value is of type '+chalk.blue(typeof value))
    console.group()
    switch (typeof value) {
        case 'number': case 'string' :
            console.log('-> Its value is '+chalk.green(value))
            break
        case 'object':
            if (isEmpty(value)) {
                console.log('-> Its value is '+chalk.red('empty'))
            } else {
                if (value[0] == undefined) {
                    console.table(xray(value))
                } else {
                    console.log('->'+chalk.yellow(' Array type '))                    
                    for(val in value){
                        console.group(chalk.magenta('Arr['+val+']'))
                        check(value[val])
                        console.groupEnd(chalk.magenta('Arr['+val+']'))
                    }
                }
            }
            break
        case 'boolean':
            console.log('-> Its value is '+ chalk.blue(value == null ? 'null' : value.toString()))
            break

    }
    console.groupEnd()
}

/**
 * Starts a timer between two segments of code
 * @param {string} group custom grouping variable
 */
function go(group = QUACK) {
    console.time(group)
}

/**
 * Stops a previously started timer
 * @param {string} group custom grouping variable
 */
function stop(group = QUACK) {
    console.timeEnd(group)
}

/**
 * Tests a certain function (Async or not) and checks if the desired result is gotten
 * @param {function} testable Function to be tested
 * @param {array} args Arguments to pass to the function as an Array (ex. [1,2])
 * @param {any} expectedResult Expected result 
 * @param {boolean} debug Flag to determine if the stack should be printed
 * @param {number} level Level of detail of the stack
 * @param {flag} detailed Flag to determine if all data from the stack should be printed
 */
async function test(testable, args, expectedResult, debug = false, level = 3, detailed = false) {
    console.log(QUACK)
    console.log('Function name: ' + chalk.cyan(testable.name))
    console.group('--Result')
    let result
    switch (testable.constructor.name) {
        case 'Function':
            result = testable(...args)
            console.log('Function Result: ' + chalk.yellow(result))
            console.log('Expected Result: ' + chalk.yellow(expectedResult))
            console.log(result === expectedResult ? chalk.green('Test successful!') : chalk.red('Test failed!'))
            break
        case 'AsyncFunction':
            result = await testable(...args)
            console.log('Function Result: ' + chalk.yellow(result))
            console.log('Expected Result: ' + chalk.yellow(expectedResult))
            console.log(result === expectedResult ? chalk.green('Test successful!') : chalk.red('Test failed!'))
            break
        default:
            console.log('dedault')
            break
    }
    if (debug) {
        printStack(level, detailed)
    }
    console.groupEnd('--Result')
}

/**
 * Renames the keys of a given object
 * @param {Object} object Object whose keys will be changed (ex. {'a': 2})
 * @param {Object} changes Object that maps the required changes (ex. {a: 'b'}) => {'b':2
 * @returns {Object} Modified object with the new keys
 */
function rename(object, changes) {
    if (!changes || typeof changes !== 'object') {
        return object
    }

    if (Array.isArray(object)) {
        const newArray = []
        for (var i = 0; i < object.length; i++) {
            newArray.push(rename(object[i], changes))
        }
        return newArray
    } else {
        if (typeof object !== 'object') {
            return object
        }
        var copy = clone(object)

        for (var key in changes) {
            if (typeof changes[key] === 'object') {
                if (copy.hasOwnProperty(key)) {
                    copy[key] = rename(copy[key], changes[key])
                    continue
                }
            }

            if (copy.hasOwnProperty(key)) {
                var temp = copy[key]
                copy[changes[key]] = temp
                delete copy[key]
            }
        }
        return copy
    }
}

/**
 * Checks if an Object is Empty
 * @param {Object} obj Object to check for emptyness
 * @returns Flag to indicate if it's empty or not 
 */
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

/**
 * Categorizes JSON Elements into types and values
 * @param {Object} obj Object to check
 * @returns {Array} Array to be printed or checked
 */
function xray(obj) {
    var cats = []
    for (var key in obj) {
        cats.push({
            Key: key,
            Value: obj[key],
            Type: typeof obj[key]
        })
    }
    return cats
}

/**
 * Generates a random number
 * @param {boolean} floating Flag to represent if desired value should be floating
 * @param {number} min Minimum value to generate
 * @param {number} max Maximum value to generate
 * @returns Random number
 */
function random(floating = false, min = 0, max = Number.MAX_SAFE_INTEGER) {
    let number = (Math.random() * (max - min)) + min
    return !floating ? Math.floor(number) : number
}

/**
 * Generates an Object to use on tests based on a given schema
 * @param {Object} schema Schema and Data Type to use on the fake object (ex. {'name':name, 'age':number, 'engaged':boolean})
 * @param {Number} amount Amount of fake Objects to create
 * @returns Object with the required fake data
 */
function fake(schema) {
    let fak = {}
    let card = faker.helpers.contextualCard()
    for (var key in schema) {
        if (typeof schema[key] == 'object') {
            fak[key] = fake(schema[key])
        } else {
            switch (schema[key]) {
                case 'age': case 'number' :
                    fak[key] = random(false, 18, 100)
                    break
                case 'job':
                    fak[key] = faker.name.jobTitle()
                    break
                case 'blood':
                    var bloodT = ['A', 'B', 'AB', 'O']
                    var RH = ['+', '-']
                    fak[key] = { 'type': bloodT[random(false, 0, bloodT.length)], 'rh': RH[random(false, 0, RH.length)] }
                    break
                case 'color':
                    fak[key] = faker.commerce.color()
                    break
                case 'ip' :
                    fak[key] = faker.internet.ip()
                    break
                case 'password': 
                    fak[key] = faker.internet.password()
                    break
                case 'title' :
                    fak[key] = faker.name.title
                    break
                case 'word' :
                    fak[key] = faker.lorem.word()
                    break
                case 'sentence' :
                    fak[key] = faker.lorem.sentence()
                    break
                case 'paragraphs' :
                    fak[key] = faker.lorem.paragraphs(3)
                    break
                default :
                    fak[key] = card[schema[key]]
                    break
            }
        }
    }
    return fak
}

/**
 * Creates a link to stackoverflow based on an error
 * @param {Error} error Error to convert 
 */
function stackoverflow(error){
    console.log(QUACK)
    if(error.message) {
        var xcb = searchable(error.message)
        console.log(chalk.yellow('Check on SO for Error > '+error.message))
        console.log(chalk.blue(xcb))
    } else {
        console.log(chalk.red('Error message not present'))
    }
}

/**
 * Modifies a string to be searchable on search motors
 * @param {String} query Natural language sentence to be converted 
 * @param {String} website Website to search
 * @returns {String} Link to the desired website
 */
function searchable(query,website='stackoverflow') {
    const websites = {
        stackoverflow : "http://stackoverflow.com/search?q=[js]+",
        google: "http://www.google.com/search?q=",
        youtube: 'https://www.youtube.com/results?search_query=',
        duckduckgo: 'https://duckduckgo.com/?q=',
        bing : 'https://www.bing.com/search?q=',
        yahoo: 'https://mx.search.yahoo.com/search?p='
    }
    if(query) {
        return websites[website]+query.split(" ").map(word => word.toLowerCase()).join('+')
    } else {
        return query
    }
}


module.exports = {
    quack,
    check,
    go,
    stop,
    test,
    rename,
    xray,
    random,
    fake,
    stackoverflow,
    searchable
}