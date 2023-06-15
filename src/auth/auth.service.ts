import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common'
import { User } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import * as argon from 'argon2'
import * as nodemailer from 'nodemailer'
import { UpdateUserDto } from './dto/update-user.dto'
import { SignupDto } from './dto/signup.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import * as jwt from 'jsonwebtoken'
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!'
  }

  async createUser(data: any): Promise<User> {
    try {
      data.password = await argon.hash(data.password)
      const response = await this.prisma.user.create({
        data,
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async updateUser(data: any, id: number): Promise<any> {
    try {
      const response = await this.prisma.user.update({
        where: { id: id },
        data: data,
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }
  async emailSignUp(data: any): Promise<User> {
    try {
      data.password = await argon.hash(data.password)
      data.login_method = 'email'
      data.user_role_id = 1
      const response = await this.prisma.user.create({
        data,
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async adminSignUp(data: any): Promise<User> {
    try {
      data.password = await argon.hash(data.password)
      data.login_method = 'email'
      data.user_role_id = 2
      const response = await this.prisma.user.create({
        data,
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async getUserById(id: any): Promise<any> {
    try {
      const response = await this.prisma.user.findFirst({
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          country_code: true,
          phone_number: true,
          display_picture: true,
          login_method: true,
          user_role: true,
          createdAt: true,
          user_id: true,
          status: true,
        },
        where: { id: Number(id) },
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async getUserByIdWithPass(id: any): Promise<any> {
    try {
      const response = await this.prisma.user.findFirst({
        where: { id: Number(id) },
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async getUsersList(skip: number, take: number, type: number): Promise<any> {
    try {
      let whereObj: any = {}
      if (type === 1) {
        whereObj = { user_role_id: 1 }
      }

      if (type === 2) {
        whereObj = { NOT: { user_role_id: 1 } }
      }
      const response = await this.prisma.user.findMany({
        where: whereObj,
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          country_code: true,
          phone_number: true,
          display_picture: true,
          login_method: true,
          user_role: true,
          createdAt: true,
          user_id: true,
          status: true,
        },
        skip: skip,
        take: take,
        orderBy: {
          id: 'asc',
        },
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async checkEmailExists(email: string): Promise<User> {
    try {
      const response = await this.prisma.user.findFirst({
        where: { email: email },
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email: email, user_role_id: 1 },
      })
      if (user) {
        const passwordValid = await argon.verify(user.password, password)

        if (user && passwordValid) {
          return user
        }
      } else {
        return null
      }
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async validateAdmin(email: string, password: string): Promise<any> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email: email, NOT: { user_role_id: 1 } },
      })
      if (user) {
        const passwordValid = await argon.verify(user.password, password)

        if (user && passwordValid) {
          return user
        }
      } else {
        return null
      }
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }
  async login(user: any) {
    const payload = { email: user.email, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async resetPassword(data: ResetPasswordDto, id: number): Promise<User> {
    try {
      const user = await this.prisma.user.findFirst({ where: { id: id } })
      if (user) {
        const passwordValid = await argon.verify(
          user.password,
          data.current_password,
        )

        if (user && passwordValid) {
          let encPassword = await argon.hash(data.confirm_password)
          let response = await this.prisma.user.update({
            where: { id: id },
            data: { password: encPassword },
          })
          return response
        } else {
          return null
        }
      } else {
        return null
      }
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async sendForgetMail(user: User): Promise<any> {
    try {
      console.log('user', user)
      const secret = process.env.SECRET_KEY + user.password
      const token = await jwt.sign({ email: user.email, id: user.id }, secret, {
        expiresIn: '5m',
      })
      const link = `${process.env.APP_URL}/users/forget/password/${user.id}/${token}`
      var transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        // secureConnection:false,
        tls: {
          rejectUnauthorized: false,
        },
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      })

      var mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: user.email,
        subject: 'Game Forgot Password ',
        text: link,
      }

      const isMail = await transporter.sendMail(mailOptions)
      return isMail
    } catch (e) {}
  }

  async verifyToken(user: User, token: string): Promise<any> {
    try {
      // console.log('token', token)
      const secret = process.env.SECRET_KEY + user.password
      const verify = jwt.verify(token, secret)

      return verify
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async updateForgetPassword(password: string, id: any): Promise<any> {
    try {
      const data = { password: await argon.hash(password) }
      const response = await this.prisma.user.update({
        where: { id: Number(id) },
        data: data,
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }
}
