import { PokemonModel } from '@/domain/models/pokemon.model'
import { CreatePokemon, CreatePokemonModel } from '@/domain/usecases/create-pokemon.usecase'
import { CreatePokemonController } from '@/presentation/controllers/pokemon/create-pokemon.controller'
import { created, serverError } from '@/presentation/helpers'

interface SutTypes {
  sut: CreatePokemonController
  createPokemonMock: CreatePokemon
  pokemonModelMock: CreatePokemonModel
  pokemonMock: PokemonModel
}

const makeSut = (): SutTypes => {
  const pokemonModelMock: CreatePokemonModel = { type: 'any_type', trainer: 'any_trainer', level: 1 }
  const pokemonMock: PokemonModel = { ...pokemonModelMock, id: 'any_id' }
  const createPokemonMock: CreatePokemon = {
    create: jest.fn().mockResolvedValue(pokemonMock)
  }
  const sut = new CreatePokemonController(createPokemonMock)

  return {
    sut,
    createPokemonMock,
    pokemonModelMock,
    pokemonMock
  }
}

describe('CreatePokemon Controller', () => {
  it('Should call CreatePokemonUsecase with correct values', async () => {
    const { sut, createPokemonMock, pokemonModelMock } = makeSut()
    await sut.handler({ body: pokemonModelMock })
    expect(createPokemonMock.create).toHaveBeenNthCalledWith(1, pokemonModelMock)
  })

  it('Should return status code 201 and new Pokemon when correct params are provided', async () => {
    const { sut, pokemonModelMock, pokemonMock } = makeSut()
    const result = await sut.handler({ body: pokemonModelMock })
    expect(result).toEqual(created(pokemonMock))
  })

  it('Should return status code 500 if CreatPokemon throws', async () => {
    const { sut, createPokemonMock, pokemonModelMock } = makeSut()
    const error = new Error('any_error')
    jest.spyOn(createPokemonMock, 'create').mockRejectedValueOnce(error)
    const result = await sut.handler({ body: pokemonModelMock })
    expect(result).toEqual(serverError(error))
  })
})
