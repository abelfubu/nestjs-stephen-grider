import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './model';
import { Report } from './reports.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
  ) {}

  getAll(): Promise<Report[]> {
    return this.reportsRepository.find();
  }

  create(report: CreateReportDto): Promise<Report> {
    const newReport = this.reportsRepository.create(report);
    return this.reportsRepository.save(newReport);
  }
}
