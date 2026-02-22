import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiResponseDto<T = unknown> {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  statusCode: number;

  @ApiPropertyOptional({ description: 'Response payload' })
  data: T;

  @ApiPropertyOptional({ example: 'Operation completed successfully' })
  message: string;
}
