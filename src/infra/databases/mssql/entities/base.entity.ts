import {BaseEntity, PrimaryColumn} from 'typeorm'

export class Base extends BaseEntity {
  @PrimaryColumn()
  id: number
}
