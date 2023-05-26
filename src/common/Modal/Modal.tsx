import * as React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('*');

interface InjectedProps {
  openModal: () => void;
  closeModal: () => void;
  isOpenModal: boolean;
  children: React.ReactNode;
}

function ModalElement(props: InjectedProps) {
  const { closeModal, isOpenModal, children } = props;
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  return (
    <div className="reveal">
      <Modal isOpen={isOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        {children}
      </Modal>
    </div>
  );
}

export default ModalElement;
