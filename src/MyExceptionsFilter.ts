import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { MESSAGE } from './constants/response'

@Catch()
export class MyExceptionsFilter implements ExceptionFilter {
  constructor() {
    console.log('init')
  }

  catch(exception, host: ArgumentsHost) {
    const res = host.switchToHttp()
    const response = res.getResponse()
    response.status(exception.response.statusCode).json({
      Status: true,
      Success: false,
      Message: exception.response.error || MESSAGE.BAD_REQUEST,
      Error: exception.response.message || '',
    })
  }
}
