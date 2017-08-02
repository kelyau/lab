var def = {
  headers: new Headers({
    'X-Parse-Application-Id': '123456',
    'X-parse-REST-API-Key': '123456',
    'Content-Type': 'application/json'
  })
}
function Http(url, obj){
  obj = obj || {};
  if (obj.body) {
    obj.body = JSON.stringify(obj.body);
  }
  return fetch(url, Object.assign({method: 'GET'}, def, obj))
}
Http.get = function(url, obj){
  return Http(url, obj);
}
Http.post = function(url, obj){
  obj = Object.assign(obj, {method: 'POST'});
  return Http(url, obj);
}
Http.put = function(url, obj){
  obj = Object.assign(obj, {method: 'PUT'});
  return Http(url, obj);
}
Http.delete = function(url, obj){
  obj = Object.assign(obj, {method: 'PUT'});
  return Http(url, obj);
}
export default Http;
