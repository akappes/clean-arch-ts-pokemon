import { DeletePokemon } from '@/domain/usecases/delete-pokemon.usecase'

export interface DeletePokemonRepository {
  delete: (id: string) => Promise<void>
}

export class DbDeletePokemon implements DeletePokemon {
  constructor(private readonly deletePokemonRepository: DeletePokemonRepository) {}

  async delete(id: string): Promise<void> {
    await this.deletePokemonRepository.delete(id)
  }
}
