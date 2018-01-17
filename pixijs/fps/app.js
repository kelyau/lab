var fpsEle = document.createElement('div')
fpsEle.style.position = 'absolute'
fpsEle.style.top = '5px'
fpsEle.style.fontSize = '16px'
 
var width =  window.innerWidth
var height = window.innerHeight
var app = new PIXI.Application(width, height, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view)
document.body.appendChild(fpsEle)
const container = new PIXI.Container()

app.stage.addChild(container)

var elapsed = Date.now()

var ticker = new PIXI.ticker.Ticker()
ticker.stop()
ticker.add(deltaTime => {
  var now = Date.now()
  fpsEle.innerHTML = (1000 / (now - elapsed)).toFixed(2)
  elapsed = now
})
ticker.start()
