import React, { Component } from "react";
import {
    Button, View, StyleSheet, Text,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Keyboard,
    SafeAreaView,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Header, CheckBox } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

const { width: WIDTH } = Dimensions.get('window');
const { height: HEIGHT } = Dimensions.get('window');

import axios from 'axios';
export default class DateTimePickerTester extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boardRoomName: '',
            startDate: '',
            endDate: '',
            isDateTimePickerVisible: false,
            selecteddate: '', 
            isDateTimePickerVisible2: false,
            selecteddate2: '',
            checkBoardroom: false,
        };
    }

componentDidMount() {
    axios({
            method: 'post',
            url: 'http://simpl3daveftp.com/checkForBoardroom.php',
        }).then(response => {
            //handle success
            this.setState({ checkBoardroom: response.data });
        }).catch(function (response) {
            //handle error
            alert(response)
        });
} 
    



    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    showDateTimePicker2 = () => {
        this.setState({ isDateTimePickerVisible2: true });
    };


    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    hideDateTimePicker2 = () => {
        this.setState({ isDateTimePickerVisible2: false });
    };
    handleDatePicked = (pickeddate) => {
        const day = pickeddate.getDate();
        const month = pickeddate.getMonth();
        const year = pickeddate.getFullYear();
        console.log('A date has been picked: ' + day + '-' + month + '-' + year);
        this.setState({ startDate: day + '-' + (month + 1) + '-' + year })
        this.hideDateTimePicker();
    };

    handleDatePicked2 = (pickeddate2) => {
        const day = pickeddate2.getDate();
        const month = pickeddate2.getMonth();
        const year = pickeddate2.getFullYear();
        console.log('A date has been picked: ' + day + '-' + (month + 1) + '-' + year);
        this.setState({ endDate: day + '-' + (month + 1) + '-' + year });
        this.hideDateTimePicker2();
    };

 


    createBoardRoom = () => {
        const { boardroomName, startDate, endDate} = this.state;
        const form = new FormData();
 $validation = 1;
 
 if(startDate==""){
  //  alert('please fill the last name');
      this.setState({Error: 'Please select start date'});
      $validation = 0;
      return $validation;
  }else if(endDate==""){
  //  alert('please fill the last name');
      this.setState({Error: 'Please select the ending date'});
      $validation = 0;
      return $validation;
  }
        form.append('boardRoomNameInput', boardroomName);
        form.append('startDateTimeInput', startDate);
        form.append('endDateTimeInput', endDate);


if($validation=1){
        axios({
            method: 'post',
            url: 'http://simpl3daveftp.com/createBoardroom.php',
            data: form,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(function (response) {
                //handle success
                if (response.data == false) {
                    alert("Something went wrong")
                } else if (response.data == true) {
                    alert("New Boardroom successfully created")
                }

            })
            .catch(function (response) {
                //handle error
                alert(response.data)
            });}

        Keyboard.dismiss();
    }

    showForm = () => {
        return (
            <View>
            <View style={styles.inputConteiner}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Boardroom Name'}
                        underlineColorAndroid="transparent"
                        maxLength={30}
                        onChangeText={boardroomName => this.setState({ boardroomName })}
                    />
                </View>


                <View style={styles.inputConteiner}>
                    <Button title="Start date " onPress={this.showDateTimePicker} style={styles.btnEnter} />
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={(date) => this.handleDatePicked(date)}
                        onCancel={this.hideDateTimePicker}
                    />
                </View>

                <TextInput
                    placeholder=""
                    onFocus={() => this.showDateTimePicker()}
                    value={this.state.startDate}
                />

                <View style={styles.inputConteiner}>
                    <Button title="End date " onPress={this.showDateTimePicker2} />
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible2}
                        onConfirm={(date) => this.handleDatePicked2(date)}
                        onCancel={this.hideDateTimePicker2}
                    />

                </View>
                <TextInput
                    placeholder=""
                    onFocus={() => this.showDateTimePicker2()}
                    value={this.state.endDate}
                />
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btnEnter} onPress={this.createBoardRoom}>
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 10, marginTop: 13, alignSelf: 'center', }}>CREATE</Text>
                    </TouchableOpacity>

                </View>
                </View>);
    }

    showError = () => {
        return (<Text style={styles.errorText}> You already own a boardroom!</Text>);
    }

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
                    centerComponent={{ text: 'Create Boardroom', style: { color: '#fff' } }}
                />
<View style={styles.headContainer}>
                    <View style={[{ flexDirection: 'row' }, styles.elementsContainer]}>
<Text style={{color:'red', textAlign:'center'}}>
      {this.state.Error}
      </Text>
                    </View>
                </View>
{this.showForm()}

                
                
            </View>

        );
    }
}




const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white'
    },
    errorText: {
        color: '#2699fb',
        fontSize: 20,
        fontWeight: 'bold', 
        marginTop: 20, 
    },
    textForgot: {
        color: '#2699fb',
        textAlign: 'center',
        paddingTop: 10
    },
    logo: {
        width: 150,
        height: 150,
        marginTop: 50,
    },
    inputConteiner: {
        marginTop: 20,
        alignItems: 'center',
    },
    inputSpecConteiner: {
        alignItems: 'center',
    },
    btnEnter: {
        marginTop: 80,
        width: 200,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#f45869',
        marginLeft: 70,

        alignItems: 'center',
    },
    dropdown: {
        width: WIDTH - 55,
        height: 35,
        marginTop: 10,
        backgroundColor: '#c2c2c2',
        color: "white",
    },
    logoContainer: {
        width: WIDTH,
        height: 50,
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
        marginTop: 40,
        alignItems: 'center',

    },
    btnDateTimeConteiner: {
        marginTop: 10,
        alignItems: 'center',
    },
    logoText: {
        color: 'white',
        fontSize: 18,
        marginTop: 10,
        fontWeight: '400',
    },
    input: {
        width: WIDTH - 55,
        height: 35,
        borderRadius: 5,
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
    btnContinue: {
        width: WIDTH - 55,
        height: 35,
        borderRadius: 1,
        backgroundColor: '#fe840b',
        alignItems: 'center',
    },
    btnDateTime: {
        width: WIDTH - 55,
        height: 35,
        borderRadius: 1,
        backgroundColor: '#2699fb',
        alignItems: 'center',
    },
    text: {
        color: '#000000',
        fontSize: 16,
        textAlign: 'center',
    },
    SquareShapeView: {
        marginTop: 20,
        width: WIDTH - 55,
        height: 200,
        backgroundColor: '#2699fb',
        opacity: 0.2

    },

});
