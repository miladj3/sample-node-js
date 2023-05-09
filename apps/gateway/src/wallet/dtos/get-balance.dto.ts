import { ApiProperty } from '@nestjs/swagger';

export class GetBalanceDto {
  @ApiProperty({
    description: 'UserId to get balance.',
    minimum: 1,
    default: 12,
  })
  userId: number;
}
