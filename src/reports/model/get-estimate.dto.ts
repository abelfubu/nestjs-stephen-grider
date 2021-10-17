import { Transform } from 'class-transformer';
import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from 'class-validator';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => Number(value))
  @Min(1950)
  @Max(2050)
  year: number;

  @Transform(({ value }) => Number(value))
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => Number(value))
  @IsLatitude()
  lat: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  milage: number;
}
