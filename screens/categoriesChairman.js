import * as React from 'react';
import { Appbar } from 'react-native-paper';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import DateTimePicker from 'react-native-modal-datetime-picker';

import MenuButton from '../components/MenuButton';
// You can import from local files
//import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';


const { width: WIDTH } = Dimensions.get('window');
export default class categoriesChairman extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false
        };
    }
    _goBack = () => console.log('Went back');

    _handleSearch = () => console.log('Searching');

    _handleMore = () => console.log('Shown more');



    render() {
        return (
            <View>
            <Appbar.Header style={styles.top}>
                <Appbar.BackAction
                    onPress={this._goBack}
                />
                <Appbar.Content
                    title = "Menu"
                    subtitle = "@Chairman"
                />
                <Appbar.Action  onPress={this._handleSearch} />
                <Appbar.Action  onPress={this._handleMore} />
            </Appbar.Header>


            <View style={styles.container}>

                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btnChoice}>
                        <Text style={styles.textBtn}>Categories</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnChoice}>
                        <Text style={styles.textBtn}>View Results</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnChoice}>
                        <Text style={styles.textBtn}>Create Question</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnChoice}>
                        <Text style={styles.textBtn}>Modify Question</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnChoice}>
                        <Text style={styles.textBtn}>Create User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnChoice}>
                        <Text style={styles.textBtn}>Modify User</Text>
                    </TouchableOpacity>
                </View>
            </View>
                <View>
                <Appbar style={styles.bottom}>
                    <Appbar.Action  onPress={() => console.log('Pressed archive')} />
                    <Appbar.Action  onPress={() => console.log('Pressed mail')} />
                    <Appbar.Action  onPress={() => console.log('Pressed label')} />
                    <Appbar.Action  onPress={() => console.log('Pressed delete')} />
                </Appbar>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    texttop:{
       color: 'white',
    },
    top: {
        backgroundColor: '#2699fb',

    },
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -200,
        backgroundColor: '#2699fb',
    },

    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 100
    },

    logoContainer: {
        width: WIDTH,
        alignItems: 'center',
        backgroundColor: '#2699fb',
    },
    textBtn: {
        fontSize: 16,
        color: 'white',
        marginTop: 13,
    },

    btnContainer: {
        marginTop: 30,
        alignItems: 'center',
    },

    logoText: {
        color: 'white',
        fontSize: 18,
        marginTop: 30,
        marginBottom:10,
        fontWeight: '400',
    },
    input: {
        width: WIDTH - 55,
        borderRadius: 5,
        fontSize: 16,
        //placeholderTextColor: "white",
        fontWeight: '300',
        opacity: 0.8,
        textAlign: 'center',
        borderColor: '#2699fb',
        borderWidth: 0.5,
    },

    btnChoice: {
        marginTop: 20,
        width: WIDTH - 55,
        height: 55,
        borderRadius: 3,
        backgroundColor: '#2699fb',
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
    title: {
        color: 'white',
        fontSize: 18,
        marginTop: 30,
        marginBottom:10,
        fontWeight: '400',
    }
});
