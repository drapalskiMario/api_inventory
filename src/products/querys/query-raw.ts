export const queryComponents = `
  select component.id, component.quantity, ingredient.name, ingredient.id as "ingredientId"
  from component
  join ingredient
  on component.id_ingredient = ingredient.id
  where component.id_product = $1`

export const queryAvailable = `
  select ingredient.name, component.quantity as "quantityForProduct", ingredient.quantity as "inventoryQuantity"
  from component
  join ingredient
  on component.id_ingredient = ingredient.id
  where id_product = $1`

export const queryCost = `
  select product.name, sum(ingredient.unit_price * component.quantity) as cost
  from product
  join component
  on product.id = component.id_product
  join ingredient
  on component.id_ingredient = ingredient.id
  where product.deleted_at is null
  group by product.id
  order by product.name`
