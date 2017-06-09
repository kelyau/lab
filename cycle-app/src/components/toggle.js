import {div, input, p} from '@cycle/dom'

export function toggle (sources) {
  
  const vtree$ = sources.DOM.select('input').events('change')
    .map(ev => ev.target.checked)
    .startWith(false)
    .map(toggled => {
      return div([
        input({attrs: {type: 'checkbox'}}),
        'toggle me',
        p(toggled? 'ON': 'OFF')
      ])
    })
  const sinks = {
    DOM: vtree$
  }
  return sinks
}