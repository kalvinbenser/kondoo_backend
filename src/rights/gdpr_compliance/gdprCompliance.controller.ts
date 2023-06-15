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
import { GdprComplianceService } from './gdprCompliance.service'
import * as RESPONSE from '../../constants/response'
import { AuthGuard } from '@nestjs/passport'
import { User } from 'src/decorator/user.decorator'
import {
  CreateGdprComplianceDto,
  gdprComplianceMakeActiveDto,
} from './gdprCompliance.dto'

@Controller('/gdpr-compliance')
export class GdprComplianceController {
  constructor(private GdprComplianceService: GdprComplianceService) {}

  @Post('create')
  async createGdprCompliance(
    @Body() CreateGdprComplianceDto: CreateGdprComplianceDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.GdprComplianceService.createGdprCompliance(
        CreateGdprComplianceDto,
      )
      if (data) {
        const data1 =
          await this.GdprComplianceService.createGdprComplianceStatusHistory(
            data,
          )
        const data2 =
          await this.GdprComplianceService.updateGdprComplianceStatusActive(
            data,
          )
      }
      RESPONSE.SUCCESS.data = data
      RESPONSE.SUCCESS.Message = RESPONSE.MESSAGE.OK
      res.status(HttpStatus.OK).send(RESPONSE.SUCCESS)
    } catch (err) {
      RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
      RESPONSE.FAILURE.Error = err.message
      res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
    }
  }

  @Put('update/:id')
  async updateGdprCompliance(
    @Body() CreateGdprComplianceDto: CreateGdprComplianceDto,
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    try {
      const data = await this.GdprComplianceService.updateGdprCompliance(
        CreateGdprComplianceDto,
        id,
      )

      if (data) {
        const data1 =
          await this.GdprComplianceService.createGdprComplianceStatusHistory(
            data,
          )

        const data2 =
          await this.GdprComplianceService.updateGdprComplianceStatusActive(
            data,
          )
        // console.log('data1', data1)
        // console.log('data2', data2)
      }
      RESPONSE.SUCCESS.data = data
      RESPONSE.SUCCESS.Message = RESPONSE.MESSAGE.OK
      res.status(HttpStatus.OK).send(RESPONSE.SUCCESS)
    } catch (err) {
      RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
      RESPONSE.FAILURE.Error = err.message
      res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
    }
  }

  @Post('makeActive')
  async GdprComplianceMakeActive(
    @Body() gdprComplianceMakeActiveDto: gdprComplianceMakeActiveDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.GdprComplianceService.gdprComplianceMakeActive(
        gdprComplianceMakeActiveDto,
      )
      if (data) {
        const data1 =
          await this.GdprComplianceService.createGdprComplianceStatusHistory(
            data,
          )

        const data2 =
          await this.GdprComplianceService.updateGdprComplianceStatusActive(
            data,
          )
      }
      RESPONSE.SUCCESS.data = {}
      RESPONSE.SUCCESS.Message = RESPONSE.MESSAGE.OK
      res.status(HttpStatus.OK).send(RESPONSE.SUCCESS)
    } catch (err) {
      RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
      RESPONSE.FAILURE.Error = err.message
      res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
    }
  }
  @Get('')
  async GetAllGdprCompliance(@Res() res: Response) {
    try {
      const data = await this.GdprComplianceService.getAllGdprCompliance()
      RESPONSE.SUCCESS.data = data
      RESPONSE.SUCCESS.Message = RESPONSE.MESSAGE.OK
      res.status(HttpStatus.OK).send(RESPONSE.SUCCESS)
    } catch (err) {
      RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
      RESPONSE.FAILURE.Error = err.message
      res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
    }
  }

  @Get('/:id')
  async GetGdprComplianceById(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      const data = await this.GdprComplianceService.getGdprComplianceById(id)
      RESPONSE.SUCCESS.data = data
      RESPONSE.SUCCESS.Message = RESPONSE.MESSAGE.OK
      res.status(HttpStatus.OK).send(RESPONSE.SUCCESS)
    } catch (err) {
      RESPONSE.FAILURE.Message = RESPONSE.MESSAGE.BAD_REQUEST
      RESPONSE.FAILURE.Error = err.message
      res.status(HttpStatus.BAD_REQUEST).send(RESPONSE.FAILURE)
    }
  }
}
