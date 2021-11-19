import React, { Component } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class VaccineBookings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            centersData: [],
            selectedCenter: '',
            soltDetails: [],
            slotsBooked: [],
            flag: false,
            username : '',
            mobile: null,
            lastname : '',
            timeslots: ['10:00 am - 10:30 am',
                '10:30 am - 11:00 am',
                '11:00 am - 11:30 am',
                '11:30 am - 12:00 pm',
                '12:00 pm - 12:30 pm',
                '12:30 pm - 01:00 pm']
        }
    }


    setStartDate = (date) => {
        // let formattedDate = moment(date).format('MM/DD/YYYY');
        this.setState({
            startDate: date
        })
        axios.get('http://localhost:3000/getcenters')
            .then(res => {
                const data = res.data;
                console.log(res.data)
                this.setState({ centersData: data });
            })
    }
    componentWillMount() {

    }
    _onSelect = (response) => {

        this.setState({
            selectedCenter: response
        }, () => {
            axios.get('http://localhost:3000/getslots', { params: { date: moment(this.state.startDate).format('MM-DD-YYYY').toString(), center: this.state.selectedCenter.value } })
                .then(res => {
                    let data = res.data;
                    this.setState({ soltDetails: data });
                    let slotsBooked = [];
                    data?.map((d) => {
                        slotsBooked.push(d.time);
                    })
                    this.setState({
                        slotsBooked: slotsBooked
                    })
                })
        })

    }
    selectSlot = (slot) => {
        console.log(slot)
        let slotNumber = this.state.timeslots.findIndex((s)=> s === slot);
        this.setState({
            slotNumber: slotNumber,
            slot: slot }
        ,()=>{
            console.log(this.state.slotNumber)
        })
    }
    bookSlot = () => {

        axios.get('http://localhost:3000/getbookingid').then(r => {
            console.log(r)
            axios.post('http://localhost:3000/bookslot',
            { params:
                 { name: this.state.username+ '' + this.state.lastname,
                   uid: 3,
                   date: moment(this.state.startDate).format('MM-DD-YYYY').toString(),
                   vid: 1,
                   bid: r.data[0]['count(BID)'] +1,
                   time: this.state.slotNumber + 1
                 } })
            .then(res => {
                const data = res.data;
                console.log(res.data)
                this.setState({ flag:true });
            })
        })
    }
    setUsername = (value) =>{
          this.setState({
              username : value,
          })
    }
    setLastName = (value) => {
        this.setState({
            lastname : value
        })
    }
    setMobile = (value) => {
        this.setState({
            mobile: value
        })
    }
    render() {
        let vaccinationCenters = [];
        this.state.centersData?.map((center) => {
            vaccinationCenters.push(center.HospitalName);
        })

        return (
            <>
             {this.state.flag ? <div className="slotbookingwrapper"><h4 className="searchHospitals">Your Slot is booked and you will receive confirmation...</h4></div>:
             

                <div className="slotbookingwrapper">

                    <div>
                        <h3 className="searchHospitals">Book a Slot for Covid Vaccine</h3>
                        <div>
                            <label>Date</label>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={date => this.setStartDate(date)}
                                minDate={moment().toDate()}
                                placeholderText="Select a day"
                            >
                            </DatePicker>
                            {/* <FontAwesomeIcon icon={faCalendar} /> */}
                        </div>
                        <div>
                            <label>Select Vaccination Center</label>
                            <div style={{ paddingTop: '10px' }}>
                                <Dropdown
                                    options={vaccinationCenters}
                                    onChange={this._onSelect}
                                    value={this.state.selectedCenter}
                                    placeholder="Select Center" />
                            </div>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <label>Select a Slot time</label>
                            <div className="timeslots">
                                {
                                    this.state.timeslots.map((slot, index) => {
                                        return (<div>
                                            {
                                                this.state.slotsBooked.findIndex((ele) => ele === (index + 1)) !== -1 ?
                                                    (
                                                        <div  className="slot slotBooked"><span>{slot}</span></div>
                                                    ) :
                                                    (
                                                        <div onClick={()=>this.selectSlot(slot)} className={this.state.slotNumber !== index ? "slot slotAvailable": " slot slotselected"}><span>{slot}</span></div>
                                                    )
                                            }
                                        </div>)
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    {
                        //    this.state.selectedSlot
                        true && <div>
                            <div className="user-details">
                                <div><span className="details">First Name: </span></div>
                                <input className="input-data" type="text"  onChange={(ev) => this.setUsername(ev.target.value)} value={this.state.username}/>
                            </div>
                            <div className="user-details">
                                <div><span className="details">Last Name: </span></div>
                                <input className="input-data" type="text" onChange={(ev)=> this.setLastName(ev.target.value)} value={this.state.lastname}/>
                            </div>
                            <div className="user-details">
                                <div><span className="details">Phone: </span></div>
                                <input className="input-data" type="number" onChange={(ev)=> this.setMobile(ev.target.value)} value={this.state.mobile}/>
                            </div>
                            <button className="slotbookbutton" onClick= {this.bookSlot} style={{ margin: '10px' }}>Book a Slot</button>
                            
                        </div>
                    }
                </div>}
            </>
        )
    }
}
export default VaccineBookings;