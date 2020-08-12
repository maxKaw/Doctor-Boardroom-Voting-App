import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  CheckBox,
  Keyboard,
} from 'react-native';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import { Header, Icon } from 'react-native-elements';
// You can import from local files
import { Form, TextValidator } from 'react-native-validator-form';
//import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';
import logo from '../pics/logo.png';
import axios from 'axios';

const { width: WIDTH } = Dimensions.get('window');
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showPass: true,
      press: false,
      firstName: '',
      surname: '',
      phoneNo: '',
      email: '',
      description: '',
    };
  }

  handleChange = (email) => {
    this.setState({ email });
  }
  createPatient = () => {

    const { firstName, surname, email, phoneNo, description } = this.state;
    const form = new FormData();

    let validation = 1;

    if (firstName == "") {
      //alert('please fill the first name');
      this.setState({ Error: 'Please fill the first name' });
      validation = 0;
      return validation;
    } else if (firstName.match(/\d/)) {
      //  alert('please fill the last name');
      this.setState({ Error: 'Name can not contain numbers' });
      validation = 0;
      return validation;
    } else if (surname.match(/\d/)) {
      //  alert('please fill the last name');
      this.setState({ Error: 'Surname can not contain numbers' });
      validation = 0;
      return validation;

    } else if (surname == "") {
      //  alert('please fill the last name');
      this.setState({ Error: 'Please fill the last name' });
      validation = 0;
      return validation;

    } else if (/[A-Z]/.test(phoneNo)) {
      //  alert('please fill the last name');
      this.setState({ Error: 'Phone number can not contain letters' });
      validation = 0;
      return validation;
    } else if (phoneNo == "") {
      //  alert('please fill the last name');
      this.setState({ Error: 'Please fill the phonenumber' });
      validation = 0;
      return validation;

    } else if (description == "") {
      //  alert('please fill the last name');
      this.setState({ Error: 'Please fill the description' });
      validation = 0;
      return validation;

    }

    form.append('firstNameInput', firstName);
    form.append('surnameInput', surname);
    form.append('emailInput', email);
    form.append('phoneNoInput', phoneNo);
    form.append('descriptionInput', description);

    if (validation == 1) {
      axios({
        method: 'post',
        url: 'http://simpl3daveftp.com/createPatient.php',
        data: form,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
        .then(function (response) {
          //handle success
          if (response.data == false) {
            alert("Patient could not be created.")
          } else if (response.data == true) {
            alert("Patient created!");
            this.setState({ firstName: "" });
            this.setState({ surname: "" });
            this.setState({ phoneNo: "" });
            this.setState({ email: "" });
            this.setState({ description: "" });
          }
        })
        .catch(function (response) {
          //handle error
          alert(response.data)
        });
    }
    Keyboard.dismiss();
  }

  showPass = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true });
    } else {
      this.setState({ showPass: true, press: false });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={<MaterialIcons
            name="menu"
            color="white"
            size={35}
            onPress={() => this.props.navigation.toggleDrawer()}
          />}
          centerComponent={{ text: 'Create Patient', style: { color: '#fff' } }}
        />

        <View style={styles.textContiainer}>
          <Text style={styles.text}>Create a new Patient</Text>
        </View>


        <View style={styles.inputConteiner}>
          <TextInput
            style={styles.input}
            placeholder={'First name'}
            underlineColorAndroid="transparent"
            maxLength={30}
            onChangeText={firstName => this.setState({ firstName })}
            returnKeyType={"next"}
            onSubmitEditing={() => { this.surnameInput.focus(); }}
            blurOnSubmit={false}
          />
        </View>

        <View style={styles.inputConteiner}>
          <TextInput
            ref={(input) => { this.surnameInput = input; }}
            style={styles.input}
            placeholder={'Surname'}
            underlineColorAndroid="transparent"
            maxLength={30}
            onChangeText={surname => this.setState({ surname })}
            returnKeyType={"next"}
            onSubmitEditing={() => { this.emailInput.focus(); }}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.inputConteiner}>
          <TextInput
            ref={(input) => { this.emailInput = input; }}
            style={styles.input}
            placeholder={'Email'}
            underlineColorAndroid="transparent"
            maxLength={30}
            onChangeText={email => this.setState({ email })}
            returnKeyType={"next"}
            onSubmitEditing={() => { this.phoneNumberInput.focus(); }}
            blurOnSubmit={false}
          />
        </View>

        <View style={styles.inputConteiner}>
          <TextInput
            ref={(input) => { this.phoneNumberInput = input; }}
            style={styles.input}
            placeholder={'Phone Number'}
            underlineColorAndroid="transparent"
            keyboardType='phone-pad'
            textContentType="telephoneNumber"
            maxLength={11}
            onChangeText={phoneNo => this.setState({ phoneNo })}
            returnKeyType={"next"}
            onSubmitEditing={() => { this.medicalDescInput.focus(); }}
            blurOnSubmit={false}
          />
        </View>

        <View style={styles.inputConteiner}>
          <TextInput
            ref={(input) => { this.medicalDescInput = input; }}
            style={styles.input}
            placeholder={'Medical Description'}
            underlineColorAndroid="transparent"
            maxLength={50}
            onChangeText={description => this.setState({ description })}
          />
        </View>

        <View style={styles.btnContainer}>

          <TouchableOpacity style={styles.btnEnter} onPress={this.createPatient}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 10, marginTop: 13, alignSelf: 'center', }}>CREATE</Text>
          </TouchableOpacity>
          <Text style={{ color: 'red', textAlign: 'center' }}>
            {this.state.Error}
          </Text>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'white'
  },

  checkBox: {
    borderColor: 'blue',
  },
  inputSpecConteiner: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 75,
    height: 75,
    marginTop: 10,
  },
  logoContainer: {
    backgroundColor: '#2699fb',
    height: 100,
  },
  spinnerStyle: {
    left: 2,
  },
  textBtnBlue: {
    fontSize: 20,
    color: '#2699fb',
    marginTop: 5,
    alignSelf: 'center',
  },

  btnContainer: {
    marginTop: 70,
    alignItems: 'center',
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
  btnEye: {
    position: 'absolute',
    top: 8,
    left: 37,
  },
  btnEnter: {
    marginTop: 80,
    width: 200,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#f45869',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 16,
    textAlign: 'center',
  },
});
