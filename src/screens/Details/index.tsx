import { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Expo from 'expo-camera';

import { Tags } from "../../components/Tags";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { ButtonIcon } from "../../components/ButtonIcon";

import { styles } from "./styles";
import { Toast } from "../../components/Toast";
import { Camera } from "../../components/Camera";

const GOOGLE_CLOUD_VISION_API_KEY = process.env.GOOGLE_CLOUD_VISION_API_KEY;

export function Details() {
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [collectionName, setCollectionName] = useState('Tags');
  const [isModalFormVisible, setIsModalFormVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [cameraRef, setCameraRef] = useState<Expo.Camera | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(Expo.CameraType.back);
  const [imagePrediction, setImagePrediction] = useState<any>();

  useEffect(() => {
    Expo.Camera
      .requestCameraPermissionsAsync()
      .then((granted) => {
        if (granted) {
          setHasPermission(true)
          cameraRef?.forceUpdate()
        }
      });
  }, []);

  const toggleCameraType = () => {
    setType(current => (current === Expo.CameraType.back ? Expo.CameraType.front : Expo.CameraType.back));
  }

  const retakePhoto = () => {
    setIsLoading(false);
    cameraRef?.resumePreview();
  }

  const takePicture = async () => {
    if (cameraRef) {
      setIsLoading(true);
      const photo = await cameraRef.takePictureAsync({
        base64: true,
      });
      cameraRef.pausePreview();

      const response = await identifyImage(photo.base64);
      

      if (response) {
        setIsLoading(false);
        setImagePrediction(response)
      } else {
        Alert.alert('Desculpe, não foi possível gerar tags!');
        setIsLoading(false);
        cameraRef.resumePreview();
      }
    }
  };

  const identifyImage = async (image: string | undefined) => {
    try {
      let body = JSON.stringify({
        requests: [
          {
            features: [
              { type: "LABEL_DETECTION", maxResults: 5 },
              // { type: "LANDMARK_DETECTION", maxResults: 5 },
              // { type: "FACE_DETECTION", maxResults: 5 },
              // { type: "LOGO_DETECTION", maxResults: 5 },
              // { type: "TEXT_DETECTION", maxResults: 5 },
              // { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
              // { type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
              // { type: "IMAGE_PROPERTIES", maxResults: 5 },
              // { type: "CROP_HINTS", maxResults: 5 },
              // { type: "WEB_DETECTION", maxResults: 5 }
            ],
            image: {
              content: image
            },
          }
        ]
      });

      let response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_VISION_API_KEY}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: body
        }
      );
      let responseJson = await response.json();
      let extractedResponse = responseJson.responses[0];
      return extractedResponse;
    }
    catch (e) {
      console.log('An error has occurred!')
      Alert.alert('Sorry, an error has occurred. Please try again later!')
      console.log(e)
    }
  }


  function saveTags() {
    if(imagePrediction){
      const tagsFormatted = imagePrediction.labelAnnotations
      .map((tag: any) => {
        const tagFormatted: string = tag.description
        .toLowerCase()
        .replaceAll(' ', '_')

        return `#${tagFormatted}`
      })

      setTags(tagsFormatted);
    }else{
      Alert.alert('É necessario tirar uma foto para gerar as tags!')
    }

  }

  function handleNameCollectionEdit() {
    setIsModalFormVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      {toastMessage && <Toast message={toastMessage} />}

      <Header title={collectionName}>
        <ButtonIcon
          iconName="edit"
          onPress={() => setIsModalFormVisible(true)}
        />
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Camera
            setCameraRef={setCameraRef}
            type={type}
            toggleCameraType={toggleCameraType}
            retakePhoto={retakePhoto}
            takePicture={takePicture}
            isLoading={isLoading}
          />
        
        
          <View style={styles.options}>
            <Button
              title="Gerar tags"
              onPress={saveTags}
              isLoading={isLoading}
            />
          </View>
        </View>

        <Tags
          tags={tags}
          setTags={setTags}
        />
      </ScrollView>

      <Modal
        visible={isModalFormVisible}
        onClose={() => setIsModalFormVisible(false)}
        title="Editar nome"
      >
        <>
          <Input
            placeholder="Nome da coleção"
            onChangeText={setCollectionName}
            value={collectionName}
          />

          <Button
            title="Salvar"
            onPress={handleNameCollectionEdit}
          />
        </>
      </Modal>
    </SafeAreaView >
  );
}