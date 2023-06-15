import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { RightsModule } from './rights/rights.module'

@Module({
  imports: [AuthModule, RightsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
