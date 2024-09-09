import { ObjectType } from '@nestjs/graphql';
import { Product as ProductType } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class Product implements RestrictProperties<Product, ProductType> {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}
