import { log } from 'console'
import * as fs from 'fs'


const lines = fs.readFileSync('./inputs/d2p2', 'utf8').split('\n').filter(l => l)
const games = {}
const MAXES = {
  red: 0,
  green: 0,
  blue: 0
}
lines.forEach(line => {
  const sp = line.split(':')
  const g = sp[0].split(' ')[1]
  games[g] = { ...MAXES }
  const sets = sp[1].split(';')
  sets.every(set => {
    const cards = set.trim().split(',')
    cards.every(card => {
      const [num, car] = card.trim().split(' ')
      if (+num > games[g][car]) {
        games[g][car] = +num
      }
      return true
    })
    return true
  })
})

log(Object.keys(games).map(k => Object.values(games[k]).reduce((acc, val) => acc * val, 1))
  .reduce((acc, val) => acc + val, 0))

