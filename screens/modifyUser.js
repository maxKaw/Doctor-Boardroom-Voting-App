import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, Text, Dimensions, TextInput, TouchableOpacity, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import shortid from "shortid";
import { Autocomplete, withKeyboardAwareScrollView } from "react-native-dropdown-autocomplete";
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { Header, Icon } from 'react-native-elements';
import SwitchToggle from 'react-native-switch-toggle';

const { width: WIDTH } = Dimensions.get('window');
class ModifyUser extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            emailAddress: "",
            phoneNumber: "",
            userType: false,
            userID: "",
            names: [],
        }
    }

    // Gathering all the names and storing them in the 'names' variable
    componentDidMount() {
        axios({
            method: 'post',
            url: 'http://simpl3daveftp.com/modifyUser.php',
        }).then(response => {
            //handle success
            this.setState({ names: response.data });
        }).catch(function (response) {
            //handle error
            alert(response);
        });
    }


    //handling selected name and id of the user
    handleSelectItem(item) {
        const { onDropdownClose } = this.props;
        onDropdownClose();
        this.setState({
            firstName: item.firstName,
            lastName: item.lastName,
            emailAddress: item.email,
            phoneNumber: item.phone,
            userType: item.type,
            userID: item.id
        });
    }

    changeFirstname = () => {
        const { firstName, userID } = this.state;
        const form = new FormData();
        let validation = 1;
        let re = /^[a-zA-Z]{2,30}$/;
        if (!(re.test(firstName))) {
            //alert('please fill the last name');
            this.setState({ ErrorFirst: 'Only letters accepted 2 - 30 characters long' });
            validation = 0;
        }
        form.append('firstNameInput', firstName);
        form.append('id', userID);
        if (validation == 1) {
            axios({
                method: 'post',
                url: 'http://simpl3daveftp.com/changeFirstnameUser.php',
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
        const { lastName, userID } = this.state;
        const form = new FormData();
        let validation = 1;
        let re = /^[a-zA-Z]{2,30}$/;
        if (!(re.test(lastName))) {
            //alert('please fill the last name');
            this.setState({ ErrorLast: 'Only letters accepted 2 - 30 characters long' });
            validation = 0;
        }
        form.append('lastNameInput', lastName);
        form.append('id', userID);
        if (validation == 1) {
            axios({
                method: 'post',
                url: 'http://simpl3daveftp.com/changeLastnameUser.php',
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
        const { emailAddress, userID } = this.state;
        const form = new FormData();
        form.append('emailAddressInput', emailAddress);
        form.append('id', userID);
        let validation = 1;
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!(re.test(emailAddress))) {
            //alert('please fill the last name');
            this.setState({ ErrorEmail: 'Make sure that you typed in valid format of the email address' });
            validation = 0;
        }
        form.append('emailAddressInput', emailAddress);
        form.append('id', userID);
        if (validation == 1) {
            axios({
                method: 'post',
                url: 'http://simpl3daveftp.com/changeEmailUser.php',
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
    }

    changePhoneNumber = () => {
        const { phoneNumber, userID } = this.state;
        const form = new FormData();
        let validation = 1;
        let re = /^[0-9]{10,13}$/;
        if (!(re.test(phoneNumber))) {
            //  alert('please fill the last name');
            this.setState({ ErrorPhone: 'Please type in numbers only 10 - 13 characters long' });
            validation = 0;
        }
        form.append('phoneNumberInput', phoneNumber);
        form.append('id', userID);
        if (validation == 1) {
            axios({
                method: 'post',
                url: 'http://simpl3daveftp.com/changePhoneNumberUser.php',
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

    changeUserType = () => {
        const { userType, userID } = this.state;
        const form = new FormData();
        form.append('userTypeInput', userType);
        form.append('id', userID);
        axios({
            method: 'post',
            url: 'http://simpl3daveftp.com/changeTypeUser.php',
            data: form,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(function (response) {
                //handle success
                if (response.data == false) {
                    alert("User Type couldn't be changed! Try different one !");
                } else if (response.data == true) {
                    alert("User Type changed!");
                }
            })
            .catch(function (response) {
                //handle error
                alert(response);
            });
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
                    centerComponent={{ text: 'Modify User', style: { color: '#fff' } }}
                />

                {/* The whole code for autocompleting input form*/}
                <SafeAreaView>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Please, type in the name of the user.</Text>
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
                    <Text style={{ color: 'red', textAlign: 'center' }}>
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
                    <Text style={{ color: 'red', textAlign: 'center' }}>
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
                <Text style={{ color: 'red', textAlign: 'center' }}>
                        {this.state.ErrorEmail}
                    </Text>
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
                    <Text style={{ color: 'red', textAlign: 'center' }}>
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

            {/* Check Toggle */}
            <View style={styles.checkBox}>
              <View style={[{ flexDirection: 'row' }, styles.elementsContainer]}>

                <Text style={{ marginTop: 5, color: 'blue', marginRight: 40, }}>Select for Chairman Privileges</Text>

                <View>
                  <SwitchToggle switchOn={this.state.userType}
                    onPress={this.onPresss}
                  />
                </View>
              </View>

            </View>

                {/* User Type */}
                <View style={styles.inputConteiner}>
                    <View style={styles.btnConteiner}>
                        <TouchableOpacity style={styles.btnEnter2} onPress={this.changeUserType}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 10, marginTop: 13, }}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
    onPresss = () => {
        this.setState({ userType: !this.state.userType });
    };
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    checkBox: {
    borderColor: 'blue',
    alignItems: 'center',
    marginTop: 10,
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

export default withKeyboardAwareScrollView(ModifyUser);
