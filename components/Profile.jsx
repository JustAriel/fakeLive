import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Profile = ({ route, navigation }) => {
  const { username, profilePicture, viewers, handleProfile } = route.params || {};

  const handleProfileToggle = () => {
    handleProfile();
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num.toString();
    }
  };

  const DATA = {
    username: username,
    profilePicture: profilePicture,
    followers: formatNumber(viewers * 30),
    likes: formatNumber(viewers * 300),
    following: 233,
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleProfileToggle} style={styles.xButton}>
        <Image source={require('../images/x.png')} style={styles.x} />
      </TouchableOpacity>
      <Image source={{ uri: DATA.profilePicture }} style={styles.profilePicture} />
      <View style={styles.row}>
        <Text style={styles.username}>{DATA.username}</Text>
        <Image source={require('../images/verified.png')} style={styles.verified} />
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{DATA.followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{DATA.likes}</Text>
          <Text style={styles.statLabel}>Likes</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{DATA.following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 414,
    height: 310,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'absolute',
    zIndex: 992,
    top: -295,
    right: -207,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
  },
  xButton: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  x: {
    width: 30,
    height: 30,
  },
  verified: {
    width: 20,
    height: 20,
    marginRight: 420,
    marginTop: -8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 414,
    marginLeft: 430,
  },
});

export default Profile;
