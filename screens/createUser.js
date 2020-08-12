import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
} from 'react-native';

import shortid from "shortid";
import Constants from 'expo-constants';
import MenuButton from '../components/MenuButton';
import SwitchToggle from 'react-native-switch-toggle';
import { Autocomplete, withKeyboardAwareScrollView } from "react-native-dropdown-autocomplete";
import { MaterialIcons } from '@expo/vector-icons';


// You can import from local files
//import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';
import logo from '../pics/logo.png';
import { Header, CheckBox } from 'react-native-elements';

import axios from 'axios';



const { width: WIDTH } = Dimensions.get('window');
const { height: HEIGHT } = Dimensions.get('window');
class CreateUser extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      specID: 0,
      allSpec: [],

      checked: false,
      showPass: true,
      press: false,
      emailWarning: false,
      firstNameWarning: false,
      lastNameWarning: false,
      phoneNumberWarning: false,

    };
  };

  componentDidMount() {
    axios({
      method: 'post',
      url: 'http://simpl3daveftp.com/getDetails.php',
    }).then(response => {
      //handle success
      this.setState({ allSpec: response.data.allSpec });
    }).catch(function (response) {
      //handle error
      alert(response)
    });
  };



  createNewUser = () => {
    const { specID, firstName, lastName, phoneNumber, email, checked } = this.state;
    const form = new FormData();


    form.append('firstNameInput', firstName);
    form.append('surnameInput', lastName);
    form.append('phoneNumberInput', phoneNumber);
    form.append('emailInput', email);
    form.append('privilegesInput', checked);
    form.append('specID', specID);

    if ((this.state.firstNameWarning == false) && (this.state.lastNameWarning == false) && (this.state.emailWarning == false) && (this.state.phoneNumberWarning == false)) {

      axios({
        method: 'post',
        url: 'http://simpl3daveftp.com/createUser.php',
        data: form,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
        .then(function (response) {
          //handle success
          if (response.data == false) {
            alert("Something went wrong. Please complete the form!")
          } else if (response.data == true) {
            alert("New User successfully created");
          }

        })
        .catch(function (response) {
          //handle error
          alert(response.data)
        });
    } else {
      let message = "Check the format of the inputted information:\n";
      if (this.state.firstNameWarning == true) {
        message = message + "- First name\n";
      }
      if (this.state.lastNameWarning == true) {
        message = message + "- Last name\n";
      }
      if (this.state.emailWarning == true) {
        message = message + "- Email address\n";
      }
      if (this.state.phoneNumberWarning == true) {
        message = message + "- Phone number";
      }
      alert(message);
    }
    Keyboard.dismiss();
  };

  handleSelectItem(item) {
    const { onDropdownClose } = this.props;
    const id = item.SpecID;
    onDropdownClose();
    this.setState({ specID : id });
  };

  showPass = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true });
    } else {
      this.setState({ showPass: true, press: false });
    }
  };
  toggleDrawer = () => {
    this.props.navigation.navigate('DrawerOpen')
  };


  // ------------Validations--------------- //
  validateEmail = (text) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(text)) {
      this.setState({ email: text, emailWarning: false })
    }
    else {
      this.setState({ emailWarning: true });
    }
  };

  validateFirstName = (text) => {

    let re = /^[a-zA-Z]{2,30}$/;
    if (re.test(text)) {
      this.setState({ firstName: text, firstNameWarning: false })
    }
    else {
      this.setState({ firstNameWarning: true });
    }
  };

  validateLastName = (text) => {
    let re = /^[a-zA-Z]{2,30}$/;
    if (re.test(text)) {
      this.setState({ lastName: text, lastNameWarning: false })
    }
    else {
      this.setState({ lastNameWarning: true });
    }
  };

  validatePhoneNumber = (text) => {
    let re = /^[0-9]{10,13}$/;
    if (re.test(text)) {
      this.setState({ phoneNumber: text, phoneNumberWarning: false })
    }
    else {
      this.setState({ phoneNumberWarning: true });
    }
  };
  //----- End of Validations --------//



  render() {

    const { scrollToInput, onDropdownClose, onDropdownShow } = this.props;

    return (

      <View style={styles.container}>
        <Header
          leftComponent={<MaterialIcons
            name="menu"
            color="white"
            size={35}
            onPress={() => this.props.navigation.toggleDrawer()}
          />}
          centerComponent={{ text: 'Create User', style: { color: '#fff' } }}
        />

        {/*<View style={styles.headContainer}>*/}
        {/*  <View style={[{flexDirection:'row'}, styles.elementsContainer]}>*/}
        {/*    */}
        {/*    <Text style={{fontWeight: 'bold',color: 'grey', fontSize: 24, marginTop: 27}}>Add a new User</Text>*/}
        {/*  </View>*/}
        {/*</View>*/}

        {/*First Name*/}
        <View style={styles.inputConteiner}>
          <TextInput
            style={this.state.firstNameWarning == "" ? styles.input : styles.error}
            placeholder={'First name'}
            underlineColorAndroid="transparent"
            maxLength={30}

            onChangeText={(firstName) => this.validateFirstName(firstName)}
            returnKeyType={"next"}
            onSubmitEditing={() => { this.lastNameInput.focus(); }}
            blurOnSubmit={false}
          />
        </View>

        {/*Last Name*/}
        <View style={styles.inputConteiner}>
          <TextInput
            ref={(input) => { this.lastNameInput = input; }}
            style={this.state.lastNameWarning == "" ? styles.input : styles.error}
            placeholder={'Surname'}
            underlineColorAndroid="transparent"
            maxLength={30}

            onChangeText={lastName => this.validateLastName(lastName)}
            returnKeyType={"next"}
            onSubmitEditing={() => { this.phoneNumberInput.focus(); }}
            blurOnSubmit={false}
          />
        </View>

        {/*Phone Number*/}
        <View style={styles.inputConteiner}>
          <TextInput
            ref={(input) => { this.phoneNumberInput = input; }}
            style={this.state.phoneNumberWarning == "" ? styles.input : styles.error}

            placeholder={'Phone Number'}
            underlineColorAndroid="transparent"
            maxLength={30}
            onChangeText={phoneNumber => this.validatePhoneNumber(phoneNumber)}
            returnKeyType={"next"}
            onSubmitEditing={() => { this.emailInput.focus(); }}
            blurOnSubmit={false}
          />
        </View>

        {/* Email */}
        <View style={styles.inputConteiner}>
          <TextInput
            ref={(input) => { this.emailInput = input; }}
            style={this.state.emailWarning == "" ? styles.input : styles.error}
            placeholder={'Email'}
            underlineColorAndroid="transparent"
            maxLength={30}
            onChangeText={email => this.validateEmail(email)}
          />
        </View>
          <SafeAreaView>
            <Autocomplete
              key={shortid.generate()}
              inputContainerStyle={styles.inputConteiner}
              inputStyle={styles.input}
              scrollToInput={ev => scrollToInput(ev)}
              handleSelectItem={(item) => this.handleSelectItem(item)}
              onDropdownClose={() => onDropdownClose()}
              onDropdownShow={() => onDropdownShow()}
              data={this.state.allSpec}
              minimumCharactersCount={2}
              spinnerStyle={styles.spinnerStyle}
              highlightText
              placeholder={'Specialisation'}
              valueExtractor={item => item.Spec}
            />
          </SafeAreaView>

          {/* Check Toggle */}
            <View style={styles.checkBox}>
              <View style={[{ flexDirection: 'row' }, styles.elementsContainer]}>

                <Text style={{ marginTop: 5, color: 'blue', marginRight: 40, }}>Select for Chairman Privileges</Text>

                <View>
                  <SwitchToggle switchOn={this.state.checked}
                    onPress={this.onPresss}
                  />
                </View>
              </View>

            </View>


<View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnEnter} onPress={this.createNewUser}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 10, marginTop: 13, alignSelf: 'center', }}>Create</Text>
          </TouchableOpacity>
        </View>

      </View>

    );
  }

  onPresss = () => {
    this.setState({ checked: !this.state.checked });
  };
}


const styles = StyleSheet.create({

  container: {
    backgroundColor: 'white'
  },

  checkBox: {
    borderColor: 'blue',
    alignItems: 'center',
    marginTop: 40,
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
  logoContainer2: {
    marginTop: 100,
    backgroundColor: '#2699fb',
    height: 100,
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
    marginTop: 60,
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
});

export default withKeyboardAwareScrollView(CreateUser);
