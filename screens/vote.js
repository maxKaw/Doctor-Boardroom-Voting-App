import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, Text, Dimensions, Picker, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { Header, Icon } from 'react-native-elements';
import shortid from "shortid";
import moment from 'moment';

const { width: WIDTH } = Dimensions.get('window');
export default class showBoardrooms extends React.Component {
    constructor() {
        super();
        this.state = {
            Answers: [],
            MedicalStatus: "",
        }
    }


    componentDidMount() {
        this.getData();
    }
    
    // Fetch al the answer option asigned to the question. Details of the questions are sent from the previous screen
    getData = () => {
        const { navigation } = this.props;
        const question = navigation.getParam('question', 'none');
        this.setState({ MedicalStatus : question.MedicalStatus });
        const form = new FormData();
        form.append('questionIDinput', question.QuestionID);
        axios({
            method: 'post',
            url: 'http://simpl3daveftp.com/getAnswerOptions.php',
            data: form,
        }).then(response => {
            //handle success
            this.setState({ Answers: response.data });
        }).catch(function (response) {
            //handle error
            alert(response)
        });
    }

    // Alert window to make sure if the user wants to vote on clicked option
    alertWindow(data) {
        const { navigate } = this.props.navigation;
        Alert.alert(
            'Alert Title',
            'Are you sure you want to vote this answer option ?',
            [
              {text: 'Yes', onPress: () => this.vote(data)},
              {text: 'No'},
            ],
            {cancelable: false},
          );
    }

    // Sending the selected vote to the backend
    vote(data) {
        const form = new FormData();
        form.append('answerIDinput', data.AnswerID);
        axios({
            method: 'post',
            url: 'http://simpl3daveftp.com/addVote.php',
            data: form,
        }).then(response => {
            //handle success
            if (response.data == false) {
                alert("Unsuccessful added the vote");
            } else {
                this.props.navigation.goBack()
            }
        }).catch(function (response) {
            //handle error
            alert(response)
        });
    }


    // Renders the answer option for the specifc question that were returned in form of JSON file from the backend
    renderAnswers = () => {
        if (this.state.Answers.length > 0) {
            const answerOptions = this.state.Answers.map((data) =>
                <View style={styles.btnConteiner} key={data.AnswerID}>
                    <TouchableOpacity style={styles.btnEnter2} onPress={() => this.alertWindow(data)}>
                        <Text style={styles.text}>{data.Answer}</Text>
                    </TouchableOpacity>
                </View>
            );
            return answerOptions;
        } else {
            return <View style={{alignItems: 'center'}}><Text style={styles.errorText}>None answer options available</Text></View>;
        }

    }

    render() {
        return ( 
            <View style={styles.container}>
                <Header
                    leftComponent={<MaterialIcons
                        name="arrow-back"
                        color="white"
                        size={35}
                        onPress={() => this.props.navigation.goBack()}
                    />}
                    centerComponent={{ text: 'Available answer options', style: { color: '#fff' } }}
                />
                <View style={styles.medicalStatusContainer}> 
                    <Text style={styles.titleText}>Medical status: </Text>
                    <Text style={styles.medicalStatusText}>{this.state.MedicalStatus}</Text>
                </View>
                <View>
                    {this.renderAnswers()}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    titleText: {
        marginLeft: 20,
        marginRight: 20,
        color: '#2699fb',
        fontSize: 20,
        alignSelf: 'flex-start'
    },
    medicalStatusText: {
        marginLeft: 20,
        marginRight: 20,
        color: '#2699fb',
        fontSize: 16,
        alignSelf: 'flex-start'
    },
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold', 
        marginTop: 15, 
    },
    inputContainer: {
        alignItems: 'center',
    },
    medicalStatusContainer: {
        alignSelf: 'center',
        width: WIDTH,
        backgroundColor: '#f1f9ff',
        alignItems: 'center',
    },
    btnEnter2: {
        width: WIDTH - 55,
        height: 60,
        borderRadius: 5,
        backgroundColor: 'orange',
        alignItems: 'center',
    },
    boardroom: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 0,
        fontSize: 16,
        fontWeight: '300',
        opacity: 0.8,
        borderColor: 'black',
        borderWidth: 0.5,
    }, 
    btnConteiner: {
        marginTop: 10,
    },
    errorText: {
        color: '#2699fb',
        fontSize: 20,
        fontWeight: 'bold', 
        marginTop: 20, 
    }

});
