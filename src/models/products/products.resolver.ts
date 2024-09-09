import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateProductInput } from './dtos/create-product.input';
import { FindManyProductArgs, FindUniqueProductArgs } from './dtos/find.args';
import { UpdateProductInput } from './dtos/update-product.input';
import { Product } from './entity/product.entity';
import { ProductsService } from './products.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => Product)
  createProduct(@Args('createProductInput') args: CreateProductInput) {
    return this.productsService.create(args);
  }

  @Query(() => [Product], { name: 'products' })
  findAll(@Args() args: FindManyProductArgs) {
    return this.productsService.findAll(args);
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args() args: FindUniqueProductArgs) {
    return this.productsService.findOne(args);
  }

  @Mutation(() => Product)
  async updateProduct(@Args('updateProductInput') args: UpdateProductInput) {
    return this.productsService.update(args);
  }

  @Mutation(() => Product)
  async removeProduct(@Args() args: FindUniqueProductArgs) {
    return this.productsService.remove(args);
  }
}
