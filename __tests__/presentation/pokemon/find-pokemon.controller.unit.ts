import { PokemonModel } from '@/domain/models/pokemon.model'
import { FindPokemon } from '@/domain/usecases/find-pokemon.usecase'
import { ok, serverError } from '@/presentation/helpers'
import { FindPokemonController } from '@/presentation/controllers/pokemon/find-pokemon.controller'

interface SutTypes {
  sut: FindPokemonController
  findPokemonUsecaseMock: FindPokemon
  pokemonMock: PokemonModel
}

const makeSut = (): SutTypes => {
  const pokemonMock: PokemonModel = { type: 'any_name', trainer: 'any_trainer',level:1, id: 'any_id' }
  const findPokemonUsecaseMock: FindPokemon = {
    find: jest.fn().mockResolvedValue(pokemonMock)
  }
  const sut = new FindPokemonController(findPokemonUsecaseMock)

  return {
    sut,
    findPokemonUsecaseMock,
    pokemonMock
  }
}

describe('FindPokemon Controller', () => {
  it('Should call FindPokemonUsecase with correct values', async () => {
    const { sut, findPokemonUsecaseMock, pokemonMock } = makeSut()
    await sut.handler({ params: { id: pokemonMock.id } })
    expect(findPokemonUsecaseMock.find).toHaveBeenNthCalledWith(1, pokemonMock.id)
  })

  it('Should return status code 200 and new Pokemon when correct params are provided', async () => {
    const { sut, pokemonMock } = makeSut()
    const result = await sut.handler({ params: { id: pokemonMock.id } })
    expect(result).toEqual(ok(pokemonMock))
  })

  it('Should return status code 500 if CreatPokemon throws', async () => {
    const { sut, findPokemonUsecaseMock, pokemonMock } = makeSut()
    const error = new Error('any_error')
    jest.spyOn(findPokemonUsecaseMock, 'find').mockRejectedValueOnce(error)
    const result = await sut.handler({ params: { id: pokemonMock.id } })
    expect(result).toEqual(serverError(error))
  })
})
