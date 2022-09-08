import { Injectable } from '@nestjs/common';
import { SNSRepository } from './sns.repository';

@Injectable()
export class SNSService {
  constructor(private snsRepo: SNSRepository) {}

  async getSubs(body) {
    return await this.snsRepo.subscribeWithEmail(body);
  }

  async getPub(body) {
    return await this.snsRepo.publishMessage(body);
  }
  async getList() {
    return await this.snsRepo.getList();
  }
}
