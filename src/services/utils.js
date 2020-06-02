import {Platform, Dimensions} from 'react-native';
import _ from 'lodash';

export const isIOS = Platform.OS === 'ios';
export const modelIOS = Platform.Version;

const VIEWPORT = Dimensions.get('window');
export const isIphoneX = (
  isIOS &&
  // (_.toLower(_.get(Constants, ['platform', 'ios', 'model'])).startsWith('iphone x') ||
  ((VIEWPORT.height === 812 || VIEWPORT.width === 812) || // iphone x iphone xs
  (VIEWPORT.height === 896 || VIEWPORT.width === 896)) // iphone xs max iphone xr
)