import {h} from '@cycle/dom'
import isolate from '@cycle/isolate'
import {Observable} from 'rxjs'
import toggle from './components/toggle/'

export function App (sources) {
  const toggle$ = toggle(sources);
  const vtree$ = toggle$.DOM.map(toggleView => {
    return h('div', [toggleView]);
  })
  const sinks = {
    DOM: vtree$
  }
  return sinks
}
