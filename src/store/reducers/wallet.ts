import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { address } from 'bitcoinjs-lib';

interface Wallet {
  name: string,
  balance: number,
  address: string
}

interface Wallets {
  wallets: Wallet[]
}

const initialState: Wallets = {
  wallets: []
};

const wallet = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    addWallet: (state, action: PayloadAction<{ balance: number, walletName: string, address: string }>) => {
      if (!state.wallets.length) {
        state.wallets = [{ name: action.payload.walletName, balance: action.payload.balance, address: action.payload.address }]
      } else {
        state.wallets.push({ name: action.payload.walletName, balance: action.payload.balance, address: action.payload.address });
      }
    },

    removeWallet: (state, action: PayloadAction<{ address: string }>) => {
      const updatedWallets = state.wallets.filter((wallet) => wallet.address !== action.payload.address);
      state.wallets = updatedWallets;
    },

    updateBalance: (state, action: PayloadAction<{index: number, balance: number }>) => {
      console.log(action.payload.balance);
      state.wallets[action.payload.index].balance = action.payload.balance;
    }
    // More actions...
  },
});

export const { addWallet, removeWallet, updateBalance } = wallet.actions;
export default wallet.reducer;
