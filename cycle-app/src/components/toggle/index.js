import intent from './intent'
import model from './model'
import view from './view'

export default function(sources) {
  let intent$ = intent(sources.DOM);
  let model$ = model(intent$);
  let view$ = view(model$);

  return {
    DOM: view$.DOM
  }
}