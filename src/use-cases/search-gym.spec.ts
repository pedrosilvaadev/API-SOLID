import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'

let sut: SearchGymUseCase
let gymsRepository: InMemoryGymsRepository

describe('Search gym use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      id: 'gym-01',
      name: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -27.2092052,
      longitude: -49.6401091
    })

    await gymsRepository.create({
      id: 'gym-02',
      name: 'TypeScript Gym',
      description: '',
      phone: '',
      latitude: -27.2092052,
      longitude: -49.6401091
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ id: 'gym-01' }),
    ])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        id: `gym-${i}`,
        name: `JavaScript Gym ${i}`,
        description: '',
        phone: '',
        latitude: -27.2092052,
        longitude: -49.6401091
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ id: 'gym-21' }),
      expect.objectContaining({ id: 'gym-22' }),
    ])
  })
})
