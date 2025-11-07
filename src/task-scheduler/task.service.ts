import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  @Cron('10 * * * * *')
  handleCron() {
    console.log('Cron job executed at second 10');
  }
  @Interval(10000)
  handleInterval() {
    console.log('Called every 10 seconds');
  }

  @Timeout(50000)
  handleTimeout() {
    console.log('Called once after 50 seconds');
  }
}
