import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, Text, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { Header, Icon } from 'react-native-elements';
import shortid from "shortid";
import moment from 'moment';
const { height } = Dimensions.get('window');
const { width: WIDTH } = Dimensions.get('window');
export default class showClosedBoardrooms extends React.Component {
    constructor() {
        super();
        this.state = {
            boardrooms: [],
            curTime: "",
            screenHeight: 0,
            timerData: 0,
        }
    }

    // Setting interval to get current date and time for all the time
    componentDidMount() {
        this.getData();
        this.setState({ timerData : setInterval(this.getData, 5000)});
        this.setState({ curTime: moment().format('DD/MM/YYYY HH:mm:ss')});
        setInterval(() => {
            this.setState({
                curTime: moment().format('DD/MM/YYYY HH:mm:ss')
            })
        }, 1000)
    }


    componentWillUnmount() {
        clearInterval(this.state.timerData, this.state.curTime);
    }

    // Fetch all the closed boardrooms from the backend
    getData = () => {
        axios({
            method: 'post',
            url: 'http://simpl3daveftp.com/getClosedBoardrooms.php',
        }).then(response => {
            //handle success
            this.setState({ boardrooms: response.data });
        }).catch(function (response) {
            //handle error
            alert(response)
        });
    }

    // Renders all the closed boardroom based on the JSON fiel returned from the backend
    renderBoardrooms = () => {
        const { navigate } = this.props.navigation;
        if (this.state.boardrooms.length > 0) {
            const boardrooms = this.state.boardrooms.map((data) =>
                <View style={styles.btnConteiner} key={data.id}>
                    <TouchableOpacity style={styles.btnEnter2} onPress={() => navigate('ViewBoardroom', { boardroom: data })}>
                        <Text style={styles.text}>Boardroom: {data.name}</Text>
                        <Text style={styles.text}>Closed on: {moment(data.end).format('DD-MM-YYYY')}</Text>
                    </TouchableOpacity>
                </View>
            );
            return boardrooms;
        } else {
            return <View style={{alignItems: 'center'}}><Text style={styles.errorText}>None boardrooms available</Text></View>;
        }

    }

    onContentSizeChange =(contentWidth, contentHeight) => {
        this.setState({ screenHeight: contentHeight });
    };

    render() {
        const { navigate } = this.props.navigation;
        const scrollEnabled = this.state.screenHeight > height;
        return (
            <ScrollView 
            contentContainerStyle={styles.container}
            scrollEnabled={scrollEnabled}
            onContentSizeChange={this.onContentSizeChange}
            
            >
                <Header
                    leftComponent={<MaterialIcons
                        name="menu"
                        color="white"
                        size={35}
                        onPress={() => this.props.navigation.toggleDrawer()}
                    />}
                    centerComponent={{ text: 'Closed boardrooms', style: { color: '#fff' } }}
                />
                <View>
                    {this.renderBoardrooms()}
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    textNone: {
        fontSize: 16,
    },
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
    },
    text: {
        color: '#2699fb',
        fontSize: 11,
        fontWeight: 'bold', 
        marginTop: 7, 
    },
    inputContainer: {
        alignItems: 'center',
    },
    btnEnter2: {
        width: WIDTH - 55,
        height: 60,
        borderRadius: 5,
        backgroundColor: '#f1f9ff',
        borderColor: '#a5d8ff',
        borderWidth: 0.5,
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
