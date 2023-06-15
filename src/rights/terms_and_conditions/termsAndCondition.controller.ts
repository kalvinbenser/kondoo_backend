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
import { TermsAndConditionService } from './termsAndCondition.service'
import * as RESPONSE from '../../constants/response'
import { AuthGuard } from '@nestjs/passport'
import { User } from 'src/decorator/user.decorator'
import {
  CreateTermsAndConditionDto,
  TermsAndConditionMakeActiveDto,
} from './termsAndCondition.dto'

@Controller('/terms-and-condition')
export class TermsAndConditionController {
  constructor(private TermsAndConditionService: TermsAndConditionService) {}

  @Post('create')
  async createTermsAndCondition(
    @Body() CreateTermsAndConditionDto: CreateTermsAndConditionDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.TermsAndConditionService.createTermsAndCondition(
        CreateTermsAndConditionDto,
      )
      if (data) {
        const data1 =
          await this.TermsAndConditionService.createTermsAndConditionStatusHistory(
            data,
          )
        const data2 =
          await this.TermsAndConditionService.updateTermsAndConditionStatusActive(
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
  async updateTermsAndCondition(
    @Body() CreateTermsAndConditionDto: CreateTermsAndConditionDto,
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    try {
      const data = await this.TermsAndConditionService.updateTermsAndCondition(
        CreateTermsAndConditionDto,
        id,
      )

      if (data) {
        const data1 =
          await this.TermsAndConditionService.createTermsAndConditionStatusHistory(
            data,
          )

        const data2 =
          await this.TermsAndConditionService.updateTermsAndConditionStatusActive(
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
  async TermsAndConditionMakeActive(
    @Body() TermsAndConditionMakeActiveDto: TermsAndConditionMakeActiveDto,
    @Res() res: Response,
  ) {
    try {
      const data =
        await this.TermsAndConditionService.termsAndConditionMakeActive(
          TermsAndConditionMakeActiveDto,
        )
      if (data) {
        const data1 =
          await this.TermsAndConditionService.createTermsAndConditionStatusHistory(
            data,
          )

        const data2 =
          await this.TermsAndConditionService.updateTermsAndConditionStatusActive(
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
  async GetAllTermsAndCondition(@Res() res: Response) {
    try {
      const data = await this.TermsAndConditionService.getAllTermsAndCondition()
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
  async GetTermsAndConditionById(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      const data = await this.TermsAndConditionService.getTermsAndConditionById(
        id,
      )
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
