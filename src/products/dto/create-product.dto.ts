class Component {
  ingredientId: string
  quantity: string
}
export class CreateProductDto {
  name: string
  urlImagem: string
  price: string
  components: [Component]
}
