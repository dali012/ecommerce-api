import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  // Create 5 categories
  const categories = await Promise.all(
    Array.from({ length: 5 }).map(() => {
      return prisma.category.create({
        data: {
          name: faker.commerce.department(),
          description: faker.lorem.sentence(),
        },
      });
    }),
  );

  // Create products for each category
  await Promise.all(
    categories.map(async (category) => {
      const products = await Promise.all(
        Array.from({ length: 10 }).map(() => {
          return prisma.product.create({
            data: {
              name: faker.commerce.productName(),
              description: faker.commerce.productDescription(),
              price: parseFloat(faker.commerce.price()),
              sku: uuidv4(),
              stock: faker.number.int({ min: 0, max: 100 }),
              categoryId: category.id,
              createdAt: faker.date.past(),
              updatedAt: new Date(),
              seoMeta: {
                create: {
                  title: faker.lorem.words(5),
                  description: faker.lorem.sentence(),
                  keywords: faker.lorem.words(3),
                },
              },
            },
          });
        }),
      );

      // Add images and reviews to each product
      await Promise.all(
        products.map(async (product) => {
          // Create product images
          await Promise.all(
            Array.from({ length: 3 }).map(() => {
              return prisma.productImage.create({
                data: {
                  url: faker.image.url(),
                  altText: faker.lorem.words(3),
                  productId: product.id,
                },
              });
            }),
          );

          // Create product reviews
          await Promise.all(
            Array.from({ length: 2 }).map(() => {
              return prisma.productReview.create({
                data: {
                  rating: faker.number.int({ min: 1, max: 5 }),
                  comment: faker.lorem.sentence(),
                  productId: product.id,
                },
              });
            }),
          );
        }),
      );
    }),
  );

  console.log('Seeding complete!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
