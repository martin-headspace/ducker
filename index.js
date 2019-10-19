                                                                   
                                                                   
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

const StackTrace = require('stacktrace-js')
const utils = require('./utilities/utils')
const QUACK = '🦆 {Quack}'

/**
 * Quacks!
 * @param {string}      group       Counts from a custom group
 * @param {boolean}     debug       Prints the stack or not
 * @param {number}      level       Number of leves of stack to print
 * @param {boolean}     detailed    Prints the complete stack trace 
 */
function quack(group = QUACK, debug = false, level = 2, detailed = false) {
    console.count(group)
    if(debug) {
        printStack(level,detailed)
    }
}

/**
 * Prints the stack into a simple, readable table
 * @param {number}  level    level of depth to print on the stack
 * @param {boolean} detailed prints the source or not
 */
function printStack(level,detailed) {
    var stack = StackTrace.getSync().slice(0,level)
    for(var i = 0; i < stack.length; i++) {
        stack[i] = utils.renameKeys(stack[i],{
            columnNumber: 'column',
            lineNumber: 'line',
        })
        if (!detailed) {
            delete stack[i].source
        }
    }
    console.table(stack)
}

/**
 * Verifies wether value is truthy or not
 * @param {any} value Value tested for being truthy 
 */
function check(value) {
    console.log(QUACK)
    let type = ''
    console.log('This value is of type %s',typeof value)
    console.group()
    switch(typeof value) {
        case 'number' :
            console.log('-> Its value is %f',value)
            break
        case 'object' :
            if(utils.isEmpty(value)) {
                console.log('-> Its value is empty')
            } else {
                if (value[0] == undefined) {
                    categorizer(value)
                } else {
                    console.log('-> Array type. First value structure:')
                    categorizer(value[0])
                }
            }
            break
        case 'boolean' :
            console.log('-> Its value is %s',value == null ? 'null' : value.toString())
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
async function test(testable,args,expectedResult, debug = false, level = 3, detailed = false) {
    console.log(QUACK)
    console.log('Function name: '+testable.name)
    console.group('--Result')
    let result
    switch(testable.constructor.name) {
        case 'Function' :
            result = testable(...args)
            console.log('Function Result: '+result)
            console.log('Expected Result: '+expectedResult)
            console.log(result === expectedResult ? 'Test successful!' : 'Test failed!')
            break
        case 'AsyncFunction' :
            result = await testable(...args)
            console.log('Function Result: '+result)
            console.log('Expected Result: '+expectedResult)
            console.log(result === expectedResult ? 'Test successful!' : 'Test failed!')
            break
        default :
            console.log('dedault')
            break
    }
    if(debug) {
        printStack(level,detailed)
    }
    console.groupEnd('--Result')
}

/**
 * Categorizes JSON elements
 * @param {Object} obj Object element
 */
function categorizer(obj) {
    var cats = []
    for (var key in obj) {
        cats.push({
            Key   : key,
            Type  : obj[key],
            Value : typeof obj[key]
        })
    }
    console.table(cats)
}

module.exports = {
    quack,
    check,
    go,
    stop,
    test
}