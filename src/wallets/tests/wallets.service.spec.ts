import { Test, TestingModule } from '@nestjs/testing';
import { WalletsService } from '../wallets.service';
import { WALLETS_SERVICE_TOKEN } from '../interfaces/wallets.service';
import {
  IWalletsRepository,
  WALLETS_REPOSITORY_TOKEN,
} from '../interfaces/wallets.repository';

class MockedRepository implements IWalletsRepository {
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
  let service: WalletsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: WALLETS_SERVICE_TOKEN,
          useClass: WalletsService,
        },
        {
          provide: WALLETS_REPOSITORY_TOKEN,
          useClass: MockedRepository,
        },
      ],
    }).compile();

    service = module.get<WalletsService>(WALLETS_SERVICE_TOKEN);
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
  });
});
