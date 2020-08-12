import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Button,
    Keyboard,
} from 'react-native';
import logo from '../pics/logo.png';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

const { width: WIDTH } = Dimensions.get('window');
const { height: HEIGHT } = Dimensions.get('window');

export default class forgotPassword extends React.Component {
    constructor() {
        super();

        this.state = {
            token: "",
            isVisible:false
        };
    }

    changePassword = () => {
        const { token } = this.state;
        const form = new FormData();
        form.append('tokenInput', token);

        axios({
            method: 'post',
            url: 'http://simpl3daveftp.com/fgpass.php',
            data: form,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(function (response) {
                //handle success
                if (response.data == false) {
                    const { navigate } = this.props.navigation;

                    alert("Password couldn't be changed! Try different one !")
                } else if (response.data == true) {
                    const { navigate } = this.props.navigation;
                    navigate('Login')
                    alert("Password changed!")
                }
            })
            .catch(function (response) {
                //handle error
                alert(response)
            });
    };
    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>


                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.logoText}>Doctor Boardroom</Text>
                </View>

                <View style={styles.textContiainer}>

                    <Text style={styles.text}>Please enter the 6-digit code we have sent to your email.</Text>
                </View>

                <View style={styles.inputConteiner}>
                    <TextInput
                        style={styles.input}
                        placeholder={'CODE'}
                        underlineColorAndroid = "transparent"
                        onChangeText={token => this.setState({ token })}
                    />
                </View>
                <View style={styles.btnConteiner}>
                    <TouchableOpacity style={styles.btnLogin} onPress={() =>this.changePassword()}>
                        <Text style={styles.textBtn}>Send</Text>
                    </TouchableOpacity>
                </View>



            </View>


        );
    }

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    textForgot: {
        color: '#2699fb',
        textAlign: 'center',
        paddingTop: 10
    },
    logo: {
        width: HEIGHT / 10,
        height: HEIGHT / 10,
        marginTop: HEIGHT / 10,
    },
    logoContainer: {
        alignItems: 'center',
        backgroundColor: '#2699fb',
    },
    textBtn: {
        fontSize: 16,
        color: 'white',
        marginTop: 5,
    },
    textContiainer: {
        paddingBottom: 40,
        paddingTop: 20,
    },
    btnConteiner: {
        marginTop: 70,
        alignItems: 'center',
    },
    logoText: {
        color: 'white',
        fontSize: 28,
        marginTop: 22,
        fontWeight: '400',
        marginBottom: 20,

    },
    inputConteiner: {
        marginTop: 20,
        alignItems: 'center',
    },
    input: {
        width: WIDTH - 55,
        height: 35,
        borderRadius: 15,
        fontSize: 16,
        //placeholderTextColor: "white",
        fontWeight: '300',
        opacity: 0.8,
        textAlign: 'center',
        borderColor: '#2699fb',
        borderWidth: 0.5,
    },
    btnEye: {
        position: 'absolute',
        top: 8,
        left: 37,
    },
    btnLogin: {
        width: WIDTH - 55,
        height: 35,
        borderRadius: 5,
        backgroundColor: '#2699fb',
        alignItems: 'center',
    },
    text: {
        color: '#000000',
        fontSize: 16,
        textAlign: 'center',
    },
});
