import { CreatePokemon } from '@/domain/usecases/create-pokemon.usecase'
import { created, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols.presentation'

export class CreatePokemonController implements Controller {
  constructor(private readonly createPokemonUsecase: CreatePokemon) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.createPokemonUsecase.create(request.body)
      return created(result)
    } catch (error) {
      return serverError(error)
    }
  }
}
