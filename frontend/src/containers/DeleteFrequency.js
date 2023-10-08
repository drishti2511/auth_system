import React, { useState, useEffect } from 'react';
import './DeleteFrequency.css'
import Select from 'react-select';
import { connect } from 'react-redux';

const DeleteFrequency = ({ email }) => {
    const [data, setData] = useState([]);
    const [selectedBandsOverall, setSelectedBandsOverall] = useState([]);

    const frequencyOptions = [
        { value: '1', label: 'Select Frequency Band Type' },
        { value: '6', label: 'VHF' },
        { value: '2', label: 'HF' },
        { value: '3', label: 'UHF-Band I' },
        { value: '4', label: 'UHF-Band II' },
        { value: '5', label: 'UHF-Band III' },
    ];

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

    useEffect(() => {
        fetch('http://localhost:8000/all-associated-bands/')  // Use the actual URL
            .then((response) => response.json())
            .then((result) => {
                setSelectedBandsOverall(result);
                console.log('All Associated Bands:', result);
                const rowExists = selectedBandsOverall.some((row) => row.id === 4);
                console.log('checking rowExists');
                console.log(rowExists);
                console.log('checking rowExists');
            })
            .catch((error) => {
                console.error('Error fetching all associated bands:', error);
            });
    }, []);


    function getLabelByValue(value) {
        const option = frequencyOptions.find(option => option.value === value);
        return option ? option.label : value; // Return the label if found, otherwise return the value itself
    }

    function handleBandSelection(bandId) {

        const isChecked = selectedBandsOverall.includes(bandId);
        console.log(isChecked);
        // Send a POST request to your Django endpoint to associate the user with the selected band
        if (isChecked) {
            fetch(`http://localhost:8000/all-associated-bands/`, {
                method: 'DELETE',
            }).then((response) => {
                if (response.status === 204) {
                    console.log('inside if statement');
                    setSelectedBandsOverall((prevSelectedBandsOverall) => {
                        if (prevSelectedBandsOverall.includes(bandId)) {
                            // If the band is already selected, remove it
                            return prevSelectedBandsOverall.filter((id) => id !== bandId);
                        }
                    });
                }
            })
                .catch((error) => {
                    console.error('Error associating band with user:', error);
                });

        }

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
                    {data
                    .filter((item) => selectedBandsOverall.includes(item.id))
                    .map((item) => (
                        <tr
                            key={item.id}
                            className="red-row" // Assuming you want to mark all these rows as 'red-row'
                        >
                            <td>{getLabelByValue(item.frequency_type)}</td>
                            <td>{item.frequency_fm}</td>
                            <td>{item.frequency_to}</td>
                            <td>{item.channel_spacing}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedBandsOverall.includes(item.id)}
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


export default connect(mapStateToProps)(DeleteFrequency);
