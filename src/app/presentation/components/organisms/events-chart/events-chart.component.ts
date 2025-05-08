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
        bottom: 0,
        itemGap: 40,
        itemWidth: 16,
        itemHeight: 16,
        symbol: 'rect',
        textStyle: {
          fontSize: 12,
          color: '#000',
          fontWeight: 500
        },
        data: ['Encontros', 'Mensagens', 'Checkpoints', 'Exploração']
      },
      grid: {
        left: '6%',
        right: '4%',
        bottom: '20%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: this.data.map(d => d.day),
        boundaryGap: true,
        axisTick: { alignWithLabel: true },
        axisLabel: {
          align: 'center',
          interval: 0
        },
        offset: 12
      },
      yAxis: {
        type: 'value',
        name: 'Quantidade de Eventos',
        max: 200,
        interval: 50,
        nameRotate: 90,
        nameLocation: 'center',
        nameGap: 50,
        nameTextStyle: {
          fontWeight: 500,
          fontSize: 14
        },
        axisLabel: {
          fontWeight: 600
        }
      },
      color: ['#4CAF50', '#616161', '#00BCD4', '#7E57C2'],
      series: [
        {
          name: 'Encontros',
          type: 'bar',
          stack: 'total',
          barWidth: '50%',
          emphasis: { focus: 'series' },
          itemStyle: { opacity: 0.75 },
          data: this.data.map(d => d.encounters)
        },
        {
          name: 'Mensagens',
          type: 'bar',
          stack: 'total',
          barWidth: '50%',
          emphasis: { focus: 'series' },
          itemStyle: { opacity: 0.75 },
          data: this.data.map(d => d.messages)
        },
        {
          name: 'Checkpoints',
          type: 'bar',
          stack: 'total',
          barWidth: '50%',
          emphasis: { focus: 'series' },
          itemStyle: { opacity: 0.75 },
          data: this.data.map(d => d.checkpoints)
        },
        {
          name: 'Exploração',
          type: 'bar',
          stack: 'total',
          barWidth: '50%',
          emphasis: { focus: 'series' },
          itemStyle: { opacity: 0.75 },
          data: this.data.map(d => d.exploration)
        }
      ]
    };
  }
}
