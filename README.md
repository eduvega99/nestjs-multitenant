# NestJS Multitenant

A NestJS template for building multitenant applications using PostgreSQL schemas.
Each tenant has its own schema, and connections are injected dynamically at runtime.
Using other database systems requires additional adaptation.

## Table of contents

- [📝 Prerequisites](#-prerequisites)
- [🛠️ Project Setup](#️-project-setup)
- [💾 Database Management](#-database-management)
- [🔌 Multitenancy Overview](#-multitenancy-overview)
- [🚧 Development](#-development)
- [🚀 Deployment](#-deployment)

## 📝 Prerequisites

To run the application, you need:

- **Node.js** - `22.x` or above (preferably the latest LTS). Install via [NVM](https://github.com/nvm-sh/nvm) (recommended) or [Node.js official site](https://nodejs.org/en/download).
- **PostgreSQL** - `16.x` or above. Download from the official [PostgreSQL](https://www.postgresql.org/download/) site.

> [!TIP]
> I also recommend installing **Nest CLI**, a command-line interface tool that simplifies development:
>
> ```bash
> $ npm install -g @nestjs/cli
> ```
>
> More info in the [NestJS CLI documentation](https://docs.nestjs.com/cli/overview).

## 🛠️ Project setup

1. **Create the database** in PostgreSQL:
   ```postgres
   CREATE DATABASE my_multitenant_database;
   ```
2. **Install dependencies**:
   ```bash
   $ npm install
   ```
3. **Set up environment variables**. Copy `.env.template` to `.env` and fill in the required values.
   > [!WARNING]
   > All variables in the `.env.template` file should be left blank to avoid git tracking.
4. **Run public migrations** (required before starting the app):
   ```bash
   $ npm run db:migrations -- --type=public --action=run
   ```
   For more details about this command, see [db:migrations](#dbmigrations) section.

## 💾 Database management

This project provides two database management scripts: `db:migrations` and `db:seed`.

### db:migrations

Manage project database migrations.
It accepts the following parameters:

- `--type` → **Required.** Target schema type. The value must be `public` or `tenant`.
- `--action` → **Required.** What to do `run`, `revert` or `generate`.
- `--name` → Required only when `--action` is `generate`. The name of the migration.

Some examples:

```bash
# Run migrations from the public schema
$ npm run db:migrations -- --type=public --action=run

# Revert migrations from the public schema
$ npm run db:migrations -- --type=public --action=revert

# Generate a migration for tenant schemas
$ npm run db:migrations -- --type=tenant --action=generate --name=ExampleMigrationName
```

### db:seed

Populates the database with initial or sample data.
Used for development or demo purposes.

```bash
$ npm run db:seed
```

> [!NOTE]
> Users created via the seed script all use the password `Password_123`.
> You can use these credentials to log in.

## 🔌 Multitenancy overview

This template uses PostgreSQL schemas for multitenancy.
Connections are injected dynamically at runtime based on the authenticated user's tenant.

- The `JwtMiddleware` extracts the tenant identifier from the authenticated user and sets `req.tenant`.
- The `req.tenant` value is then used by `TENANT_CONNECTION` to select the correct schema.
- The `TENANT_CONNECTION` provider creates a tenant-specific database connection.
- A practical example of this can be seen in the `ClientsModule`, which demonstrates how tenant-specific data is managed.

> For a deeper understanding, check the `/src/tenant` module.

## 🚧 Development

Start the application in development mode:

```bash
$ npm run start                         # Start in development mode
$ npm run start:dev                     # Start in watch mode
$ npm run start:debug                   # Start in debug mode
$ npm run start:debug -- --inspect-brk  # Debug with inspector attached
```

> [!IMPORTANT]
> If you are working in a development environment, you must also run tenant migrations from the public schema (even if the tables will be empty).
> This ensures TypeORM recognizes tenant-scoped entities and can detect future schema changes correctly.
>
> ```bash
> $ npm run db:migrations -- --type=tenant --action=run
> ```

## 🚀 Deployment

1. **Run pending public migrations:**
   ```bash
   $ npm run db:migrations -- --type=public --action=run
   ```
2. **Build application:**
   ```bash
   $ npm run build
   ```
3. **Run the application:**
   ```bash
   $ npm run start:prod
   ```
