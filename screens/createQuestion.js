import * as React from 'react';
import { Component } from "react";
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
import { Container, Content, Item, Input, Icon } from 'native-base';

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


class CreateQuestion extends Component {


    static navigationOptions = {
        drawerLabel: "CreateQuestion",
    };

    constructor() {
        super();
        this.state = {
            patientID: '',
            patientName: '',
            description: '',
            answerOne: '',
            answerTwo: '',
            answerThree: '',
            answerFour: '',
            names: [],
        };
    }

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
    handleSelectItem(item) {
        const { onDropdownClose } = this.props;
        onDropdownClose();
        this.setState({
            firstName: item.firstName,
            lastName: item.lastName,
            emailAddress: item.email,
            phoneNumber: item.phone,
            description: item.desc,
            patientID: item.id
        });
    }

    createQuestion = () => {
        const { patientID, patientName, description, answerOne, answerTwo, answerThree, answerFour } = this.state;
        const form = new FormData();
        let validation = 1;

        if (patientID == "") {

            this.setState({ Error: 'Please select a patient' });
            validation = 0;
            return validation;
        } else if (description == "") {
            this.setState({ Error: 'Please type in description' });
            validation = 0;
            return validation;
        } else if (answerOne == "") {
            this.setState({ Error: 'Please type in first answer' });
            validation = 0;
            return validation;
        } else if (answerTwo == "") {
            this.setState({ Error: 'Please type in second answer' });
            validation = 0;
            return validation;
        } else if (answerThree == "") {
            this.setState({ Error: 'Please type in third answer' });
            validation = 0;
            return validation;

        } else if (answerFour == "") {
            this.setState({ Error: 'Please type in fourth answer' });
            validation = 0;
            return validation;

        }

        form.append('patientNameInput', patientName);
        form.append('descriptionInput', description);
        form.append('answerOneInput', answerOne);
        form.append('answerTwoInput', answerTwo);
        form.append('answerThreeInput', answerThree);
        form.append('answerFourInput', answerFour);
        form.append('id', patientID);


        if (validation == 1) {

            axios({
                method: 'post',
                url: 'http://simpl3daveftp.com/createQuestion.php',
                data: form,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            })
                .then(function (response) {
                    //handle success
                    if (response.data == false) {
                        alert("Something went wrong")
                    } else if (response.data == true) {
                        alert("Question successfully created")
                    }

                })
                .catch(function (response) {
                    //handle error
                    alert(response.data)
                });
        }


        Keyboard.dismiss();
    }

    toggleDrawer = () => {
        this.props.navigation.navigate('DrawerOpen')
    };


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
                    centerComponent={{ text: 'Create Question', style: { color: '#fff' } }}
                />

                <View style={styles.headContainer}>
                    <View style={[{ flexDirection: 'row' }, styles.elementsContainer]}>


                    </View>
                </View>

                <SafeAreaView>
                    <View style={styles.textContainer}>
                        <Text style={{ fontWeight: 'bold' }}>Please, type in the name of the patient.</Text>
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

                <View style={styles.inputConteiner}>
                    <Text style={{ fontWeight: 'bold' }}>Name of the patient you are adding question for</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={this.state.firstName}
                        placeholderTextColor="#2699fb"
                        underlineColorAndroid="transparent"
                        autoCompleteType='name'
                        textContentType="name"

                    />
                    <Text style={{ color: 'red', textAlign: 'center' }}>
                        {this.state.Error}
                    </Text>
                </View>
                <View style={styles.inputConteiner}>
                    <Text style={{ fontWeight: 'bold' }}>Question</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'Question'}
                        underlineColorAndroid="transparent"
                        maxLength={30}
                        onChangeText={description => this.setState({ description })}
                        returnKeyType={"next"}
                        onSubmitEditing={() => { this.firstOption.focus(); }}
                        blurOnSubmit={false}
                    />
                </View>

                <View style={styles.inputConteiner}>
                    <Text style={{ fontWeight: 'bold' }}>First answer option</Text>
                    <TextInput
                        ref={(input) => { this.firstOption = input; }}
                        style={styles.input}
                        placeholder={'Frist answer option'}
                        underlineColorAndroid="transparent"
                        maxLength={30}
                        onChangeText={answerOne => this.setState({ answerOne })}
                        returnKeyType={"next"}
                        onSubmitEditing={() => { this.secondOption.focus(); }}
                        blurOnSubmit={false}
                    />
                </View>

                <View style={styles.inputConteiner}>
                    <Text style={{ fontWeight: 'bold' }}>Second answer option</Text>
                    <TextInput
                        ref={(input) => { this.secondOption = input; }}
                        style={styles.input}
                        placeholder={'Second answer option'}
                        underlineColorAndroid="transparent"
                        maxLength={30}
                        onChangeText={answerTwo => this.setState({ answerTwo })}
                        returnKeyType={"next"}
                        onSubmitEditing={() => { this.thirdOption.focus(); }}
                        blurOnSubmit={false}
                    />
                </View>

                <View style={styles.inputConteiner}>
                    <Text style={{ fontWeight: 'bold' }}>Third answer option</Text>
                    <TextInput
                        ref={(input) => { this.thirdOption = input; }}
                        style={styles.input}
                        placeholder={'Third answer option'}
                        underlineColorAndroid="transparent"
                        maxLength={30}
                        onChangeText={answerThree => this.setState({ answerThree })}
                        returnKeyType={"next"}
                        onSubmitEditing={() => { this.fourthOption.focus(); }}
                        blurOnSubmit={false}
                    />
                </View>

                <View style={styles.inputConteiner}>
                    <Text style={{ fontWeight: 'bold' }}>Fourth answer option</Text>
                    <TextInput
                        ref={(input) => { this.fourthOption = input; }}
                        style={styles.input}
                        placeholder={'Fourth answer option'}
                        underlineColorAndroid="transparent"
                        maxLength={30}
                        onChangeText={answerFour => this.setState({ answerFour })}
                    />
                </View>


                <View style={styles.btnContainer}>


                    <TouchableOpacity style={styles.btnEnter} onPress={this.createQuestion}>
                        <Text style={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontSize: 10,
                            marginTop: 13,
                            alignSelf: 'center',
                        }}>Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


}


const styles = StyleSheet.create({



    checkBox: {
        borderColor: 'blue',
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

    btnEye: {
        position: 'absolute',
        top: 8,
        left: 37,
    },
    btnEnter: {
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

    container: {
        backgroundColor: 'white',
    },
    textContainer: {
        alignItems: 'center',
    },

    inputContainer: {
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
    }
});
export default withKeyboardAwareScrollView(CreateQuestion);

