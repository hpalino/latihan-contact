export class Datas<T> {
  data: T;
  message: string;

  constructor(message: string, data?) {
    this.message = message;
    this.data = data;
  }
}

export class ResponseDto<T = any> {
  status: number;
  datas: Datas<T>;

  constructor(status: number, message: string, data?) {
    this.status = status;
    this.datas = new Datas<T>(message, data);
  }
}
