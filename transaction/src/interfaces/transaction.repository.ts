export interface ITransactionRepository {
  commit(userId: number, amount: number): Promise<number>;

  calculateTotal(): Promise<number>;

  calculateTransactionsByUser(userId: number): Promise<number>;

  getTransactionDetails(
    referenceId: number,
  ): Promise<{ userId: number; amount: number }>;
}

export const TRANSACTION_REPOSITORY_TOKEN = 'ITransactionRepository';
