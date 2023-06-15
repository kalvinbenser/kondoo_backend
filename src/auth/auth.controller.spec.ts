import { Test, TestingModule } from '@nestjs/testing'
import { Request, Response } from 'express'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import * as STUB from './auth.stub'
import { createMock } from '@golevelup/ts-jest'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './auth.constant'
import { JwtStrategy } from './jwt.strategy'
const mockResponseObject = () => {
  return createMock<Response>({
    send: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
  })
}
const requestMock = {
  params: {},
  body: {},
  query: {},
  user: {},
} as unknown as any
describe('AuthController', () => {
  let authController: AuthController
  let authService: AuthService

  let resultStatus = { Status: true, Success: true, Message: 'Ok' }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: {
            expiresIn: jwtConstants.expiresIn,
          },
        }),
      ],
      controllers: [AuthController],
      providers: [
        {
          provide: JwtStrategy,
          useValue: {
            validate: jest
              .fn()
              .mockResolvedValue({ id: 3, email: 'test@gmail.com' }),
          },
        },
        {
          provide: AuthService,
          useValue: {
            getUserById: jest.fn().mockResolvedValue(STUB.getUserById),
            createUser: jest.fn().mockResolvedValue(STUB.createUser),
            updateUser: jest.fn().mockResolvedValue(STUB.updateUser),
            getUsersList: jest.fn().mockResolvedValue(STUB.getUsersList),
            checkEmailExists: jest.fn().mockResolvedValue(null),
            login: jest
              .fn()
              .mockResolvedValue({ access_token: STUB.access_token }),
            getUsersData: jest.fn().mockResolvedValue(STUB.getUserById),
          },
        },
      ],
    }).compile()

    authController = app.get<AuthController>(AuthController)
    authService = app.get<AuthService>(AuthService)
  })
  afterEach(() => jest.clearAllMocks())
  it('should be define', () => {
    expect(authController).toBeDefined()
  })
  describe('getUserById', () => {
    it('should be getUserById', async () => {
      requestMock.params = { id: '3' }
      const response = mockResponseObject()

      await authController.getUserById(requestMock, response)
      let resultData = { ...resultStatus, data: STUB.getUserById }

      expect(response.send).toHaveBeenCalledTimes(1)
      expect(response.send).toHaveBeenCalledWith(resultData)
      expect(response.status).toHaveBeenCalledTimes(1)
      expect(response.status).toHaveBeenCalledWith(200)
    })
  })

  describe('createUser', () => {
    it('should be createUser', async () => {
      requestMock.body = STUB.createUserBody
      const response = mockResponseObject()

      await authController.createUser(requestMock.body, response)
      let resultData = { ...resultStatus, data: { id: STUB.createUser.id } }

      expect(response.send).toHaveBeenCalledTimes(1)
      expect(response.send).toHaveBeenCalledWith(resultData)
      expect(response.status).toHaveBeenCalledTimes(1)
      expect(response.status).toHaveBeenCalledWith(200)
    })
  })

  describe('updateUser', () => {
    it('should be updateUser', async () => {
      requestMock.params = { id: '3' }
      requestMock.body = STUB.updateUserBody
      const response = mockResponseObject()

      await authController.updateUser(
        requestMock.body,
        requestMock.params,
        response,
      )
      let resultData = { ...resultStatus, data: {} }

      expect(response.send).toHaveBeenCalledTimes(1)
      expect(response.send).toHaveBeenCalledWith(resultData)
      expect(response.status).toHaveBeenCalledTimes(1)
      expect(response.status).toHaveBeenCalledWith(200)
    })
  })

  describe('getUsersList', () => {
    it('should be getUserList', async () => {
      requestMock.query = { skip: '3', take: '2' }
      const response = mockResponseObject()
      await authController.getUsersList(
        requestMock.query.skip,
        requestMock.query.take,
        response,
      )

      let resultData = { ...resultStatus, data: STUB.getUsersList }

      expect(response.send).toHaveBeenCalledTimes(1)
      expect(response.send).toHaveBeenCalledWith(resultData)
      expect(response.status).toHaveBeenCalledTimes(1)
      expect(response.status).toHaveBeenCalledWith(200)
    })
  })

  describe('adminLogin', () => {
    it('should be adminLogin', async () => {
      requestMock.body = { email: 'kal@gmail.com', password: '1234' }
      requestMock.user = { id: 3 }
      const response = mockResponseObject()

      await authController.login(requestMock, response)
      let resultData = {
        ...resultStatus,
        data: { id: 3, access_token: STUB.access_token },
      }
      expect(response.send).toHaveBeenCalledTimes(1)
      expect(response.send).toHaveBeenCalledWith(resultData)
      expect(response.status).toHaveBeenCalledTimes(1)
      expect(response.status).toHaveBeenCalledWith(200)
    })
  })

  describe('getUsersData', () => {
    it('should be getUsersData', async () => {
      const response = mockResponseObject()
      requestMock.user = { id: '3', email: 'test@gmail.com' }
      await authController.getUsersData(requestMock, response)
      expect(response.send).toHaveBeenCalledTimes(1)
      expect(response.send).toHaveBeenCalledWith({
        ...resultStatus,
        data: STUB.getUserById,
      })
      expect(response.status).toHaveBeenCalledTimes(1)
      expect(response.status).toHaveBeenCalledWith(200)
    })
  })
})
