import React,{ Component } from "react";
import Hospitals from "./Hospitals";

class  HomePage extends Component {

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
      {this.state.hospitalFlag?
      <Hospitals data={this.state.data}/>
      : <div className="homepagewrapper">
      <img src="https://user-images.githubusercontent.com/36616708/114968353-c593f800-9e3b-11eb-89e5-0a0dcd3a18a6.jpeg" alt="Home Page"/>
    </div>}
     
    </>
  );
  }
}

export default HomePage;