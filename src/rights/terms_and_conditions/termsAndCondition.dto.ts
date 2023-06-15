import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsOptional,
} from 'class-validator'

export class CreateTermsAndConditionDto {
  @IsString()
  terms_and_condition: string

  @IsInt()
  updated_by: number
}
export class TermsAndConditionMakeActiveDto {
  @IsInt()
  terms_and_condition_id: number

  @IsInt()
  updated_by: number
}
