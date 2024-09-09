import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@InputType()
export class ProductOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      ProductOrderByWithRelationInputStrict,
      Omit<
        Prisma.ProductOrderByWithRelationInput,
        'Category' | 'images' | 'reviews' | 'seoMeta'
      >
    >
{
  @Field(() => Prisma.SortOrder)
  id: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  name: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  description: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  price: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  sku: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  stock: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  categoryId: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  createdAt: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  updatedAt: Prisma.SortOrder;
}

@InputType()
export class ProductOrderByWithRelationInput extends PartialType(
  ProductOrderByWithRelationInputStrict,
) {}

@InputType()
export class ProductOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder;
}
