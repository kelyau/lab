import {Observable} from 'rxjs';
import {temperatureLive} from './parse-service';


var temperatureEventEmitter = temperatureLive();
var temperatureObservable = Observable.fromEvent(temperatureEventEmitter, 'create', res => {
  console.log(res);
  return res.toJSON();
});

export default {temperatureObservable};