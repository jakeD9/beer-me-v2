import React, {Component} from 'react';
import Login from '../../components/Login/Login'
import SignUp from '../../components/SignUp/SignUp';
import API from '../../utils/API';

class LandingPage extends Component {
    state = {
        registering: false,
    };

    loginToggle = () => {
        console.log('switching')
        this.setState(prevState => ({
            registering: !prevState.registering
        }));
    }


    render() {
        let registerCheck = this.state.registering

        return (
            <div>
                {registerCheck ? (
                    <SignUp clicked={this.loginToggle}/>
                ) : (
                    <Login clicked={this.loginToggle}/>
                )}
            </div>
        )
    }
}

export default LandingPage;