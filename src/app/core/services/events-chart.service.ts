import type { ProjectedEventGroup } from '../../presentation/components/organisms/events-chart/events-chart.component';
import {getDayLabels} from '../utils/chart-helpers';

export class EventsChartService {
  static generateChartOptions(data: ProjectedEventGroup[], chartRef: any): any {
    const labels = getDayLabels();

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
          margin: 8,
          fontSize: 11
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
          data: data.map(d => d.encounters)
        },
        {
          name: 'Mensagens',
          type: 'bar',
          stack: 'total',
          barWidth: '50%',
          emphasis: { focus: 'series' },
          itemStyle: { opacity: 0.75 },
          data: data.map(d => d.messages)
        },
        {
          name: 'Checkpoints',
          type: 'bar',
          stack: 'total',
          barWidth: '50%',
          emphasis: { focus: 'series' },
          itemStyle: { opacity: 0.75 },
          data: data.map(d => d.checkpoints)
        },
        {
          name: 'Exploração',
          type: 'bar',
          stack: 'total',
          barWidth: '50%',
          emphasis: { focus: 'series' },
          itemStyle: { opacity: 0.75 },
          data: data.map(d => d.exploration)
        }
      ]
    };

    if (chartRef) {
      chartRef.setOption(newOptions, true);
      return null;
    }
    return newOptions;
  }
}
