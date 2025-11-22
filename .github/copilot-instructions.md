# Feature Fortune Server - Copilot Instructions

## Project Overview
This is a Node.js server application built with the **Julian** proprietary framework. It uses **TypeORM** for data access and **Express** (under the hood) for HTTP handling.

## Architecture & Julian Framework
The application is assembled in `src/config.ts` and started via `src/start.ts`.

### Service Structure
- **Base Class**: Services (Controllers) extend `httpRouter.Service` (from `@priolo/julian`).
- **State & Routing**: Define routes and dependencies in `stateDefault`.
  ```typescript
  class MyRoute extends httpRouter.Service {
      get stateDefault() {
          return {
              ...super.stateDefault,
              path: "/my-resource", // Base path
              my_repo: "/typeorm/my_entity", // Dependency path
              routers: [
                  { path: "/", verb: "get", method: "getAll" },
                  { path: "/:id", verb: "post", method: "create" }
              ]
          }
      }
      // ... methods
      async getAll(req: Request, res: Response) {
        // ... implementation
      }
      async create(req: Request, res: Response) {
        // ... implementation
      }
  }
  ```

### Communication (The Bus)
- **Internal Communication**: Use the `Bus` to communicate between services and repositories.
- **Dispatching**:
  ```typescript
  // Example: Fetching data from a repository
  const data = await new Bus(this, this.state.my_repo).dispatch({
      type: typeorm.Actions.FIND,
      payload: { where: { id: 1 } } // TypeORM FindOptions (payload is specific for each "action" type)
  });
  ```

## Data Access (TypeORM)
- **Entities**: Defined in `src/repository/` using standard TypeORM decorators (`@Entity`, `@Column`).
- **Repositories**: Registered as services in `src/config.ts` under the `typeorm` configuration.
- **Access**: Do NOT use TypeORM repositories directly in controllers. Use the `Bus` with `typeorm.Actions` (FIND, SAVE, DELETE, etc.).

## Testing
- **Type**: Integration tests are preferred over unit tests for routes.
- **Tooling**: Jest + Axios.
- **Pattern**:
  1. Start the full `RootService` in `beforeAll`.
  2. Use `axios` to make real HTTP requests to the running server.
  3. Mock external services (Google, Stripe) using `jest.mock`.
  ```typescript
  // src/routers/_tests/Example.test.ts
  beforeAll(async () => {
      const cnf = buildNodeConfig({ noLog: true, port: PORT });
      root = await RootService.Start(cnf);
  });
  ```

## Development Workflow
- **Start Dev**: `npm run start:dev` (uses `tsx` for hot reloading).
- **Run Tests**: `npm test` (runs Jest).
- **Environment**: `src/types/env.js` handles environment variables. `process.env.NODE_ENV` drives configuration (e.g., mocking Stripe in tests).

## Key Files
- `src/config.ts`: Main application assembly and dependency injection configuration.
- `src/routers/`: API route definitions.
- `src/repository/`: Database entities.
