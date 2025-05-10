import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { EventsChartService } from '../../../../core/services/events-chart.service';
import { ErrorService } from '../../../../core/services/error.service'; // 👈 Importado

export interface ProjectedEventGroup {
  day: string;
  encounters: number;
  messages: number;
  checkpoints: number;
  exploration: number;
}

type EChartsInstance = any;

@Component({
  standalone: true,
  selector: 'app-events-chart',
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './events-chart.component.html',
  styleUrls: ['./events-chart.component.scss']
})
export class EventsChartComponent implements OnChanges {
  @Input() data: ProjectedEventGroup[] = [];
  chartOptions: any = {};
  private chartRef: EChartsInstance | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    try {
      if (changes['data']) {
        const hasValidData = this.data.some(
          d => d.day && (d.encounters || d.messages || d.checkpoints || d.exploration)
        );

        if (!hasValidData) {
          this.chartOptions = {};
          return;
        }

        const options = EventsChartService.generateChartOptions(this.data, this.chartRef);
        if (options) {
          this.chartOptions = options;
        }
      }
    } catch (error) {
      ErrorService.logError(error, 'EventsChartComponent - ngOnChanges');
    }
  }

  onChartInit(chart: EChartsInstance) {
    try {
      this.chartRef = chart;
    } catch (error) {
      ErrorService.logError(error, 'EventsChartComponent - onChartInit');
    }
  }
}
