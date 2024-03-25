import { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Typography, Snackbar, Alert } from '@mui/material';
import { PlantFullData } from './../../interface/interface';
import { postPlant } from '../../services/serviceAPI';

const PlantsIdentificationForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [plantData, setPlantData] = useState<PlantFullData | null>(null);
  const [snackbarState, setSnackbarState] = useState<{
    open: boolean;
    message: string;
    severity: 'error' | 'success';
  }>({ open: false, message: '', severity: 'error' });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.item(0);
    if (selectedFile) {
      setImage(selectedFile);
      setSnackbarState({
        open: true,
        message: 'Your photo was uploaded!',
        severity: 'success',
      });
    }
  }

  async function identifyPlant(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!image) {
      setSnackbarState({
        open: true,
        message: 'Please select an image file.',
        severity: 'error',
      });

      return;
    }
    const formData = new FormData();
    formData.append('images', image);
    try {
      const data = await postPlant(image);
      const { is_plant } = data;
      const plantData: PlantFullData = data;

      if (is_plant) {
        setPlantData(plantData);
      } else {
        setSnackbarState({
          open: true,
          message: 'No plants on the photo.',
          severity: 'error',
        });
      }
    } catch (error) {
      setSnackbarState({
        open: true,
        message: `Error: ${error}`,
        severity: 'error',
      });
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarState({
      open: false,
      message: '',
      severity: 'error',
    });
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
        open={snackbarState.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarState.severity}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PlantsIdentificationForm;
