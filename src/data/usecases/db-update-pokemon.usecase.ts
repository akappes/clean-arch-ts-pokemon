import { CreatePokemonModel } from '@/domain/usecases/create-pokemon.usecase'
import { UpdatePokemon, UpdatePokemonModel } from '@/domain/usecases/update-pokemon.usecase'

export interface UpdatePokemonRepository {
  update: (id: string, pokemon: UpdatePokemonModel) => Promise<void>
}

export class DbUpdatePokemon implements UpdatePokemon {
  constructor(private readonly updatePokemonRepository: UpdatePokemonRepository) {}

  async update(id: string, pokemon: CreatePokemonModel): Promise<void> {
    await this.updatePokemonRepository.update(id, pokemon)
  }
}
