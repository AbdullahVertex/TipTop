// import statusCodes along with GoogleSignin
import {
    GoogleSignin,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
  
  // Somewhere in your code
 export  const signIn = async () => {
  const navigation = useNavigation();
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (response) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" as never }],
        });
      } else {
        Alert.alert("Unable to signin","Error Ocurred during sign in",[{text:'OK'}])
        // sign in was cancelled by user
      }
    } catch (error) {
      if (error) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };