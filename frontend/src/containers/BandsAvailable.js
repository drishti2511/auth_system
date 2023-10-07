import React, { useState, useEffect } from 'react';
import './BandsAvailable.css'
import Select from 'react-select';
import { connect } from 'react-redux';

const BandsAvailable = ({ email }) => {
    const [data, setData] = useState([]);
    const [selectedBands, setSelectedBands] = useState([]);
    const [selectedBandsOverall, setSelectedBandsOverall] = useState([]);
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
        if (isChecked) {
            fetch(`http://localhost:8000/associate-band/${email}/${bandId}/`, {
                method: 'DELETE',
            }).then((response) => {
                if (response.status === 204) {
                    console.log('inside if statement');
                    setSelectedBands((prevSelectedBands) => {
                        if (prevSelectedBands.includes(bandId)) {
                            // If the band is already selected, remove it
                            return prevSelectedBands.filter((id) => id !== bandId);
                        }
                    });
                }
            })
                .catch((error) => {
                    console.error('Error associating band with user:', error);
                });

        }
        else {
            fetch(`http://localhost:8000/associate-band/${email}/${bandId}/`, {
                method: 'POST',
            }).then((response) => response.json()).then((result) => {
                if (result.success) {
                    console.log('inside if statement');
                    setSelectedBands((prevSelectedBands) => {
                        // If the band is not selected, add it
                        return [...prevSelectedBands, bandId];
                    });
                }
            })
                .catch((error) => {
                    console.error('Error associating band with user:', error);
                });
        }

        fetch('http://localhost:8000/all-associated-bands/')  // Use the actual URL
        .then((response) => response.json())
        .then((result) => {
            setSelectedBandsOverall(result);
            console.log('All Associated Bands:', result);
        })
        .catch((error) => {
            console.error('Error fetching all associated bands:', error);
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
                        <tr
                            key={item.id}
                            className={selectedBandsOverall.includes(item.id) ? 'red-row' : 'green-row'}
                        >
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
