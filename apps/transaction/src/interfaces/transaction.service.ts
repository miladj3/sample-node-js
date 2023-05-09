export interface ITransactionService {
  commit(userId: number, amount: number): Promise<number>;
}

export const TRANSACTION_SERVICE_TOKEN = 'ITransactionService';
