import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Facebook from './containers/Facebook';
import Google from './containers/Google';
import CreateProfile from './containers/CreateProfile';
import Profile from './containers/Profile';
import BandsAvailable from './containers/BandsAvailable';
import FrequencyVhf from './containers/vhf';
import FrequencyHf from './containers/hf.js';
import AddDelFreq from './containers/AddDelFreq';
import DeleteFrequency from './containers/DeleteFrequency';

import { Provider } from 'react-redux';
import store from './store';

import Layout from './hocs/Layout';

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/facebook' component={Facebook} />
                    <Route exact path='/google' component={Google} />
                    <Route exact path='/reset-password' component={ResetPassword} />
                    <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
                    <Route exact path='/activate/:uid/:token' component={Activate} />
                    <Route exact path='/create-profile' component={CreateProfile} />
                    <Route exact path='/profile' component={Profile} />
                    <Route exact path='/select-frequency' component ={BandsAvailable}/>
                    <Route exact path='/frequency-vhf' component ={FrequencyVhf}/>
                    <Route exact path='/frequency-hf' component ={FrequencyHf}/>
                    <Route exact path='/add-del-frequency' component ={AddDelFreq}/>
                    <Route exact path='/del-frequency' component ={DeleteFrequency}/>
                </Switch>
            </Layout>
        </Router>
    </Provider>
);

export default App;