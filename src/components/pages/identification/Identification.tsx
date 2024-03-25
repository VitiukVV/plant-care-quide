import { Typography } from '@mui/material';
import PlantsIdentificationForm from '../../plantIdentificationForm/PlantIdentificationForm';

const Identification = () => {
  return (
    <section
      style={{
        maxWidth: '95%',
        width: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '25px',
      }}
    >
      <Typography align="center" variant="h4">
        Plants identification
      </Typography>
      <PlantsIdentificationForm />
    </section>
  );
};

export default Identification;
