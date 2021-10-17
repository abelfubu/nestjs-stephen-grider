import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  UseGuards,
  Controller,
  Query,
} from '@nestjs/common';
import { User } from '@users/users.entity';
import { AuthGuard } from '@guards/auth.guard';
import { ReportsService } from './reports.service';
import { Serialize } from '@decorators/serialize.decorator';
import { CreateReportDto, GetEstimateDto, ReportResponseDto } from './model';
import { CurrentUser } from '@decorators/current-user.decorator';
import { AdminGuard } from '@guards/admin.guard';

@Controller('reports')
@UseGuards(AuthGuard)
@Serialize(ReportResponseDto)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  @UseGuards(AdminGuard)
  getAll() {
    return this.reportsService.getAll();
  }

  @Get('estimate')
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.getEstimate(query);
  }

  @Post()
  create(@Body() report: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(report, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() report: Partial<CreateReportDto>) {
    return this.reportsService.update(Number(id), report);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reportsService.delete(Number(id));
  }
}
