import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';

export interface ProjectedEventGroup {
  day: string;
  encounters: number;
  messages: number;
  checkpoints: number;
  exploration: number;
}

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.updateChartOptions();
    }
  }

  private updateChartOptions() {
    this.chartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        bottom: 0
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: this.data.map(d => d.day),
        axisTick: { alignWithLabel: true }
      },
      yAxis: {
        type: 'value',
        name: 'Quantidade de Eventos'
      },
      series: [
        {
          name: 'Encontros',
          type: 'bar',
          stack: 'total',
          emphasis: { focus: 'series' },
          data: this.data.map(d => d.encounters)
        },
        {
          name: 'Mensagens',
          type: 'bar',
          stack: 'total',
          emphasis: { focus: 'series' },
          data: this.data.map(d => d.messages)
        },
        {
          name: 'Checkpoints',
          type: 'bar',
          stack: 'total',
          emphasis: { focus: 'series' },
          data: this.data.map(d => d.checkpoints)
        },
        {
          name: 'Exploração',
          type: 'bar',
          stack: 'total',
          emphasis: { focus: 'series' },
          data: this.data.map(d => d.exploration)
        }
      ]
    };
  }
}
