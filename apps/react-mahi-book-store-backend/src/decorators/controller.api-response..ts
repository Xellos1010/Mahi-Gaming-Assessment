import { ApiResponseDto } from '@nestDtos/base.api-response.dto';

/**
* Wraps the controller method response in a BaseApiResponseDto to enforce consistent response formatting for success cases.
*/
export function WrapApiResponse() {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            try {
                // Execute the original method logic 
                const data = await originalMethod.apply(this, args);

                // Wrap the result in BaseApiResponseDto 
                return new ApiResponseDto(true, data, null);
            } catch (error) {
                // Ensure errors are propagated for HandleControllerError 
                throw error;
            }
        };

        return descriptor;
    };
}
