import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsInt()
  @IsPositive()
  tenantId: number;
}
