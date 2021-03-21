import { PokemonModel } from '@/domain/models/pokemon.model'

export interface UpdatePokemonModel extends Omit<PokemonModel, 'id'> {}

export interface UpdatePokemon {
  update: (id: string, pokemon: PokemonModel) => Promise<void>
}
