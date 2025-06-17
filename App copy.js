
import React, { useState, useEffect } from 'react';
import { Dimensions, ToastAndroid, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import HomeStackScreen from './src/navigation/MainStackNavigator';

import { HomeStackScreen, } from './src/navigation/MainStackNavigator';

import { Home } from './src/screen/Home';
import { createStackNavigator } from '@react-navigation/stack';
// import RootStackNavigator from './src/navigation/RootStackNavigator';
import { AuthContext } from './src/contexts/AuthContext';
import { BASE_URL, STORAGE_KEY, PORTAL, API_KEY } from './src/config';
import AsyncStorage from '@react-native-community/async-storage';
// import SplashScreen from './src/screen/auth/SplashScreen';
import { UserContext } from './src/contexts/UserContext';
import { Loading } from './src/component/Loading';
const { width } = Dimensions.get('window');
import { DrawerContent } from './src/navigation/DrawerContent';
import DrawerNavigator from './src/navigation/drawer';

const Stack = createStackNavigator();
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
const Drawer = createDrawerNavigator();


function App(props) {


  const initialLoginState = {

    isLoading: true,
    user: null,
    userToken: null,
    userId: null,

    actionLoader: false,
  };

  const loginReducer = (prevState, action) => {

    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.token,
          user: action.user,
          userId: action.userId,
          actionLoader: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          isLoading: false,
          userToken: null,
          user: null,
        };
      case 'ActionLoader':
        return {
          ...prevState,
          actionLoader: action.status,
        }; Login
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.token,
          userId: action.userId,
          user: action.user,
        };
      default:
        break;
    }
  };
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: '102517843670-al3tf76sihcmba9uii5u4uo212subogn.apps.googleusercontent.com',
  //     //  webClientId: '695642536680-7p7n04j8efu5563vs79fmdgpb7brkgb1.apps.googleusercontent.com',
  //     offlineAccess: true, // if you want to access Google API on behalf of the user from backend
  //   });
  // }, []);

  const authContext = React.useMemo(() => ({

    signIn: async (
      username,
      password,
      setMsgType,
      setMsgContent,
      setShowPopUp,

    ) => {

      let user;
      user = {};
      let userToken;
      userToken = null;
      let userId;
      let loginType = null;



      // dispatch({ type: 'ActionLoader', status: true });
      // let options = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // 'x-api-key': API_KEY
      //   },
      //   method: 'POST',
      //   body: JSON.stringify({

      //     "username": username,
      //     "password": password,

      //   }),
      // };

      // let response = await fetch(`${BASE_URL}api/auth/login`, options);

      // if (response.ok) {

      //   const result = await response.json();

      //   console.log("result------------------------------>>>>>>@@@-->", result)

      //   if (result.success) {

      //     console.log("result------------------------------>>>>>>@@@-->", result)

      //     user = result.data;
      //     userToken = result.data.token;
      //     userId = result.data.user_name;
      //     user.token = result.data.token

      //     await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));


      //   } else {

      //   }

      // } else {

      //   console.warn(response);
      //   throw Error(response.status);
      // }

      let data = {

        "user_name": username,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTAxIn0.vUH61JZDeKFO3dzuUphiW2kM6luQGeZQQQ2GoIme3y8",
        "name":null,
        "avatar":null
      }

      user = data;
      userToken = data.token;
      // loginType = "normal"

      setMsgType('success');
      setMsgContent("You're now signed in and ready to explore the app!");
      setShowPopUp(true);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));

      dispatch({ type: 'ActionLoader', status: false });
      dispatch({ type: 'LOGIN', user: user, token: userToken, userId: userId });



    },

    // SigninWithGoogle: async () => {

    //   let user;
    //   user = {};
    //   let userToken;
    //   userToken = null;
    //   let userId;

    //   try {
    //     await GoogleSignin.hasPlayServices();
    //     const userInfo = await GoogleSignin.signIn();


    //     console.log("userInfouserInfouserInfo------>>",userInfo)

    //     let data = {

    //     "user_name": userInfo.data.user.email,
    //     "token": userInfo.data.idToken,
    //     "name": userInfo.data.user.name,
    //     "avatar": userInfo.data.user.photo,
    //   }


    //   console.log("My Data---------------***-------->>>",data)

    //     user = data;
    //     userToken = userInfo.data.idToken;

         

    //     await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));

    //     dispatch({ type: 'ActionLoader', status: false });
    //     dispatch({ type: 'LOGIN', user: user, token: userToken, userId: userId });

    //     // console.log('User Info----xxxxxxxxxxxxx----------------->>>:', user);
    //     // console.log('User Info----xxxxxxxxxxxxx----------------->>>:', userToken);

    //     // Now you can use userInfo.idToken to authenticate with Firebase or your baidTokenckend
    //   } catch (error) {
    //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //       console.log('User cancelled the login');
    //     } else if (error.code === statusCodes.IN_PROGRESS) {
    //       console.log('Signin in progress');
    //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //       console.log('Google Play Services not available');
    //     } else {
    //       console.error('Some other error:', error);
    //     }
    //   }

    // },

//     signUpWithGoogle: async () => {
//   let user = {};
//   let userToken = null;
//   let userId;

//   try {
//     await GoogleSignin.hasPlayServices(); // Check Google Play Services
//     const userInfo = await GoogleSignin.signIn(); // Google Login Popup

//     // Extract the user info

//      let data = {

//         "user_name": userInfo.data.user.email,
//         "token": userInfo.data.idToken,
//         "name": userInfo.data.user.name,
//         "avatar": userInfo.data.user.photo,
//       }
//     // user = {
//     //   user_name: userInfo.user.email,
//     //   name: userInfo.user.name,
//     //   avatar: userInfo.user.photo,
//     //   token: userInfo.idToken,
//     // };

//    user = data;
//         userToken = userInfo.data.idToken;

//     // ✅ Here you could call your backend to register the user if needed
//     // Example:
//     // await fetch(`${BASE_URL}/api/signup`, {
//     //   method: 'POST',
//     //   headers: { 'Content-Type': 'application/json' },
//     //   body: JSON.stringify(user),
//     // });

//     // Save the user in AsyncStorage
//     await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));

//     // Update context
//     dispatch({ type: 'ActionLoader', status: false });
//     dispatch({ type: 'LOGIN', user: user, token: userToken, userId: userId });

//     console.log('Google Sign-Up successful:', user);

//   } catch (error) {
//     console.log('Google sign-up error:', error);
//   }
// },



    // resetSession: async (field, value) => {

    //   console.log('field=dddd==>', field);
    //   console.log('value===>', value);

    //   try {

    //     let item = await AsyncStorage.getItem(STORAGE_KEY);
    //     let json = JSON.parse(item);

    //     const storedUser = json == undefined ? null : json;

    //     // if (field == 'full_name') storedUser.full_name = value;

    //     if (field == 'user_photo') {

    //       storedUser.user_photo = value;

    //     }

    //     await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(storedUser));

    //     dispatch({ type: 'LOGIN', user: storedUser, token: storedUser.token });

    //   } catch (e) {

    //     console.warn(e);
    //   }

    // },

    signOut: async () => {
      try {
        await AsyncStorage.removeItem(STORAGE_KEY);


      } catch (e) {
        console.warn(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
  }));

  React.useEffect(() => {

    setTimeout(async () => {
      let user;
      user = null;
      let userToken;
      userToken = null;

      try {
        let item = await AsyncStorage.getItem(STORAGE_KEY);

        console.log("item****---------->>", item)

        let json = JSON.parse(item);
        console.log("json****---------->>", json)

        userToken = json == undefined ? userToken : json.token;
        user = userToken != null ? json : null;

      } catch (e) {
        console.warn(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken, user: user });
    }, 2000);
  }, []);

  if (loginState.isLoading) {
    // return <SplashScreen />;
  }


  // console.log("Sheffffffffffffffffffffff--------v>>------->> ", loginState)


  return (
    <View style={{ flex: 1 }}>

      <AuthContext.Provider value={authContext}>

        <NavigationContainer>
          {loginState.userToken == null ? (
            <View style={{
              flex:1,backgroundColor:'red'
            }}>

            </View>

            // <RootStackNavigator />
          ) : (
        

            <UserContext.Provider value={loginState.user}>

              <DrawerNavigator />

            </UserContext.Provider>

          )

          }
        </NavigationContainer>

        <Loading loading={loginState.actionLoader} />

      </AuthContext.Provider>


    </View>

  );
}

export default App;



























// // 102517843670-al3tf76sihcmba9uii5u4uo212subogn.apps.googleusercontent.com


// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import React, { useEffect } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';

// const App = () => {
//   useEffect(() => {
//     GoogleSignin.configure({
//      webClientId:'102517843670-al3tf76sihcmba9uii5u4uo212subogn.apps.googleusercontent.com',
//       //  webClientId: '695642536680-7p7n04j8efu5563vs79fmdgpb7brkgb1.apps.googleusercontent.com',
//       offlineAccess: true, // if you want to access Google API on behalf of the user from backend
//     });
//   }, []);

//   const signInWithGoogle = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const userInfo = await GoogleSignin.signIn();
//       console.log('User Info:', userInfo);
//       // Now you can use userInfo.idToken to authenticate with Firebase or your backend
//     } catch (error) {
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         console.log('User cancelled the login');
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         console.log('Signin in progress');
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         console.log('Google Play Services not available');
//       } else {
//         console.error('Some other error:', error);
//       }
//     }
//   };

//   return (
//     <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
//       <Text>Google Sign-In Example</Text>
//       <TouchableOpacity onPress={signInWithGoogle} style={{ backgroundColor: '#4285F4', padding: 12, marginTop: 20 }}>
//         <Text style={{ color: 'white' }}>Sign in with Google</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default App;















// import React, { useEffect } from 'react';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import { View, Text, TouchableOpacity } from 'react-native';

// const App = () => {
//   useEffect(() => {
//     GoogleSignin.configure({

//       webClientId: '695642536680-7p7n04j8efu5563vs79fmdgpb7brkgb1.apps.googleusercontent.com',
//  offlineAccess: true,
//       // 695642536680-7p7n04j8efu5563vs79fmdgpb7brkgb1.apps.googleusercontent.com
//       // webClientId: '695642536680-7p7n04j8efu5563vs79fmdgpb7brkgb1.apps.googleusercontent.com',
//     });
//   }, []);


//   const signInWithGoogle = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const userInfo = await GoogleSignin.signIn();
//       console.log('User Info:', userInfo);
//     } catch (error) {
//       console.log('Google Sign-In Error Code:', error.code);
//       console.log('Google Sign-In Error Message:', error.message);
//     }
//   };

//   // async function signInWithGoogle() {

//   //   alert()
//   //   try {
//   //     await GoogleSignin.hasPlayServices();
//   //     const userInfo = await GoogleSignin.signIn();
//   //     console.log('User Info --> ', userInfo);
//   //     // You can now send userInfo.idToken or userInfo.user to your backend or Firebase Auth
//   //   } catch (error) {
//   //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//   //       console.log('User cancelled the login flow');
//   //     } else if (error.code === statusCodes.IN_PROGRESS) {
//   //       console.log('Sign in is in progress already');
//   //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//   //       console.log('Play services not available or outdated');
//   //     } else {
//   //       console.error(error);
//   //     }
//   //   }
//   // }

//   return (
//     <View style={{
//       backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center',

//     }}>
//       <Text>My App</Text>

//       <TouchableOpacity onPress={signInWithGoogle} style={{
//         height: 60, width: 300,
//         backgroundColor: 'red'
//       }}>
//         <Text>Login with G</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default App;


