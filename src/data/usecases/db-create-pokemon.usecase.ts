import {PokemonModel} from '@/domain/models/pokemon.model'
import {CreatePokemon, CreatePokemonModel} from '@/domain/usecases/create-pokemon.usecase'

export interface CreatePokemonRepository {
  create: (pokemon: CreatePokemonModel) => Promise<PokemonModel>
}

export class DbCreatePokemon implements CreatePokemon {
  constructor(private readonly createPokemonRepository: CreatePokemonRepository) {}

  async create(pokemon: CreatePokemonModel): Promise<PokemonModel> {
    return await this.createPokemonRepository.create(pokemon)
  }
}
