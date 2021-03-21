import { PokemonModelFixture } from '@fixtures/index'
import { CreatePokemonModel } from '@/domain/usecases/create-pokemon.usecase'
import { CreatePokemonRepository, DbCreatePokemon } from '@/data/usecases/db-create-pokemon.usecase'

interface SutyTypes {
  sut: DbCreatePokemon
  createPokemonRepositoryMock: CreatePokemonRepository
  pokemonModelMock: CreatePokemonModel
}

const makeSut = (): SutyTypes => {
  const pokemonModelMock: CreatePokemonModel = PokemonModelFixture()
  const createPokemonRepositoryMock: CreatePokemonRepository = {
    create: jest.fn().mockResolvedValue({ ...pokemonModelMock, id: 'any_id' })
  }
  const sut = new DbCreatePokemon(createPokemonRepositoryMock)

  return {
    sut,
    createPokemonRepositoryMock: createPokemonRepositoryMock,
    pokemonModelMock: pokemonModelMock
  }
}

describe('DbCreatePokemon Usecase', () => {
  describe('When using CreatePokemonRepository', () => {
    it('Should call repository with correct values', async () => {
      const { sut, createPokemonRepositoryMock, pokemonModelMock } = makeSut()
      await sut.create(pokemonModelMock)
      expect(createPokemonRepositoryMock.create).toHaveBeenNthCalledWith(1, pokemonModelMock)
    })

    it('Should thow error when repository throws', async () => {
      const { sut, createPokemonRepositoryMock } = makeSut()
      jest.spyOn(createPokemonRepositoryMock, 'create').mockRejectedValueOnce(new Error('any_error'))
      const promise = sut.create(null)
      await expect(promise).rejects.toThrow(new Error('any_error'))
    })
  })
})
