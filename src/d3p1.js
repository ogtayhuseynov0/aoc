import { log } from 'console'
import * as fs from 'fs'

const lines = fs.readFileSync('./inputs/d3p1', 'utf8').split('\n').filter(l => l)
const matrix = lines.map(l => l.split(''))

const partNumbers = []

const borders = [
  [-1, 0], [-1, -1], [0, -1],
  [1, -1], [1, 0], [1, 1],
  [0, 1], [-1, 1]
]
let c = 0
for (let i = 0; i < matrix.length; i++) {
  let num = ''
  let partFound = false
  for (let j = 0; j < matrix[i].length; j++) {
    const char = matrix[i][j]
    if (isNum(char)) {
      num += char
      for (let k = 0; k < borders.length; k++) {
        let sch = matrix[i + borders[k][0]]
        if (!sch)
          continue;
        else {
          sch = sch[j + borders[k][1]]
          if (!sch)
            continue;
          else {
            if (isNoneChar(sch)) {
              partFound = true
              break
            }
          }
        }
      }
    } else {
      if (partFound) {
        partNumbers.push(+num)
        c += +num
      }

      num = ''
      partFound = false
    }
  }

  if (partFound) {
    partNumbers.push(+num)
    c += +num
  }

  partFound = false
  num = ''
}
log(c)

function isNum(char) {
  return !isNaN(+char)
}

function isNoneChar(char) {
  return char !== '.' && !isNum(char)
}
