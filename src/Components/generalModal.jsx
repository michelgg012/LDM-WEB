import React from 'react';
import './GeneralModal.css'; // crear estilos en CSS

const GeneralModal = ({ visible, onClose, children, image }) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contentt">
        <button className="closeButton" onClick={onClose}>
          x
        </button>
        <div className="container-modal">
          <img className={"image-article"} src={image}/>
        {children}
        </div>
      </div>
    </div>
  );
};

export default GeneralModal;
