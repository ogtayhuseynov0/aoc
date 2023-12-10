import fs from 'fs'

const nums = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9
}

const content = fs.readFileSync('./inputs/d1p2', 'utf8').split('\n').filter(x => x)
const numbers = content.map((line, idx) => {
  const nms = []
  for (let i = 0; i < line.length; i++) {
    if (!isNaN(+line[i])) {
      nms.push(+line[i])
    }
    Object.keys(nums).forEach(key => {
      const va = line.substr(i, key.length)
      if (va == key) {
        nms.push(nums[key])
      }
    })

  }

  const [a, b] = [nms[0], nms[nms.length - 1]]
  return a.toString() + b.toString()
})
const res = numbers.reduce((acc, i) => acc + parseInt(i), 0)
console.log(res)
