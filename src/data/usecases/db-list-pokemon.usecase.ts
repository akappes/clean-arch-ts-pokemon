import {PokemonModel} from '@/domain/models/pokemon.model'
import {ListOptions, Pagination} from '@/domain/domain.protocols'
import {ListPokemon} from '@/domain/usecases/list-pokemon.usecase'

export interface ListPokemonRepository {
  list: (options: ListOptions) => Promise<Pagination<PokemonModel>>
}

export class DbListPokemon implements ListPokemon {
  constructor(private readonly listPokemonRepository: ListPokemonRepository) {}

  async list (options: ListOptions): Promise<Pagination<PokemonModel>> {
    return await this.listPokemonRepository.list(options)
  }
}
