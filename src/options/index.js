import plakety from './plakety'
import chl from './chl'
import chl_pris from './chl_pris'
import vh_hlavy from './vh_hlavy'
import kohouty from './kohouty'
import narazec from './narazec'
import odkapniky from './odkapniky'
import plyn from './plyn'
import hadice_python from './hadice_python'
import spojky from './spojky'
import sanitace from './sanitace'
import vh_prisl from './vh_prisl'
import drzaky_desky from './drzaky_desky'
import izolace from './izolace'
import pulty from './pulty'
import ostatni from './ostatni'

export const OPTIONS = {
  plakety,
  chl,
  chl_pris,
  vh_hlavy,
  spojky,
  kohouty,
  narazec,
  odkapniky,
  plyn,
  hadice_python,
  sanitace,
  vh_prisl,
  drzaky_desky,
  izolace,
  pulty,
  ostatni
}


export function firstValue(type){
const arr = OPTIONS[type] || []
const first = arr.find(o => String(o.value||'').trim() !== '')
return first ? first.value : ''
}