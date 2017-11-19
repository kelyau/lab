import Parse from 'parse'
import { Subject } from 'rxjs-es/Rx'
import 'pixi.js'

const width = window.innerWidth
const height = window.innerHeight

Parse.initialize('124356')
Parse.serverURL = 'http://portal.xiandusi.com:1337/example'
const temperature = new Parse.Query('Temperature')
const subscribe = temperature.subscribe()

function handlerCreate(handler) {
  subscribe.on('create', handler)
}
const observe = Subject.fromEventPattern(handlerCreate)

const app = window.app =  new PIXI.Application(width, height, {backgroundColor: 0x000000})
document.body.appendChild(app.view)



function createCircle (r) {
  var graphics = new PIXI.Graphics()
  graphics.lineStyle(0)
  graphics.beginFill(0xFFF0B, 1)
  graphics.drawCircle(width, Math.random() * 600, r)
  graphics.endFill()
  return graphics
}

function push (object) {
  const circle = createCircle(object.h)
  app.stage.addChild(circle)
  const timer = setInterval(function(){
    if (circle.x < - width) {
      app.stage.removeChild(circle)
      clearInterval(timer)
    }
     circle.x = circle.x - 1
  }, 10)
  
}

export default function () {
  subscribe.on('open', () => console.log('opened'))
  observe.subscribe(x => push(x.toJSON()))
}
