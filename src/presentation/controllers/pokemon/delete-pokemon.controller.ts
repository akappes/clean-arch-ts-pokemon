import { DeletePokemon } from '@/domain/usecases/delete-pokemon.usecase'
import { noContent, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols.presentation'

export class DeletePokemonController implements Controller {
  constructor(private readonly deletePokemonUsecase: DeletePokemon) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    try {
      await this.deletePokemonUsecase.delete(request.params.id)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
