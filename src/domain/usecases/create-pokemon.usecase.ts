import { PokemonModel } from '@/domain/models/pokemon.model'

export interface CreatePokemonModel extends Omit<PokemonModel, 'id'> {}

export interface CreatePokemon {
  create: (pokemon: CreatePokemonModel) => Promise<PokemonModel>
}
