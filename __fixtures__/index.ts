import { PokemonModel } from '@/domain/models/pokemon.model'

export const PokemonModelFixture = (): PokemonModel => ({
  id: 'string',
  type: 'string',
  trainer: 'string',
  level: 1,
  createdAt: new Date(),
  updatedAt: new Date()
})
