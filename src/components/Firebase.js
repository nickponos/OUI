import RNFirebase from 'react-native-firebase';

export const db = RNFirebase.database();
export const firestore = RNFirebase.firestore();
export const storage = RNFirebase.storage();
export const auth = RNFirebase.auth();
export const fireGeoPoint = RNFirebase.firestore.GeoPoint;
export const firebase = RNFirebase;