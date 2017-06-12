import {div, input, p} from '@cycle/dom';

export default function(model){
  const view$ = model.change$.map(toggle => {
    return div([
        input({attrs: {type: 'checkbox'}}),
        'toggle me',
        p(toggle.val)
      ])
  })

  return {
    DOM: view$
  }
}