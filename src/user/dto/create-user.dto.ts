import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Min, Max, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
  @ApiProperty()
  pass: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty({
    enum: ['admin', 'user'],
    default: 'user',
  })
  role: string;
}
