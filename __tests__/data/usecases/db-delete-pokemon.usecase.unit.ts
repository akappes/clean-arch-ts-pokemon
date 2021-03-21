import { DbDeletePokemon, DeletePokemonRepository } from '@/data/usecases/db-delete-pokemon.usecase'

interface SutyTypes {
  sut: any
  deletePokemonRepositoryMock: DeletePokemonRepository
}

const makeSut = (): SutyTypes => {
  const deletePokemonRepositoryMock: DeletePokemonRepository = {
    delete: jest.fn().mockResolvedValue(true)
  }
  const sut = new DbDeletePokemon(deletePokemonRepositoryMock)

  return {
    sut,
    deletePokemonRepositoryMock: deletePokemonRepositoryMock
  }
}

describe('DbDeletePokemon Usecase', () => {
  describe('When using DeletePokemonRepository', () => {
    it('Should call repository with correct values', async () => {
      const { sut, deletePokemonRepositoryMock } = makeSut()
      await sut.delete('any_id')
      expect(deletePokemonRepositoryMock.delete).toHaveBeenNthCalledWith(1, 'any_id')
    })

    it('Should thow error when repository throws', async () => {
      const { sut, deletePokemonRepositoryMock } = makeSut()
      jest.spyOn(deletePokemonRepositoryMock, 'delete').mockRejectedValueOnce(new Error('any_error'))
      const promise = sut.delete(null)
      await expect(promise).rejects.toThrow(new Error('any_error'))
    })
  })
})
