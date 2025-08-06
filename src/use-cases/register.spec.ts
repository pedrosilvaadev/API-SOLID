import { describe, it, expect } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register use case', () => {
  it('should be able to register', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: '9z6wM@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
    expect(user.email).toEqual('9z6wM@example.com')
  })

  it('should has user password upon registration', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: '9z6wM@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)

  })

  it('should not be able to register with same email twice', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    await registerUseCase.execute({
      name: 'John Doe',
      email: '9z6wM@example.com',
      password: '123456',
    })

    await expect(() => registerUseCase.execute({
      name: 'John Doe',
      email: '9z6wM@example.com',
      password: '123456',
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
