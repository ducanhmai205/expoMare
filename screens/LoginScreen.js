'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Platform,
  TouchableHighlight
} from 'react-native';
import Dimensions from 'Dimensions';
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import LoginFB from '../screens/LoginFB';
class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hidePassword: true,
      UserEmail: '',
      UserPassword: ''
    }
  }

managePasswordVisibility = () =>
  {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

UserLoginFunction = () =>{
 fetch('http://192.168.1.57:8000/api/v1/customer/login', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
 
    email: this.state.UserEmail,
 
    password: this.state.UserPassword
 
  })
 
}).then((response) => response.json())
      .then((responseJson) => {
       
 

         if(responseJson.status === true)
         {
            if(responseJson.account.type === 'trainer'){
              this.props.navigation.navigate('TrainerProfile', { Email: this.state.UserEmail,  });
              }
            if(responseJson.account.type === 'customer'){
              this.props.navigation.navigate('TraineeProfile', { Email: this.state.UserEmail,  });
              }
         }
         else{
           if(typeof(responseJson.message) === 'string'){
                 
                   Alert.alert(responseJson.message);
           }
            else{
              var error_messEmail = '';
              var error_messPassword = '';
              if (responseJson.message.email) {
               for (var i = 0, len = responseJson.message.email.length; i < len; i++) {
                      error_messEmail += responseJson.message.email[i] + '!'
                    }
              }

              if (responseJson.message.password) {
               for (var i = 0, len = responseJson.message.password.length; i < len; i++) {
                      error_messPassword += responseJson.message.password[i] + '!'

                    }
              }
                  
              Alert.alert(error_messEmail, error_messPassword);

              
            }
           }
       
      }).catch((error) => {
        console.error(error);
      });
 
  }
  render() {
        const {goBack} = this.props.navigation;
        const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
            <Image  source={require('../img/screen/loginbgg.png')} style={styles.backgroundImage}>
                  <View style={styles.containerImage}>
                        <View style={styles.textHeader}>
                                
                            <TouchableOpacity  style={{flex: 0.2,}} onPress={() => goBack()}>
                                  <Image  source={require('../img/Xbutton.png')} style={styles.xButton}>
                                  </Image>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.fbButton}>
                                    <TouchableOpacity  style={{flex: 1,}}>
                                          <LoginFB> </LoginFB>
                                    </TouchableOpacity>
                        </View>

                         <View style={styles.orButton}>
                         </View>

                        <View style={styles.nameInput}>
                            <TextInput
                                  style={{flex: 1,paddingLeft: 40}}
                                  underlineColorAndroid='transparent'
                                  placeholder="E-mail"
                                  placeholderTextColor = "#47E5B3"
                                  onChangeText={UserEmail => this.setState({UserEmail})}
                                  keybroadType="email-address"
                            />
                        </View>

                        <View style={styles.passwordInput}>
                            <TextInput
                                  style={{flex: 1,paddingLeft: 40}}
                                  placeholderTextColor = "#47E5B3"
                                  underlineColorAndroid='transparent'
                                  placeholder="Password"
                                  onChangeText={UserPassword => this.setState({UserPassword})}
                                  secureTextEntry = { this.state.hidePassword }
                            />   
                              <TouchableOpacity  style={{backgroundColor:'rgba(0,0,0,0)'}}  onPress = { this.managePasswordVisibility }>
                                  <Ionicons name="ios-eye" size={20} color={( this.state.hidePassword ) ? 'black':'#dcdcdd'}/>
                              </TouchableOpacity>

                        </View>

                        <View style={styles.topButton}>

                        </View> 
                        <View style={styles.loginButton}>
                              <TouchableOpacity  style={{flex: 1,}} onPress={this.UserLoginFunction}>
                                    <Image  source={require('../img/buttonlogin.png')} style={{flex: 1,width:null,height:null}}>
                                    </Image>
                              </TouchableOpacity>


                        </View>

                        <View style={styles.forgotPass}>
                         <TouchableOpacity style={{flex: 1,justifyContent: 'center',alignItems: 'center',flexDirection: 'row'  }} onPress={ ()=> {navigate('ForgotPassword')}}>
                            <Text style={{fontSize:13, color:'#524a5e'}}>Passwordをお忘れは</Text><Text style={{fontSize:13, color:'#524a5e',textDecorationLine:  'underline',}}>こちら</Text>
                          </TouchableOpacity>

                        </View>

                  <View style={styles.goRegister}>
                                <View style={{flex: 0.5,}}>
                                </View>

                                <View style={{flex: 0.5,}}>
                                  <View style={{flex: 0.5 }}>
                                  </View>

                                  <View style={{flex: 0.5 ,justifyContent: 'center',alignItems: 'center',}}>
                                  <TouchableOpacity style={{flex: 1,justifyContent: 'center',alignItems: 'center',}} onPress={ ()=> {navigate('RegisterScreen')}}>
                                        <Text style={styles.textGoRegister}> 会 員 登 録 </Text>
                                  </TouchableOpacity>
                                  </View>
                                
                                </View>

                                <View style={{flex: 0.5,}}>
                                </View>
                  </View>
               </View>
            </Image>

      </View>
    );
  }
}

const styles = StyleSheet.create({
container:{
  flex: 1,
},
backgroundImage:{
  flex: 1,
  width:Dimensions.get('window').width,
  height:Dimensions.get('window').height,
},
containerImage:{
flex: 1,

},
textHeader:{
  flex: 0.8,
  flexDirection:'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingRight:13
},
xButton:{
  flex: 0.5,
  width:null,
  height:null,
  marginTop:10
},
fbButton:{
  flex: 0.45,
  paddingBottom: (Platform.OS === 'ios') ? 0 : 10 ,
  paddingLeft:26,
  paddingRight:23
},
orButton:{
flex: 0.9,

},
nameInput:{
flex: 0.6,
paddingLeft:25,

},
passwordInput:{
  flex: 0.6,
  paddingLeft:26,
  paddingRight:60,
justifyContent: 'center',
  alignItems: 'center',
  flexDirection:'row',

},
loginButton:{
  flex: 0.5,
  paddingHorizontal:23,
 
   marginTop: (Platform.OS === 'ios') ? 1 : 20 ,
},
forgotPass:{
  flex: 0.4,
justifyContent: 'center',
alignItems: 'center',
flexDirection: 'row' ,
backgroundColor:'rgba(0,0,0,0)',
marginHorizontal: 40,
paddingHorizontal: 20,

paddingBottom: 5
},

goRegister:{
  flex: 1.5,
  flexDirection:  'row',

},
textGoRegister:{
backgroundColor:'rgba(0,0,0,0)',
textDecorationLine:  'underline',
fontWeight: 'bold',
color:'#4e5a99',
paddingBottom:12
},
topButton:{
    flex: 0.2,
   
}
});


export default LoginScreen;