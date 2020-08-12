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
import logo from '../pics/logo.png';
import {withKeyboardAwareScrollView} from "react-native-dropdown-autocomplete";

const { width: WIDTH } = Dimensions.get('window');
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showPass: true,
      press: false,
    };
  }

  showPass = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true });
    } else {
      this.setState({ showPass: true, press: false });
    }
  };
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
                    centerComponent={{ text: 'Modify Question', style: { color: '#fff' } }}
                />

        

        <View style={styles.inputConteiner}>
          <TextInput
            style={styles.input}
            placeholder={'Patient name'}
            underlineColorAndroid="transparent"
            maxLength={30}
          />
        </View>

        <View style={styles.inputConteiner}>
          <TextInput
            style={styles.input}
            placeholder={'Case title'}
            underlineColorAndroid="transparent"
            maxLength={30}
          />
        </View>
        <View style={styles.descriptionConteiner}>
          <TextInput
            style={styles.inputDescription}
            placeholder={'Case Description...'}
            underlineColorAndroid="transparent"
            maxLength={400}
          />
        </View>
        <View style={styles.inputConteiner}>
          <TextInput
            style={styles.input}
            placeholder={'Search for category'}
            underlineColorAndroid="transparent"
            maxLength={30}
          />
        </View>

        <View style={styles.inputConteiner}>
          <TextInput
            style={styles.input}
            placeholder={'Add option answer'}
            underlineColorAndroid="transparent"
            maxLength={11}
          />
        </View>

          
   <View style={styles.btnConteiner}>
   <View style={[{flexDirection:'row'}, styles.elementsContainer]}>

         <View style={styles.btnConteiner}>
                    <TouchableOpacity style={styles.btnEnter}>
             <Text style={{fontWeight: 'bold',color: 'white', fontSize: 10, marginTop: 13,  }}>Modify Question</Text>
          </TouchableOpacity>
        </View>

<View style={styles.btnConteiner}>
                    <TouchableOpacity style={styles.btnEnter2}>
             <Text style={{fontWeight: 'bold',color: 'white', fontSize: 10, marginTop: 13, }}>End Question</Text>
          </TouchableOpacity>
        </View>

         <View style={styles.btnConteiner}>
                    <TouchableOpacity style={styles.btnEnter}>
             <Text style={{fontWeight: 'bold',color: 'white', fontSize: 10, marginTop: 13, }}>Delete Question</Text>
          </TouchableOpacity>
        </View>
          </View>
         </View>
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
 descriptionConteiner: {
    marginTop: 40,
    alignItems: 'center',
  },

  inputConteiner: {
    marginTop: 40,
    alignItems: 'center',
  },
  inputDescription: {
    width: WIDTH - 55,
    height: 200,
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
    height: 35,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: '300',
    opacity: 0.8,
    textAlign: 'center',
    borderColor: '#2699fb',
    borderWidth: 0.5,
  },
 
  btnEnter2: {
    marginTop: 30,
    marginLeft: 20,
    width: 100,
    height: 40,
    borderRadius: 5,
    backgroundColor: 'orange',
    alignItems: 'center',
  },
  btnEnter: {
    marginTop: 30,
    marginLeft: 20,
    width: 100,
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
});
export default withKeyboardAwareScrollView(ModifyQuestion);