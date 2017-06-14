import preact from 'preact'
import Router from 'preact-router'
import { createHashHistory } from 'history'
import { userCurrent } from './service'
import Chat from './chat'
import Login from './login'
import './assets/style.css'
export default class App extends preact.Component {
  constructor() {
    super()
  }
  
  handleRoute = (e) => {
    this.setState({currentUrl : e.url});
    const user = userCurrent();
    if (e.url === '/'){
      !user && Router.route('/login')
    }
    if (e.url === '/login'){
      user && Router.route('/')
    }
  }
  render() {
    return (
      <div id="app">
        <Router history={createHashHistory()} onChange={this.handleRoute}>
          <Chat path="/"></Chat>
          <Login path="/login"></Login>
        </Router>
      </div>
    )
  }
}
