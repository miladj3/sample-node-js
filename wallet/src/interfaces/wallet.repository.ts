export interface IWalletRepository {
  getBalance(userId: number): Promise<number>;

  addMoney(userId: number, amount: number): Promise<number>;
}

export const WALLET_REPOSITORY_TOKEN = 'IWalletRepository';
