import { MSSQLHelper } from '../mssql-helper'
import { PokemonEntity } from '../entities/pokemon.entity'
import { PokemonModel } from '@/domain/models/pokemon.model'
import { CreatePokemonModel } from '@/domain/usecases/create-pokemon.usecase'
import { CreatePokemonRepository } from '@/data/usecases/db-create-pokemon.usecase'
import { FindPokemonRepository } from '@/data/usecases/db-find-pokemon.usecase'
import { DeletePokemonRepository } from '@/data/usecases/db-delete-pokemon.usecase'
import { UpdatePokemonRepository } from '@/data/usecases/db-update-pokemon.usecase'
import { UpdatePokemonModel } from '@/domain/usecases/update-pokemon.usecase'
import { ListPokemonRepository } from '@/data/usecases/db-list-pokemon.usecase'
import { ListOptions, Pagination } from '@/domain/domain.protocols'

export class PokemonRepository
  implements CreatePokemonRepository, ListPokemonRepository, FindPokemonRepository, UpdatePokemonRepository, DeletePokemonRepository {
  async create(pokemon: CreatePokemonModel): Promise<PokemonModel> {
    const repo = await MSSQLHelper.getRepository<PokemonEntity>(PokemonEntity)
    return await repo.save(pokemon)
  }

  async list(options: ListOptions): Promise<Pagination<PokemonModel>> {
    const repo = await MSSQLHelper.getRepository<PokemonEntity>(PokemonEntity)
    const [data, total] = await repo.findAndCount(options)
    return {
      ...options,
      data,
      total
    }
  }

  async find(id: string): Promise<PokemonModel> {
    const repo = await MSSQLHelper.getRepository<PokemonEntity>(PokemonEntity)
    return await repo.findOne(id)
  }

  async update(id: string, pokemon: UpdatePokemonModel): Promise<void> {
    const repo = await MSSQLHelper.getRepository<PokemonEntity>(PokemonEntity)
    await repo.update(id, pokemon)
  }

  async delete(id: string): Promise<void> {
    const repo = await MSSQLHelper.getRepository<PokemonEntity>(PokemonEntity)
    await repo.delete(id)
  }
}
