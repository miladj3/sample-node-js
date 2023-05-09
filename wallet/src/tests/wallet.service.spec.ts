import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from '../wallet.service';
import { WALLET_SERVICE_TOKEN } from '../interfaces/wallet.service';
import {
  IWalletRepository,
  WALLET_REPOSITORY_TOKEN,
} from '../interfaces/wallet.repository';

class MockedRepository implements IWalletRepository {
  private wallet = new Map();

  async addMoney(userId: number, amount: number): Promise<number> {
    const currentValue = await this.getBalance(userId);
    this.wallet.set(userId, currentValue + amount);
    return currentValue + amount;
  }

  async getBalance(userId: number): Promise<number> {
    return this.wallet.get(userId) ?? 0;
  }
}

describe('BalancesService', () => {
  let service: WalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: WALLET_SERVICE_TOKEN,
          useClass: WalletService,
        },
        {
          provide: WALLET_REPOSITORY_TOKEN,
          useClass: MockedRepository,
        },
      ],
    }).compile();

    service = module.get<WalletService>(WALLET_SERVICE_TOKEN);
  });

  describe('addMoney', () => {
    it('should initiate first money in the wallet', async () => {
      const addedMoney = 10_000_000;
      const expectedMoney = 10_000_000;
      const balance = await service.addMoney(12, addedMoney);
      expect(balance).toEqual(expectedMoney);
    });
    it('should throw error when user has not enough money', async () => {
      const addedMoney = 10_000_000;
      const subtractedMoney = -20_000_000;
      const balance = await service.addMoney(12, addedMoney);
      expect(balance).toEqual(addedMoney);
      await expect(service.addMoney(12, subtractedMoney)).rejects.toThrowError(
        'Invalid amount',
      );
    });
    it('should handle transaction isolation (wallet lock)', async () => {
      await service.addMoney(12, 100);
      await expect(
        Promise.all([service.addMoney(12, -100), service.addMoney(12, -100)]),
      ).rejects.toThrowError('Invalid amount');
    });
    it('should add money to the wallet', async () => {
      const addedMoney = 10_000_000;
      await service.addMoney(13, addedMoney);
      const balance = await service.addMoney(13, addedMoney);
      expect(balance).toEqual(addedMoney * 2);
    });

    it('should take money from wallet', async () => {
      const addedMoney = 100;
      const takenMoney = -10;
      const expectedMoneyInWallet = 90;
      await service.addMoney(13, addedMoney);
      const balance = await service.addMoney(13, takenMoney);
      expect(balance).toEqual(expectedMoneyInWallet);
    });
  });
});
