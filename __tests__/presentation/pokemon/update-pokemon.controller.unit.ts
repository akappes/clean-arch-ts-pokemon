import { PokemonModel } from '@/domain/models/pokemon.model'
import { noContent, serverError } from '@/presentation/helpers'
import { UpdatePokemon, UpdatePokemonModel } from '@/domain/usecases/update-pokemon.usecase'
import { UpdatePokemonController } from '@/presentation/controllers/pokemon/update-pokemon.controller'

interface SutTypes {
  sut: UpdatePokemonController
  updatePokemonMock: UpdatePokemon
  pokemonModelMock: UpdatePokemonModel
  pokemonMock: PokemonModel
}

const makeSut = (): SutTypes => {
  const pokemonModelMock: UpdatePokemonModel = { type: 'any_type', trainer: 'any_trainer',level: 1 }
  const pokemonMock: PokemonModel = { ...pokemonModelMock, id: 'any_id' }
  const updatePokemonMock: UpdatePokemon = {
    update: jest.fn().mockResolvedValue(true)
  }
  const sut = new UpdatePokemonController(updatePokemonMock)

  return {
    sut,
    updatePokemonMock,
    pokemonModelMock,
    pokemonMock
  }
}

describe('UpdatePokemon Controller', () => {
  it('Should call UpdatePokemonUsecase with correct values', async () => {
    const { sut, updatePokemonMock, pokemonModelMock } = makeSut()
    await sut.handler({ body: pokemonModelMock, params: { id: 'any_id' } })
    expect(updatePokemonMock.update).toHaveBeenNthCalledWith(1, 'any_id', pokemonModelMock)
  })

  it('Should return status code 204 when correct params are provided', async () => {
    const { sut, pokemonModelMock } = makeSut()
    const result = await sut.handler({ body: pokemonModelMock, params: { id: 'any_id' } })
    expect(result).toEqual(noContent())
  })

  it('Should return status code 500 if CreatPokemon throws', async () => {
    const { sut, updatePokemonMock, pokemonModelMock } = makeSut()
    const error = new Error('any_error')
    jest.spyOn(updatePokemonMock, 'update').mockRejectedValueOnce(error)
    const result = await sut.handler({ body: pokemonModelMock, params: { id: 'any_id' } })
    expect(result).toEqual(serverError(error))
  })
})
