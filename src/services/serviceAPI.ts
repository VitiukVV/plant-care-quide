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

export const fetchBotanicPlantDetailsId = async (plantID: string) => {
  try {
    const response = await axios.get(
      `${API_URL}plantDetails?id=${encodeURIComponent(plantID)}`
    );

    return response.data[0];
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const PLANT_ID_URL = 'https://api.plant.id/v2/identify';
const PLANT_ID_API_KEY = import.meta.env.VITE_API_KEY_ID;

export const postPlant = async (image: File) => {
  const formData = new FormData();
  formData.append('images', image);
  try {
    const response = await axios.post(PLANT_ID_URL, formData, {
      headers: {
        'Api-Key': PLANT_ID_API_KEY,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error identifying plant: ${error}`);
  }
};
