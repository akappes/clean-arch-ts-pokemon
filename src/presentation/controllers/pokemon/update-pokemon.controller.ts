import { UpdatePokemon } from '@/domain/usecases/update-pokemon.usecase'
import { noContent, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols.presentation'

export class UpdatePokemonController implements Controller {
  constructor(private readonly updatePokemonUsecase: UpdatePokemon) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    try {
      await this.updatePokemonUsecase.update(request.params.id, request.body)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
