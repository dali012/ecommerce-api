# E-Commerce API - NestJS, GraphQL, Supabase, Prisma

This is an e-commerce API built using NestJS with GraphQL as the API interface, Supabase for database and file storage, and Prisma as the ORM. The API provides features for managing products, categories, inventory, and orders, with complete CRUD functionality.

## Features

- **Product Management**
  - Product Creation
  - Product Listing
  - Product Details
  - Product Update/Delete
- **Category Management**
  - Create, list, update, and delete categories for products.
- **Inventory Management**
  - Manage stock and availability of products.

---

## Tech Stack

- **Backend Framework**: [NestJS](https://nestjs.com/)
- **API Interface**: [GraphQL](https://graphql.org/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL) with [Prisma](https://www.prisma.io/) as ORM
- **Storage**: Supabase Storage (for product images and files)

---

## Getting Started

### Prerequisites

- Node.js (v16+)
- Supabase account with database and storage setup
- PostgreSQL database URL
- `@nestjs/graphql` and `@nestjs/apollo` for GraphQL
- `@prisma/client` for database management
- `@nestjs/config` for environment variables
- `supabase-js` for interacting with Supabase Storage

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/dali012/ecommerce-server
   cd ecommerce-server
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Setup Prisma**:

   - Create a `.env` file at the root of your project and configure the following environment variables:

     ```bash
     NODE_ENV=development
     APP_PORT=1337
     API_PREFIX=api
     API_KEY="your api key"
     DATABASE_URL="your database url"
     DIRECT_URL="your database url"
     JWT_SECRET="your jwt secret"
     ```

   - Generate Prisma Client:

     ```bash
     npx prisma generate
     ```

   - Apply migrations to set up the database schema:

     ```bash
     npx prisma db push
     ```

4. **Supabase Storage**:

   Supabase Storage is used to handle product images and other related files. Make sure your Supabase project is configured with the necessary storage bucket.

5. **Run the development server**:

   ```bash
   pnpm dev
   ```

   The API will be available at `http://localhost:1337/graphql`.

---

## API Overview

### 1. **Product Management**

- **Create Product**: Create a new product with related details (name, description, price, stock, etc.).
- **List Products**: Retrieve a paginated list of all products.
- **Product Details**: Fetch detailed information about a specific product, including categories, inventory, and images.
- **Update/Delete Product**: Update the details of an existing product or delete a product.

### 2. **Category Management**

- **Create Category**: Create a new product category.
- **List Categories**: Retrieve a list of all categories.
- **Update/Delete Category**: Update or delete an existing category.

### 3. **Inventory Management**

- **Manage Stock**: Update the stock levels for products.

---

## GraphQL Schema

You can explore and test the GraphQL schema using tools like [GraphQL Playground](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/).

### Sample Queries

- **Product List Query**:

  ```graphql
  query {
    products {
      id
      name
      price
      stock
    }
  }
  ```

- **Create Product Mutation**:

  ```graphql
  mutation {
    createProduct(
      data: {
        name: "New Product"
        description: "A cool product"
        price: 19.99
        stock: 100
        categoryId: "some-category-id"
      }
    ) {
      id
      name
    }
  }
  ```

### Sample Mutations

- **Create Category**:

  ```graphql
  mutation {
    createCategory(data: { name: "Electronics" }) {
      id
      name
    }
  }
  ```

---

## Running the Project

### Development

```bash
pnpm dev
```

### Production

```bash
pnpm build
npm start:prod
```

---

## License

This project is licensed under the MIT License.
