import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import screens from '../constants/screens';
import Loading from '../screens/loading';
import Welcom from '../screens/login';
import ForgotPassword from '../screens/login/forgotPassword';
import Login from '../screens/login/login';
import Signup from '../screens/signup/index';
import CompleteProfile from '../screens/signup/completeYourProfile';
import Gender from '../screens/signup/gender';
import Birthday from '../screens/signup/birthday';
import Home from '../screens/home/index';
import Camera from '../screens/home/story/camera';
import EditStory from '../screens/home/story/editStory';
import Share from '../screens/home/story/share';
import Phone from '../screens/signup/completePhone';
import Otp from '../screens/signup/otp';
import StoryDetail from '../screens/home/story/testStoryDetail';

const navigatorConfig = {
  defaultNavigationOptions: {
      headerShown: false
  }
};

const AuthStack = createStackNavigator(
  {
    [screens.WELCOME]: Welcom,
    [screens.FORGOT_PASSWORD]: ForgotPassword,
    [screens.LOGIN]: Login,
    [screens.SIGNUP]: Signup,
    [screens.COMPLETE_PROFILE]: CompleteProfile,
    [screens.GENDER]: Gender,
    [screens.BIRTHDAY]: Birthday,
    [screens.PHONE]: Phone,
    [screens.OTP]: Otp
  },
  navigatorConfig
);

const AppStack = createStackNavigator(
  {
    [screens.HOME]: Home,
    [screens.CAMERA]: Camera,
    [screens.EDIT_STORY]: EditStory,
    [screens.SHARE]: Share,
    [screens.TESTSTORY_FLOW]: StoryDetail
  },
  navigatorConfig
);

const RootNavigator = createSwitchNavigator(
  {
    [screens.LOADING]: Loading,
    [screens.AUTH]: AuthStack,
    [screens.APP]: AppStack
  },
  {
    initialRouteName: screens.LOADING
  }
);

export const AppContainer = createAppContainer(RootNavigator);