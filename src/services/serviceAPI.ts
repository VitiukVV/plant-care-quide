import axios from 'axios';

const API_URL = 'https://65fea74eb2a18489b3865e36.mockapi.io/';

export const fetchBotanicPlantNames = async () => {
  try {
    const response = await axios.get(`${API_URL}plantList`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const fetchBotanicPlantDetails = async (botanicName: string) => {
  try {
    const response = await axios.get(
      `${API_URL}plantDetails?name=${encodeURIComponent(botanicName)}`
    );
    return response.data[0];
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
