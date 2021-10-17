import { Report } from '@reports/reports.entity';
import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  admin: string;

  @Expose()
  reports: Report[];
}
