import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from 'typeorm'
@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ name: 'unit_measurement' })
  unitMeasurement: string

  @Column()
  quantity: number

  @DeleteDateColumn({ name: 'deleted_at' })
  deteletedAt?: Date
}
