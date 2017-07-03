import { h, Hyper, Router } from './core'


export default {
  run(){
    Hyper({
      state: 0,
      mixins: [Router],
      view: (state, actions) => (
        <h1>{state}</h1>
      )
    })
  }
}