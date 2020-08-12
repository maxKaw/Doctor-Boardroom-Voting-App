import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header, Icon } from 'react-native-elements';

import axios from 'axios';
import { ProgressBar, } from 'react-native-paper';
const { width: WIDTH } = Dimensions.get('window');
export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            Votes: [],
            form: "",
            MedicalStatus: "",
        };
    }

    //  Fetching the details about the question sent from the previous sceen and setting interval for refresing the results every 5 seconds
    componentDidMount() {
        const { navigation } = this.props;
        const question = navigation.getParam('question', 'none');
        this.setState({ MedicalStatus : question.MedicalStatus });
        this.state.form = new FormData();
        this.state.form.append('questionID', question.QuestionID);
        this.getData();
        this.timerData = setInterval(this.getData, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timerData);
    }

    // Fetching the most recent results from the backend
    getData = () => {
        axios({
            method: 'post',
            url: 'http://simpl3daveftp.com/getResults.php',
            data: this.state.form,
        }).then(response => {
            //handle success 
            var sum = 0;
            const newVotes = [];
            response.data.map((data) => (sum += data.Count));
            response.data.map((data) => newVotes.push({ Answer: data.Answer, AnswerID: data.AnswerID, Count: (sum > 0 ? parseInt(((data.Count / sum) * 100)) : 0) }))

            this.setState({ Votes: newVotes });
        }).catch(function (response) {
            //handle error
            alert(response)
        });
    }

    // Renders the results in form of the text as well as progress bar
    renderResults = () => {
        if (this.state.Votes.length > 0) {
            const votes = this.state.Votes.map((data) =>
                <View style={styles.resultContainer} key={data.AnswerID}>
                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginTop: 7, marginBottom: 3, }}>- {data.Answer} : {data.Count}%</Text>
                    <ProgressBar
                        indeterminate={false}
                        progress={(data.Count / 100)}
                        color="#2699fb"
                        style={{ height: 8 }}
                    />
                </View>
            );
            return votes;
        } else {
            return <View style={{ alignItems: 'center' }}><Text style={styles.errorText}>None results available</Text></View>;
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={<MaterialIcons
                        name="arrow-back"
                        color="white"
                        size={35}
                        onPress={() => this.props.navigation.goBack()}
                    />}
                    centerComponent={{ text: 'Results Live', style: { color: '#fff' } }}
                />
                <View style={styles.medicalStatusContainer}>
                    <Text style={styles.titleText}>Medical status: </Text>
                    <Text style={styles.medicalStatusText}>{this.state.MedicalStatus}</Text>
                </View>
                <View>
                    {this.renderResults()}
                </View>

            </View >

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
    medicalStatusContainer: {
        alignSelf: 'center',
        width: WIDTH,
        backgroundColor: '#f1f9ff',
        alignItems: 'center',
    },
    container: {
        alignItems: 'center',
        backgroundColor: 'white'
    },
    resultContainer: {
        width: WIDTH - 55,
        marginTop: 20,
    },
    errorText: {
        color: '#2699fb',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    }
});
