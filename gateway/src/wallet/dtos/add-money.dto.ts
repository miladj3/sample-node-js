import { ApiProperty } from '@nestjs/swagger';

export class AddMoneyDto {
  @ApiProperty({
    minimum: 1,
    default: 12,
  })
  userId: number;
  @ApiProperty()
  amount: number;
}
