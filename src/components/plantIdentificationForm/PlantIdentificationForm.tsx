import axios from 'axios';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Typography, Snackbar, Alert } from '@mui/material';
import { PlantFullData } from './../../interface/interface';

const PlantsIdentificationForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [plantData, setPlantData] = useState<PlantFullData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.item(0);
    if (selectedFile) {
      setImage(selectedFile);
    }
  }

  async function identifyPlant(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = 'https://api.plant.id/v2/identify';
    const API_KEY = import.meta.env.VITE_API_ID_KEY;
    if (!image) {
      setErrorMessage('Please select an image file.');
      setOpenSnackbar(true);
      return;
    }
    const formData = new FormData();
    formData.append('images', image);
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Api-Key': API_KEY,
          'Content-Type': 'multipart/form-data',
        },
      });

      const { is_plant } = response.data;
      const data: PlantFullData = response.data;

      if (is_plant) {
        setPlantData(data);
      } else {
        setErrorMessage('No plants on the photo.');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setErrorMessage(`Error: ${error}`);
      setOpenSnackbar(true);
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <form
        onSubmit={identifyPlant}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        <label htmlFor="upload">
          <input
            type="file"
            onChange={handleChange}
            style={{ display: 'none' }}
            id="upload"
          />
          <Button
            color="primary"
            variant="contained"
            component="span"
            sx={{ color: '#fff', marginBottom: '10px' }}
          >
            Upload a photo
          </Button>
        </label>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          component="button"
          sx={{ color: '#fff', marginBottom: '10px' }}
        >
          Identify My Plant!
        </Button>
      </form>
      <div>
        {plantData ? (
          <Typography align="center" variant="h4">
            Your plant name is {plantData.suggestions[0].plant_name}
            <img
              src={plantData.images[0].url}
              alt={plantData.suggestions[0].plant_name}
            />
          </Typography>
        ) : null}
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PlantsIdentificationForm;
