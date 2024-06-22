import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image, StatusBar, FlatList, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { getFakeComment } from '../data/fakeData';
import Profile from './Profile';

const viewersFormat = (viewers) => {
  if (viewers >= 1000) return (viewers / 1000).toFixed(1) + 'K';
  return viewers.toString();
};

const Live = ({ route, navigation }) => {
  const { viewers: initialViewers, username, profilePicture } = route.params || {};
  const cameraRef = useRef(null);
  const [viewers, setViewers] = useState(initialViewers);
  const [comments, setComments] = useState([]);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const viewersInterval = setInterval(() => {
      const changePercentage = (Math.random() - 0.5) * 0.2;
      setViewers((prevViewers) => Math.max(0, prevViewers + prevViewers * changePercentage));
    }, 5000);

    const commentsInterval = setInterval(() => {
      const newComments = Array.from({ length: 3 }, () => getFakeComment());

      setComments((prevComments) => {
        const updatedComments = [...newComments, ...prevComments.slice(0, 2)];

        if (updatedComments.length > 5) {
          updatedComments.splice(2, 2);
        }

        return updatedComments;
      });
    }, 1500);

    return () => {
      clearInterval(viewersInterval);
      clearInterval(commentsInterval);
    };
  }, []);

  const toggleCamera = () => {
    setIsFrontCamera((prevIsFrontCamera) => !prevIsFrontCamera);
  };

  const handleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={isFrontCamera ? Camera.Constants.Type.front : Camera.Constants.Type.back} ref={cameraRef}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleProfile}>
            {profilePicture ? <Image source={{ uri: profilePicture }} style={styles.profilePicture} /> : null}
          </TouchableOpacity>
          <Text style={styles.usernameMain}>{username}</Text>
          <Image source={require('../images/verified.png')} style={styles.verified} />
          <View style={styles.viewsContainer}>
            <Image source={require('../images/eye.png')} style={styles.viewsImage} />
            <Text style={styles.viewsText}>{viewersFormat(viewers)}</Text>
          </View>
          <View style={styles.viewsContainer2}>
            <Text style={styles.viewsText2}>LIVE</Text>
          </View>
        </View>
        <TouchableOpacity onPress={toggleCamera} style={styles.spinButton}>
          <Image source={require('../images/spin.png')} style={styles.spinImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Start')} style={styles.spinButton2}>
          <Image source={require('../images/x.png')} style={styles.spinImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.spinButton3}>
          <Image source={require('../images/love1.png')} style={styles.spinImage3} />
        </TouchableOpacity>
        <StatusBar hidden={false} />
        <FlatList
          data={comments}
          style={styles.commetsMain}
          keyExtractor={(item, index) => index.toString()}
          inverted={true}
          renderItem={({ item }) => {
            return (
              <>
                <View style={styles.commentContainer}>
                  <Image source={item.pfp} style={styles.commentPfp} />
                  <Text style={styles.commentUsername}>{item.user}</Text>
                </View>
                <Text style={styles.commentText}>{item.message}</Text>
              </>
            );
          }}
        />
        <View style={styles.inputrea}>
          <TextInput 
            placeholder="Add a comment..."
            placeholderTextColor="white"
            style={styles.input}
            autoFocus={false}
          />
          <Image source={require('../images/addFriend.jpeg')} style={styles.add} />
          <Image source={require('../images/send1.jpeg')} style={styles.send} />
        </View>
      </Camera>
      {showProfile && (
        <View style={styles.profileContainer}>
          <Profile route={{ params: { username, profilePicture, viewers, handleProfile } }} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: 564,
    height: 840,
    marginRight: 10,
  },
  header: {
    width: '110%',
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 20,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginLeft: 65,
  },
  usernameMain: {
    fontSize: 20,
    color: 'white',
    marginLeft: 13,
    fontWeight: "bold",
  },
  viewsContainer: {
    width: 35,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 27,
    position:"absolute",
    top: 20,
    right: 210,
  },
  viewsContainer2: {
    backgroundColor: "red",
    borderRadius: 4,
    position: "absolute",
    top: 20,
    right: 170,
  },
  viewsImage: {
    width: 20,
    height: 13.5,
    marginTop: 2,
  },
  viewsText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
  },
  viewsText2: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 5,
  },
  commentContainer: {
    padding: 8,
    borderRadius: 8,
    margin: 4,
    width: "70%",
    marginLeft: 85,
    marginBottom: 0,
    flexDirection: "row",
  },
  commentText: {
    color: 'white',
    position: "absolute",
    left: 130,
    top: 27,
  },
  commentUsername: {
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
    marginBottom: 2,
  },
  commetsMain: {
    position: "absolute",
    bottom: 50,
    width: "140%",
    backgroundColor: 'rgba(0, 0, 0, .01)',
  },
  commentPfp: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  input: {
    width: 414,
    height: 50,
    backgroundColor:"rgba(0, 0, 0, 1)",
    marginLeft: 80,
    color: "white",
    position: "absolute",
    bottom: 0,
    paddingLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  spinButton: {
    width: 30,
    height: 30,
    position: "absolute",
    right: 90,
    top:130,
  },
  spinButton2: {
    width: 30,
    height: 30,
    position: "absolute",
    right: 90,
    top:80,
  },
  spinButton3: {
    width: 40,
    height: 40,
    position: "absolute",
    right: 86,
    top:175,
  },
  spinImage3: {
    width: 45,
    height: 45,
  },
  spinImage: {
    width: 30,
    height: 30,
  },
  inputrea: {
    bottom:0,
    position: "absolute",
  },
  send: {
    width: 40,
    height: 40,
    borderRadius: 40,
    zIndex: 992,
    marginLeft: 430,
    marginBottom: 5,
  },
  add:{
    width: 40,
    height: 40,
    borderRadius: 40,
    zIndex: 992,
    marginLeft:385,
    marginBottom: -40,
  },
  verified: {
    width: 20,
    height: 20,
    marginRight: 460,
    marginTop: 2.5,
    marginLeft:2,
  },
});

export default Live;
