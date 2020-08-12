import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, Text, Dimensions, TextInput, TouchableOpacity, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import shortid from "shortid";
import { Autocomplete, withKeyboardAwareScrollView } from "react-native-dropdown-autocomplete";
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { Header, Icon } from 'react-native-elements';

const { width: WIDTH } = Dimensions.get('window');
console.disableYellowBox = true;



class deleteUser extends Component {



    //Variable inicialization
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            emailAddress: "",
            phoneNumber: "",
            userType: "",
            userID: 0,
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
            userID: item.id,
        });
    }


    //deleting user record (passing variable with user ID to php backend script)
    deleteUserRecord = () => {
        const { userID } = this.state;
        const form = new FormData();
        form.append('id', userID);
        axios({
            method: 'post',
            url: 'http://simpl3daveftp.com/deleteUser.php',
            data: form,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(function (response) {
                //handle success
                if (response.data == false) {
                    alert("Could not delete the user!");
                } else if (response.data == true) {
                    alert("User Deleted Successfully!");
                    this.setState({ firstName: "" });
                    this.setState({ lastName: "" });
                    this.setState({ phoneNumber: "" });
                    this.setState({ emailAddress: "" });
                    this.setState({ userType : "" });
                    this.setState({ userID : 0 });



                }
            })
            .catch(function (response) {
                //handle error
                alert(response);
            });
    };

    combinedFuncion = () => {
        this.deleteUserRecord();
        this.clearText();
    }

    clearText = () => {
        this._textInput.setNativeProps({ text: '' });
    }


    render() {

        const { scrollToInput, onDropdownClose, onDropdownShow } = this.props;
        const isLoggedIn = this.state.userType;


        return (
            <View style={styles.container}>
                <Header
                    leftComponent={<MaterialIcons
                        name="menu"
                        color="white"
                        size={35}
                        onPress={() => this.props.navigation.toggleDrawer()}
                    />}
                    centerComponent={{ text: 'Delete User', style: { color: '#fff' } }}
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
                        minimumCharactersCount={0}
                        spinnerStyle={styles.spinnerStyle}
                        highlightText
                        placeholder={'Name'}
                        // Accessing the name from the array
                        valueExtractor={item => item.name}
                    />
                </SafeAreaView>

                {/* First Name */}
                <View style={styles.inputConteiner}>
                    <Text>First Name</Text>
                    <TextInput
                        style={styles.input}
                        ref={component => this._textInput = component}
                        placeholder={this.state.firstName}
                        placeholderTextColor="#2699fb"
                        underlineColorAndroid="transparent"
                        autoCompleteType='name'
                        textContentType="name"
                        editable={false}
                        onChangeText={firstName => this.setState({ firstName })}
                    />

                </View>

                {/* Last Name */}
                <View style={styles.inputConteiner}>
                    <Text>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        ref={component => this._textInput = component}
                        placeholder={this.state.lastName}
                        placeholderTextColor="#2699fb"
                        underlineColorAndroid="transparent"
                        autoCompleteType='name'
                        textContentType="name"
                        editable={false}
                        onChangeText={lastName => this.setState({ lastName })}
                    />

                </View>

                {/* Email addres */}
                <View style={styles.inputConteiner}>
                    <Text>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        ref={component => this._textInput = component}
                        placeholder={this.state.emailAddress}
                        placeholderTextColor="#2699fb"
                        underlineColorAndroid="transparent"
                        autoCompleteType='email'
                        keyboardType='email-address'
                        textContentType="emailAddress"
                        editable={false}
                        onChangeText={emailAddress => this.setState({ emailAddress })}
                    />

                </View>

                {/* Phone number */}
                <View style={styles.inputConteiner}>
                    <Text>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        ref={component => this._textInput = component}
                        placeholder={this.state.phoneNumber}
                        placeholderTextColor="#2699fb"
                        underlineColorAndroid="transparent"
                        autoCompleteType='tel'
                        keyboardType='phone-pad'
                        textContentType="telephoneNumber"
                        editable={false}
                        onChangeText={phoneNumber => this.setState({ phoneNumber })}
                    />

                </View>

                {/* User Type */}
                <View style={styles.inputConteiner}>
                    <Text>User Type</Text>
                    <TextInput
                        style={styles.input}
                        //userType
                        placeholder={this.state.userType}
                        // placeholder={isLoggedIn ? 'Chairman' : 'not Chairman'}
                        placeholderTextColor="#2699fb"
                        underlineColorAndroid="transparent"
                        autoCompleteType='tel'
                        editable={false}
                        ref={component => this._textInput = component}
                        onChangeText={userType => this.setState({ userType })}

                    />

                </View>
                {/* Delete user*/}
                <View style={styles.btnConteiner}>
                    <TouchableOpacity style={styles.btnLogin} onPress={this.combinedFuncion} >
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 15, marginTop: 7, }}>Delete User</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    btnLogin: {
    marginTop: 80,
    width: 200,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#f45869',
    alignItems: 'center',
    },
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
        margin: 15,
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
        width: 120,
        height: 30,
        borderRadius: 5,
        backgroundColor: 'orange',
        alignItems: 'center',
    },
});

export default withKeyboardAwareScrollView(deleteUser);
