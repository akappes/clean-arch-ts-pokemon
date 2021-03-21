import { BaseModel } from './base.model'

export interface PokemonModel extends BaseModel {
  type: string
  trainer: string
  level: number
}
