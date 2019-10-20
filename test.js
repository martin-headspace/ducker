const ducker = require('./index')

function sum (a,b) {
    return a + b
}

async function mult (a,b) {
    return await a / 0
}

// try {
//     JSON.parse({"foo": 1,})
// } catch(e){
//     console.log(e)
//     ducker.stackoverflow(e)
// }

console.log(ducker.searchable('Another one biTEs tHe duST','youtube'))
// sum(1,2)
// ducker.check([1,2,['wow',true,[{'a' : 2}]]])
// ducker.stackoverflow(new RangeError())

// ducker.go()
// ducker.check([1,2,['wow',true,[{'a' : 2}]]])
// ducker.stop()

// console.table(ducker.xray({ 'name' : 'Johny', 'age': 23}))
// console.log(ducker.random(true,4,10))
// ducker.fake({name: 'name'})
// ducker.check(4)
// ducker.test(sum,[2,2],2)
// ducker.quack('wow',true,3)
// console.log(ducker.random(false,5,6))
// console.log(ducker.fake({
//     name: 'name',
//     email: 'email',
//     username: 'username',
//     email: 'email',
//     sentence: 'sentence',
//     paragraphs: 'paragraphs',
//     bloodT: 'blood',
//     color: 'color',
//     person : {
//          name : 'name',
//          age: 'age',
//     }
// }))