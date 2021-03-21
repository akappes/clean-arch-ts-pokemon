import request from 'supertest'
import app from '@/main/config/app'
import { API_VERSION } from '@/main/config/env'
import { MSSQLHelper } from '@/infra/databases/mssql/mssql-helper'
import { PokemonEntity } from '@/infra/databases/mssql/entities/pokemon.entity'
import { Repository } from 'typeorm'
import { ListOptions, Pagination } from '@/domain/domain.protocols'
import { PokemonModel } from '@/domain/models/pokemon.model'

describe('Pokemons routes', () => {
  let repository: Repository<PokemonEntity>

  beforeAll(async () => {
    await MSSQLHelper.connect()
    repository = await MSSQLHelper.getRepository(PokemonEntity)
  })

  beforeEach(async() => {
    await repository.delete({})
  })

  afterAll(async () => {
    await MSSQLHelper.disconnect()
  })

  describe('When creating a new pokemon', () => {
    it('Should return 201 and new Pokemon when correct params are provided', async () => {
      const result = await request(app).post(`/api/${API_VERSION}/pokemons`).send({ name: 'any_name' }).expect(201)
      const expectedResult = await repository.findOne(result.body.id)
      expect(result.body).toEqual(expectedResult)
    })
  })

  describe('When listing pokemons', () => {
    it('Should return 200 and pagination result when correct params are provided', async () => {
      const pokemon = await repository.save({ type: 'any_type', trainer:'any_trainer', level: 1 })
      const optionsMock: ListOptions = { skip: 0, take: 10 }
      const expectedResult: Pagination<PokemonModel> = {
        data: [pokemon],
        total: 1,
        ...optionsMock
      }

      await request(app)
        .get(`/api/${API_VERSION}/pokemons/`)
        .query(optionsMock)
        .expect(200)
        .expect(expectedResult)
    })
  })

  describe('When finding a pokemon', () => {
    it('Should return 200 and the Pokemon when correct params are provided', async () => {
      const expectedResult = await repository.save({ type: 'any_type', trainer:'any_trainer', level: 1 })

      await request(app)
        .get(`/api/${API_VERSION}/pokemons/${expectedResult.id}`)
        .expect(200)
        .expect(expectedResult)
    })
  })

  describe('When updating a pokemon', () => {
    it('Should return 204 when correct params are provided', async () => {
      const pokemon = await repository.save({ type: 'any_type', trainer:'any_trainer', level: 1 })

      await request(app)
        .put(`/api/${API_VERSION}/pokemons/${pokemon.id}`)
        .send({ name: 'new_name' })
        .expect(204)

      const result = await repository.findOne(pokemon.id)
      expect(result).toEqual({ ...pokemon, name: 'new_name' })
    })
  })

  describe('When deleting a pokemon', () => {
    it('Should return 204 when correct params are provided', async () => {
      const pokemon = await repository.save({ type: 'any_type', trainer:'any_trainer', level: 1 })

      await request(app)
        .delete(`/api/${API_VERSION}/pokemons/${pokemon.id}`)
        .expect(204)

      const result = await repository.findOne(pokemon.id)
      expect(result).toBeFalsy()
    })
  })
})
