import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token);
    console.log('Token stored successfully');
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

const retrieveToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (token !== null) {
      console.log('Token retrieved successfully:', token);
      return token;
    } else {
      console.log('No token found');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

export { storeToken, retrieveToken };
