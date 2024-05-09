/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Logger, Param, Post, Req } from '@nestjs/common';
import { 디시인사이드 } from './community/디시인사이드';
import { 개드립 } from './community/개드립';
import { TASK_MAP } from './task.constant';
import { 네이트판 } from './community/네이트판';
import { 루리웹 } from './community/루리웹';
import { 뽐뿌 } from './community/뽐뿌';
import { 에펨코리아 } from './community/에펨코리아';
import { 오늘의유머 } from './community/오늘의유머';
import { 웃긴대학 } from './community/웃긴대학';
import { 인스티즈 } from './community/인스티즈';
import { 클리앙 } from './community/클리앙';
import { 엠엘비파크 } from './community/엠엘비파크';
import { 연합뉴스 } from './news/연합뉴스';

@Controller('task')
export class TasksController {
  logger = new Logger('컨트롤러');

  constructor(
    // 커뮤니티
    private readonly _디시인사이드: 디시인사이드,
    private readonly _개드립: 개드립,
    private readonly _네이트판: 네이트판,
    private readonly _루리웹: 루리웹,
    private readonly _뽐뿌: 뽐뿌,
    private readonly _에펨코리아: 에펨코리아,
    private readonly _오늘의유머: 오늘의유머,
    private readonly _웃긴대학: 웃긴대학,
    private readonly _인스티즈: 인스티즈,
    private readonly _클리앙: 클리앙,
    private readonly _엠엘비파크: 엠엘비파크,

    // 뉴스
    private readonly _연합뉴스: 연합뉴스,
  ) {}

  @Post(':id')
  async start(@Param('id') id: string) {
    switch (id) {
      // 커뮤니티
      case TASK_MAP.디시인사이드.name:
        await this._디시인사이드.run();
        break;
      case TASK_MAP.개드립.name:
        await this._개드립.run();
        break;
      case TASK_MAP.네이트판.name:
        await this._네이트판.run();
        break;
      case TASK_MAP.루리웹.name:
        await this._루리웹.run();
        break;
      case TASK_MAP.뽐뿌.name:
        await this._뽐뿌.run();
        break;
      case TASK_MAP.에펨코리아.name:
        await this._에펨코리아.run();
        break;
      case TASK_MAP.오늘의유머.name:
        await this._오늘의유머.run();
        break;
      case TASK_MAP.웃긴대학.name:
        await this._웃긴대학.run();
        break;
      case TASK_MAP.인스티즈.name:
        await this._인스티즈.run();
        break;
      case TASK_MAP.클리앙.name:
        await this._클리앙.run();
        break;
      case TASK_MAP.엠엘비파크.name:
        await this._엠엘비파크.run();
        break;
      //뉴스
      case TASK_MAP.연합뉴스.name:
        await this._연합뉴스.run();
        break;
    }
    return true;
  }

  @Post('job/all')
  async startAll() {
    try {
      await this.execute('디시인사이드', await this._디시인사이드.run());
      // await this.execute('개드립', await this._개드립.run());
      await this.execute('네이트판', await this._네이트판.run());
      await this.execute('루리웹', await this._루리웹.run());
      await this.execute('뽐뿌', await this._뽐뿌.run());
      await this.execute('에펨코리아', await this._에펨코리아.run());
      await this.execute('오늘의유머', await this._오늘의유머.run());
      await this.execute('웃긴대학', await this._웃긴대학.run());
      await this.execute('인스티즈', await this._인스티즈.run());
      await this.execute('클리앙', await this._클리앙.run());
      await this.execute('엠엘비파크', await this._엠엘비파크.run());
    } catch (e) {
      console.log(e);
    }
    return true;
  }

  async execute(job, func) {
    const start = Date.now();
    const duration = 1 * 60 * 1000; // 1분식
    let intervalId;
    let elapsedTime = 0;
    try {
      await func;
      intervalId = setInterval(() => {
        elapsedTime = Date.now() - start;
        this.logger.debug(`지난시간 ${job}: ${elapsedTime}`);
        if (elapsedTime >= duration) {
          throw new Error('Go To Next');
        }
      }, 1000);
    } catch (e) {
      this.logger.debug(`${job}next`);
      clearInterval(intervalId);
    } finally {
      clearInterval(intervalId);
    }
  }
}
