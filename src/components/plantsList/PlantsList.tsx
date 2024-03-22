import { List } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';
import { PlantsList } from '../App';
import PlantsListCard from '../plantsListCard/PlantsListCard';

const GardenList = () => {
  const plantsList = useContext(PlantsList);
  const theme = useTheme();

  return (
    <List
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
        [theme.breakpoints.between('md', 'lg')]: {
          gap: '40px',
        },
      }}
    >
      {plantsList.data.map((plant, index) => {
        return <PlantsListCard key={index} index={index} plantData={plant} />;
      })}
    </List>
  );
};

export default GardenList;
