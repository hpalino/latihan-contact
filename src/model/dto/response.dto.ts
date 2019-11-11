export class ResponseDto<T = any> {
  message: string;
  data: T;
  status: number

  constructor(status: number, message: string, data: T = null) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
