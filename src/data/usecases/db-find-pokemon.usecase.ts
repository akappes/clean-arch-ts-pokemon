import {PokemonModel} from '@/domain/models/pokemon.model'
import {FindPokemon} from '@/domain/usecases/find-pokemon.usecase'

export interface FindPokemonRepository {
  find: (id: string) => Promise<PokemonModel>
}

export class DbFindPokemon implements FindPokemon {
  constructor(private readonly findPokemonRepository: FindPokemonRepository) {}

  async find (id: string): Promise<PokemonModel> {
    return await this.findPokemonRepository.find(id)
  }
}
