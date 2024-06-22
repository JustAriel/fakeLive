import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

const PrivacyPolicy = () => {
  const openEmail = () => {
    const email = 'mailto:ytevil68@gmail.com';
    Linking.openURL(email);
  };

  const openTikTokProfile = () => {
    const tikTokProfileUrl = 'https://www.tiktok.com/@zexick';
    Linking.openURL(tikTokProfileUrl);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.paragraph}>
        Virtual Live collects only the camera permission for the purpose of providing live streaming functionality. The app requires camera access to function properly.
      </Text>
      <Text style={styles.paragraph}>
        For any inquiries or concerns, please contact us at:
      </Text>
      <Text style={styles.link} onPress={openEmail}>
        ytevil68@gmail.com
      </Text>
      <Text style={styles.paragraph}>
        Connect with us on TikTok:
      </Text>
      <Text style={styles.link} onPress={openTikTokProfile}>
        @zexick
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  link: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default PrivacyPolicy;
