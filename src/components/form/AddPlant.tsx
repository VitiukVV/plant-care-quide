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
import { useTheme } from '@mui/material/styles';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { rooms } from '../../data/rooms';
import {
  fetchBotanicPlantDetails,
  fetchBotanicPlantNames,
} from '../../services/serviceAPI';
import { PlantsList } from '../App';

interface Props {
  onClose: () => void;
}

const AddPlant: React.FC<Props> = ({ onClose }) => {
  const plantsListData = useContext(PlantsList);
  const theme = useTheme();

  const [selectedCommonName, setSelectedCommonName] = useState<string>('');
  const [botanicNames, setBotanicNames] = useState<string[]>([]);
  const [selectedBotanicName, setSelectedBotanicName] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<string>(rooms[0]);
  const [plantId, setPlantId] = useState<number>(0);
  const [plantImgUrl, setPlantImgUrl] = useState<string>('');

  useEffect(() => {
    const getBotanicNames = async () => {
      const result = await fetchBotanicPlantNames();
      setBotanicNames(result[0].plantBotanicNames);
    };

    getBotanicNames();
  }, []);

  useEffect(() => {
    const getBotanicPlantNames = async (selectedBotanicName: string) => {
      try {
        const result = await fetchBotanicPlantDetails(selectedBotanicName);

        if (result.data.default_image && result.data.default_image.thumbnail) {
          setPlantId(result.id);
          setPlantImgUrl(result.data.default_image.thumbnail);
        } else {
          // If there is no thumbnail, we set the standard value
          setPlantId(result.id);
          setPlantImgUrl(
            'https://perenual.com/storage/image/missing_image.jpg'
          );
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getBotanicPlantNames(selectedBotanicName);
  }, [selectedBotanicName]);

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
        [theme.breakpoints.up('lg')]: {
          width: '600px',
        },
      }}
    >
      <Button
        sx={{
          minWidth: 'unset',
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
              {botanicNames.map((name, index) => (
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
