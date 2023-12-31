import { IsString, IsNotEmpty } from 'class-validator'

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  first_name: string

  @IsString()
  @IsNotEmpty()
  last_name: string
}
