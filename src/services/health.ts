import { Injectable } from "@decorators/di";
import * as IHealth from '../types/health';
import axios from 'axios';
import cheerio from 'cheerio';

@Injectable()
export class HealthService {
    async list({ page }: IHealth.List) {
        try {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
            let res: IHealth.Result[] = [];
            let data = await axios({
                method: 'post',
                url: 'https://www.g-health.kr/portal/bbs/selectBoardList.do',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36',
                },
                data: `bbsId=U00186&menuNo=200461&lang=&vType=A&pageIndex=${page}&searchCndSj=1&earchCndCt=1&searchWrd=`,
            });
            let $ = cheerio.load(data.data);
            $('tbody tr td').each((i,e)=>{
                let value = $(e);
                res.push({
                    title: value.find('a').text().replace(/\t/g,'').replace(/\n/g,''),
                    date: value.find('span:nth-of-type(1)').text().substring(3).trim(),
                    url: `https://www.g-health.kr/portal/bbs/selectBoardArticle.do?bbsId=U00186&nttId=${value.find('a').attr('href')?.split("'U00186','")[1].split("','")[0]}&menuNo=200461&lang=&searchCndSj=1&searchCndCt=1&searchWrd=&pageIndex=1&vType=A`
                });
            });
            return {
                status: 'success',
                result: res,
            };
        } catch(e) {
            console.error(e);
            return {
                status: 'error',
                result: [],
            };
        }
    }

    async listPerCount({ page, count }: IHealth.ListPerCount) {
        let res: IHealth.Result[] = [];
        for(let i=1;i<=count;i++) {
            let data = await this.list({ page: (page-1)*count+i });
            res.push(...data.result);
        }
        return {
            status: 'success',
            result: res,
        };
    }
}