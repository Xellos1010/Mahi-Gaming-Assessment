import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

// We are creating a custom pipe so that we can validate the request before we handle the request-response cycle and so that we can handle prisma updates more easily in the future
// Per Best Approach research in NestJS:
//**When to Use a Pipe**
// Custom pipes are better suited for specific and reusable transformations or custom logic that doesn’t fit into a DTO. For instance:
// Converting query parameters into specific formats (e.g., ?date=2024-12-09 → new Date()).
// Custom validation logic that applies globally across multiple controllers or fields.
// We will ensure there is a custom validator when setting the lastLoggedIn Value for User
@Injectable()
export class ParseGetBookParamsPipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata) {
    const id = parseInt(value.id, 10);

    if (isNaN(id)) {
      throw new BadRequestException('Invalid id parameter. It must be a number.');
    }

    return { id }; // Ensure the output matches GetBookParams
  }
}