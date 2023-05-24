import { Controller, Get } from '@nestjs/common';
import { SummaryService } from './summary.service';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summarySerive: SummaryService) {}

  @Get()
  getSummary() {
    return this.summarySerive.calculateSummary();
  }
}
