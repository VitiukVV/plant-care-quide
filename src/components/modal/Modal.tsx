import { useCallback, useEffect, ReactElement, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

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
    <div className={css.modalBackdrop} onClick={handleCloseModal}>
      <div className={css.modalContent}>{children}</div>
    </div>,
    modalRoot as Element
  );
};

export default Modal;
