import { PokemonModelFixture } from '@fixtures/index'
import { PokemonModel } from '@/domain/models/pokemon.model'
import { ListOptions, Pagination } from '@/domain/domain.protocols'
import { DbListPokemon, ListPokemonRepository } from '@/data/usecases/db-list-pokemon.usecase'

interface SutyTypes {
  sut: DbListPokemon
  findPokemonRepositoryMock: ListPokemonRepository
  pokemonModelMock: PokemonModel
  paramsMock: ListOptions
  paginationMock: Pagination<PokemonModel>
}

const makeSut = (): SutyTypes => {
  const pokemonModelMock: PokemonModel = PokemonModelFixture()
  const paramsMock: ListOptions = { skip: 0, take: 10 }
  const paginationMock: Pagination<PokemonModel> = { data: [pokemonModelMock], total: 1, ...paramsMock }
  const findPokemonRepositoryMock: ListPokemonRepository = {
    list: jest.fn().mockResolvedValue(pokemonModelMock)
  }
  const sut = new DbListPokemon(findPokemonRepositoryMock)

  return {
    sut,
    findPokemonRepositoryMock,
    pokemonModelMock,
    paramsMock,
    paginationMock
  }
}

describe('DbFindPokemon Usecase', () => {
  describe('When using ListPokemonRepository', () => {
    it('Should call repository with correct values', async () => {
      const { sut, findPokemonRepositoryMock, paramsMock } = makeSut()
      await sut.list(paramsMock)
      expect(findPokemonRepositoryMock.list).toHaveBeenNthCalledWith(1, paramsMock)
    })

    it('Should thow error when repository throws', async () => {
      const { sut, findPokemonRepositoryMock } = makeSut()
      jest.spyOn(findPokemonRepositoryMock, 'list').mockRejectedValueOnce(new Error('any_error'))
      const promise = sut.list(null)
      await expect(promise).rejects.toThrow(new Error('any_error'))
    })
  })
})
