const ducker = require('./index')

function sum (a,b) {
    return a + b
}

async function mult (a,b) {
    return await a * b
}

ducker.go()
    ducker.quack([{ 'a': 1 }, { 'a': 2 }])
    ducker.quack('wow', true)
    ducker.check(2)
    ducker.check({ 'a': 2, 'b': 4 })
    ducker.check([{ 'a': 2, 'b': 4 }, { 'a': 2, 'b': 4 }])
    ducker.check([])
    ducker.check(false)
    ducker.check(null)
    ducker.quack()
    ducker.quack()
    ducker.quack()
    ducker.quack()
    ducker.test(sum,[1,2],3)
    ducker.test(mult,[2,5],3,true)
ducker.stop()

