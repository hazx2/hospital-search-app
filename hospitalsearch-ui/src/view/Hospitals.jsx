import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { getDistance } from 'geolib';

class Hospitals extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    }
  }

  componentDidMount() {
   
    console.log(getDistance(
      { latitude: 22.364292, longitude: 79.029434 },
      { latitude: 18.50337982, longitude: 73.84559014 }
    ))
    this.setState({
      data: this.props.data
    },()=>{
      this.getDistance();
    })
  }


  getDistance = () => {
    let data = this.props.data;
    data.map((hos)=>{
       hos.distance = getDistance(
        { latitude: 18.544161, longitude: 73.883430 },
        { latitude: hos.Latitude, longitude: hos.Longitude }
    )
    })

    console.log(  getDistance(
      { latitude: 18.544161, longitude: 73.883430 },
      { latitude: 18.52616759, longitude:  73.87160833}
  ));

  data.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    this.setState({
      data: data
    },
    ()=>{
      console.log(this.state.data)
    })
  
  } 

  render() {
    return (
      this.state.data.length >0 ? <div className="hospitalWrapper">
        {this.state.data?.map((hos) => {
          return (
            <Card className="root hospital-cardwrapper" variant="outlined">
              <CardContent>
                <div className="hospital-card">
                <div className="hospital-name">
                  {hos.hospital_details}
                </div>
                <span class="pull-right">
                  <a target="_blank" href={"https://www.google.com/maps/search/?api=1&query=" + hos.Latitude + "," + hos.Longitude}>
                    <img className = "googlemapnavigation" src="https://user-images.githubusercontent.com/36616708/115098474-e15bd480-9ef5-11eb-99e6-ad20e78c69c5.jpeg"  />
                  </a>
                </span>
                {/* <span>{hos.distance/1000}</span> */}
                </div>
                <div className="distance">
                  <span >{hos.distance/1000} Kms</span>
                </div>
                <ul className="bedtypes">
                  <li>
                    <div className="card-header">
                      Area
                    </div>
                    <div className="header-value">
                      {hos.area}
                    </div>
                  </li>
                  <li>
                    <div className="card-header">
                      Total Available beds
                  </div>
                    <div className="bedCount">
                      {hos.Vacant_Bed_of_ICU_Without_Ventilator +
                        hos.Vacant_Bed_of_Isolation_without_Oxygen +
                        hos.Vacant_ICU_Beds_With_Ventilator +
                        hos.Vacant_Isolation_with_Oxygen}
                    </div>
                  </li>
                  <li>
                    <div className="card-header">
                      Ventilator beds
                  </div>
                    <div className="bedCount">
                      {
                        hos.Vacant_ICU_Beds_With_Ventilator
                      }
                    </div>
                  </li>
                  <li style={{marginRight: '110px'}}>
                    <div className="card-header">
                      Oxygen beds
                  </div>
                    <div className="bedCount">
                      {
                        hos.Vacant_Isolation_with_Oxygen}
                    </div>
                  </li>

                </ul>
              </CardContent>
            </Card>
          )
        })}

      </div>: <></>
    );
  }
}

export default Hospitals;