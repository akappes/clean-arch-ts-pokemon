import { PokemonModelFixture } from '@fixtures/index'
import { PokemonModel } from '@/domain/models/pokemon.model'
import { DbFindPokemon, FindPokemonRepository } from '@/data/usecases/db-find-pokemon.usecase'

interface SutyTypes {
  sut: any
  findPokemonRepositoryMock: FindPokemonRepository
  pokemonModelMock: PokemonModel
}

const makeSut = (): SutyTypes => {
  const pokemonModelMock: PokemonModel = PokemonModelFixture()
  const findPokemonRepositoryMock: FindPokemonRepository = {
    find: jest.fn().mockResolvedValue(pokemonModelMock)
  }
  const sut = new DbFindPokemon(findPokemonRepositoryMock)

  return {
    sut,
    findPokemonRepositoryMock,
    pokemonModelMock
  }
}

describe('DbFindPokemon Usecase', () => {
  describe('When using FindPokemonRepository', () => {
    it('Should call repository with correct values', async () => {
      const { sut, findPokemonRepositoryMock, pokemonModelMock } = makeSut()
      await sut.find(pokemonModelMock.id)
      expect(findPokemonRepositoryMock.find).toHaveBeenNthCalledWith(1, pokemonModelMock.id)
    })

    it('Should thow error when repository throws', async () => {
      const { sut, findPokemonRepositoryMock } = makeSut()
      jest.spyOn(findPokemonRepositoryMock, 'find').mockRejectedValueOnce(new Error('any_error'))
      const promise = sut.find(null)
      await expect(promise).rejects.toThrow(new Error('any_error'))
    })
  })
})
