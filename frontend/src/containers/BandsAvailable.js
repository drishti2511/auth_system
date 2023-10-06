import React, { useState , useEffect} from 'react';
import './BandsAvailable.css'

const BandsAvailable = () => {
    const [data, setData] = useState([]);

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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BandsAvailable;
