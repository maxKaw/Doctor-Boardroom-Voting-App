import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, Text, Dimensions , TextInput, TouchableOpacity, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import shortid from "shortid";
import { Autocomplete, withKeyboardAwareScrollView } from "react-native-dropdown-autocomplete";
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { Header, Icon } from 'react-native-elements';

const { width: WIDTH } = Dimensions.get('window');
class ModifyPatient extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            emailAddress: "",
            phoneNumber: "",
            description: "",
            patientID: "",
            names: [],
        }
    }

    // Gathering all the names and storing them in the 'names' variable
    componentDidMount() {
        axios({
            method: 'post',
            url: 'http://simpl3daveftp.com/modifyPatient.php',
        }).then(response => {
            //handle success
            this.setState({ names: response.data });
        }).catch(function (response) {
            //handle error
            alert(response);
        });
    }


    //handling selected name and id of the patient
    handleSelectItem(item) {
        const { onDropdownClose } = this.props;
        onDropdownClose();
        this.setState({ firstName: item.firstName,
            lastName: item.lastName,
            emailAddress: item.email,
            phoneNumber: item.phone,
            description: item.desc,
            patientID: item.id
        });
    }

    changeFirstname = () => {

      const { firstName, patientID } = this.state;
      const form = new FormData();

      const validation = 1;

      if(firstName==""){
        //alert('please fill the first name');
        this.setState({ErrorFirst: 'please fill the First Name'});
        validation = 0;
      }else if(firstName.match(/\d/)){
        //alert('please fill the last name');
        this.setState({ErrorFirst: 'name can not contain numbers'});
        validation = 0;

      }

      form.append('firstNameInput', firstName);
        form.append('id', patientID);
        if(validation==1){
        axios({
            method: 'post',
            url: 'http://simpl3daveftp.com/changeFirstnamePatient.php',
            data: form,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(function (response) {
                //handle success
                if (response.data == false) {
                    alert("First Name couldn't be changed! Try different one !")
                } else if (response.data == true) {
                    alert("First Name changed!");
                }
            })
            .catch(function (response) {
                //handle error
                alert(response);
            });
          }
    }


    changeLastName = () => {
        const { lastName, patientID } = this.state;
        const form = new FormData();

        const validation = 1;

        if(lastName==""){
          //alert('please fill the first name');
          this.setState({ErrorLast: 'please fill the Last Name'});
          validation = 0;
        }else if(lastName.match(/\d/)){
          //alert('please fill the last name');
          this.setState({ErrorLast: 'name can not contain numbers'});
          validation = 0;
        }

        form.append('lastNameInput', lastName);
        form.append('id', patientID);
        if($validation==1){
        axios({
            method: 'post',
            url: 'http://simpl3daveftp.com/changeLastnamePatient.php',
            data: form,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(function (response) {
                //handle success
                if (response.data == false) {
                    alert("Last Name couldn't be changed! Try different one !");
                } else if (response.data == true) {
                    alert("Last Name changed!");
                }
            })
            .catch(function (response) {
                //handle error
                alert(response);
            });
    }
  }

    changeEmail = () => {
        const { emailAddress, patientID } = this.state;
        const form = new FormData();
        form.append('emailAddressInput', emailAddress);
        form.append('id', patientID);
        axios({
            method: 'post',
            url: 'http://simpl3daveftp.com/changeEmailPatient.php',
            data: form,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        }).then(function (response) {
            //handle success
            if (response.data == false) {
                alert("Email address couldn't be changed! It might be already used!");
            } else if (response.data == true) {
                alert("Email address changed!");
            }
        })
            .catch(function (response) {
                //handle error
                alert(response);
            });
    }

    changePhoneNumber = () => {
        const { phoneNumber, patientID } = this.state;
        const form = new FormData();

        const validation = 1;

        if(/[A-Z]/.test(phoneNo)){
       //  alert('please fill the last name');
           this.setState({ErrorPhone: 'phone number can not contain letters'});
           validation = 0;
       }else if(phoneNo==""){
       //  alert('please fill the last name');
           this.setState({ErrorPhone: 'please fill the phonenumber'});
           validation = 0;
         }
        form.append('phoneNumberInput', phoneNumber);
        form.append('id', patientID);
        if(validation==1){
        axios({
            method: 'post',
            url: 'http://simpl3daveftp.com/changePhoneNumberPatient.php',
            data: form,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(function (response) {
                //handle success
                if (response.data == false) {
                    alert("Phone number couldn't be changed! Try different one !");
                } else if (response.data == true) {
                    alert("Phone number changed!");
                }
            })
            .catch(function (response) {
                //handle error
                alert(response);
            });
    }
  }

    changeDescription = () => {
        const { description, patientID } = this.state;
        const form = new FormData();

        const validation = 1;

        if(description==""){
       //  alert('please fill the last name');
           this.setState({ErrorDesc: 'please fill the description'});
           validation = 0;

       }
        form.append('descriptionInput', description);
        form.append('id', patientID);
        if(validation==1){
        axios({
            method: 'post',
            url: 'http://simpl3daveftp.com/changeDescriptionPatient.php',
            data: form,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(function (response) {
                //handle success
                if (response.data == false) {
                    alert("Description couldn't be changed! Try different one !");
                } else if (response.data == true) {
                    alert("Description changed!");
                }
            })
            .catch(function (response) {
                //handle error
                alert(response);
            });
    }
  }

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
                    centerComponent={{ text: 'Modify Patient', style: { color: '#fff' } }}
                />

                {/* The whole code for autocompleting input form*/}
                <SafeAreaView>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Please, type in the name of the patient.</Text>
                    </View>
                    <Autocomplete
                        key={shortid.generate()}
                        inputContainerStyle={styles.inputConteiner}
                        inputStyle={styles.input}
                        scrollToInput={ev => scrollToInput(ev)}
                        handleSelectItem={(item) => this.handleSelectItem(item)}
                        onDropdownClose={() => onDropdownClose()}
                        onDropdownShow={() => onDropdownShow()}
                        // Here put the data
                        data={this.state.names}
                        minimumCharactersCount={2}
                        spinnerStyle={styles.spinnerStyle}
                        highlightText
                        placeholder={'Name'}
                        // Accessing the name from the array
                        valueExtractor={item => item.name}
                    />
                </SafeAreaView>

                {/* First Name */}
                <View style={styles.inputConteiner}>
                <Text style={{color:'red', textAlign:'center'}}>
                  {this.state.ErrorFirst}
                </Text>
                <Text>First Name</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.firstName}
                        placeholderTextColor="#2699fb"
                        underlineColorAndroid="transparent"
                        autoCompleteType='name'
                        textContentType="name"
                        onChangeText={firstName => this.setState({ firstName })}
                    />
                    <View style={styles.btnConteiner}>
                        <TouchableOpacity style={styles.btnEnter2} onPress={this.changeFirstname}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 10, marginTop: 13, }}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Last Name */}
                <View style={styles.inputConteiner}>
                <Text style={{color:'red', textAlign:'center'}}>
                  {this.state.ErrorLast}
                </Text>
                <Text>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.lastName}
                        placeholderTextColor="#2699fb"
                        underlineColorAndroid="transparent"
                        autoCompleteType='name'
                        textContentType="name"
                        onChangeText={lastName => this.setState({ lastName })}
                    />
                    <View style={styles.btnConteiner}>
                        <TouchableOpacity style={styles.btnEnter2} onPress={this.changeLastName}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 10, marginTop: 13, }}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Email addres */}
                <View style={styles.inputConteiner}>
                <Text>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.emailAddress}
                        placeholderTextColor="#2699fb"
                        underlineColorAndroid="transparent"
                        autoCompleteType='email'
                        keyboardType='email-address'
                        textContentType="emailAddress"
                        onChangeText={emailAddress => this.setState({ emailAddress })}
                    />
                    <View style={styles.btnConteiner}>
                        <TouchableOpacity style={styles.btnEnter2} onPress={this.changeEmail}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 10, marginTop: 13, }}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Phone number */}
                <View style={styles.inputConteiner}>
                <Text style={{color:'red', textAlign:'center'}}>
                  {this.state.ErrorPhone}
                </Text>
                <Text>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.phoneNumber}
                        placeholderTextColor="#2699fb"
                        underlineColorAndroid="transparent"
                        autoCompleteType='tel'
                        keyboardType='phone-pad'
                        textContentType="telephoneNumber"
                        onChangeText={phoneNumber => this.setState({ phoneNumber })}
                    />
                    <View style={styles.btnConteiner}>
                        <TouchableOpacity style={styles.btnEnter2} onPress={this.changePhoneNumber}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 10, marginTop: 13, }}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Description */}
                <View style={styles.inputConteiner}>
                <Text style={{color:'red', textAlign:'center'}}>
                  {this.state.ErrorDesc}
                </Text>
                <Text>Medical Status</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.description}
                        placeholderTextColor="#2699fb"
                        underlineColorAndroid="transparent"
                        autoCompleteType='tel'
                        onChangeText={description => this.setState({ description })}
                    />
                    <View style={styles.btnConteiner}>
                        <TouchableOpacity style={styles.btnEnter2} onPress={this.changeDescription}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 10, marginTop: 13, }}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    textContainer: {
        alignItems: 'center',
    },
    text: {
        marginTop: 40,
    },
    inputConteiner: {
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
    spinnerStyle: {
        left: 2,
    },
    btnConteiner: {
        marginTop: 5,
        alignItems: 'center',
    },
    btnEnter2: {
    width: 200,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#f45869',
    alignItems: 'center',
    },
});

export default withKeyboardAwareScrollView(ModifyPatient);
