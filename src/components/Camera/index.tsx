import * as Expo from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Dimensions, Button, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from "./styles";

type Props =  {
  setCameraRef: (ref: React.SetStateAction<Expo.Camera | null>) => void;
  type: Expo.CameraType,
  toggleCameraType: () => void,
  retakePhoto: () => void,
  takePicture: () => Promise<void>,
  isLoading: boolean
}

export function Camera({ ...props }: Props) {
  return (
    <View style={[styles.container]}>
      <Expo.Camera style={{ flex: 1 }} type={props.type} ref={ref => props.setCameraRef(ref)}>
        <TouchableOpacity
          style={styles.flipIconContainer}
          onPress={props.toggleCameraType}
        >
          <MaterialIcons name="flip-camera-ios" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.retakeContainer}
          onPress={props.retakePhoto}
        >
          <MaterialCommunityIcons name="camera-retake-outline" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.scanContainer}
          onPress={props.retakePhoto}
        >
          <AntDesign name="scan1" size={40} color="white" />
        </TouchableOpacity>
        <ActivityIndicator
          size="large"
          style={styles.loadingIndicator}
          color="#fff"
          animating={props.isLoading}
        />
        <TouchableOpacity onPress={props.takePicture} style={styles.captureButton} disabled={props.isLoading}>
          <Button
            color={'white'}
            onPress={props.takePicture}
            disabled={props.isLoading}
            title=""
            accessibilityLabel="Learn more about this button"
          />
        </TouchableOpacity>
      </Expo.Camera>
    </View>
  );
}