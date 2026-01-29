export class ApiResponse<T> {
  private data: T;
  private message: string;
  private statusCode: number = 200;

  public getData(): T {
    return this.data;
  }

  public setData(data: T): void {
    this.data = data;
  }

  public getMessage(): string {
    return this.message;
  }

  public setMessage(message: string): void {
    this.message = message;
  }

  public getStatusCode(): number {
    return this.statusCode;
  }

  public setStatusCode(statusCode: number): void {
    this.statusCode = statusCode;
  }
}
