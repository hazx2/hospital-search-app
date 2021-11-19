import { faUser } from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class TopMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginName: 'Login'
        }
    }
    responseGoogle = (response) => {
        console.log(response.profileObj);
        this.props.loggedin(response.profileObj);
        if (response.profileObj) {
            this.setState({
                loginData: response.profileObj,
                loginName: response.profileObj.name
            })
        }
    }
    render() {
        return (
            <div className="menuWrapper">
                <div className="menu">
                    {this.state.loginName === "Login" ?
                        <GoogleLogin
                            clientId="124134948755-9p9tlf6p39o7s8m3rv0e5c9qfhaorl44.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        /> :
                        <button className="profilename"> <FontAwesomeIcon icon={faUser} /><strong className="name">{this.state.loginName}</strong></button>
                    }
                </div>
            </div>
        );
    }
}

export default TopMenu;