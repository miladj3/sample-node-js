export interface IWalletService {
  getBalance(userId: number): Promise<number>;

  addMoney(userId: number, amount: number): Promise<number>;
}

export const WALLET_SERVICE_TOKEN = 'IWalletService';
