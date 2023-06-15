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
import { PrivacyPolicyService } from './privacyPolicy.service'
import * as RESPONSE from '../../constants/response'
import { AuthGuard } from '@nestjs/passport'
import { User } from 'src/decorator/user.decorator'
import {
  CreatePrivacyPolicyDto,
  PrivacyPolicyMakeActiveDto,
} from './privacyPolicy.dto'

@Controller('/privacy-policy')
export class PrivacyPolicyController {
  constructor(private PrivacyPolicyService: PrivacyPolicyService) {}

  @Post('create')
  async createPrivacyPolicyCompliance(
    @Body() CreatePrivacyPolicyDto: CreatePrivacyPolicyDto,
    @Res() res: Response,
  ) {
    try {
      const data =
        await this.PrivacyPolicyService.createPrivacyPolicyCompliance(
          CreatePrivacyPolicyDto,
        )
      if (data) {
        const data1 =
          await this.PrivacyPolicyService.createPrivacyPolicyStatusHistory(data)
        const data2 =
          await this.PrivacyPolicyService.updatePrivacyPolicyStatusActive(data)
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
  async updatePrivacyPolicy(
    @Body() CreatePrivacyPolicyDto: CreatePrivacyPolicyDto,
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    try {
      const data = await this.PrivacyPolicyService.updatePrivacyPolicy(
        CreatePrivacyPolicyDto,
        id,
      )

      if (data) {
        const data1 =
          await this.PrivacyPolicyService.createPrivacyPolicyStatusHistory(data)

        const data2 =
          await this.PrivacyPolicyService.updatePrivacyPolicyStatusActive(data)
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
  async PrivacyPolicyMakeActive(
    @Body() PrivacyPolicyMakeActiveDto: PrivacyPolicyMakeActiveDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.PrivacyPolicyService.privacyPolicyMakeActive(
        PrivacyPolicyMakeActiveDto,
      )
      if (data) {
        const data1 =
          await this.PrivacyPolicyService.createPrivacyPolicyStatusHistory(data)

        const data2 =
          await this.PrivacyPolicyService.updatePrivacyPolicyStatusActive(data)
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
  async GetAllPrivacyPolicy(@Res() res: Response) {
    try {
      const data = await this.PrivacyPolicyService.getAllPrivacyPolicy()
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
  async GetPrivacyPolicyById(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      const data = await this.PrivacyPolicyService.getPrivacyPolicyById(id)
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
