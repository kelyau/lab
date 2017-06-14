import Parse from 'parse'
window.Parse = Parse;
Parse.initialize('123456')
Parse.serverURL = 'http://portal.xiandusi.com:1337/example'

const Message = Parse.Object.extend('Messages');
const msgQuery = new Parse.Query(Message)

export const MessageSubscription = msgQuery.subscribe(); 

export function userCurrent(){
  return Parse.User.current();
}
export function userLogin(user, pass) {
  return Parse.User.logIn(user, pass)
}

export function getMessages() {
  return msgQuery.descending('createdAt').limit(20).find()
}

export function sendMessage(msg) {
  const message = new Message({
    content: msg,
    sender: Parse.User.current().id
  })
  return message.save(null);
}