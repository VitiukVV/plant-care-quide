import { Avatar, Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PlantsListCardProps } from '../../interface/interface';
import { PlantsList } from '../App';

const PlantsListCard = ({ plantData, index }: PlantsListCardProps) => {
  const plantsList = useContext(PlantsList);
  const theme = useTheme();

  return (
    <Box
      component="li"
      sx={{
        width: '258px',
        borderRadius: '32px',
        padding: '16px',
        background: `linear-gradient(180deg, ${theme.palette.primary.main} , ${theme.palette.primary.light})`,
        [theme.breakpoints.down('sm')]: {
          height: '350px',
        },
        [theme.breakpoints.between('sm', 'md')]: {
          height: '400px',
        },
        [theme.breakpoints.up('md')]: {
          width: '295px',
          height: '500px',
        },
      }}
    >
      <Avatar
        variant="square"
        src={plantData.plantImgUrl}
        alt={plantData.botanicName}
        sx={{
          borderRadius: '24px',
          loading: 'lazy',
          width: '226px',
          [theme.breakpoints.down('sm')]: {
            height: '170px',
          },
          [theme.breakpoints.between('sm', 'md')]: {
            height: '220px',
          },
          [theme.breakpoints.up('md')]: {
            width: '263px',
            height: '300px',
          },
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', mt: 1 }}>
        <Typography variant="h4">{plantData.commonName}</Typography>
        <Typography sx={{ height: '48px' }}>
          {plantData.botanicName}{' '}
          <Typography component="span">in {plantData.room}</Typography>
        </Typography>

        <Box sx={{ display: 'flex', gap: '18px' }}>
          <Button
            sx={{ color: 'Black', borderRadius: '24px', padding: '4px 28px' }}
            variant="outlined"
            type="button"
            onClick={() => plantsList.removePlant(index)}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            type="button"
            sx={{
              backgroundColor: theme.palette.primary.main,
              borderRadius: '24px',
              padding: '4px 28px',
            }}
          >
            <Link
              style={{ color: 'white' }}
              to={`/garden/details/${plantData.plantID}`}
            >
              Details
            </Link>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PlantsListCard;
