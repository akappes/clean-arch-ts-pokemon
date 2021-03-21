import { PokemonModel } from '@/domain/models/pokemon.model'

export interface FindPokemon {
  find: (id: string) => Promise<PokemonModel>
}
