const ducker = require('./index')

function sum (a,b) {
    ducker.quack()
    return a + b
}

async function mult (a,b) {
    ducker.quack('',true)
    return await a * b
}

mult(5,4)
sum(1,2)
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