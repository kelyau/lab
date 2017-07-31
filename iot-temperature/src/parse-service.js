import Parse from 'parse';

Parse.initialize('123456');
Parse.serverURL = 'http://portal.xiandusi.com:1337/example';

window.Parse = Parse;


var Temperature = window.Temperature = Parse.Object.extend('Temperature');
var query = new Parse.Query(Temperature);
var live = query.subscribe();

export function temperatureQuery() {
  query.limit(10000);
  return query.find();
}

export function temperatureLive() {
  return live
}