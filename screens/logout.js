import * as React from 'react';
import axios from 'axios';
import { Text } from 'react-native';
import { withNavigation } from 'react-navigation';
export default class Login extends React.Component {

    componentDidMount() {
        const { navigate } = this.props.navigation; 
        axios({
            method: 'post',
            url: 'http://simpl3daveftp.com/logout.php',
        })
        navigate('Login')
    };


    render() {
        return (<Text>Loggin Out</Text>);
    }
}