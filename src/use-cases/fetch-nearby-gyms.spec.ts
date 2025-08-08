import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let sut: FetchNearbyGymsUseCase
let gymsRepository: InMemoryGymsRepository

describe('Fetch nearby gym use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      id: 'gym-01',
      name: 'Near Gym',
      description: '',
      phone: '',
      latitude: -27.2092052,
      longitude: -49.6401091
    })

    await gymsRepository.create({
      id: 'gym-02',
      name: 'Far Gym',
      description: '',
      phone: '',
      latitude: -27.0610928,
      longitude: -49.5229502
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ id: 'gym-01' }),
    ])
  })
})
