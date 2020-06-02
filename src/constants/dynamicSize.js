import {Dimensions} from 'react-native';

const REAL_SCREEN_WIDTH = Dimensions.get("window").width;
const REAL_SCREEN_HEIGHT = Dimensions.get("window").height;
const STANDARD_WIDTH = 375;
const STANDARD_HEIGHT = 812;

export const getHeight = h => {
  return Math.round(REAL_SCREEN_HEIGHT / STANDARD_HEIGHT * h);
}

export const getWidth = w => {
  return Math.round(REAL_SCREEN_WIDTH / STANDARD_WIDTH * w);
}