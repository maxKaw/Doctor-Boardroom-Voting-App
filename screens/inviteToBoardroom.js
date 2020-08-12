//Example Multiple select / Dropdown / Picker in React Native
import React, { Component } from 'react';
//Import React
import {View, Text, Picker, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity} from 'react-native';
//Import basic react native components
import MultiSelect from 'react-native-multiple-select';
import {withKeyboardAwareScrollView} from "react-native-dropdown-autocomplete";
import axios from "axios";
import {Icon} from 'native-base';
import {Header} from "react-native-elements";
import {MaterialIcons} from "@expo/vector-icons";
//Import MultiSelect library

const { width: WIDTH } = Dimensions.get('window');
const { height: HEIGHT } = Dimensions.get('window');


class inviteToBoardroom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            selectedItems: [],
        }
    }

    // Gathering all the names and storing them in the 'names' variable
    componentDidMount() {
        axios({
            method: 'post',
            url: 'http://simpl3daveftp.com/inviteToBoardroom.php',
        }).then(response => {
            //handle success
            this.setState({ users: response.data });
        }).catch(function (response) {
            //handle error
            alert(response.data)
        });
    }

    addToBoardroom = (selected) => {
        const form = new FormData();
        form.append('usersID', JSON.stringify(selected));
        form.append('boardroomID', this.state.users[0].boardroom);
        axios({
            method: 'post',
            url: 'http://simpl3daveftp.com/inviteToBoardroomADD.php',
            data:form,
        }).then(response => {
            //handle success 
            if (response.data == true) {
                alert('Users invited successfully!');
            } else if (response.data == false) {
                alert('Something went wrong!');
            }
        }).catch(function (response) {
            //handle error

            alert(response.data)

        });
    }

    onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
        //Set Selected Items
    };

    render() {
        const { selectedItems } = this.state;
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={<MaterialIcons
                        name="menu"
                        color="white"
                        size={35}
                        onPress={() => this.props.navigation.toggleDrawer()}
                    />}
                    centerComponent={{ text: 'Invite To Boardroom', style: { color: '#fff' } }}
                />

                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, padding: 30 }}>
                        <MultiSelect
                            hideTags
                            items={this.state.users}
                            uniqueKey= "id"
                            ref={component => {
                                this.multiSelect = component;
                            }}
                            onSelectedItemsChange={this.onSelectedItemsChange}
                            selectedItems={selectedItems}
                            selectText="Invite Members."
                            searchInputPlaceholderText="Search Members..."
                            onChangeInput={text => console.log(text)}
                            tagRemoveIconColor="#CCC"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="Name"
                            searchInputStyle={{ color: '#CCC' }}
                            submitButtonColor="#48d22b"
                            submitButtonText="ADD"

                        />

                    </View>
                </SafeAreaView>
                <View style={{ flex: 1, padding: 30}}>
                    {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItems)}
                </View>
                <View style={styles.btnConteiner}>
                    <TouchableOpacity style={styles.btnInv} onPress={() => this.addToBoardroom(selectedItems)}>
                        <Text style={styles.textBtn}>Invite</Text>
                    </TouchableOpacity>

                </View>

            </View>


        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    textForgot: {
        color: '#2699fb',
        textAlign: 'center',
        paddingTop: 10
    },
    logo: {
        width: HEIGHT / 10,
        height: HEIGHT / 10,
        marginTop: HEIGHT / 10,
    },
    logoContainer: {
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
        marginTop: 70,
        alignItems: 'center',
    },
    logoText: {
        color: 'white',
        fontSize: 28,
        marginTop: 22,
        fontWeight: '400',
        marginBottom: 20,

    },
    inputConteiner: {
        marginTop: 20,
        alignItems: 'center',
    },
    input: {
        width: WIDTH - 55,
        height: 35,
        borderRadius: 15,
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
    btnInv: {
        width: WIDTH - 55,
        height: 35,
        borderRadius: 5,
        backgroundColor: '#2699fb',
        alignItems: 'center',
        position: 'absolute',
        bottom:0,
    },
    text: {
        color: '#000000',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default withKeyboardAwareScrollView(inviteToBoardroom);
