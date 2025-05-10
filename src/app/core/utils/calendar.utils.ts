export function getNextWeekdays(count: number): number[] {
  const result: number[] = [];
  const today = new Date().getDay(); // 0 (Dom) a 6 (Sab)
  let day = today === 0 ? 1 : today;

  while (result.length < count) {
    if (day >= 1 && day <= 5) result.push(day);
    day = day === 5 ? 1 : day + 1;
  }

  return result;
}
