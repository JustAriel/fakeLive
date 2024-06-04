import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibraryAsync } from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Start = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [viewers, setViewers] = useState(0);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const loadAppliedData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('appliedUsername');
        const storedProfilePicture = await AsyncStorage.getItem('appliedProfilePicture');

        setProfilePicture(storedProfilePicture || null);
        setUsername(storedUsername || '');
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };

    loadAppliedData();
  }, []);

  const handleImagePicker = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfilePicture(result.uri);
    }
  };

  const handleViewersChange = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, '');

    if (cleanedText !== '' && !isNaN(cleanedText)) {
      let numericValue = parseInt(cleanedText, 10);

      const clampedValue = Math.min(Math.max(numericValue, 0), 250000);

      setViewers(clampedValue);
    } else {
      setViewers(0);
    }
  };

  const handleApply = async () => {
    try {
      await AsyncStorage.setItem('appliedUsername', username);
      await AsyncStorage.setItem('appliedProfilePicture', profilePicture || '');
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  const handleStart = () => {
    if (viewers < 1000) {
      Alert.alert('Invalid Viewers', 'Number of viewers must be at least 1000');
      return;
    }

    navigation.navigate('Live', {
      viewers: viewers,
      username: username,
      profilePicture: profilePicture,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.text21}>{username}</Text>
          <Image source={require('../images/verified.png')} style={styles.verified} />
        </View>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.appliedPfpImage} />
        ) : null}
        <TouchableOpacity style={styles.pfpContainer} onPress={handleImagePicker}>
          {profilePicture ? (
            <Image source={{ uri: profilePicture }} style={styles.pfpImage} />
          ) : (
            <Image source={require("../images/NPF.jpg")} style={styles.pfpImage} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <Text style={styles.text1}>Username</Text>
        <View style={styles.row}>
          <TextInput
            value={username}
            placeholder="Add username here"
            onChangeText={(text) => setUsername(text)}
            style={styles.input}
            maxLength={30}
          />
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyText}>APPLY</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text1}>Viewers</Text>
        <View style={styles.row}>
          <TextInput
            value={viewers.toString()}
            keyboardType="numeric"
            placeholder="Add number of views here"
            onChangeText={handleViewersChange}
            style={styles.input}
          />
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyText}>APPLY</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.box}>
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startText}>Start Live</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.privacyButton} onPress={() => navigation.navigate('Privacy')}>
        <Text style={styles.startText2}>Privacy Policy</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    textAlign: "center",
    height: 33,
    backgroundColor: "#fff",
    width: 170,
    borderBottomWidth: .5,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  box: {
    backgroundColor: "#f9f9f9",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: 395,
    borderRadius: 16,
    marginTop: 20,
  },
  pfpContainer: {
    width: 150,
    height: 150,
    borderRadius: 150,
  },
  pfpImage: {
    height: 150,
    width: 150,
    borderRadius: 150,
  },
  text1:{ 
    fontSize: 16,
    fontWeight: "300",
    letterSpacing: 1.25,
  },
  text1:{ 
    fontSize: 14,
    fontWeight: "300",
    letterSpacing: 1.25,
    marginTop: 10,
    marginRight: 90,
  },
  text2: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.25,
  },
  text21: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1.25,
    marginBottom: 10,
  },
  containerText: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  applyButton: {
    backgroundColor: "white",
    width: 45,
    height: 34,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:6,
    borderWidth: .5,
  },
  applyText: {
    color: "black",
    fontWeight: "bold",
  },
  startButton: {
    backgroundColor: "#87B87F",
    width: 200,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  startText:{
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  privacyButton: {
    height: 40, 
    marginTop: 10,
  },startText2: {
    color:"blue"
  },
  verified: {
    width: 20,
    height: 20,
    marginTop: 2.5,
    marginLeft: 2
  },
  row: {
    flexDirection: 'row',
  },
});

export default Start;
