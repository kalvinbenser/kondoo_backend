import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { AppModule } from './app.module'
import { MyExceptionsFilter } from './MyExceptionsFilter'

async function bootstrap() {
  ;(BigInt.prototype as any).toJSON = function () {
    return Number(this)
  }
  // const app = await NestFactory.create(AppModule)
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )

  app.useGlobalFilters(new MyExceptionsFilter())

  /*
     ejs template engine.
  */
  // app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('ejs')

  await app.listen(process.env.PORT, process.env.HOST)
}
bootstrap()
