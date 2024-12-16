# DTO - Data Transfer Objects Library README

## Overview

This library provides a set of Data Transfer Objects (DTOs) for use in your NX project, primarily focused on authentication, user management, and book-related operations. The DTOs are structured to facilitate data interchange between frontend and backend services, ensuring a robust and scalable architecture.

### Structure

The built library can be found in the following path: `dist/libs/dtos/src/lib/`. The main components are organized as follows:

- **Types**

  - `api-errors.ts`: Contains interfaces related to error handling in API requests.
  - `index.ts`: Exports all types from within the `types` directory.

- **Authentication**
  - `auth.dto.ts`: Includes DTOs for user creation and login requests, along with the corresponding responses.
- **Base API Response**

  - `base-api-response.dto.ts`: Defines a generic structure for API responses.

- **Books**

  - `book.dto.ts`: Contains DTOs related to book operations, including creation, updating, and fetching.

- **User Management**

  - `user.dto.ts`: Handles user-related DTOs for creating, updating, and fetching user data.

- **Pagination and Search**
  - `pagination.dto.ts`: (Not implemented) Defines structures for paginated responses.
  - `search.dto.ts`: (Not implemented) Defines search parameters for books and users.

### How to Use the Library

To leverage the DTOs in your project, you can import them based on the provided path mappings in your `tsconfig.base.json`.

Sample import statements production ready applications:

```typescript
import { CreateUserRequestDto } from '@sharedDtos';
import { CreateBookDto } from '@sharedDtos';
import { PaginatedBooksResponse } from '@sharedDtos';
import { ApiError } from '@sharedDtos';
```

The above imports enable you to create instances of the specified DTOs or handle errors seamlessly throughout your NX application.

### TypeScript Configuration

TypeScript paths are configured in the `tsconfig.base.json` file, allowing modular and organized access to the DTOs:

```json
"paths": {
    "@react-monorepo/dtos": ["libs/dtos/src/index.ts"], <dev path>
    "@sharedDtos": ["dist/libs/dtos/src/index.ts"],     <prod path - reqiures nx build task invoked successfully before use >
}
```

This setup ensures that imports are clearer and avoids the direct use of relative paths, simplifying refactoring and maintenance.

### Architectural Considerations

Currently, the library is coupled with Prisma to expedite development due to time constraints. The DTOs utilize Prisma models directly, which may change in the future. Plans are in place to decouple from Prisma and implement a database-agnostic approach for schema definition. This will allow for greater flexibility and adaptability for various ORMs in future iterations.

### Contribution and Development

Feel free to contribute to this library by adding new DTOs, enhancing existing ones, or ensuring the documentation remains up-to-date. Always consider the Single Responsibility Principle (SRP) and strive for effective code reusability.

### Conclusion

This library is essential for efficiently managing communication between various components of your application, ensuring a clear structure for data handling and error management. You can extend it as needed to fit the future requirements of your applications architecture.
