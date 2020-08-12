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
import Constants from 'expo-constants';
import axios from 'axios';

import logo from '../pics/logo.png';

const { width: WIDTH } = Dimensions.get('window');
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      Questions: [],
      Boardroom: [],
      Button: "",
    };
  }

  // Fetching data every time the screen is loaded
  componentDidMount() {
    this.fetchData();
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.fetchData();
      }
    );
  }

  // Fetch the questions 
  fetchData = () => {
    const { navigation } = this.props;
    const boardroom = navigation.getParam('boardroom', 'none');
    this.setState({ Boardroom: boardroom });
    const form = new FormData();
    form.append('boardroom', boardroom.id);
    form.append('endDateTime', boardroom.end);
    axios({
      method: 'post',
      url: 'http://simpl3daveftp.com/getQuestions.php',
      data: form,
    }).then(response => {
      //handle success
      this.setState({ Questions: response.data });
    }).catch(function (response) {
      //handle error
      alert(response)
    });
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  // This function returns vote button 
  renderVoteButton(data) {
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity style={styles.btnVote} onPress={() => navigate('Vote', {question: data})}>
        <Text style={styles.text}>Vote</Text>
      </TouchableOpacity>
    )
  }

  // This function returns results button
  renderResultButton(data) {
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity style={styles.btnResults} onPress={() => navigate('ResultsLive', {question: data})}>
        <Text style={styles.text}>Results</Text>
      </TouchableOpacity>
    )
  }

  // Renders questions based on the JSON file returned from the backend
  renderQuestions = () => {
    const { navigate } = this.props.navigation;
    if (this.state.Questions.length > 0) {
      const questions = this.state.Questions.map((data) =>
        <View style={styles.questionContainer} key={data.QuestionID}>
          <Text style={styles.titleText}>{data.Question}</Text>
          <View style={styles.fixToText}>
            <Text style={styles.questionText}>{data.MedicalStatus}</Text>
            {/* Makes decision which buttons should be displayed*/}
            {(data.Voted == 0) ? this.renderVoteButton(data) : this.renderResultButton(data)}
          </View>
        </View>
      );
      return questions;
    } else {
      return <View style={{alignItems: 'center'}}><Text style={styles.errorText}>None questions available</Text></View>;
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
          centerComponent={{ text: 'Boardroom', style: { color: '#fff' } }}
        />
        {/* Renders all the question returned from the function*/}
        {this.renderQuestions()}
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  logoContainer: {
    backgroundColor: '#2699fb',
    height: 100,
  },
  questionContainer: {
    alignSelf: 'center',
    padding: 10,
    width: WIDTH - 20,
    backgroundColor: '#f1f9ff',
    marginTop: 20,
    alignItems: 'center',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inputConteiner: {
    marginTop: 40,
    alignItems: 'center',
  },
  inputDescription: {
    width: WIDTH - 55,
    height: 100,
    borderRadius: 0,
    fontSize: 16,
    fontWeight: '300',
    opacity: 0.8,
    textAlign: 'center',
    borderColor: '#2699fb',
    borderWidth: 0.5,
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 0,
    fontSize: 16,
    fontWeight: '300',
    opacity: 0.8,
    textAlign: 'center',
    borderColor: '#2699fb',
    borderWidth: 0.5,
  },
  btnResults: {
    width: 100,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#2699fb',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  btnVote: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#2699fb',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 25,
  },
  questionText: {
    flex: 1,
    color: '#2699fb',
    fontSize: 16,
    marginEnd: 5,
  },
  titleText: {
    color: '#2699fb',
    fontSize: 20,
    alignSelf: 'flex-start'
  },
  errorText: {
      color: '#2699fb',
      fontSize: 20,
      fontWeight: 'bold', 
      marginTop: 20, 
  }

});
