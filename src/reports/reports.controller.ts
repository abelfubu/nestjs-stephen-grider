import { AuthGuard } from '@guards/auth.guard';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './model';
import { ReportsService } from './reports.service';

@Controller('reports')
@UseGuards(AuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  getAll() {
    return this.reportsService.getAll();
  }

  @Post()
  create(@Body() report: CreateReportDto) {
    return this.reportsService.create(report);
  }
}
