import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import axios, { AxiosError } from 'axios';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { plantBotanicNames } from '../../data/plantBotanicNames';
import { rooms } from '../../data/rooms';
import { PlantsList } from '../App';
import { useTheme } from '@mui/material/styles';
const API_KEY_2 = import.meta.env.VITE_API_KEY_2;
const API_KEY = import.meta.env.VITE_API_KEY_3;

interface Props {
  onClose: () => void;
}

const AddPlant: React.FC<Props> = ({ onClose }) => {
  const [selectedCommonName, setSelectedCommonName] = useState<string>('');
  const [selectedBotanicName, setSelectedBotanicName] = useState<string>(
    plantBotanicNames[0]
  );
  const [selectedRoom, setSelectedRoom] = useState<string>(rooms[0]);
  const [plantId, setPlantId] = useState<number>(0);
  const [plantImgUrl, setPlantImgUrl] = useState<string>(
    'https://perenual.com/storage/image/missing_image.jpg'
  );

  const plantsListData = useContext(PlantsList);
  const theme = useTheme();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedCommonName(e.target.value);
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name } = e.target;
    switch (name) {
      case 'botanicName':
        setSelectedBotanicName(e.target.value);
        break;
      case 'room':
        setSelectedRoom(e.target.value);
        break;
      default:
        console.error(`Unhandled input name: ${name}`);
        break;
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://perenual.com/api/species-list?key=${API_KEY}&q=${encodeURIComponent(
            selectedBotanicName
          )}`
        );

        setPlantId(response.data.data[0].id);
        setPlantImgUrl(response.data.data[0].default_image.thumbnail);
      } catch (error: unknown) {
        if ((error as AxiosError).response?.status === 429) {
          // if we get a 429 status code from the API, use another API_KEY
          try {
            const response = await axios.get(
              `https://perenual.com/api/species-list?key=${API_KEY_2}&q=${encodeURIComponent(
                selectedBotanicName
              )}`
            );
            setPlantId(response.data.data[0].id);
            setPlantImgUrl(response.data.data[0].default_image.thumbnail);
          } catch (err) {
            console.error('Error fetching data:', err);
          }
        } else {
          console.error('Error fetching data:', error);
        }
      }
    }

    fetchData();
  }, [plantId, selectedBotanicName]);

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    plantsListData.addPlant([
      {
        commonName: selectedCommonName,
        botanicName: selectedBotanicName,
        room: selectedRoom,
        plantID: plantId,
        plantImgUrl,
      },
    ]);
    onClose();
  };

  return (
    <Box
      sx={{
        position: 'relative',
        padding: '40px',
        background: '#fff',
        borderRadius: '24px',
        [theme.breakpoints.between('md', 'lg')]: {
          width: '540px',
        },
      }}
    >
      <Button
        sx={{
          width: '24px',
          height: '24px',
          position: 'absolute',
          right: '16px',
          top: '16px',
          backgroundColor: 'transparent',
        }}
        type="button"
        onClick={onClose}
      >
        <CloseIcon />
      </Button>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Whats the name of your plant?"
            name="commonName"
            onChange={handleInputChange}
            type="text"
            required
          />
          <FormControl>
            <InputLabel>Botanical Name</InputLabel>
            <Select
              name="botanicName"
              label="Botanical Name"
              value={selectedBotanicName}
              onChange={handleSelectChange}
              required
            >
              {plantBotanicNames.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Room</InputLabel>
            <Select
              name="room"
              label="room"
              value={selectedRoom}
              onChange={handleSelectChange}
              required
            >
              {rooms.map((room, index) => (
                <MenuItem key={index} value={room}>
                  {room}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}
            type="submit"
          >
            Add to my Garden
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddPlant;
