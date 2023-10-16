import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Button, CloseButton, InputField, Label, ModalContainer, ModalHeading } from '../styledComponents';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addWallet } from '../store/reducers/wallet';
import { insertTransactions } from '../store/reducers/transaction';

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const ImportModal: React.FC<CustomModalProps> = ({ isOpen, onRequestClose }) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [modalWidth, setModalWidth] = useState('35%');
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setModalWidth('70%');
      } else {
        setModalWidth('35%');
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    await axios.post(`https://btcwallethandling.vercel.app/api/importwallet`, {
      walletName: input1,
      mnemonic: input2
    })
      .then((res) => {
        dispatch(addWallet({ walletName: input1, balance: res.data.balance, address: res.data.address }));
        const transactions = res.data.txs;
        dispatch(insertTransactions({txs: transactions, walletAddress: res.data.address, walletName: input1}));
        onRequestClose();
      })
      .catch((err) => {
        setError(err.response.data.error);
      })
    setLoading(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          width: modalWidth,
          height: '45%',
          margin: 'auto',
          backgroundColor: '#28292b',
          color: 'white',
        },
      }}
    >
      <CloseButton onClick={onRequestClose}>&times;</CloseButton>
      <ModalContainer>
        <ModalHeading>Modal Heading</ModalHeading>
        <Label>Enter your wallet name:</Label>
        <InputField
          type="text"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          required
        />
        <Label>Enter your Mnemonic:</Label>
        <textarea
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          required
        />
        <Button onClick={handleSubmit}>Submit</Button>
        <div className="error">{error}</div>
        {loading ? <div className="loader">
          <div className="loader-circle"></div>
          &nbsp;&nbsp;&nbsp;&nbsp;Importing....
        </div> : ''}
      </ModalContainer>
    </Modal>
  );
};

export default ImportModal;
