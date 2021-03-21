import { PokemonModel } from '@/domain/models/pokemon.model'
import { ok, serverError } from '@/presentation/helpers'
import { ListOptions, Pagination } from '@/domain/domain.protocols'
import { ListPokemon } from '@/domain/usecases/list-pokemon.usecase'
import { ListPokemonController } from '@/presentation/controllers/pokemon/list-pokemon.controller'

interface SutTypes {
  sut: ListPokemonController
  listPokemonUsecaseMock: ListPokemon
  pokemonMock: PokemonModel
  optionsMock: ListOptions
  paginationMock: Pagination<PokemonModel>
}

const makeSut = (): SutTypes => {
  const pokemonMock: PokemonModel = { type: 'any_name', trainer: 'any_trainer', level: 1, id: 'any_id' }
  const optionsMock: ListOptions = { skip: 0, take: 10 }
  const paginationMock: Pagination<PokemonModel> = { ...optionsMock, data: [pokemonMock], total: 1 }
  const listPokemonUsecaseMock: ListPokemon = {
    list: jest.fn().mockResolvedValue(paginationMock)
  }
  const sut = new ListPokemonController(listPokemonUsecaseMock)

  return {
    sut,
    listPokemonUsecaseMock,
    pokemonMock,
    optionsMock,
    paginationMock
  }
}

describe('FindPokemon Controller', () => {
  it('Should call FindPokemonUsecase with correct values', async () => {
    const { sut, listPokemonUsecaseMock, optionsMock } = makeSut()
    await sut.handler({ query: optionsMock })
    expect(listPokemonUsecaseMock.list).toHaveBeenNthCalledWith(1, optionsMock)
  })

  it('Should return status code 200 and new Pokemon when correct params are provided', async () => {
    const { sut, optionsMock, paginationMock } = makeSut()
    const result = await sut.handler({ query: optionsMock })
    expect(result).toEqual(ok(paginationMock))
  })

  it('Should return status code 500 if CreatPokemon throws', async () => {
    const { sut, listPokemonUsecaseMock, optionsMock } = makeSut()
    const error = new Error('any_error')
    jest.spyOn(listPokemonUsecaseMock, 'list').mockRejectedValueOnce(error)
    const result = await sut.handler({ query: optionsMock })
    expect(result).toEqual(serverError(error))
  })
})
