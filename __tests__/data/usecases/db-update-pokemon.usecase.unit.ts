import { PokemonModelFixture } from '@fixtures/index'
import { CreatePokemonModel } from '@/domain/usecases/create-pokemon.usecase'
import { UpdatePokemonModel } from '@/domain/usecases/update-pokemon.usecase'
import { DbUpdatePokemon, UpdatePokemonRepository } from '@/data/usecases/db-update-pokemon.usecase'

interface SutyTypes {
  sut: DbUpdatePokemon
  updatePokemonRepositoryMock: UpdatePokemonRepository
  pokemonModelMock: UpdatePokemonModel
}

const makeSut = (): SutyTypes => {
  const pokemonModelMock: CreatePokemonModel = PokemonModelFixture()
  const updatePokemonRepositoryMock: UpdatePokemonRepository = {
    update: jest.fn().mockResolvedValue({ ...pokemonModelMock, id: 'any_id' })
  }
  const sut = new DbUpdatePokemon(updatePokemonRepositoryMock)

  return {
    sut,
    updatePokemonRepositoryMock: updatePokemonRepositoryMock,
    pokemonModelMock: pokemonModelMock
  }
}

describe('DbUpdatePokemon Usecase', () => {
  describe('When using UpdatePokemonRepository', () => {
    it('Should call repository with correct values', async () => {
      const { sut, updatePokemonRepositoryMock, pokemonModelMock } = makeSut()
      await sut.update('any_id', pokemonModelMock)
      expect(updatePokemonRepositoryMock.update).toHaveBeenNthCalledWith(1, 'any_id', pokemonModelMock)
    })

    it('Should throw error when repository throws', async () => {
      const { sut, updatePokemonRepositoryMock } = makeSut()
      jest.spyOn(updatePokemonRepositoryMock, 'update').mockRejectedValueOnce(new Error('any_error'))
      const promise = sut.update(null, null)
      await expect(promise).rejects.toThrow(new Error('any_error'))
    })
  })
})
