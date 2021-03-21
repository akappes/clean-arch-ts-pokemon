import { FindPokemon } from '@/domain/usecases/find-pokemon.usecase'
import { ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols.presentation'

export class FindPokemonController implements Controller {
  constructor(private readonly findPokemonUsecase: FindPokemon) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.findPokemonUsecase.find(request.params.id)
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}
