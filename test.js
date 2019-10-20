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

console.log(ducker.searchable('Amazing thing you got there baby','bing'))
// sum(1,2)
// ducker.check([1,2,['wow',true,[{'a' : 2}]]])
// ducker.stackoverflow(new RangeError())


// ducker.test(mult,[2,2],4,true)
// ducker.quack('',true,-1)
// console.log(ducker.random(false,5,6))
// console.log(ducker.fake({
//     name: 'name',
//     email: 'email',
//     username: 'username',
//     email: 'email',
//     address: 'address',
//     phone: 'phone',
//     website: 'website',
//     birthday: 'dob',
//     avatar: 'avatar',
//     age: 'age',
//     type: 'job',
//     word: 'word',
//     sentence: 'sentence',
//     paragraphs: 'paragraphs',
//     bloodT: 'blood',
//     color: 'color',
//     person : {
//          name : 'name',
//          age: 'age',
//     }
// }))