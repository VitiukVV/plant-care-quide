import React, { ChangeEvent, useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { Task } from '../../../interface/interface';
import { styled } from '@mui/system';

const defaultPlantList =
  'https://hortology.co.uk/cdn/shop/files/Ficus-elastica-Melany-Rubber-Plant-14x45cm-Hadleigh-Plant-Pot-White-20x17.5cm_52335388-022e-4750-9c9f-54efbba9ea0a_1200x.jpg?v=1704197517';

const checkImageUrl = (imageUrl: string): boolean => {
  try {
    new URL(imageUrl);
    return true;
  } catch (err) {
    return false;
  }
};

const ListElement = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
  padding: '12px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  maxWidth: '400px',
});

const Image = styled('img')({
  display: 'inline-block',
  width: '100px',
  marginRight: '16px',
  borderRadius: '8px',
});

const Form = styled('form')({
  marginBottom: '24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  maxWidth: '800px',
});

const TaskItem = ({ task, image, date }: Task) => {
  return (
    <ListElement>
      <Image src={image} alt="" />
      <span>{task}</span>
      <span>{format(date.$d, 'dd/MM/yyyy')}</span>
      <Checkbox />
    </ListElement>
  );
};

const TodoList = () => {
  const [sortBy, setSortBy] = useState('asc');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [newImage, setNewImage] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newDate, setNewDate] = useState<Date | null>(null);

  const sortedTasks = tasks.sort((a, b) => {
    if (sortBy === 'asc') {
      return a.date.$d.getTime() - b.date.$d.getTime();
    } else {
      return b.date.$d.getTime() - a.date.$d.getTime();
    }
  });

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newTask.trim() !== '' && newDate !== null) {
      const plantImage = checkImageUrl(newImage) ? newImage : defaultPlantList;

      setTasks([
        ...tasks,
        {
          task: newTask.trim(),
          image: plantImage,
          date: newDate,
          isDone: false,
        },
      ]);
      setNewTask('');
      setNewImage('');
      setNewDate(null);
    }
  };

  const handleNewTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleNewImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewImage(event.target.value);
  };

  const handleNewDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (selectedDate !== null) {
      setNewDate(selectedDate);
    }
  }, [selectedDate]);

  return (
    <div>
      <h2>Todo List</h2>
      <div>
        <Grid container spacing={2}>
          <Grid item>
            <span>Sort by:</span>
            <Select value={sortBy} onChange={handleSortChange}>
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="des">Descending</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </div>
      <Form onSubmit={handleSubmit}>
        <TextField
          label="New Task"
          variant="outlined"
          value={newTask}
          onChange={handleNewTaskChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Image Link"
          variant="outlined"
          value={newImage}
          onChange={handleNewImageChange}
          fullWidth
          margin="normal"
        />
        <DatePicker
          label="Date"
          value={selectedDate}
          onChange={handleNewDateChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Task
        </Button>
      </Form>
      <div className="list">
        {sortedTasks.map((task, index) => (
          <TaskItem key={index + task.task} {...task} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
