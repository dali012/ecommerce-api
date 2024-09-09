import {
  ArgsType,
  Field,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';
import { ProductOrderByWithRelationInput } from './order-by.args';
import { ProductWhereInput, ProductWhereUniqueInput } from './where.args';

registerEnumType(Prisma.ProductScalarFieldEnum, {
  name: 'ProductScalarFieldEnum',
});

@ArgsType()
class FindManyProductArgsStrict
  implements
    RestrictProperties<
      FindManyProductArgsStrict,
      Omit<Prisma.ProductFindManyArgs, 'include' | 'select'>
    >
{
  where: ProductWhereInput;
  orderBy: ProductOrderByWithRelationInput[];
  cursor: ProductWhereUniqueInput;
  take: number;
  skip: number;
  @Field(() => [Prisma.ProductScalarFieldEnum])
  distinct: Prisma.ProductScalarFieldEnum[];
}

@ArgsType()
export class FindManyProductArgs extends PartialType(
  FindManyProductArgsStrict,
) {}

@ArgsType()
export class FindUniqueProductArgs {
  where: ProductWhereUniqueInput;
}
