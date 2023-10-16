import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Box, Container, Header, Heading, Menu, TableBodyContainer, TableCell, TableContainer, TableHead, TableHeader, TableHeaderCell, TableRow, TableWrapper } from "../styledComponents";
import { FaExternalLinkAlt, FaSyncAlt, FaWallet } from 'react-icons/fa';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { syncWallets } from '../Synchronize';

const Transactions: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state: RootState = useSelector((state: RootState) => state);
  const transactions: [{ received: string, name: string, amount: number, sent: boolean, status: boolean }] = useSelector((state: RootState) => state.transaction.transactions);
  const columns: string[] = ["Time", "Wallet", "Amount", "Result", "Status"];
  const [sync, setSync] = useState("Synced");
  const handleSync = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setSync("Syncing....");
    await syncWallets(state, dispatch);
    setSync("Synced");
  }
  return (
    <>
      <Header>
        <ul className='tabBar'>
          <li>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '15px' }}>
              <FaWallet className="icons" />&nbsp;Wallets
            </Link>
          </li>
          <li>
            <Link to="/transactions" style={{ color: 'white', textDecoration: 'none', fontSize: '15px' }}>
            <FaExternalLinkAlt className="icons" />&nbsp;<u>Transactions</u>
            </Link>
          </li>
        </ul>
        <label>{sync}</label>
        <button onClick={handleSync}><FaSyncAlt style={{ width: '18px', height: '18px' }} /></button>
      </Header>
      <Container>
        <Menu>
          <ul>
            <li style={{ borderLeft: '2px solid #242830' }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '20px' }}>
                <FaWallet className="icons" />&nbsp;&nbsp;&nbsp;Wallets
              </Link>
            </li>
            <li style={{ borderLeft: '2px solid #eb720f' }}>
              <Link to="/transactions" style={{ color: 'white', textDecoration: 'none', fontSize: '20px' }}>
                <FaExternalLinkAlt className="icons" />&nbsp;&nbsp;&nbsp;Transactions
              </Link>
            </li>
          </ul>
        </Menu>
        <Box>
          <Heading>Transactions</Heading>
          <TableContainer>
            <TableHead><div>TOTAL TRANSACTIONS- {transactions.length}</div>
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
                  {transactions.map((row, index) => {
                    const date: string = row.received.slice(0, 10);
                    const time: string = row.received.slice(11, 19);
                    return (
                      <><TableRow key={index}>
                        <TableCell><div><p>{date}</p><p>{time}</p></div></TableCell>
                        <TableCell><div className="icon-container">{row.name}</div></TableCell>
                        <TableCell><div className="icon-container">BTC {row.amount / 100000000}</div></TableCell>
                        <TableCell className='transactionCell '><div className="icon-container">{row.sent ? "SENT" : "RECEIVED"}</div></TableCell>
                        <TableCell className='transactionCell'><div className="icon-container">{row.status ? "SUCCESS" : "PENDING"}</div></TableCell>
                      </TableRow><br></br></>
                    )
                  })}
                </tbody>
              </TableWrapper>
            </TableBodyContainer>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
};
export default Transactions;
