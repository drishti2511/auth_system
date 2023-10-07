import React, { useState, useEffect } from 'react';
import './BandsAvailable.css'
import Select from 'react-select';
import { connect } from 'react-redux';

const BandsAvailable = ({email}) => {
    const [data, setData] = useState([]);
    const [selectedBands, setSelectedBands] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8000/available-frequency/')  // Update the URL as per your Django server configuration
            .then((response) => response.json())
            .then((result) => {
                setData(result);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const frequencyOptions = [
        { value: '1', label: 'Select Frequency Band Type' },
        { value: '6', label: 'VHF' },
        { value: '2', label: 'HF' },
        { value: '3', label: 'UHF-Band I' },
        { value: '4', label: 'UHF-Band II' },
        { value: '5', label: 'UHF-Band III' },
    ];

    function getLabelByValue(value) {
        const option = frequencyOptions.find(option => option.value === value);
        return option ? option.label : value; // Return the label if found, otherwise return the value itself
    }
    
    function handleBandSelection(bandId) {
        const isChecked = selectedBands.includes(bandId);
        console.log(isChecked);
        // Send a POST request to your Django endpoint to associate the user with the selected band
        const url = `http://localhost:8000/associate-band/${email}/${bandId}/`;
        console.log(url);
        fetch(`http://localhost:8000/associate-band/${email}/${bandId}/`, {
            method: isChecked ? 'DELETE' : 'POST', 
        })
        .then((response) => response.json())
        .then((result) => {
            if (result.success) {
                console.log('inside if statement');
                setSelectedBands((prevSelectedBands) =>
                    isChecked
                        ? prevSelectedBands.filter((id) => id !== bandId)
                        : [...prevSelectedBands, bandId]
                );
            }
        })
        .catch((error) => {
            console.error('Error associating band with user:', error);
        });
    }

    return (
        <div>
            <h1>Frequency Data List</h1>
            <table>
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Type</th>
                        <th>Frequency FM</th>
                        <th>Frequency TO</th>
                        <th>Channel Spacing</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            {/* <td>{item.id}</td> */}
                            <td>{getLabelByValue(item.frequency_type)}</td>
                            <td>{item.frequency_fm}</td>
                            <td>{item.frequency_to}</td>
                            <td>{item.channel_spacing}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedBands.includes(item.id)}
                                    onChange={() => handleBandSelection(item.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = (state) => ({
    email: state.auth.email,
});


export default connect(mapStateToProps)(BandsAvailable);