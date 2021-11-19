import React,{ Component } from "react";
import Hospitals from "./Hospitals";

class  About extends Component {

  constructor(props){
      super(props);
      this.state ={
        hospitalFlag: false
      }
  }

  componentWillMount() {
    this.setState({
      data: this.props.data,
      hospitalFlag: this.props.hospitalFlag
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      hospitalFlag: nextProps.hospitalFlag
    },
    () =>{
      console.log(this.props.location)
    }
    )
  }

  render(){
  return (
    <>
     <div className="about">
         <img src="https://user-images.githubusercontent.com/36616708/118166015-98127e00-b3ea-11eb-8961-67ecb2ddb527.jpg" alt="About Page"/>
     </div>
     
    </>
  );
  }
}

export default About;