/* eslint-disable prettier/prettier */

import { PermissionsAndroid } from 'react-native';

export async function requestStorage() {
  try {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA, {

      'title': 'Acces Camera',
      'message': 'This app is requesting to use your camera',
    });

    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {

      'title': 'Acces location',
      'message': 'This app is requesting to acces your storage',
    });
  }
  catch (err) {
    console.warn(err);
  }
}
export async function requestLocationPermission() {
  try {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Acces location',
        'message': 'This app is requesting to use your current location',
      }
    );
  } catch (err) {
    console.warn(err);
  }
}