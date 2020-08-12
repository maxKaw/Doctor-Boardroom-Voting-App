import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import shortid from "shortid";
import { Header, Icon } from 'react-native-elements';
import { Autocomplete, withKeyboardAwareScrollView } from "react-native-dropdown-autocomplete";
import axios from 'axios';
import validate from 'validate';

const { width: WIDTH } = Dimensions.get('window');
class ProfileSettings extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            emailAddress: "",
            emailWarrning: false,
            firstNameWarrning: false,
            lastNameWarrning: false,
            phoneNumber: "",
            phoneNumberWarrning: false,
            passwordWarrning: false,
            spec: "",
            specID: 0,
            allSpec: [],
        };
    };

    // Gets the details of the specific user together with all the specialisations available 
    componentDidMount() {
        axios({
            method: 'post',
            url: 'http://simpl3daveftp.com/getDetails.php',
        }).then(response => {
            //handle success
            this.setState({ firstName: response.data.firstname, lastName: response.data.lastname, emailAddress: response.data.emailAddress, phoneNumber: response.data.phoneNumber, spec: response.data.spec, specID: response.data.specID, allSpec: response.data.allSpec });
        }).catch(function (response) {
            //handle error
            alert(response)
        });
    };

    // Changes first name - trigged by the button assigned 
    changeFristname = () => {
        const { firstName } = this.state;
        // Checks whether appropriate format of the first name is provided
        if (this.state.firstNameWarrning == false) {
            const form = new FormData();
            form.append('firstNameInput', firstName);
            axios({
                method: 'post',
                url: 'http://simpl3daveftp.com/changeFirstname.php',
                data: form,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            })
                .then(function (response) {
                    //handle success
                    if (response.data == false) {
                        alert("Firstname couldn't be changed! Try different one !")
                    } else if (response.data == true) {
                        alert("Firstname changed!")
                    }
                })
                .catch(function (response) {
                    //handle error
                    alert(response)
                });
        } else {
            alert("Check the format of the first name");
        }
    };


    // Changes last name - trigged by the button assigned 
    changeLastName = () => {
        const { lastName } = this.state;
        // Checks whether appropriate format of the last name is provided
        if (this.state.lastNameWarrning == false) {
            const form = new FormData();
            form.append('lastNameInput', lastName);
            axios({
                method: 'post',
                url: 'http://simpl3daveftp.com/changeLastname.php',
                data: form,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            })
                .then(function (response) {
                    //handle success
                    if (response.data == false) {
                        alert("Lastname couldn't be changed! Try different one !")
                    } else if (response.data == true) {
                        alert("Lastname changed!")
                    }
                })
                .catch(function (response) {
                    //handle error
                    alert(response)
                });
        } else {
            alert("Check the format of the last name");
        }
    };

    // Changes email address - trigged by the button assigned 
    changeEmail = () => {
        const { emailAddress } = this.state;
        // Checks whether appropriate format of the email address is provided
        if (this.state.emailWarrning == false) {
            const form = new FormData();
            form.append('emailAddressInput', emailAddress);
            axios({
                method: 'post',
                url: 'http://simpl3daveftp.com/changeEmail.php',
                data: form,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            }).then(function (response) {
                //handle success
                if (response.data == false) {
                    alert("Email address couldn't be changed! It might be already used!")
                } else if (response.data == true) {
                    alert("Email address changed!")
                }
            })
                .catch(function (response) {
                    //handle error
                    alert(response)
                });
        } else {
            alert("Check the format of the email address!");
        }
    };

    // Changes phone number - trigged by the button assigned 
    changePhoneNumber = () => {
        const { phoneNumber } = this.state;
        // Checks whether appropriate format of the phone number is provided
        if (this.state.phoneNumberWarrning == false) {
            const form = new FormData();
            form.append('phoneNumberInput', phoneNumber);
            axios({
                method: 'post',
                url: 'http://simpl3daveftp.com/changePhoneNumber.php',
                data: form,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            })
                .then(function (response) {
                    //handle success
                    if (response.data == false) {
                        alert("Phone number couldn't be changed! Try different one !")
                    } else if (response.data == true) {
                        alert("Phone number changed!")
                    }
                })
                .catch(function (response) {
                    //handle error
                    alert(response)
                });
        } else {
            alert("Check the format of the phone number!");
        }
    };

    // Changes password - trigged by the button assigned 
    changePassword = () => {
        const { password } = this.state;
        // Checks whether appropriate format of the password is provided
        if (this.state.passwordWarrning == false) {
            const form = new FormData();
            form.append('passwordInput', password);
            axios({
                method: 'post',
                url: 'http://simpl3daveftp.com/changePassword.php',
                data: form,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            })
                .then(function (response) {
                    //handle success
                    if (response.data == false) {
                        alert("Password couldn't be changed! Try different one !")
                    } else if (response.data == true) {
                        alert("Password changed!")
                    }
                })
                .catch(function (response) {
                    //handle error
                    alert(response)
                });
        } else {
            alert("Check the format of the password!");
        }
    };

    showPass = () => {
        if (this.state.press == false) {
            this.setState({ showPass: false, press: true });
        } else {
            this.setState({ showPass: true, press: false });
        }
    };

    // Handling change of the specialication 
    handleSelectItem(item) {
        const { onDropdownClose } = this.props;
        onDropdownClose();
        const form = new FormData();
        form.append('specID', item.SpecID);
        axios({
            method: 'post',
            url: 'http://simpl3daveftp.com/changeSpecialisation.php',
            data: form,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(function (response) {
                //handle success
                if (response.data == false) {
                    alert("Specialisation couldn't be changed! Try different one !")
                } else if (response.data == true) {
                    alert("Specialisation changed!")
                }
            })
            .catch(function (response) {
                //handle error
                alert(response)
            });
    };

    // Checks validaion of provided email address
    validateEmail = (text) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(text)) {
            // Positive
            this.setState({ emailAddress: text, emailWarrning: false })
        }
        else {
            // Negative 
            this.setState({ emailWarrning: true })
        }
    }

    // Checks validaion of provided first name
    validateFirstName = (text) => {
        let re = /^[a-zA-Z]{2,30}$/;
        if (re.test(text)) {
            // Positive
            this.setState({ firstName: text, firstNameWarrning: false })
        }
        else {
            // Negative 
            this.setState({ firstNameWarrning: true })
        }
    }

    // Checks validaion of provided last name
    validateLastName = (text) => {
        let re = /^[a-zA-Z]{2,30}$/;
        if (re.test(text)) {
            // Positive
            this.setState({ lastName: text, lastNameWarrning: false })
        }
        else {
            // Negative 
            this.setState({ lastNameWarrning: true })

        }
    }

    // Checks validaion of provided phone number
    validatePhoneNumber = (text) => {
        let re = /^[0-9]{10,13}$/;
        if (re.test(text)) {
            // Positive
            this.setState({ phoneNumber: text, phoneNumberWarrning: false })
        }
        else {
            // Negative 
            this.setState({ phoneNumberWarrning: true })

        }
    }

    // Checks validaion of provided password
    validatePassword = (text) => {
        let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,30})/;
        if (re.test(text)) {
            // Positive
            this.setState({ password: text, passwordWarrning: false })
        }
        else {
            // Negative 
            this.setState({ passwordWarrning: true })

        }
    }



    render() {
        const { scrollToInput, onDropdownClose, onDropdownShow } = this.props;
        return (
            <View style={styles.container}>

                {/* Header */}
                <Header
                    leftComponent={<MaterialIcons
                        name="menu"
                        color="white"
                        size={35}
                        onPress={() => this.props.navigation.toggleDrawer()}
                    />}
                    centerComponent={{ text: 'Profile Settings', style: { color: '#fff' } }}
                />

                <View style={styles.SquareShapeView}>

                    {/* First Name input field */}
                    <View style={styles.inputConteiner}>
                        <Text style={{ fontWeight: 'bold' }}>First Name</Text>
                        <TextInput
                            style={this.state.firstNameWarrning == false ? styles.input : styles.error}
                            placeholder={"First name"}
                            defaultValue={this.state.firstName}
                            placeholderTextColor="#2699fb"
                            underlineColorAndroid="transparent"
                            autoCompleteType='name'
                            textContentType="name"
                            onChangeText={firstName => this.validateFirstName(firstName)}
                        />
                        <View style={styles.btnConteiner}>
                            <TouchableOpacity style={styles.btnEnter2} onPress={this.changeFristname}>
                                <Text style={{ color: 'white', fontSize: 10, margin: 13, }}>Change</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    {/* Last Name input field */}
                    <View style={styles.inputConteiner}>
                        <Text style={{ fontWeight: 'bold' }}>Last Name</Text>
                        <TextInput
                            style={this.state.lastNameWarrning == false ? styles.input : styles.error}
                            placeholder={"Last name"}
                            defaultValue={this.state.lastName}
                            placeholderTextColor="#2699fb"
                            underlineColorAndroid="transparent"
                            autoCompleteType='name'
                            textContentType="name"
                            onChangeText={lastName => this.validateLastName(lastName)}
                        />
                        <View style={styles.btnConteiner}>
                            <TouchableOpacity style={styles.btnEnter2} onPress={this.changeLastName}>
                                <Text style={{ color: 'white', fontSize: 10, margin: 13, }}>Change</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Email addres input field */}
                    <View style={styles.inputConteiner}>
                        <Text style={{ fontWeight: 'bold' }}>Email Address</Text>
                        <TextInput
                            style={this.state.emailWarrning == "" ? styles.input : styles.error}
                            placeholder={'Email Address'}
                            defaultValue={this.state.emailAddress}
                            placeholderTextColor="#2699fb"
                            underlineColorAndroid="transparent"
                            autoCompleteType='email'
                            keyboardType='email-address'
                            textContentType="emailAddress"
                            onChangeText={emailAddress => this.validateEmail(emailAddress)}
                        />
                        <View style={styles.btnConteiner}>
                            <TouchableOpacity style={styles.btnEnter2} onPress={this.changeEmail}>
                                <Text style={{ color: 'white', fontSize: 10, margin: 13, }}>Change</Text>
                            </TouchableOpacity>
                        </View>
                    </View>



                    {/* Phone number input field */}
                    <View style={styles.inputConteiner}>
                        <Text style={{ fontWeight: 'bold' }}>Phone Number</Text>
                        <TextInput
                            style={this.state.phoneNumberWarrning == "" ? styles.input : styles.error}
                            placeholder={'Phone Number'}
                            defaultValue={this.state.phoneNumber}
                            placeholderTextColor="#2699fb"
                            underlineColorAndroid="transparent"
                            autoCompleteType='tel'
                            dataDetectorTypes='phoneNumber'
                            keyboardType='phone-pad'
                            textContentType="telephoneNumber"
                            onChangeText={phoneNumber => this.validatePhoneNumber(phoneNumber)}
                        />
                        <View style={styles.btnConteiner}>
                            <TouchableOpacity style={styles.btnEnter2} onPress={this.changePhoneNumber}>
                                <Text style={{ color: 'white', fontSize: 10, margin: 13, }}>Change</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Password input field*/}
                    <View style={styles.inputConteiner}>
                        <Text style={{ fontWeight: 'bold' }}>Password</Text>
                        <TextInput
                            style={this.state.passwordWarrning == "" ? styles.input : styles.error}
                            placeholder={'Password'}
                            placeholderTextColor="#2699fb"
                            underlineColorAndroid="transparent"
                            autoCompleteType='password'
                            secureTextEntry={this.state.showPass}
                            textContentType="password"
                            secureTextEntry={this.state.showPass}
                            onChangeText={password => this.validatePassword(password)}
                        />
                        <Text style={styles.passwordText}>Password must be between 8 and 30 characters long, cont 1 uppercase letter and 1 number</Text>
                        <View style={styles.btnConteiner}>
                            <TouchableOpacity style={styles.btnEnter2} onPress={this.changePassword}>
                                <Text style={{ color: 'white', fontSize: 10, margin: 13, }}>Change</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 3,
        zIndex: 1
    },

    passwordText: {
        margin: 9,
        opacity: 0.5
    },

    containerSA: {
        flex: 1,
    },
    container: {
        alignItems: 'center',
        backgroundColor: 'white'
    },
    inputConteiner: {
        alignItems: 'center',
        marginTop: 5
    },
    logoContainer: {
        width: WIDTH,
        alignItems: 'center',
        backgroundColor: '#2699fb',
    },
    textBtn: {
        fontSize: 14,
        color: 'white',
        marginTop: 10,
    },
    btnEnter2: {
    width: 200,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#f45869',
    alignItems: 'center',
    },
    textContiainer: {
        paddingBottom: 40,
        paddingTop: 20,
    },
    btnConteiner: {
        marginTop: 5,
        alignItems: 'center',
    },
    logoText: {
        color: 'white',
        fontSize: 18,
        marginTop: 40,
        fontWeight: '400',
    },
    statusText: {
        color: 'white',
        fontSize: 11,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: '400',
    },
    btnEye: {
        position: 'absolute',
        top: 8,
        left: 37,
    },
    error: {
        width: WIDTH - 55,
        height: 35,
        borderRadius: 5,
        fontSize: 16,
        fontWeight: '300',
        opacity: 0.8,
        borderColor: 'red',
        borderWidth: 0.5,
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
    btnContinue: {
        width: WIDTH - 250,
        height: 45,
        borderRadius: 1,
        backgroundColor: '#5d7c9c',
        alignItems: 'center',
    },
    text: {
        color: '#000000',
        fontSize: 16,
        textAlign: 'center',
    },
    spinnerStyle: {
        left: 2,
    },

});

export default withKeyboardAwareScrollView(ProfileSettings);
