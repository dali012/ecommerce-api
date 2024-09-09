import { InputType, PartialType } from '@nestjs/graphql';
import { Product } from '@prisma/client';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  id: Product['id'];
}
