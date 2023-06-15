import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsOptional,
} from 'class-validator'

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  first_name: string

  @IsString()
  @IsOptional()
  last_name: string

  @IsString()
  @IsOptional()
  email: string

  @IsInt()
  @IsOptional()
  country_code: string

  @IsInt()
  @IsOptional()
  phone_number: string

  @IsString()
  @IsOptional()
  display_picture: string

  @IsString()
  @IsOptional()
  login_method: string

  @IsInt()
  @IsOptional()
  user_role_id: number

  @IsBoolean()
  @IsOptional()
  is_email_verified: string

  @IsString()
  @IsOptional()
  status: string
}
