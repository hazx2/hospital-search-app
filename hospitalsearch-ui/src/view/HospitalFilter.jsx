import React, { Component } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';
import Hospitals from "./Hospitals";

class HospitalFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedArea: '',
            areaOptions: [],
        }

    }

    componentWillMount() {
        axios.get('http://localhost:3000/area')
            .then(res => {
                const data = res.data;
                this.setState({ areaOptions: data });
            })
    }
    _onSelect = (selectedOption) => {
        this.setState({
            selectedArea: selectedOption.value
        })
    }

    onChangeHospitalCategory = (option) => {
        this.setState({
            category: option
        })
    }
    onChangeHospitalCharges = (option) => {
        this.setState({
            charges: option
        })
    }


    onSearch = () => {
        window.scrollTo(0, 150);
        axios.get('http://localhost:3000/hospitalsbyfilter',
            {
                params: {
                    area: this.state.selectedArea,
                    category: this.state.category,
                    charges: this.state.charges,
                }
            })
            .then(res => {
                const data = res.data;
                this.setState({ hospitals: data });
            })
    }
    render() {
        return (
            <>
                <div className="filterWrapper">
                    <h3 className="searchHospitals">Filter Hospitals</h3>
                    <div>
                        <div className="area">
                            <label >
                                Area:
                                </label>
                            <div style={{paddingTop: '10px'}}>
                            <Dropdown options={this.state.areaOptions} onChange={this._onSelect} value={this.state.selectedArea} placeholder="Select Area" />
                            </div>
                        </div>
                        <div className="chargeswrapper">
                            <div className="category">
                                <label>
                                    Hospital Category:
                                </label>
                                <div>
                                    <ul>
                                        <li><input type="radio" value="DCH" name="category" checked={this.state.category === "DCH"}
                                            onChange={() => this.onChangeHospitalCategory('DCH')} /> DCH</li>
                                        <li>    <input type="radio" value="DCHC" name="category" checked={this.state.category === "DCHC"}
                                            onChange={() => this.onChangeHospitalCategory('DCHC')} /> DCHC</li>
                                        <li>  <input type="radio" value="CCC" name="category" checked={this.state.category === "CCC"}
                                            onChange={() => this.onChangeHospitalCategory('CCC')} /> CCC</li>
                                        <li>  <input type="radio" value="All" name="category" checked={this.state.category === "All"}
                                            onChange={() => this.onChangeHospitalCategory('All')} /> All</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="charges">
                                <label>
                                    Hospital by Charges:
                                </label>
                                <div>
                                    <ul>
                                        <li> <input type="radio" value="Government Free" name="charges" checked={this.state.charges === "Government Free"}
                                            onChange={() => this.onChangeHospitalCharges('Government Free')} /> Government Free</li>
                                        <li>  <input type="radio" value="MOU Free" name="charges" checked={this.state.charges === "MOU Free"}
                                            onChange={() => this.onChangeHospitalCharges('MOU Free')} /> MOU Free</li>
                                        <li> <input type="radio" value="MPJAY Free" name="charges" checked={this.state.charges === "MPJAY Free"}
                                            onChange={() => this.onChangeHospitalCharges('MPJAY Free')} /> MPJAY Free</li>
                                        <li> <input type="radio" value="Chargeable" name="charges" checked={this.state.charges === "Chargeable"}
                                            onChange={() => this.onChangeHospitalCharges('Chargeable')} /> Chargeable</li>
                                        <li> <input type="radio" value="Show All" name="charges" checked={this.state.charges === "Show All"}
                                            onChange={() => this.onChangeHospitalCharges('Show All')} /> Show All</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* Show Bed Availability:All Records  Only Vacant Beds for Isolation   Only Vacant Isolation with Oxygen Only Vacant Beds for ICU Without Ventilator Only Vacant ICU Beds With Ventilator */}

                      <div> <button className="searchforbeds" onClick={this.onSearch}>Search For Beds</button></div> 
                    </div>
                    {
                        this.state.hospitals?.length > 0 && <Hospitals data={this.state.hospitals} />

                    }
                </div>

            </>
        )
    }
}
export default HospitalFilter;