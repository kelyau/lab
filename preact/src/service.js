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

export function userLogout(){
  return Parse.User.logOut()
}

export function userRegister(user, pass, email){
  const newUser = new Parse.User({
    username: user,
    password: pass,
    email: email
  })
  return newUser.signUp(null)
}

export function getMessages() {
  return msgQuery.descending('createdAt').limit(20).find()
}


export async function sendMessage(msg) {
  const current = Parse.User.current();

  const query = new Parse.Query(Parse.User);
  const user = await query.equalTo('objectId', current.id).first();
  const message = new Message({
    content: msg,
    sender: user.toJSON().id,
    nike: user.toJSON().username
  })
  return message.save(null);
}