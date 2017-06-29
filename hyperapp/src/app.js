import { h, Hyper } from './core'


export default {
  run(){
    [1,2,3].map(item => console.log(item));
    console.log('success!**');
    Hyper({
      state: 0,
      view: state => (
        <h2>{state}</h2>
      )
    })
  }
}