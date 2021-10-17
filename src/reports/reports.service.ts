import { Repository } from 'typeorm';
import { CreateReportDto, GetEstimateDto } from './model';
import { Report } from './reports.entity';
import { User } from '@users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
  ) {}

  getAll(): Promise<Report[]> {
    return this.reportsRepository.find({ relations: ['user'] });
  }

  create(report: CreateReportDto, user: User): Promise<Report> {
    const newReport = this.reportsRepository.create(report);
    newReport.user = user;
    return this.reportsRepository.save(newReport);
  }

  async update(id: number, report: Partial<CreateReportDto>) {
    const reportToUpdate = await this.reportsRepository.findOne(id);
    if (!reportToUpdate) {
      throw new NotFoundException('Report not found');
    }
    return this.reportsRepository.save({ ...reportToUpdate, ...report });
  }

  async delete(id: number) {
    const report = await this.reportsRepository.findOne(id);
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return this.reportsRepository.delete(id);
  }

  async getEstimate(query: GetEstimateDto): Promise<number> {
    return this.reportsRepository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make: query.make })
      .andWhere('model = :model', { model: query.model })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: query.lat })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: query.lng })
      .andWhere('year - :year BETWEEN -3 AND 3', { year: query.year })
      .getRawOne();
  }
}
