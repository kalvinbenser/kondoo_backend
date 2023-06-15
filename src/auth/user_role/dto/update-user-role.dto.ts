import { Type } from 'class-transformer'
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator'

export class UpdateRolePrivilegesDto {
  @IsString()
  @IsOptional()
  screen_name: string

  @IsArray()
  @IsOptional()
  permission: string[]

  @IsString()
  @IsOptional()
  status: string
}
export class UpdateUserRoleDto {
  @IsString()
  @IsOptional()
  user_role: string

  @IsBoolean()
  @IsOptional()
  is_admin: boolean

  @IsString()
  @IsOptional()
  status: string

  @ValidateNested()
  @Type(() => UpdateRolePrivilegesDto)
  user_role_privileges: UpdateRolePrivilegesDto
}
