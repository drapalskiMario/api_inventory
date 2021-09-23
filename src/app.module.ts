import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { ComponentsModule } from './components/components.module';

@Module({
  imports: [UsersModule, ProductsModule, IngredientsModule, ComponentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
