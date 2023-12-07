import fs from 'fs'

const content = fs.readFileSync('./inputs/d1p1', 'utf8').split('\n').filter(x => x)
const numbers = content.map(line => {
  const res = line.replace(/[a-z]/g, '').split('')
  const [a, b] = [res[0], res[res.length - 1]]
  return a + b
}).reduce((acc, i) => acc + parseInt(i), 0)
console.log(numbers)
