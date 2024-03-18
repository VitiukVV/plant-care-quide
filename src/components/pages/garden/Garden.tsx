import { useContext, useState } from 'react';
import { PlantsList } from '../../App';
import AddPlant from '../../form/AddPlant';
import Modal from '../../modal/Modal';
import GardenList from '../../plantsList/PlantsList';

const Garden = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const plantsList = useContext(PlantsList);

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
    <section>
      <h1>Your Garden</h1>
      <button type="button" onClick={toggleModal}>
        Add Plant to Garden
      </button>
      {plantsList.data.length > 0 ? (
        <GardenList />
      ) : (
        <h2>Your plant list is empty</h2>
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <AddPlant onClose={toggleModal} />
        </Modal>
      )}
    </section>
  );
};

export default Garden;
