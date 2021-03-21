import { noContent, serverError } from '@/presentation/helpers'
import { DeletePokemonController } from '@/presentation/controllers/pokemon/delete-pokemon.controller'
import { DeletePokemon } from '@/domain/usecases/delete-pokemon.usecase'

interface SutTypes {
  sut: DeletePokemonController
  deletePokemonUsecaseMock: DeletePokemon
}

const makeSut = (): SutTypes => {
  const deletePokemonUsecaseMock: DeletePokemon = {
    delete: jest.fn().mockResolvedValue(true)
  }
  const sut = new DeletePokemonController(deletePokemonUsecaseMock)

  return {
    sut,
    deletePokemonUsecaseMock
  }
}

describe('DeletePokemon Controller', () => {
  it('Should call DeletePokemonUsecase with correct values', async () => {
    const { sut, deletePokemonUsecaseMock } = makeSut()
    await sut.handler({ params: { id: 'any_id' } })
    expect(deletePokemonUsecaseMock.delete).toHaveBeenNthCalledWith(1, 'any_id')
  })

  it('Should return status code 204 and new Pokemon when correct params are provided', async () => {
    const { sut } = makeSut()
    const result = await sut.handler({ params: { id: 'any_id' } })
    expect(result).toEqual(noContent())
  })

  it('Should return status code 500 if CreatPokemon throws', async () => {
    const { sut, deletePokemonUsecaseMock } = makeSut()
    const error = new Error('any_error')
    jest.spyOn(deletePokemonUsecaseMock, 'delete').mockRejectedValueOnce(error)
    const result = await sut.handler({ params: { id: 'any_id' } })
    expect(result).toEqual(serverError(error))
  })
})
