import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidaCredentialsError } from './errors/invalid-credentials-error'

let sut: AuthenticateUseCase
let userRepository: InMemoryUsersRepository

describe('Authenticate use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(userRepository)
  })
  it('should be able to authenticate', async () => {

    await userRepository.create({
      name: 'John Doe',
      email: '9z6wM@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: '9z6wM@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {

    await expect(() => sut.execute({
      email: '9z6wM@example.com',
      password: '123456',
    })).rejects.toBeInstanceOf(InvalidaCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {

    await userRepository.create({
      name: 'John Doe',
      email: '9z6wM@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() => sut.execute({
      email: '9z6wM@example.com',
      password: '123',
    })).rejects.toBeInstanceOf(InvalidaCredentialsError)
  })

})
