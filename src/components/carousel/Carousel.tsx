import { useContext } from 'react';
import {
  Typography,
  Container,
  ListItemAvatar,
  Avatar,
  Box,
  Button,
  List,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { useTheme } from '@mui/material/styles';
import { PlantsList } from '../App';
import { Link } from 'react-router-dom';
import { PlantsListItemProps } from '../../interface/interface';

const PlantListItem = ({ plantData }: PlantsListItemProps) => {
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
      <ListItemAvatar>
        <Avatar
          variant="square"
          src={plantData.plantImgUrl}
          alt={plantData.botanicName}
          sx={{
            borderRadius: '24px',
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
      </ListItemAvatar>
      <Typography variant="h4" marginBottom={2} marginTop={1}>
        {plantData.commonName}
      </Typography>
      <Typography sx={{ height: '3rem' }} marginBottom={1}>
        {plantData.botanicName}{' '}
        <Typography component="span">in {plantData.room}</Typography>
      </Typography>
      <Button
        variant="contained"
        type="button"
        sx={{
          backgroundColor: theme.palette.primary.main,
          borderRadius: '24px',
          padding: '4px 28px',
          margin: 'auto',
          display: 'block',
        }}
      >
        <Link
          style={{ color: 'white', textDecoration: 'none' }}
          to={`/garden/details/${plantData.plantID}`}
        >
          Details
        </Link>
      </Button>
    </Box>
  );
};

const HomePageCarousel = () => {
  const theme = useTheme();
  const plantsList = useContext(PlantsList);
  const plantsPerPage = 4;
  const totalPages = Math.ceil(plantsList.data.length / plantsPerPage);

  const groups = Array.from({ length: totalPages }, (_, i) => {
    const start = i * plantsPerPage;
    const end = start + plantsPerPage;
    return plantsList.data.slice(start, end);
  });

  return (
    <Container>
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
          [theme.breakpoints.up('md')]: {
            mb: '40px',
          },
        }}
      >
        My plants
      </Typography>
      <Carousel>
        {groups.map((group, index) => (
          <List
            key={index}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              [theme.breakpoints.down('sm')]: {
                gap: '20px',
              },
              [theme.breakpoints.between('sm', 'md')]: {
                fontSize: '2.75rem',
                gap: '30px',
              },
              [theme.breakpoints.up('md')]: {
                gap: '40px',
              },
            }}
          >
            {group.map((plantData, i) => (
              <PlantListItem key={i} plantData={plantData} />
            ))}
          </List>
        ))}
      </Carousel>
    </Container>
  );
};

export default HomePageCarousel;
