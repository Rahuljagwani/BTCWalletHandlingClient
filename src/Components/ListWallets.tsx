import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { Box, Container, Header, Heading, Menu, TableBodyContainer, TableCell, TableContainer, TableHead, TableHeader, TableHeaderCell, TableRow, TableWrapper } from "../styledComponents";
import ImportModal from './ImportModal';
import { removeWallet } from '../store/reducers/wallet';
import { FaTrash, FaPlusCircle, FaBitcoin, FaSyncAlt, FaExternalLinkAlt, FaWallet } from 'react-icons/fa';
import { removeTransaction } from '../store/reducers/transaction';
import { syncWallets } from '../Synchronize';
import { Dispatch } from 'redux';

const ListWallets: React.FC = () => {
  const dispatch: Dispatch = useDispatch<AppDispatch>();
  const wallets: [{ name: string, balance: number, address: string }] = useSelector((state: RootState) => state.wallet.wallets);
  const state: RootState = useSelector((state: RootState) => state);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sync, setSync] = useState("Synced");
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const importWallet = (e: React.MouseEvent<HTMLButtonElement>) => {
    setModalIsOpen(true);
  }

  const handleRemoveWallet = (address: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(removeWallet({ address: address }));
    dispatch(removeTransaction({ address: address }));
  }

  const handleSync = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setSync("Syncing....");
    await syncWallets(state, dispatch);
    setSync("Synced");
  }

  const columns: string[] = ["Coin", "Holdings (Balance)", "Delete Wallet Action"];
  return (
    <>
      <Header>
          <ul className='tabBar'>
            <li>
              <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '15px' }}>
                <FaWallet className="icons" />&nbsp;<u>Wallets</u>
              </Link>
            </li>
            <li>
              <Link to="/transactions" style={{ color: 'white', textDecoration: 'none', fontSize: '15px' }}>
                <FaExternalLinkAlt className="icons" />&nbsp;Transactions
              </Link>
            </li>
          </ul>
        <label>{sync}</label>
        <button onClick={handleSync}><FaSyncAlt style={{ width: '18px', height: '18px' }} /></button>
      </Header>
      <Container>
        <Menu>
          <ul>
            <li style={{ borderLeft: '2px solid #eb720f' }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '20px' }}>
                <FaWallet className="icons" />&nbsp;&nbsp;&nbsp;Wallets
              </Link>
            </li>
            <li style={{ borderLeft: '2px solid #242830' }}>
              <Link to="/transactions" style={{ color: 'white', textDecoration: 'none', fontSize: '20px' }}>
                <FaExternalLinkAlt className="icons" />&nbsp;&nbsp;&nbsp;Transactions
              </Link>
            </li>
          </ul>
        </Menu>
        <Box>
          <Heading>Wallets</Heading>
          <button onClick={importWallet}><FaPlusCircle className='icons' />&nbsp;&nbsp;IMPORT WALLET</button>
          <ImportModal isOpen={modalIsOpen} onRequestClose={closeModal}></ImportModal>
          <TableContainer>
            <TableHead><div>TOTAL COINS- {wallets.length}</div>
              <TableWrapper>
                <TableHeader>
                  <TableRow>
                    {columns.map((column) => (
                      <TableHeaderCell key={column}>{column}</TableHeaderCell>
                    ))}
                  </TableRow>
                </TableHeader>
              </TableWrapper>
            </TableHead>
            <TableBodyContainer>
              <TableWrapper>
                <tbody className='tableBody'>
                  {wallets.map((row, index) => (
                    <><TableRow key={index}>
                      <TableCell><div className="icon-text-container-bitcoin"><FaBitcoin className='bitcoin' />&nbsp;&nbsp;&nbsp;&nbsp;{row.name}</div></TableCell>
                      <TableCell><div className="icon-text-container">BTC {row.balance / 100000000}</div></TableCell>
                      <TableCell><div className="icon-text-container"><button onClick={handleRemoveWallet(row.address)}><FaTrash className='icons' /></button></div></TableCell>
                    </TableRow><br></br></>
                  ))}
                </tbody>
              </TableWrapper>
            </TableBodyContainer>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
};

export default ListWallets;
