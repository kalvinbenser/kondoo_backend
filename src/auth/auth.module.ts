import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { PrismaService } from '../prisma/prisma.service'
// import { UserModule } from 'src/user/user.module';
import { jwtConstants } from './auth.constant'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { LocalStrategy } from './local.strategy'
import { AdminStrategy } from './admin.strategy'
import { UserRoleService } from './user_role/user-role.service'
import { UserRoleController } from './user_role/user-role.controller'

@Module({
  controllers: [AuthController,UserRoleController],
  imports: [
    // UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    AdminStrategy,
    JwtStrategy,
    PrismaService,
    UserRoleService
  ],
})
export class AuthModule {}
