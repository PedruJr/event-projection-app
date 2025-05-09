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

type EChartsInstance = any;

@Component({
  standalone: true,
  selector: 'app-events-chart',
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './events-chart.component.html',
  styleUrls: ['./events-chart.component.scss']
})
export class EventsChartComponent implements OnChanges {
  // Dados recebidos como input para o gráfico
  @Input() data: ProjectedEventGroup[] = [];

  // Configurações da instância do gráfico
  chartOptions: any = {};

  // Referência à instância do gráfico ECharts
  private chartRef: EChartsInstance | null = null;

  // Detecta mudanças nas propriedades do componente
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      const hasValidData = this.data.some(
        d => d.day && (d.encounters || d.messages || d.checkpoints || d.exploration)
      );

      if (!hasValidData) {
        this.chartOptions = {};
        return;
      }

      // Atualiza o gráfico com os novos dados
      this.updateChartOptions();
    }
  }

  // Executado quando o gráfico é inicializado
  onChartInit(chart: EChartsInstance) {
    this.chartRef = chart;
  }

  // Atualiza as opções de exibição do gráfico
  private updateChartOptions() {
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
        data: this.data.map(d => d.day),
        boundaryGap: true,
        axisTick: { alignWithLabel: true },
        axisLabel: { align: 'center', interval: 0 },
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

    // Se o gráfico já estiver instanciado, aplica as opções imediatamente
    if (this.chartRef) {
      this.chartRef.setOption(newOptions, true);
    } else {
      // Caso contrário, armazena as opções até a inicialização
      this.chartOptions = newOptions;
    }
  }
}
