import { log } from 'console'
import * as fs from 'fs'

const lines = fs.readFileSync('./inputs/d3p2', 'utf8').split('\n').filter(l => l)
const matrix = lines.map(l => l.split(''))

const partNumbers = []
const starPairs = {

}

const borders = [
  [-1, 0], [-1, -1], [0, -1],
  [1, -1], [1, 0], [1, 1],
  [0, 1], [-1, 1]
]
let c = 0
for (let i = 0; i < matrix.length; i++) {
  let num = ''
  let partFound = false
  let isStarPair = true
  let startLoc = null
  for (let j = 0; j < matrix[i].length; j++) {
    const char = matrix[i][j]
    if (isNum(char)) {
      num += char
      for (let k = 0; k < borders.length; k++) {
        const x = i + borders[k][0]
        const y = j + borders[k][1]
        let sch = matrix[x]
        if (!sch)
          continue;
        else {
          sch = sch[y]
          if (!sch)
            continue;
          else {
            if (isNoneChar(sch)) {
              if (sch === '*') {
                isStarPair = true
                startLoc = `${x}${y}`
                if (typeof starPairs[startLoc] !== 'object')
                  starPairs[startLoc] = []
              }
              partFound = true
            }
          }
        }
      }
    } else {
      if (partFound) {
        if (isStarPair && startLoc) {
          isStarPair = false
          starPairs[startLoc].push(+num)
        } else {
          partNumbers.push(+num)
          c += +num
        }
      }

      num = ''
      partFound = false
    }
  }

  if (partFound) {
    if (isStarPair && startLoc) {
      isStarPair = false
      starPairs[startLoc].push(+num)
    } else {
      partNumbers.push(+num)
      c += +num
    }
  }

  partFound = false
  num = ''
}
// log(c)
// log(partNumbers)
log(starPairs)
log(Object.values(starPairs).filter(b => b.length > 1).reduce((acc, r) => acc + r.reduce((cc, v) => cc * v, 1), 0))

function isNum(char) {
  return !isNaN(+char)
}

function isNoneChar(char) {
  return char !== '.' && !isNum(char)
}
