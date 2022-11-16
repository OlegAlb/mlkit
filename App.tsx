import React, {useEffect} from 'react';
import {
  NativeModules,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';

const {PoseDetectionModule} = NativeModules;

type Response = any;

enum PoseLandmark {
  LEFT_ANKLE = 27,
  LEFT_EAR = 7,
  LEFT_ELBOW = 13,
  LEFT_EYE = 2,
  LEFT_EYE_INNER = 1,
  LEFT_EYE_OUTER = 3,
  LEFT_FOOT_INDEX = 31,
  LEFT_HEEL = 29,
  LEFT_HIP = 23,
  LEFT_INDEX = 19,
  LEFT_KNEE = 25,
  LEFT_MOUTH = 9,
  LEFT_PINKY = 17,
  LEFT_SHOULDER = 11,
  LEFT_THUMB = 25,
  LEFT_WRIST = 15,
  NOSE = 0,
  RIGHT_ANKLE = 28,
  RIGHT_EAR = 8,
  RIGHT_ELBOW = 14,
  RIGHT_EYE = 5,
  RIGHT_EYE_INNER = 4,
  RIGHT_EYE_OUTER = 6,
  RIGHT_FOOT_INDEX = 32,
  RIGHT_HEEL = 30,
  RIGHT_HIP = 24,
  RIGHT_INDEX = 20,
  RIGHT_KNEE = 26,
  RIGHT_MOUTH = 10,
  RIGHT_PINKY = 18,
  RIGHT_SHOULDER = 12,
  RIGHT_THUMB = 22,
  RIGHT_WRIST = 16,
}

const recognizeImage = (url: string): Promise<Response> => {
  return PoseDetectionModule.recognizeImage(url);
};

const App = () => {
  const handlePress = async () => {
    const res = await launchImageLibrary({
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
    });

    const url = res.assets?.[0]?.uri!;

    if (url) {
      recognizeImage(url)
        .then(result => {
          console.log('result', result);
        })
        .catch(error => {
          console.log('error', error);
        })
        .finally(() => {
          console.log('done');
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text>Press</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,.2)',
  },
});

export default App;
