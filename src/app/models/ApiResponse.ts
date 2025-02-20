import {Question} from './Question';

export class ApiResponse {
  constructor(
    public response_code: number,
    public results: Question[]
  ) {
  }
}
