import { Request as IRequest, Response as IResponse } from 'express';
import {
    Request,
    Response,
    Controller,
    Get,
    Query,
} from '@decorators/express';
import { Injectable } from '@decorators/di';
import { HealthService } from '../services/health';
import HttpStatusCode from '../constants/HttpStatusCode';

@Controller('/health')
@Injectable()
export class HealthController {
    constructor(private readonly service: HealthService) {
        console.log('HealthController Attached!');
    }
    
    @Get('/')
    async list(
        @Request() req: IRequest,
        @Response() res: IResponse,
        @Query('page') page: number = 1,
    ) {
        const result = await this.service.list({
            page: page,
        });
        return res.status(HttpStatusCode.OK).json(result);
    }
    
    @Get('/listPerCount')
    async listPerCount(
        @Request() req: IRequest,
        @Response() res: IResponse,
        @Query('page') page: number = 1,
        @Query('count') count: number = 5,
    ) {
        const result = await this.service.listPerCount({
            page: page,
            count: count,
        });
        return res.status(HttpStatusCode.OK).json(result);
    }
}