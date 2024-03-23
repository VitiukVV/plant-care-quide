import axios from 'axios';
import { useState, ChangeEvent, FormEvent } from 'react';

const PlantsIdentificationForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [plantData, setPlantData] = useState(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.item(0);
    if (selectedFile) {
      console.log(selectedFile);
      setImage(selectedFile);
    }
  }
  async function identifyPlant(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = 'https://api.plant.id/v2/identify';
    const apiToken = 'EAlbqxzeTr8dhVrqSUO0w2Q2TyVZLXAgYBeftWY5XT00Oay4eL';
    if (!image) {
      console.log('Please select an image file.');
      return;
    }
    const formData = new FormData();
    formData.append('images', image);
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Api-Key': apiToken,
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = response.data;

      if (data.is_plant) {
        console.log(data);
        // displayResult(data);
        setPlantData(data);
      } else {
        console.log(response);
        console.log('No plants on the photo');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={identifyPlant}>
        <input type="file" onChange={handleChange} />
        <button type="submit">Identify My Plant!</button>
      </form>
    </div>
  );
};

export default PlantsIdentificationForm;
