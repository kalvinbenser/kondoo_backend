import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Req,
  Res,
  HttpStatus,
  Param,
  ParseIntPipe,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { UserRoleService } from './user-role.service'
import * as RESPONSE from '../../constants/response'
import { CreateUserRoleDto } from './dto/create-user-role.dto'
import { UpdateUserRoleDto } from './dto/update-user-role.dto'
import { AuthGuard } from '@nestjs/passport'
import { User } from 'src/decorator/user.decorator'
import { UserDto } from '../dto/user.dto'

@Controller('/users/role')
export class UserRoleController {
  constructor(private userRoleService: UserRoleService) {}

  @Get('list')
  async GetAllUserRole(@Res() res: Response) {
    try {
      const data = await this.userRoleService.getAllUserRole()
      RESPONSE.SUCCESS.data = data
      RESPONSE.SUCCESS.Message = RESPONSE.MESSAGE.OK
      res.status(HttpStatus.OK).send(RESPONSE.SUCCESS)
    } catch (err) {
      RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
      RESPONSE.FAILURE.Error = err.message
      res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
    }
  }
  @Get(':id')
  async GetUserRoleById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    try {
      const data = await this.userRoleService.getUserRoleById(id)
      RESPONSE.SUCCESS.data = data
      RESPONSE.SUCCESS.Message = RESPONSE.MESSAGE.OK
      res.status(HttpStatus.OK).send(RESPONSE.SUCCESS)
    } catch (err) {
      RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
      RESPONSE.FAILURE.Error = err.message
      res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
    }
  }
  @Delete(':id')
  async deleteRoleById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    try {
      const data = await this.userRoleService.deleteUserRoleById(id)
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
  @Post('create')
  async createUserRole(
    @User() user: UserDto,
    @Body() CreateUserRoleDto: CreateUserRoleDto,
    @Res() res: Response,
  ) {
    try {
      const user_role = await this.userRoleService.createUserRole(
        CreateUserRoleDto,
        user.id,
      )

      const role_privileges = JSON.parse(
        JSON.stringify(CreateUserRoleDto.user_role_privileges),
      )
      let role_privileges1 = role_privileges.map((data) => ({
        user_role_id: user_role.id,
        screen_name: data.screen_name,
        permission: data.permission,
        status: 'active',
      }))

      await this.userRoleService.createUserRolePrivileges(role_privileges1)
      RESPONSE.SUCCESS.data = { id: user_role.id }
      RESPONSE.SUCCESS.Message = RESPONSE.MESSAGE.OK
      res.status(HttpStatus.OK).send(RESPONSE.SUCCESS)
    } catch (err) {
      RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
      RESPONSE.FAILURE.Error = err.message
      res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  async updateUserRole(
    @User() user: UserDto,
    @Body() UpdateUserRoleDto: UpdateUserRoleDto,
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    try {
      const user_role = await this.userRoleService.updateUserRole(
        UpdateUserRoleDto,
        id,
        user.id,
      )
      const role_privileges = JSON.parse(
        JSON.stringify(UpdateUserRoleDto.user_role_privileges),
      )
      console.log('role_privileges', role_privileges)
      let role_privileges1 = role_privileges.map((data) => ({
        user_role_id: id,
        screen_name: data.screen_name,
        permission: data.permission,
        status: 'active',
      }))
      console.log('role_privileges1', role_privileges1)
      await this.userRoleService.updateUserRolePrivileges(role_privileges1, id)
      RESPONSE.SUCCESS.data = {}
      RESPONSE.SUCCESS.Message = RESPONSE.MESSAGE.OK
      res.status(HttpStatus.OK).send(RESPONSE.SUCCESS)
    } catch (err) {
      RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
      RESPONSE.FAILURE.Error = err.message
      res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
    }
  }
}
