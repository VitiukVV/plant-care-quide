import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_KEY } from '../../API/Api';

const Details = () => {
  // test API
  const [data, setData] = useState(null);
  const ID = '1';

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://perenual.com/api/species/details/${ID}?key=${API_KEY}`
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  console.log(data);
  return (
    <div>
      <h2>Details about plant</h2>
    </div>
  );
};

export default Details;
