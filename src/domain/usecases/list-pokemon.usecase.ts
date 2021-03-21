import { ListOptions, Pagination } from '@/domain/domain.protocols'
import { PokemonModel } from '@/domain/models/pokemon.model'

export interface ListPokemon {
  list: (options: ListOptions) => Promise<Pagination<PokemonModel>>
}
