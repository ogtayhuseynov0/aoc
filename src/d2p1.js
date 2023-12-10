import { log } from 'console'
import * as fs from 'fs'


const lines = fs.readFileSync('./inputs/d2p1', 'utf8').split('\n').filter(l => l)
const games = {}
const MAXES = {
  red: 12,
  green: 13,
  blue: 14
}
lines.forEach(line => {
  const sp = line.split(':')
  const g = sp[0].split(' ')[1]
  games[g] = true
  const sets = sp[1].split(';')
  sets.every(set => {
    const cards = set.trim().split(',')
    cards.every(card => {
      const [num, car] = card.trim().split(' ')
      if (+num > MAXES[car]) {
        games[g] = false
        return false
      }
      return true
    })
    if (!games[g])
      return false
    else return true
  })
})

log(Object.keys(games).reduce((acc, key) => acc + (games[key] && +key), 0))
