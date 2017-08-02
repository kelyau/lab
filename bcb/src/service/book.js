import Http from './http';

var url = 'http://portal.xiandusi.com:1337/example/classes/Library';

export function getList(){
  return Http.get(url);
}
export function postItem(data){
  return Http.post(url, {body: data})
}
export function getItem(id){
  return Http.get(url + '/' + id)
}