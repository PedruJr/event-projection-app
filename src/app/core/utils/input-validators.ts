export function blockInvalidKeys(event: KeyboardEvent) {
  const invalidKeys = ['-', '+', 'e', 'E', '.', ',', '0'];
  if (invalidKeys.includes(event.key)) {
    event.preventDefault();
  }
}
