import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { CanActivate } from '@nestjs/common'
import { AuthModule } from '../src/auth/auth.module'
import { AuthService } from '../src/auth/auth.service'
import { INestApplication } from '@nestjs/common'
import * as STUB from '../src/auth/auth.stub'
import { AdminAuthGuard } from '../src/auth/admin-auth.guard'
import { LocalAuthGuard } from '../src/auth/local-auth.guard'
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard'
describe('Cats', () => {
  let app: INestApplication
  let customStatus = { Status: true, Success: true, Message: 'Ok' }

  const requestMock = {
    params: {},
    body: {},
    query: {},
    user: {},
  } as unknown as any

  let authService = {
    getUserById: () => STUB.getUserById,
    createUser: () => STUB.createUser,
    updateUser: () => STUB.updateUser,
    getUsersList: () => STUB.getUsersList,
    checkEmailExists: () => null,
    validateAdmin: () => STUB.validateAdmin,
    validateUser: () => STUB.validateAdmin,
    login: jest.fn().mockResolvedValue({ access_token: STUB.access_token }),
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .overrideGuard(AdminAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(LocalAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  it(`/GET users/:id`, () => {
    return request(app.getHttpServer())
      .get('/users/3')
      .expect(200)
      .expect({
        ...customStatus,
        data: authService.getUserById(),
      })
  })

  it(`/POST users/create`, () => {
    return request(app.getHttpServer())
      .post('/users/create')
      .send(STUB.createUserBody)
      .expect(201)
      .expect({
        ...customStatus,
        data: { id: authService.createUser().id },
      })
  })

  it(`/PUT users/update/:id`, () => {
    return request(app.getHttpServer())
      .put('/users/update/3')
      .send(STUB.updateUserBody)
      .expect(200)
      .expect({
        ...customStatus,
        data: {},
      })
  })

  it(`/POST users/admin/sign-in`, () => {
    return request(app.getHttpServer())
      .post('/users/admin/sign-in')
      .send({
        email: 'test@gmail.com',
        password: 'Space',
      })
      .expect(201)
      .expect({
        ...customStatus,
        data: { id: 18, access_token: STUB.access_token },
      })
  })

  it(`/POST users/email/sign-in`, () => {
    return request(app.getHttpServer())
      .post('/users/admin/sign-in')
      .send({
        email: 'test@gmail.com',
        password: 'Space',
      })
      .expect(201)
      .expect({
        ...customStatus,
        data: { id: 18, access_token: STUB.access_token },
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
