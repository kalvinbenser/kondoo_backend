import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsOptional,
} from 'class-validator'

export class CreateGdprComplianceDto {
  @IsString()
  gdpr_compliance: string

  @IsInt()
  updated_by: number
}
export class gdprComplianceMakeActiveDto {
  @IsInt()
  gdpr_compliance_id: number

  @IsInt()
  updated_by: number
}
