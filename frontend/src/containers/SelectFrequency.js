import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SelectFrequency = () => {
    const [selectedOption, setSelectedOption] = useState('6');
    const history = useHistory();

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);

        // Use history.push to navigate to the selected page
        switch (selectedValue) {
            case '1':
                history.push('/frequency-vhf');
                break;
            case '2':
                history.push('/frequency-hf');
                break;
            case '3':
                history.push('/page3');
                break;
            default:
                // Handle default case or error
                break;
        }
    };

    return (
        <div>
            <p>Select frequency type</p>
            <select
                className="form-select"
                aria-label="Default select example"
                value={selectedOption}
                onChange={handleSelectChange}
            >
                <option value="6">Select Frequency Type</option>
                <option value="1">VHF</option>
                <option value="2">HF</option>
                <option value="3">UHF-Band I</option>
                <option value="4">UHF-Band II</option>
                <option value="5">UHF-Band III</option>
            </select>
        </div>
    );
}

export default SelectFrequency;
