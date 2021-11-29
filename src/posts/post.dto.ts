import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Min, Max, IsEmail } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  tags: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  posted_by: number;

  @ApiProperty({
    enum: ['admin', 'user'],
    default: 'user',
  })
  role: string;
}
