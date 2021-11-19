import React,{ Component } from "react";
import GoogleLogin from "react-google-login";
class  Login extends Component {

  constructor(props){
      super(props);
      this.state ={
      }
  }

  componentDidMount() {
  }

  responseGoogle = (response) => {
      console.log(response);
  }
  render(){
  return (
      <div className ="login">
          <GoogleLogin
          clientId ="124134948755-9p9tlf6p39o7s8m3rv0e5c9qfhaorl44.apps.googleusercontent.com"
          buttonText = "Login"
          onSuccess = {this.responseGoogle}
          onFailure = {this.responseGoogle}
          cookiePolicy = {'single_host_origin'}
          />
      </div>
  );
  }
}

export default Login;