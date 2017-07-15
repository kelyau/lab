/** @jsx h */

import Backbone from 'backbone'
import { h, create } from 'virtual-dom'
import Input from './input'

export default Backbone.View.extend({
    el: 'body',
    initialize(){
      this.render()
    },
    state: {
      title: 'Todo example',
    },
    render() {
      let dom = create(this.view(this.state))
      this.el.appendChild(dom)
    },
    view(state) {
      return (<div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h2 className="text-center text-danger">{state.title}</h2>
          </div>
        </div>
      </div>)
    }
  })
