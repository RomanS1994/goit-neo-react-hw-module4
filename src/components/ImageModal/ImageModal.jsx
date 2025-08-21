import style from './ImageModal.module.css';
import Modal from 'react-modal';

export default function ImageModal({ isOpen, onRequestClose, url }) {
  console.log(url);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={style.modal}
      overlayClassName={style.overlay}
      contentLabel="Example Modal"
    >
      <img src={url.regular} className={style.image} />
    </Modal>
  );
}
