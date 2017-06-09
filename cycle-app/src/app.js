import {div, p} from '@cycle/dom'
import {Observable} from 'rxjs'
import {toggle} from './components/toggle'

export function App (sources) {
  console.log('abc',toggle(sources))
  const vtree$ = Observable.of(
    div([
      p('998'),
      toggle(sources).DOM
    ])
  )
  const sinks = {
    DOM: vtree$
  }
  return sinks
}
