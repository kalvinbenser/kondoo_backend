import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator'
import { Match } from '../../decorator/match.decorator'

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  current_password: string

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  new_password: string

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('new_password', {
    message: 'new_password and confirm_password should be same',
  })
  confirm_password: string
}
