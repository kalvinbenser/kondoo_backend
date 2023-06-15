import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common'
import { User, UserRole, UserRolePrivileges } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateUserRoleDto } from './dto/create-user-role.dto'
@Injectable()
export class UserRoleService {
  constructor(private prisma: PrismaService) {}
  async createUserRole(data: any, user_id: number): Promise<any> {
    try {
      const response = await this.prisma.userRole.create({
        data: {
          user_role: data.user_role,
          is_admin: data.is_admin,
          updated_by: user_id,
        },
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async createUserRolePrivileges(data: any): Promise<any> {
    try {
      const response = await this.prisma.userRolePrivileges.createMany({
        data,
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }
  async updateUserRole(
    data: any,
    id: number,
    user_id: number,
  ): Promise<UserRole> {
    try {
      const response = await this.prisma.userRole.update({
        where: { id: id },
        data: {
          user_role: data.user_role,
          is_admin: data.is_admin,
          updated_by: user_id,
        },
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async updateUserRolePrivileges(data: any, id: number): Promise<any> {
    try {
      const response2 = await this.prisma.userRolePrivileges.deleteMany({
        where: { user_role_id: id },
      })
      const response = await this.prisma.userRolePrivileges.createMany({
        data: data,
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async getAllUserRole(): Promise<any> {
    try {
      const response = await this.prisma.userRole.findMany({
        include: { user_role_privileges: true },
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async getUserRoleById(id: number): Promise<any> {
    try {
      const response = await this.prisma.userRole.findFirst({
        where: { id: id },
        include: { user_role_privileges: true },
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async deleteUserRoleById(id: number): Promise<any> {
    try {
      const response = await this.prisma.userRole.delete({ where: { id: id } })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }
}
