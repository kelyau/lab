import {temperatureQuery, temperatureLive} from './parse-service';
import {} from 'pixi.js'

export default {
  run(){
    temperatureQuery().then(res => {
      var result = res.map(item => item.toJSON());
      console.log(result)
    });
  
    temperatureLive().on('create', res => {
      addItem(res); 
    })
  
    var app = new PIXI.Application(window.innerWidth, window.innerHeight, {
      antialias: true,
      backgroundColor: 0x1099bb
    });
    document.body.appendChild(app.view);
    const ticker = new PIXI.ticker.Ticker;

    var container = new PIXI.Container;
    app.stage.addChild(container);
    
    function addItem(data){
      var rect = new PIXI.Graphics;
      rect.lineStyle(0);
      rect.beginFill(0xffff0b, 0.5);
      rect.drawRect(0, 0, 2, data.get('t') * 3);

      rect.x = 100 + (data._objCount - 10001) * 2;
      rect.y = 400 - data.get('t') * 3;
      container.addChild(rect);

    }

    
    

  }
}