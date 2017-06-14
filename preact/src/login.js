import preact from 'preact'
import { route } from 'preact-router'
import { userLogin } from './service'


export default class Login extends preact.Component {
  componentWillMount() {
    this.setState({toggle: 'login'})
  }
  toggle = (e) => {
      this.setState({'toggle': e.target.innerText.toLocaleLowerCase()})
  }
  login = (e) => {
    e.preventDefault();
    userLogin(this.userRef.value, this.passRef.value)
      .then(res => route('/'))
      .catch(res => console.log(res))
  }
  register = (e) => {

  }
  render({}, {toggle}) {
    let formContent;
    if (toggle === 'login') {
      formContent = (
        <form onSubmit={this.login}>
          <h2 className="text-warning text-center">Login</h2>
          <div className="input-group">
            <div className="input-group-addon"><img src="./public/icons/core/user.svg" /></div>
            <input ref={(ref) => this.userRef = ref} type="text" className="form-control" />
          </div>
          <div className="input-group">
            <div className="input-group-addon"><img src="./public/icons/core/lock.svg" /></div>
            <input ref={(ref) => this.passRef = ref}  type="password" className="form-control" />
          </div>
          <div className="btns text-center">
            <button type="submit" className="btn btn-success">Login</button>&nbsp;
            <a href="javascript:;" onClick={this.toggle} className="text-warning">Register</a>
          </div>
        </form>
      )
    }else{
      formContent = (
        <form onSubmit={this.register}>
          <h2 className="text-warning text-center">Register</h2>
          <div className="input-group">
            <div className="input-group-addon"><img src="./public/icons/core/user.svg" /></div>
            <input ref={(ref) => this.userRef = ref} type="text" className="form-control" />
          </div>
          <div className="input-group">
            <div className="input-group-addon"><img src="./public/icons/core/lock.svg" /></div>
            <input ref={(ref) => this.passRef = ref} type="password" className="form-control" />
          </div>
          <div className="btns text-center">
            <button type="submit" className="btn btn-success">Register</button>&nbsp;
            <a href="javascript:;" onClick={this.toggle} className="text-warning">Login</a>
          </div>
        </form>
      )
    }
    return (
      <div className="container-fluid login">
        <div className="row">
          <div className="col-md-4 col-xs-12 col-md-offset-4">
           { formContent }
          </div>
        </div>
      </div>
    )
  }
}