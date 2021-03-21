import { Entity, Column } from 'typeorm'
import { Base } from './base.entity'

@Entity('pokemons')
export class PokemonEntity extends Base {
  @Column({ nullable: false, name: 'Tipo' })
  type: string

  @Column({ nullable: false, name: 'Treinador'  })
  trainer: string

  @Column({ nullable: false, default: 1, name: 'Nivel'  })
  level: number
}
