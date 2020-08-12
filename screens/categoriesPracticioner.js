import * as React from 'react';
import { Appbar } from 'react-native-paper';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Icon,
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
export default class categoriesPracticioner extends React.Component {

    _goBack = () => console.log('Went back');

    _handleSearch = () => console.log('Searching');

    _handleMore = () => console.log('Shown more');

    static navigationOptions = {
        drawerLabel: "Create Boardroom",
    };


    render() {
        return (
            <View>
                <Appbar.Header>
                    <Appbar.BackAction
                        onPress={this._goBack}
                    />
                    <Appbar.Content
                        title = "Menu"
                        subtitle = "@Practicioner"
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
                            <Text style={styles.textBtn}>Random Question</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnChoice}>
                            <Text style={styles.textBtn}>View Results</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

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
