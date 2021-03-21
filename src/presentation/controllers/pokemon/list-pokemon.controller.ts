import { ListOptions } from '@/domain/domain.protocols'
import { ok, serverError } from '@/presentation/helpers'
import { ListPokemon } from '@/domain/usecases/list-pokemon.usecase'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols.presentation'

export class ListPokemonController implements Controller {
  constructor(private readonly listPokemonUsecase: ListPokemon) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    try {
      const options: ListOptions = {
        skip: request.query?.skip || 0,
        take: request.query?.take || 10
      }
      const result = await this.listPokemonUsecase.list(options)
      return ok(result)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
