import { Controller, Get, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { parse } from 'url';
// import { JwtAuthGuard } from '../core/guard/jtw.guard';

import { ViewService } from './view.service';

@Controller('/')
export class ViewController {
  constructor(private viewService: ViewService) {}

  async handler(req: Request, res: Response) {
    const parsedUrl = parse(req.url, true);
    await this.viewService.getNextServer().render(req, res, parsedUrl.pathname, parsedUrl.query);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  public async showProfile(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }

  @Get('_next*')
  public async assets(@Req() req: Request, @Res() res: Response) {
    const parsedUrl = parse(req.url, true);
    await this.viewService.getNextServer().render(req, res, parsedUrl.pathname, parsedUrl.query);
  }

  @Get('*')
  public async showHome(@Req() req: Request, @Res() res: Response) {
    const parsedUrl = parse(req.url, true);

    await this.viewService.getNextServer().render(req, res, parsedUrl.pathname, parsedUrl.query);
  }
}
