import { useState, useEffect } from 'react';
import { fetchBotanicPlantDetails } from '../../../services/serviceAPI';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  CircularProgress,
} from '@mui/material';

import Icons from '../../../icons/DetailsIcons';

interface PlantDetails {
  common_name: string;
  sunlight: string;
  family: string;
  watering: string;
  origin: string;
  description: string;
  default_image: {
    medium_url: string;
  };
}

interface PlantDetailProps {
  label: string;
  value: string;
  Icon: React.ComponentType;
}

const Details = () => {
  const [plantDetails, setPlantDetails] = useState<PlantDetails | null>(null);
  const { plantID } = useParams<{ plantID: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchDetails = async () => {
      if (plantID) {
        const details = await fetchBotanicPlantDetails(plantID);
        setPlantDetails(details.data);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [plantID]);

  const renderPlantDetail = ({ label, value, Icon }: PlantDetailProps) => (
    <Typography
      variant="body1"
      sx={{
        display: 'flex',
        alignItems: 'center',
        fontWeight: '500',
        fontSize: { xs: '0.9rem', md: '1.25rem' },
        textAlign: { xs: 'center', md: 'left' },
        lineHeight: '116%',
        marginBottom: '1.25rem',
      }}
    >
      <Icon />
      {`${label}: ${value}`}
    </Typography>
  );

  const renderPlantDetails = () => {
    if (!plantDetails) return null;

    return (
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
            paddingLeft: { xs: '0.625rem', md: '3.125rem', mb: '5rem' },
          }}
        >
          <Typography
            component="h2"
            variant="h3"
            sx={{
              fontWeight: '500',
              fontSize: { xs: '2rem', md: '3rem' },
              lineHeight: '116%',
              marginBottom: '2.5rem',
            }}
          >
            {plantDetails.common_name.charAt(0).toUpperCase() +
              plantDetails.common_name.slice(1)}
          </Typography>
          {renderPlantDetail({
            label: 'Sunlight',
            value: plantDetails.sunlight,
            Icon: Icons.WbSunny,
          })}
          {renderPlantDetail({
            label: 'Plant Familly',
            value: plantDetails.family,
            Icon: Icons.Diversity3,
          })}
          {renderPlantDetail({
            label: 'Watering',
            value: plantDetails.watering,
            Icon: Icons.WaterDrop,
          })}
          {renderPlantDetail({
            label: 'Origin',
            value: plantDetails.origin,
            Icon: Icons.Language,
          })}
        </Grid>
        <Grid item xs={12} md={6}>
          <CardMedia
            sx={{
              borderRadius: '3.75rem',
              width: '100%',
              height: 'auto',
              maxWidth: '100%',
            }}
            component="img"
            src={plantDetails.default_image.medium_url}
            alt="Plant"
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <main>
      <Container
        sx={{
          paddingLeft: { xs: '1rem', md: '3rem' },
          paddingRight: { xs: '1rem', md: '3rem' },
          marginBottom: { xs: '4.5rem', md: '7.5rem' },
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          sx={{
            [theme.breakpoints.down('sm')]: {
              fontSize: '1.75rem',
              mb: '1.875rem',
            },
            [theme.breakpoints.between('sm', 'md')]: {
              fontSize: '1.875rem',
              mb: '3.125rem',
            },
            [theme.breakpoints.up('md')]: {
              mb: '4.375rem',
            },
          }}
        >
          Details about plant
        </Typography>
        {loading ? (
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '80vh',
            }}
          >
            <CircularProgress />
          </Container>
        ) : (
          <Card
            component="section"
            sx={{
              background: 'rgba(86, 129, 122, 0.2)',
              borderRadius: '3.75rem',
            }}
          >
            <CardContent>{renderPlantDetails()}</CardContent>
          </Card>
        )}
        {plantDetails && (
          <Typography component="p" marginTop={5}>
            {plantDetails.description}
          </Typography>
        )}
      </Container>
    </main>
  );
};

export default Details;
