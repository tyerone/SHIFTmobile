import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';

export default function SpotCameraScreen({ navigation }) {
  const camRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [preview, setPreview] = useState(null);
  const [facing, setFacing] = useState('back');
  const [flash, setFlash] = useState('off');

  if (!permission) return <View style={{ flex: 1, backgroundColor: '#000' }} />;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permTitle}>Camera access needed</Text>
        <Pressable style={styles.primary} onPress={requestPermission}>
          <Text style={styles.primaryText}>Enable camera</Text>
        </Pressable>
      </View>
    );
  }

  const takePhoto = async () => {
    try {
      const photo = await camRef.current.takePictureAsync({
        quality: 0.9,
        skipProcessing: true,
      });
      setPreview({ uri: photo.uri });
    } catch {}
  };

  // replace camera with the card screen
  const goToNewCard = async () => {
    try {
      await MediaLibrary.requestPermissionsAsync();
    } catch {}
    navigation.replace('NewSpotCard', { uri: preview.uri });
  };

  // preview
  if (preview) {
    return (
      <View style={styles.previewRoot}>
        <Image source={{ uri: preview.uri }} style={styles.previewImage} />

        <Pressable style={styles.retake} onPress={() => setPreview(null)}>
          <Text style={styles.retakeText}>Retake</Text>
        </Pressable>

        <Pressable style={styles.nextFab} onPress={goToNewCard}>
          <Ionicons name="arrow-forward" size={28} color="#fff" />
        </Pressable>
      </View>
    );
  }

  // camera
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <CameraView
          ref={camRef}
          style={StyleSheet.absoluteFill}
          facing={facing}
          enableZoomGesture
          flash={flash}
        />

        <View style={styles.topControls}>
          <Pressable style={styles.smallBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={18} color="#111" />
          </Pressable>
          <Pressable style={styles.smallBtn} onPress={() => setFlash(flash === 'off' ? 'on' : 'off')}>
            <Ionicons name={flash === 'off' ? 'flash-off' : 'flash'} size={16} color="#111" />
          </Pressable>
          <Pressable style={styles.smallBtn} onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}>
            <Ionicons name="camera-reverse" size={16} color="#111" />
          </Pressable>
        </View>

        <Pressable style={styles.captureFab} onPress={takePhoto}>
          <View style={styles.captureDot} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#000000ff'
  },
  
  root: {
    flex: 1,
    backgroundColor: '#000000ff' 
  },

  topControls: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : (StatusBar.currentHeight || 0) + 12,
    right: 16,
    flexDirection: 'row',
    gap: 10,
  },

  smallBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  captureFab: {
    position: 'absolute',
    right: 24,
    bottom: 28,
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },

  captureDot: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#d1211c',
  },

  // preview
  previewRoot: {
    flex: 1,
    backgroundColor: '#ffffffff'
  },

  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover' 
  },

  retake: {
    position: 'absolute',
    left: 16,
    bottom: 26,
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 22,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000ff',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  retakeText: {
    color: '#000000ff',
    fontSize: 15,
    fontWeight: '600'
  },

  nextFab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#d1211c',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000ff',
    shadowOpacity: 0.3,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },

  // permission
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000ff'
  },

  permTitle: {
    color: '#ffffffff',
    fontSize: 18,
    marginBottom: 12 
  },

  primary: {
    backgroundColor: '#d1211c',
    paddingHorizontal: 18,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryText: {
    color: '#ffffffff',
    fontSize: 15,
    fontWeight: '700'
  },
});