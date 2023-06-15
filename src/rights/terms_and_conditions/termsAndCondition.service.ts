import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common'
import {
  TermsAndCondition,
  TermsAndConditionStatusHistory,
} from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service'
@Injectable()
export class TermsAndConditionService {
  constructor(private prisma: PrismaService) {}
  async createTermsAndCondition(data: any): Promise<any> {
    try {
      const response = await this.prisma.termsAndCondition.create({
        data: {
          terms_and_condition: data.terms_and_condition,
          updated_by: data.updated_by,
        },
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async createTermsAndConditionStatusHistory(data: any): Promise<any> {
    try {
      const response = await this.prisma.termsAndConditionStatusHistory.create({
        data: {
          terms_and_condition_id: data.terms_and_condition_id,
          updated_by: data.updated_by,
        },
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async updateTermsAndConditionStatusActive(data: any): Promise<any> {
    try {
      const response = await this.prisma.termsAndCondition.updateMany({
        where: { NOT: { terms_and_condition_id: data.terms_and_condition_id } },
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

  async updateTermsAndCondition(data: any, id: number): Promise<any> {
    try {
      const response = await this.prisma.termsAndCondition.update({
        where: { terms_and_condition_id: id },
        data: {
          terms_and_condition: data.terms_and_condition,
          status: 'active',
          updated_by: data.updated_by,
        },
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async getAllTermsAndCondition(): Promise<any> {
    try {
      const response = await this.prisma.termsAndCondition.findMany()
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async getTermsAndConditionById(id: number): Promise<any> {
    try {
      const response = await this.prisma.termsAndCondition.findFirst({
        where: { terms_and_condition_id: id },
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async termsAndConditionMakeActive(data: any): Promise<any> {
    try {
      const response = await this.prisma.termsAndCondition.update({
        where: { terms_and_condition_id: data.terms_and_condition_id },
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
