/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Slider,
} from 'react-native';

const App = (props) => {
  const [star1, setStar1] = useState([]);
  const [star2, setStar2] = useState([]);
  const [star3, setStar3] = useState([]);
  const [image, setImageState] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(3);

  var putImageIntoList = () => {
    switch (value) {
      case 1:
        setStar1(...star1, image);
        break;
      case 2:
        setStar2(...star2, image);
        break;
      case 3:
        setStar3(...star3, image);
        break;
    }
    setModalVisible(false);
    setValue(3);
  };

  var takePhoto = () => {
    ImagePicker.launchCamera({noData: true}, setImage);
  };

  var chooseImage = () => {
    ImagePicker.launchImageLibrary({noData: true}, setImage);
  };

  var setImage = (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      //If it is iOS, remove 'file://' prefix
      let source = {uri: response.uri.replace('file://', ''), isStatic: true};

      //If android, don't need to remove the 'file://'' prefix
      if (Platform.OS === 'android') {
        source = {uri: response.uri, isStatic: true};
      }

      setImageState(source);
      setModalVisible(true);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={styles.modal}>
          <View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text>X</Text>
            </TouchableOpacity>
            <Text>Please select coolness of this picture.</Text>
            <Text style={styles.headerText}>{value}</Text>
            <Slider
              maximumValue={3}
              minimumValue={1}
              step={1}
              value={3}
              onValueChange={(value) => setValue(value)}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                putImageIntoList();
              }}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{flex: 1, paddingTop: 22}}>
        <View style={styles.title}>
          <Text style={styles.titleText}>3 Stars</Text>
        </View>
        <View style={styles.row}>
          {star3.map((source, i) => (
            <Image key={'star3-' + i} style={styles.image} source={source} />
          ))}
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>2 Stars</Text>
        </View>
        <View style={styles.row}>
          {star2.map((source, i) => (
            <Image key={'star2-' + i} style={styles.image} source={source} />
          ))}
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>1 Star</Text>
        </View>
        <View style={styles.row}>
          {star1.map((source, i) => (
            <Image key={'star1-' + i} style={styles.image} source={source} />
          ))}
        </View>
      </View>
      <View style={styles.rowCenter}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={chooseImage}>
          <Text style={styles.buttonText}>Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  button: {
    backgroundColor: 'gray',
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
  },
  modal: {
    height: 200,
    width: 300,
    marginTop: 200,
    padding: 10,
    alignSelf: 'center',
    backgroundColor: 'lightblue',
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  submitButton: {
    alignSelf: 'center',
    backgroundColor: 'darkblue',
    width: 100,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  headerText: {
    fontSize: 20,
    alignSelf: 'center',
  },
  title: {
    backgroundColor: 'gray',
    padding: 5,
  },
  titleText: {
    color: 'white',
  },
});

export default App;
