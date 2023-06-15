import { Type } from 'class-transformer'
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator'

export class RolePrivilegesDto {
  @IsString()
  screen_name: string

  @IsArray()
  permission: string[]

  @IsString()
  @IsOptional()
  status: string
}

export class CreateUserRoleDto {
  @IsString()
  user_role: string

  @IsBoolean()
  @IsOptional()
  is_admin: boolean

  @IsString()
  @IsOptional()
  status: string

  @ValidateNested({ each: true })
  @Type(() => RolePrivilegesDto)
  user_role_privileges: RolePrivilegesDto
}
