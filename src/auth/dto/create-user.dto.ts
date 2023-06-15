import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsOptional,
} from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsOptional()
  user_id: string

  @IsString()
  first_name: string

  @IsString()
  last_name: string

  @IsString()
  email: string

  @IsString()
  password: string

  @IsInt()
  @IsOptional()
  country_code: number

  @IsInt()
  @IsOptional()
  phone_number: number

  @IsString()
  @IsOptional()
  display_picture: string

  @IsString()
  login_method: string

  @IsInt()
  user_role_id: number

  @IsBoolean()
  @IsOptional()
  is_email_verified: boolean

  @IsString()
  @IsOptional()
  status: string
}
