import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common'
import { PrivacyPolicy, PrivacyPolicyStatusHistory } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service'
@Injectable()
export class PrivacyPolicyService {
  constructor(private prisma: PrismaService) {}
  async createPrivacyPolicyCompliance(data: any): Promise<any> {
    try {
      const response = await this.prisma.privacyPolicy.create({
        data: {
          privacy_policy: data.privacy_policy,
          updated_by: data.updated_by,
        },
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async createPrivacyPolicyStatusHistory(data: any): Promise<any> {
    try {
      const response = await this.prisma.privacyPolicyStatusHistory.create({
        data: {
          privacy_policy_id: data.privacy_policy_id,
          updated_by: data.updated_by,
        },
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async updatePrivacyPolicyStatusActive(data: any): Promise<any> {
    try {
      const response = await this.prisma.privacyPolicy.updateMany({
        where: { NOT: { privacy_policy_id: data.privacy_policy_id } },
        data: {
          status: 'inactive',
          updated_by: data.updated_by,
        },
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async updatePrivacyPolicy(data: any, id: number): Promise<any> {
    try {
      const response = await this.prisma.privacyPolicy.update({
        where: { privacy_policy_id: id },
        data: {
          privacy_policy: data.privacy_policy,
          status: 'active',
          updated_by: data.updated_by,
        },
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async getAllPrivacyPolicy(): Promise<any> {
    try {
      const response = await this.prisma.privacyPolicy.findMany()
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async getPrivacyPolicyById(id: number): Promise<any> {
    try {
      const response = await this.prisma.privacyPolicy.findFirst({
        where: { privacy_policy_id: id },
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async privacyPolicyMakeActive(data: any): Promise<any> {
    try {
      const response = await this.prisma.privacyPolicy.update({
        where: { privacy_policy_id: data.privacy_policy_id },
        data: {
          status: 'active',
          updated_by: data.updated_by,
        },
      })

      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }
}
