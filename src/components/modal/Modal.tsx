import { Box } from '@mui/material';
import { MouseEvent, ReactElement, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  onClose: () => void;
  children: ReactElement;
};

const modalRoot = document.querySelector('#modal-root');

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const handleCloseModal = useCallback(
    (event: KeyboardEvent | MouseEvent<unknown, unknown>) => {
      if ('code' in event && event.code === 'Escape') {
        onClose();
      } else if (
        'currentTarget' in event &&
        event.currentTarget === event.target
      ) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleCloseModal);
    return () => {
      document.removeEventListener('keydown', handleCloseModal);
    };
  }, [handleCloseModal]);

  return createPortal(
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ' rgba(0, 0, 0, 0.8)',
        zIndex: 1200,
      }}
      onClick={handleCloseModal}
    >
      <Box
        sx={{
          overflowX: 'auto',
          maxWidth: 'calc(100vw - 48px)',
          maxHeight: 'calc(100vh - 24px)',
        }}
      >
        {children}
      </Box>
    </Box>,
    modalRoot as Element
  );
};

export default Modal;
