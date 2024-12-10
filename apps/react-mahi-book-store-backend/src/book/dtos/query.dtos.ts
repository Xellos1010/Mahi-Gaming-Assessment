import { GetBookParams } from "@prismaDist/interfaces/book/book.query.parameters.interface";
import { IsInt } from "class-validator";

// Utilized for Data validation of incoming parameters
// Implementing GetBookParams added to future proof the application. If the invocation changes to pass id as part of the body this will scale with the params lets say we want to get a book by name with filter or something.
export class GetBookParamsDto implements GetBookParams {
  @IsInt()
  id: number;
}

