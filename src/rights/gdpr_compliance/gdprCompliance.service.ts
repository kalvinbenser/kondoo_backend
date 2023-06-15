import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common'
import { GdprCompliance, GdprComplianceStatusHistory } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service'
@Injectable()
export class GdprComplianceService {
  constructor(private prisma: PrismaService) {}
  async createGdprCompliance(data: any): Promise<any> {
    try {
      const response = await this.prisma.gdprCompliance.create({
        data: {
          gdpr_compliance: data.gdpr_compliance,
          updated_by: data.updated_by,
        },
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async createGdprComplianceStatusHistory(data: any): Promise<any> {
    try {
      const response = await this.prisma.gdprComplianceStatusHistory.create({
        data: {
          gdpr_compliance_id: data.gdpr_compliance_id,
          updated_by: data.updated_by,
        },
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async updateGdprComplianceStatusActive(data: any): Promise<any> {
    try {
      const response = await this.prisma.gdprCompliance.updateMany({
        where: { NOT: { gdpr_compliance_id: data.gdpr_compliance_id } },
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

  async updateGdprCompliance(data: any, id: number): Promise<any> {
    try {
      const response = await this.prisma.gdprCompliance.update({
        where: { gdpr_compliance_id: id },
        data: {
          gdpr_compliance: data.gdpr_compliance,
          status: 'active',
          updated_by: data.updated_by,
        },
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async getAllGdprCompliance(): Promise<any> {
    try {
      const response = await this.prisma.gdprCompliance.findMany()
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async getGdprComplianceById(id: number): Promise<any> {
    try {
      const response = await this.prisma.gdprCompliance.findFirst({
        where: { gdpr_compliance_id: id },
      })
      return response
    } catch (err) {
      console.log('some errors occuors', err.message)
    }
  }

  async gdprComplianceMakeActive(data: any): Promise<any> {
    try {
      const response = await this.prisma.gdprCompliance.update({
        where: { gdpr_compliance_id: data.gdpr_compliance_id },
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
