import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import logo from '../pics/logo.png';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';



const { width: WIDTH } = Dimensions.get('window');
const { height: HEIGHT } = Dimensions.get('window');
export default class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      usernameWarrning: false,
      passwordWarrning: false,
      showPass: true,
      press: false,
    };
  }


  login = () => {
    const { navigate } = this.props.navigation;
    const { username, password } = this.state;
    const form = new FormData();
    form.append('usernameInput', username);
    form.append('passwordInput', password);

    axios({
      method: 'post',
      url: 'http://simpl3daveftp.com/loginProcess.php',
      data: form,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
      .then(function (response) {
        //handle success
        if (response.data == false) {
          alert("Username or password incorrect!")
        } else if (response.data == true) {
          axios({
            method: 'post',
            url: 'http://simpl3daveftp.com/master.php',
          })
            .then(function (response) {
              //handle success
              if (response.data == '1') {
                navigate('ChairmanNav');
              } else if (response.data == '2') {
                navigate('UserNav');
              } else if (response.data == '0') {
                navigate('Login');
              }
            })
            .catch(function (response) {
              //handle error
              alert(response.data)
            });
        }
      })
      .catch(function (response) {
        //handle error
        alert(response)
      });
    Keyboard.dismiss();
  }

  showPass = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true });
    } else {
      this.setState({ showPass: true, press: false });
    }
  };

  validatePassword = (text) => {
    this.setState({ password: text, passwordWarrning: false })
  }

  validateUsername = (text) => {
    this.setState({ username: text, usernameWarrning: false })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>


        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.logoText}>Doctor Boardroom</Text>
        </View>

        <View style={styles.textContiainer}>
          <Text style={styles.text}>Welcome</Text>
          <Text style={styles.text}>Sign in to access your account</Text>
        </View>

        <View style={styles.inputConteiner}>
          <TextInput
            style={this.state.usernameWarrning == false ? styles.input : styles.error}
            placeholder={'Username'}
            underlineColorAndroid="transparent"
            onChangeText={username => this.validateUsername(username)}
            returnKeyType={"next"}
            onSubmitEditing={() => { this.passwordInput.focus(); }}
            blurOnSubmit={false}
          />
        </View>

        <View style={styles.inputConteiner}>
          <TextInput
            ref={(input) => { this.passwordInput = input; }}
            style={this.state.passwordWarrning == false ? styles.input : styles.error}
            placeholder={'Password'}
            secureTextEntry={this.state.showPass}
            underlineColorAndroid="transparent"
            onChangeText={password => this.validatePassword(password)}
          />

          <TouchableOpacity
            style={styles.btnEye}
            onPress={this.showPass.bind(this)}
          />
        </View>

        <View style={styles.btnConteiner}>
          <TouchableOpacity style={styles.btnLogin} onPress={this.login}>
            <Text style={styles.textBtn}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('forgotPass')}>
            <Text style={styles.textForgot}>Forgot username or password?</Text>
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
    borderRadius: 5,
    fontSize: 16,
    fontWeight: '300',
    opacity: 0.8,
    textAlign: 'center',
    borderColor: '#2699fb',
    borderWidth: 0.5,
  },
  error: {
    width: WIDTH - 55,
    height: 35,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: '300',
    opacity: 0.8,
    textAlign: 'center',
    borderColor: 'red',
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
