export class ErrorService {
  static logError(error: unknown, context: string = ''): void {
    console.error(`[Error] ${context}:`, error);
  }

  static logWarning(message: string, context: string = ''): void {
    console.warn(`[Warning] ${context}:`, message);
  }

  static userFriendlyMessage(error: unknown): string {
    return 'Algo deu errado. Tente novamente mais tarde.';
  }
}
