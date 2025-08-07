import { describe, it, expect, beforeEach, } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let sut: CreateGymUseCase
let gymsRepository: InMemoryGymsRepository

describe('Gym  use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)

  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      name: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -27.2092052,
      longitude: -49.6401091
    })

    expect(gym.id).toEqual(expect.any(String))
  })

})
