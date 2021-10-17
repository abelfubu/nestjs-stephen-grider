import { Expose, Transform } from 'class-transformer';

export class ReportResponseDto {
  @Expose()
  id: number;

  @Expose()
  approved: boolean;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  price: number;

  @Expose()
  milage: number;

  @Expose()
  @Transform(({ obj: user }) => user.id)
  userId: number;
}
