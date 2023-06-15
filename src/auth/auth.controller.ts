import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Req,
  Res,
  Param,
  UseGuards,
  ParseIntPipe,
  HttpStatus,
  Query,
  HttpException,
  Render,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import * as RESPONSE from '../constants/response'
import { UpdateUserDto } from './dto/update-user.dto'
import { SignupDto } from './dto/signup.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { User } from '../decorator/user.decorator'
import { UserDto } from './dto/user.dto'
import { ForgetPasswordDto } from './dto/forget-password.dto'
import * as moment from 'moment'
@Controller('/users')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('create')
  async createUser(@Body() CreateUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const isEmail = await this.authService.checkEmailExists(
        CreateUserDto.email,
      )
      if (isEmail) {
        RESPONSE.FAILURE.Message = RESPONSE.CUSTOM_MESSAGE.EMAIL_EXISTS
        res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
      } else {
        const data = await this.authService.createUser(CreateUserDto)
        RESPONSE.SUCCESS.data = { id: data.id }
        RESPONSE.SUCCESS.Message = RESPONSE.MESSAGE.OK
        res.status(HttpStatus.OK).send(RESPONSE.SUCCESS)
      }
    } catch (err) {
      RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
      RESPONSE.FAILURE.Error = err.message
      res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
    }
  }

  @Put('update/:id')
  async updateUser(
    @Body() UpdateUserDto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    try {
      const data = await this.authService.updateUser(UpdateUserDto, id)
      RESPONSE.SUCCESS.data = {}
      RESPONSE.SUCCESS.Message = RESPONSE.MESSAGE.OK
      res.status(HttpStatus.OK).send(RESPONSE.SUCCESS)
    } catch (err) {
      RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
      RESPONSE.FAILURE.Error = err.message
      res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-profile')
  async getUsersData(@User() user: UserDto, @Res() res: Response) {
    try {
      let data = await this.authService.getUserById(user.id)
      data.user_role = data.user_role.user_role
      RESPONSE.SUCCESS.data = data
      RESPONSE.SUCCESS.Message = RESPONSE.MESSAGE.OK
      res.status(HttpStatus.OK).send(RESPONSE.SUCCESS)
    } catch (err) {
      RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
      RESPONSE.FAILURE.Error = err.message
      res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
    }
  }
  @Get('list')
  async getUsersList(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('type', ParseIntPipe) type: number,
    @Res() res: Response,
  ) {
    try {
      let data = await this.authService.getUsersList(skip, take, type)
      let data1 = data.map((data) => ({
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        country_code: data.country_code,
        phone_number: data.phone_number,
        display_picture: data.display_picture,
        login_method: data.login_method,
        user_role: data.user_role.user_role,
        createdAt: moment(new Date(data.createdAt)).format('DD-MM-YYYY'),
        last_active: moment(new Date(data.createdAt))
          .hour(12)
          .format('HH:mm A'),
        user_id: data.user_id,
        status: data.status,
      }))
      RESPONSE.SUCCESS.data = data1
      RESPONSE.SUCCESS.Message = RESPONSE.MESSAGE.OK
      res.status(HttpStatus.OK).send(RESPONSE.SUCCESS)
    } catch (err) {
      RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
      RESPONSE.FAILURE.Error = err.message
      res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
    }
  }

  @Get(':id')
  async getUserById(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
  ) {
    try {
      let data = await this.authService.getUserById(id)
      if (data) {
        data.user_role = data.user_role.user_role
        RESPONSE.SUCCESS.data = data
        RESPONSE.SUCCESS.Message = RESPONSE.MESSAGE.OK
        res.status(HttpStatus.OK).send(RESPONSE.SUCCESS)
      } else {
        RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.NOT_FOUND
        res.status(HttpStatus.NOT_FOUND).send(RESPONSE.FAILURE)
      }
    } catch (err) {
      RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
      RESPONSE.FAILURE.Error = err.message
      res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
    }
  }

  @Post('email/sign-up')
  async emailSignUp(@Body() SignupDto: SignupDto, @Res() res: Response) {
    try {
      const isEmail = await this.authService.checkEmailExists(SignupDto.email)
      if (isEmail) {
        RESPONSE.FAILURE.Message = RESPONSE.CUSTOM_MESSAGE.EMAIL_EXISTS
        res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
      } else {
        const data = await this.authService.emailSignUp(SignupDto)
        RESPONSE.SUCCESS.data = { data: data.id }
        RESPONSE.SUCCESS.Message = RESPONSE.MESSAGE.OK
        res.status(HttpStatus.OK).send(RESPONSE.SUCCESS)
      }
    } catch (err) {
      RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
      RESPONSE.FAILURE.Error = err.message
      res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
    }
  }
  @UseGuards(AuthGuard('local'))
  @Post('email/sign-in')
  async login(@Req() req: any, @Res() res: Response) {
    try {
      let data = await this.authService.login(req.user)
      RESPONSE.SUCCESS.data = {
        id: req.user.id,
        access_token: data.access_token,
      }
      RESPONSE.SUCCESS.Message = RESPONSE.MESSAGE.OK
      res.status(HttpStatus.OK).send(RESPONSE.SUCCESS)
    } catch (err) {
      RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
      RESPONSE.FAILURE.Error = err.message
      res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
    }
  }

  @Post('admin/sign-up')
  async adminSignUp(@Body() SignupDto: SignupDto, @Res() res: Response) {
    try {
      const isEmail = await this.authService.checkEmailExists(SignupDto.email)
      if (isEmail) {
        RESPONSE.FAILURE.Message = RESPONSE.CUSTOM_MESSAGE.EMAIL_EXISTS
        res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
      } else {
        const data = await this.authService.adminSignUp(SignupDto)
        RESPONSE.SUCCESS.data = { data: data.id }
        RESPONSE.SUCCESS.Message = RESPONSE.MESSAGE.OK
        res.status(HttpStatus.OK).send(RESPONSE.SUCCESS)
      }
    } catch (err) {
      RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
      RESPONSE.FAILURE.Error = err.message
      res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
    }
  }

  @UseGuards(AuthGuard('admin'))
  @Post('admin/sign-in')
  async adminLogin(@Req() req: any, @Res() res: Response) {
    try {
      let data = await this.authService.login(req.user)
      RESPONSE.SUCCESS.data = {
        id: req.user.id,
        access_token: data.access_token,
      }
      RESPONSE.SUCCESS.Message = RESPONSE.MESSAGE.OK
      res.status(HttpStatus.OK).send(RESPONSE.SUCCESS)
    } catch (err) {
      RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
      RESPONSE.FAILURE.Error = err.message
      res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('reset/password')
  async resetPassword(
    @User() user: UserDto,
    @Body() ResetPasswordDto: ResetPasswordDto,
    @Res() res: Response,
  ) {
    try {
      let userData = await this.authService.getUserById(user.id)
      if (userData) {
        let data = await this.authService.resetPassword(
          ResetPasswordDto,
          user.id,
        )

        if (data) {
          RESPONSE.SUCCESS.data = {}
          RESPONSE.SUCCESS.Message = RESPONSE.MESSAGE.OK
          res.status(HttpStatus.OK).send(RESPONSE.SUCCESS)
        } else {
          RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
          RESPONSE.FAILURE.Error = RESPONSE.CUSTOM_MESSAGE.PASSWORD_NOT_MATCH
          res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
        }
      } else {
        RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
        RESPONSE.FAILURE.Error = RESPONSE.CUSTOM_MESSAGE.USER_NOT_FOUND
        res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
      }
    } catch (err) {
      RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
      RESPONSE.FAILURE.Error = err.message
      res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
    }
  }

  @Post('forget/password')
  async forgetPassword(@Req() req: Request, @Res() res: Response) {
    try {
      console.log('req.body.email', req.body.email)
      const isEmail = await this.authService.checkEmailExists(req.body.email)

      if (isEmail) {
        console.log('isEmail', isEmail)
        const isMail = await this.authService.sendForgetMail(isEmail)
        RESPONSE.SUCCESS.data = {}
        RESPONSE.SUCCESS.Message = 'password rest link sent your mail'
        res.status(HttpStatus.OK).send(RESPONSE.SUCCESS)
      } else {
        RESPONSE.FAILURE.Message = 'user not found'
        res.status(HttpStatus.OK).send(RESPONSE.FAILURE)
      }
    } catch (err) {
      RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
      RESPONSE.FAILURE.Error = err.message
      res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
    }
  }

  @Post('forget/password/verify')
  @Render('passwordResetSuccess')
  async forgetPasswordVerify(@Req() req: Request, @Res() res: Response) {
    try {
      const { password, id, token } = req.body

      const user = await this.authService.getUserByIdWithPass(id)
      // console.log('token', token)

      const isVerify = await this.authService.verifyToken(user, token)
      // console.log('isVerify', isVerify)
      await this.authService.updateForgetPassword(password, id)
      return {}
    } catch (err) {
      RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
      RESPONSE.FAILURE.Error = err.message
      res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
    }
  }

  @Get('forget/password/:id/:token')
  @Render('index')
  async root(@Req() req: Request, @Res() res: Response) {
    try {
      const { id, token } = req.params
      const user = await this.authService.getUserByIdWithPass(id)
      console.log('user123', user)
      if (!user) {
        RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
        RESPONSE.FAILURE.Error = 'user not exists'
        res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
      }
      const isVerify = await this.authService.verifyToken(user, token)
      console.log('isVerify', isVerify)
      return {
        email: isVerify.email,
        id: id,
        token: token,
        status: 'Not Verified',
      }
    } catch (err) {
      RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
      RESPONSE.FAILURE.Error = err.message
      res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
    }
  }
}
