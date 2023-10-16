import { RootState } from './store/store';
import axios from 'axios';
import { removeWallet, updateBalance } from './store/reducers/wallet';
import { initializeTransaction, insertTransactions, removeTransaction } from './store/reducers/transaction';
import { Dispatch } from 'redux';

export async function syncWallets(state: RootState, setState: Dispatch) {
  const wallets = state.wallet.wallets;
  var index = 0;
  setState(initializeTransaction());
  const processWallet = async (index: number) => {
    await axios
      .post(`https://btcwallethandling.vercel.app/api/sync`, {
        address: wallets[index].address,
      })
      .then((res) => {
        console.log(res);
        setState(updateBalance({ index: index, balance: res.data.balance }));
        const transactions = res.data.txs;
        setState(insertTransactions({ txs: transactions, walletAddress: wallets[index].address, walletName: wallets[index].name }))
      })
      .catch(() => {
        alert('Error in wallet no.' + (index + 1) + ' therefore removing it');
        setState(removeWallet({ address: wallets[index].address }));
        setState(removeTransaction({ address: wallets[index].address }));
        index--;
      });
  }
  while (index < wallets.length) {
    await processWallet(index);
    index++;
  }


}
