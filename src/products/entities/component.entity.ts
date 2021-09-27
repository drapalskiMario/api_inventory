import { Ingredient } from '../../ingredients/entities/ingredient.entity'
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from './product.entity'

@Entity()
export class Component {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  quantity: number

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.id)
  @JoinColumn({ name: 'id_ingredient' })
  ingredientId: string

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'id_product' })
  productId: string

  @DeleteDateColumn({ name: 'deleted_at' })
  deteletedAt?: Date
}
