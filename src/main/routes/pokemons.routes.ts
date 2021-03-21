import { Router } from 'express'
import { Controller } from '@/presentation/protocols.presentation'
import { DbFindPokemon } from '@/data/usecases/db-find-pokemon.usecase'
import { DbCreatePokemon } from '@/data/usecases/db-create-pokemon.usecase'
import { expressRouteAdapter } from '@/main/adapters/express-route.adapter'
import { CreatePokemonController } from '@/presentation/controllers/pokemon/create-pokemon.controller'
import { PokemonRepository } from '@/infra/databases/mssql/repositories/pokemon.repository'
import { FindPokemonController } from '@/presentation/controllers/pokemon/find-pokemon.controller'
import { DbDeletePokemon } from '@/data/usecases/db-delete-pokemon.usecase'
import { DeletePokemonController } from '@/presentation/controllers/pokemon/delete-pokemon.controller'
import { DbUpdatePokemon } from '@/data/usecases/db-update-pokemon.usecase'
import { UpdatePokemonController } from '@/presentation/controllers/pokemon/update-pokemon.controller'
import { DbListPokemon } from '@/data/usecases/db-list-pokemon.usecase'
import { ListPokemonController } from '@/presentation/controllers/pokemon/list-pokemon.controller'

const pokemonRepository = new PokemonRepository()

const makeCreate = (): Controller => {
  const dbCreatePokemon = new DbCreatePokemon(pokemonRepository)
  return new CreatePokemonController(dbCreatePokemon)
}

const makeList = (): Controller => {
  const dbListPokemon = new DbListPokemon(pokemonRepository)
  return new ListPokemonController(dbListPokemon)
}

const makeFind = (): Controller => {
  const dbFindPokemon = new DbFindPokemon(pokemonRepository)
  return new FindPokemonController(dbFindPokemon)
}

const makeUpdate = (): Controller => {
  const dbUpdatePokemon = new DbUpdatePokemon(pokemonRepository)
  return new UpdatePokemonController(dbUpdatePokemon)
}

const makeDelete = (): Controller => {
  const dbDeletePokemon = new DbDeletePokemon(pokemonRepository)
  return new DeletePokemonController(dbDeletePokemon)
}

export default (router: Router): void => {
  router.post('/pokemons', expressRouteAdapter(makeCreate()))
  router.get('/pokemons', expressRouteAdapter(makeList()))
  router.get('/pokemons/:id', expressRouteAdapter(makeFind()))
  router.put('/pokemons/:id', expressRouteAdapter(makeUpdate()))
  router.delete('/pokemons/:id', expressRouteAdapter(makeDelete()))
}
