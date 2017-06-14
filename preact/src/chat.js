import preact from 'preact'
import { MessageSubscription, getMessages, sendMessage } from './service'

class Message extends preact.Component {
  
  render() {
    let messages = this.props.msgs || [];
    return (
      <div className="message">
        <div className="inner">
          <ul>
            {messages.map(message => {
              return (
                <li>{message.content}</li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

class MsgInput extends preact.Component {
  send = (e) => {
    if (e.code.toLowerCase() !== 'enter'){
      return;
    }
    const val = this.msgRef.value;
    if (!val){
      return;
    }
    this.props.send(val)
    this.msgRef.value = '';
  }
  render() {
    return (
      <div className="msg-input">
        <textarea ref={(e) => this.msgRef = e} placeholder="Enter send message" onKeyUp={this.send}></textarea>
      </div>
    )
  }
}

export default class Chat extends preact.Component {
  constructor() {
    super();
    this.msgs = [];
    this.initMessages();
  }
  async initMessages() {
    const msgs = await getMessages();
    const msgsArr = msgs.reverse().map(item => item.toJSON())
    this.syncMsgs(msgsArr);
  }
  syncMsgs(msg){
    this.msgs = this.msgs.concat(msg);
    this.setState({msgs: this.msgs});
    setTimeout(() => {
      this.messageRef.base.scrollTop = 99999;
    },1)
    
  }
  sendMsg(msg){
    sendMessage(msg);
  }
  componentWillMount(){
    MessageSubscription.on('create', obj => {
       this.syncMsgs(obj.toJSON())
    })
  }
  render({}, {msgs}) {
    return (
      <div className="container-fluid chat">
        <div className="row">
          <div className="col-md-4 col-md-offset-4 col-xs-12">
            <Message ref={e => this.messageRef = e} msgs={msgs}/>
            <MsgInput send={this.sendMsg} />
          </div>
        </div>
      </div>
    )
  }
}