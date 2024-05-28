import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import "./style.css"
const ImageModal = ({img,modal,  setModal}) => {

    const [backdrop, setBackdrop] = useState(true);
    const [keyboard, setKeyboard] = useState(true);
  
    const toggle = () => setModal(!modal);
  
    const changeBackdrop = (e) => {
      let { value } = e.target;
      if (value !== 'static') {
        value = JSON.parse(value);
      }
      setBackdrop(value);
    };
  
    const changeKeyboard = (e) => {
      setKeyboard(e.currentTarget.checked);
    };
  return (
    <Modal
        isOpen={modal}
        toggle={toggle}
        // className={className}
        backdrop={backdrop}
        keyboard={keyboard}
        size="lg"
      >
        <ModalHeader toggle={toggle}>Groom picture</ModalHeader>
        <ModalBody>
       <img src={img} className='__modal-img'/>
        </ModalBody>
        <ModalFooter>
        
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          </ModalFooter>
        </Modal>
  )
}

export default ImageModal