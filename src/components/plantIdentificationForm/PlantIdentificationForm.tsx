import axios from 'axios';
import { useState, ChangeEvent, FormEvent } from 'react';

interface PlantIdData {
  confirmed: boolean;
  id: number;
  plant_details: {
    language: string;
    scientific_name: string;
    structured_name: {
      genus: string;
      species: string;
    };
  };
  plant_name: string;
  probability: number;
}

const PlantsIdentificationForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [plantData, setPlantData] = useState<PlantIdData | null>(null);

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

      const { is_plant } = response.data;
      const data: PlantIdData = response.data.suggestions[0];

      if (is_plant) {
        console.log(data);
        setPlantData(data);
        console.log(plantData);
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
      <div>
        {plantData ? <h1>Your plant name is {plantData.plant_name}</h1> : null}
        <h1></h1>
      </div>
    </div>
  );
};

export default PlantsIdentificationForm;
