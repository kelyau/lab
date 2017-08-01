import {temperatureQuery, temperatureLive} from './parse-service';
import {} from 'pixi.js'

export default {
  run(){
    temperatureQuery().then(res => {
      var result = res.map(item => item.toJSON());
      console.log(result)
    });
  
    temperatureLive().on('create', res => {
      showTemperature(res); 
    })
  
    var app = new PIXI.Application(window.innerWidth, window.innerHeight, {
      antialias: true,
      backgroundColor: 0x1099bb
    });
    document.body.appendChild(app.view);
    const ticker = new PIXI.ticker.Ticker;

    var container = new PIXI.Container;
    app.stage.addChild(container);
    
    var ts = new PIXI.Text(temperatureString(), {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 0xff1010,
      align: 'center'
    });
    ts.x = (window.innerWidth - ts.width) / 2;
    ts.y = (window.innerHeight - ts.height) / 2;
    container.addChild(ts);
    function temperatureString(res){
      var t = res ? res.get('t') : 0;
      var h = res ? res.get('h') : 0;
      return `当前温度：${t}  当前湿度：${h}`;
    }
    function showTemperature(res){
       ts.text = temperatureString(res);
    }


  }
}