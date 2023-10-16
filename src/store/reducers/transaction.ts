import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  received: string,
  name: string,
  amount: number,
  sent: boolean,
  status: boolean,
  address: string
}
interface Transactions {
  transactions: Transaction[]
}

const initialState: Transactions = {
  transactions: []
};

const transaction = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    removeTransaction: (state, action: PayloadAction<{ address: string }>) => {
      const updatedTransactions = state.transactions.filter((transaction) => transaction.address !== action.payload.address);
      state.transactions = updatedTransactions;
    },
    initializeTransaction: (state) => {
      state.transactions = [];
    },
    insertTransactions: (state, action: PayloadAction<{ txs: any, walletAddress: string, walletName: string }>) => {
      action.payload.txs.map((tx: any) => {
        const { inputs, outputs } = tx;
        const isAddressInInputs = inputs.some((input: any) => input.addresses.includes(action.payload.walletAddress));
        const isAddressInOutputs = outputs.some((output: any) => output.addresses.includes(action.payload.walletAddress));
        var amount: number;
        if (isAddressInOutputs) {
          amount = outputs.filter((output: any) => output.addresses[0] === action.payload.walletAddress)[0].value;
        } else {
          amount = inputs.filter((input: any) => input.addresses[0] === action.payload.walletAddress)[0].output_value;
        }
        const transaction = {
          received: tx.received,
          name: action.payload.walletName,
          amount: amount,
          sent: !isAddressInInputs ? false : true,
          status: tx.confirmed === undefined ? false : true,
          address: action.payload.walletAddress
        };
        console.log(transaction);
        state.transactions.push(transaction);
      });
    }
  }
});

export const { removeTransaction, initializeTransaction, insertTransactions } = transaction.actions;
export default transaction.reducer;
