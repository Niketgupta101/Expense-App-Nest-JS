import { Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDTO } from 'src/dtos/report.dto';

interface Report {
  amount: number;
  source: string;
}

interface UpdateReport {
  amount?: number;
  source?: string;
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDTO[] {
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDTO(report));
  }

  getReportById(type: ReportType, id: string) {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!report) return;

    return new ReportResponseDTO(report);
  }

  createReport(type: string, { amount, source }: Report) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };

    data.report.push(newReport);
    return new ReportResponseDTO(newReport);
  }

  updateReport(type: ReportType, id: string, body: UpdateReport) {
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex((report) => report.id === id);

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    };
    return new ReportResponseDTO(data.report[reportIndex]);
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);

    if (reportIndex === -1) return;

    data.report.splice(reportIndex, 1);

    return;
  }
}
