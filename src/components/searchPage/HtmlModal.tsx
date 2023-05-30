import * as React from 'react';
import Modal from 'react-modal';
import parse from 'html-react-parser';

Modal.setAppElement('*');

interface InjectedProps {
  openModal: () => void;
  closeModal: () => void;
  isOpenModal: boolean;
  htmlElement: string;
}

function ModalElement(props: InjectedProps) {
  const { closeModal, isOpenModal, htmlElement } = props;
  const customStyles = {
    content: {
      top: '55%',
      left: '55%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      scrollY: 'scroll',
      maxHeight: '70%',
    },
  };
  return (
    <div className="reveal">
      <Modal isOpen={isOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <div className="grid-x grid-padding-x align-top">
          <button className="button" onClick={closeModal}>
            Close Modal
          </button>
          <div>{parse(htmlElement)}</div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalElement;
