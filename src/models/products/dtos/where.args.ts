import {
  DateTimeFilter,
  FloatFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from '@dtos/common.input';
import { InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class ProductWhereUniqueInput {
  id: string;
}

@InputType()
export class ProductWhereInputStrict
  implements
    RestrictProperties<
      ProductWhereInputStrict,
      Omit<
        Prisma.ProductWhereInput,
        'Category' | 'seoMeta' | 'reviews' | 'images'
      >
    >
{
  id: StringFilter;
  name: StringFilter;
  description: StringFilter;
  price: FloatFilter;
  sku: StringFilter;
  stock: IntFilter;
  categoryId: StringFilter;
  createdAt: DateTimeFilter;
  updatedAt: DateTimeFilter;

  AND: ProductWhereInput[];
  OR: ProductWhereInput[];
  NOT: ProductWhereInput[];
}

@InputType()
export class ProductWhereInput extends PartialType(ProductWhereInputStrict) {}

@InputType()
export class ProductListRelationFilter {
  every?: ProductWhereInput;
  some?: ProductWhereInput;
  none?: ProductWhereInput;
}

@InputType()
export class ProductRelationFilter {
  is?: ProductWhereInput;
  isNot?: ProductWhereInput;
}
