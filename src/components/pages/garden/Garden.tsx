import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext, useState } from 'react';
import { PlantsList } from '../../App';
import AddPlant from '../../form/AddPlant';
import Modal from '../../modal/Modal';
import GardenList from '../../plantsList/PlantsList';

const Garden = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const plantsList = useContext(PlantsList);
  const theme = useTheme();

  const toggleModal = () => {
    setShowModal(!showModal);
    if (showModal === false) {
      document.body.style.overflow = 'hidden';
    }
    if (showModal === true) {
      document.body.style.overflow = 'visible';
    }
  };

  return (
    <Box component="section">
      <Container
        sx={{
          [theme.breakpoints.down('sm')]: {
            p: '0 20px',
          },
          [theme.breakpoints.between('sm', 'md')]: {
            p: '0 40px',
          },
          [theme.breakpoints.up('md')]: {
            p: '0 60px',
          },
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          sx={{
            [theme.breakpoints.down('sm')]: {
              fontSize: '1.75rem',
              mb: '20px',
            },
            [theme.breakpoints.between('sm', 'md')]: {
              fontSize: '2.75rem',
              mb: '30px',
            },
            [theme.breakpoints.between('md', 'lg')]: {
              mb: '40px',
            },
          }}
        >
          Your Garden
        </Typography>
        <Box
          sx={{
            display: 'flex',
            margin: '0 0 32px auto',
            justifyContent: 'center',
            [theme.breakpoints.up('sm')]: {
              justifyContent: 'flex-end',
            },
          }}
        >
          <Button
            variant="contained"
            type="button"
            onClick={toggleModal}
            sx={{
              display: 'flex',
              gap: 1,
              borderRadius: 3,
              padding: '8px 40px 8px 32px',
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.light,
            }}
          >
            <AddIcon />
            Add new
          </Button>
        </Box>
        {plantsList.data.length > 0 ? (
          <GardenList />
        ) : (
          <Typography component="h2" variant="h3" align="center">
            Your plant list is empty
          </Typography>
        )}

        {showModal && (
          <Modal onClose={toggleModal}>
            <AddPlant onClose={toggleModal} />
          </Modal>
        )}
      </Container>
    </Box>
  );
};

export default Garden;
