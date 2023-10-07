import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { adddelfreq } from '../actions/auth';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddDelFreq = ({ adddelfreq, isAuthenticated }) => {
    const history = useHistory();
    const [bandCreated, setBandCreated] = useState(false);
    const [formData, setFormData] = useState({
        frequency_type: '',
        frequency_fm: '',
        frequency_to: '',
        channel_spacing: ''
    });

    const [frequency_type, setfrequency_type] = useState('1');
    const [options] = useState([
        { value: '1', label: 'Select Frequency Band Type' },
        { value: '6', label: 'VHF' },
        { value: '2', label: 'HF' },
        { value: '3', label: 'UHF-Band I' },
        { value: '4', label: 'UHF-Band II' },
        { value: '5', label: 'UHF-Band III' },
       
    ]);
    const handleSelectChange = (e) => {
        setfrequency_type(e.target.value);
    };

    const { frequency_fm, frequency_to, channel_spacing } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        adddelfreq(frequency_type, frequency_fm, frequency_to, channel_spacing);
        setBandCreated(true);
        history.push('/select-frequency');
    };

    // if(isAuthenticated)
    // {
    //     return <Redirect to='/select-frequency' />
    // }


    return (
        <div className='container mt-5'>
            <h1>Add Frequency Bands</h1>
            <p>Fill the following details to add a frequency band</p>

            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        value={frequency_type}
                        onChange={handleSelectChange}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='form-group'>
                <label for="staticEmail" class="col-sm-6 col-form-label">Frequency From (in MHz)</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Frequency rg (fm)*'
                        name='frequency_fm'
                        value={frequency_fm}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                <label for="staticEmail" class="col-sm-6 col-form-label">Frequency To (in MHz)</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Frequency rg (to)*'
                        name='frequency_to'
                        value={frequency_to}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                <label for="staticEmail" class="col-sm-6 col-form-label">Channel Spacing (in MHz)</label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Channel Spacing*'
                        name='channel_spacing'
                        value={channel_spacing}
                        onChange={e => onChange(e)}
                        minLength='1'
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Add Frequency Band</button>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { adddelfreq })(AddDelFreq);
