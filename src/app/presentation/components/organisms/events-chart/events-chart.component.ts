import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';

export interface ProjectedEventGroup {
  day: string; // Ex: "1", "2", ...
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
    if (changes['data']) {
      const hasValidData = this.data.some(
        d => d.day && (d.encounters || d.messages || d.checkpoints || d.exploration)
      );

      if (!hasValidData) {
        this.chartOptions = {};
        return;
      }

      this.updateChartOptions();
    }
  }

  onChartInit(chart: EChartsInstance) {
    this.chartRef = chart;
  }

  private getDayLabels(): string[] {
    const weekdayNames = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
    const today = new Date().getDay(); // 0=Dom, 1=Seg, ..., 6=Sab

    let dayIndex = today === 0 ? 1 : today > 5 ? 1 : today;
    const labels: string[] = [];

    for (let i = 0; labels.length < 5; i++) {
      let next = (dayIndex + i - 1) % 5;
      labels.push(i === 0 ? 'Hoje' : weekdayNames[(next) % 5]);
    }

    return labels;
  }

  private updateChartOptions() {
    const labels = this.getDayLabels();

    const newOptions = {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: {
        bottom: 0,
        itemGap: 40,
        itemWidth: 16,
        itemHeight: 16,
        symbol: 'rect',
        textStyle: { fontSize: 12, color: '#000', fontWeight: 500 },
        data: ['Encontros', 'Mensagens', 'Checkpoints', 'Exploração']
      },
      grid: { left: '6%', right: '4%', bottom: '20%', containLabel: true },
      xAxis: {
        type: 'category',
        data: labels,
        boundaryGap: true,
        axisTick: { alignWithLabel: true },
        axisLabel: {
          align: 'center',
          interval: 0,
          margin: 8, // < diminui a distância vertical da label até o eixo
          fontSize: 11 // < deixa mais compacto
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
        nameTextStyle: { fontWeight: 500, fontSize: 14 },
        axisLabel: { fontWeight: 600 }
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

    if (this.chartRef) {
      this.chartRef.setOption(newOptions, true);
    } else {
      this.chartOptions = newOptions;
    }
  }
}
