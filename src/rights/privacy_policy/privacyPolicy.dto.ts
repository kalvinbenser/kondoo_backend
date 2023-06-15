import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsOptional,
} from 'class-validator'

export class CreatePrivacyPolicyDto {
  @IsString()
  privacy_policy: string

  @IsInt()
  updated_by: number
}
export class PrivacyPolicyMakeActiveDto {
  @IsInt()
  privacy_policy_id: number

  @IsInt()
  updated_by: number
}
