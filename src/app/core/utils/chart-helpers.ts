export function getDayLabels(): string[] {
  const weekdayNames = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  const today = new Date().getDay();

  let dayIndex = today === 0 ? 1 : today > 5 ? 1 : today;
  const labels: string[] = [];

  for (let i = 0; labels.length < 5; i++) {
    let next = (dayIndex + i - 1) % 5;
    labels.push(i === 0 ? 'Hoje' : weekdayNames[next]);
  }

  return labels;
}
