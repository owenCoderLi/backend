import { Request, Response } from 'express';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/user/info': (req: Request, res: Response) => {
    const {headers} = req;
    if(headers['x-apihub-token']) {
      res.send({
        code: 0, msg: 'success',
        data: {name: 'owen li', userid: '000012', mobile: '13929377188'}
      });
    } else {
      res.send({
        code: 2, msg: '',
        data: {name: '', userid: '', mobile: '', access: ''}
      })
    }
  },
  'POST /api/user/login': (req: Request, res: Response) => {
    const { password, phone } = req.body;
    if (password === 'admin' && phone === '13929377188') {
      res.send({
        code: 0,
        msg: 'admin login success',
        data: {access_token: 'nWpVCzompeiHNm7CjA3TeDXiHEBBQATx6c19EeMY'}
      });
    } else {
      res.send({ code: 1, msg: 'login failure', data: {} });
    }
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', success: true });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  }
};
