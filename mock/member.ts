import { Request, Response } from 'express';
import {SearchParamInterface, MemberListInterface} from '@/services/Member.d';

const searchList = (current: number, pageSize: number) => {
  const searchListDataSource: SearchParamInterface[] = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 20 + i;
    searchListDataSource.push({
      id: index,
      name: `Name ${index}`,
      register: new Date(),
      organization: `机构 - ${index}`,
      status: Math.floor(Math.random() * 4) + 1,
      job: `职位 - ${index}`,
      phone: `192930${index}9399`
    });
  }
  // searchListDataSource.reverse();
  return searchListDataSource;
};

const identityList = (current: number, pageSize: number) => {
  const identityListDataSource: MemberListInterface[] = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 20 + i;
    identityListDataSource.push({
      id: index,
      name: `Name ${index}`,
      register: new Date(),
      organization: `机构 - ${index}`,
      status: Math.floor(Math.random() * 4) + 1,
      realStatus: Math.floor(Math.random() * 4) + 1,
      faceStatus: Math.floor(Math.random() * 4) + 1,
      assetStatus: Math.floor(Math.random() * 4) + 1,
    });
  }
  // identityListDataSource.reverse();
  return identityListDataSource;
};

let identityListDataSource = identityList(1, 200);
let searchListData = searchList(1, 100);
// function postRule(req: Request, res: Response, u: string, b: Request) {
//   let realUrl = u;
//   if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
//     realUrl = req.url;
//   }
//   const body = (b && b.body) || req.body;
//   const { method, name, desc, key } = body;
//   switch (method) {
//     case 'delete':
//       tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.key) === -1);
//       break;
//     case 'post':
//       (() => {
//         const i = Math.ceil(Math.random() * 10000);
//         const newRule = {
//           key: tableListDataSource.length,
//           href: 'https://ant.design',
//           avatar: [
//             'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
//             'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
//           ][i % 2],
//           name,
//           owner: '曲丽丽',
//           desc,
//           callNo: Math.floor(Math.random() * 1000),
//           status: Math.floor(Math.random() * 10) % 2,
//           updatedAt: new Date(),
//           createdAt: new Date(),
//           progress: Math.ceil(Math.random() * 100),
//         };
//         tableListDataSource.unshift(newRule);
//         return res.json(newRule);
//       })();
//       return;

//     case 'update':
//       (() => {
//         let newRule = {};
//         tableListDataSource = tableListDataSource.map((item) => {
//           if (item.key === key) {
//             newRule = { ...item, desc, name };
//             return { ...item, desc, name };
//           }
//           return item;
//         });
//         return res.json(newRule);
//       })();
//       return;
//     default:
//       break;
//   }
//   const result = {
//     list: tableListDataSource,
//     pagination: {
//       total: tableListDataSource.length,
//     },
//   };
//   res.json(result);
// }

function searchRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  let dataSource = [...searchListData].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  const result = {
    data: dataSource,
    total: 100,
    code: 0,
    msg: 'success'
  };
  return res.json(result);
}

function identityRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  let dataSource = [...identityListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  const result = {
    data: dataSource,
    total: 200,
    code: 0,
    msg: 'success',
  };
  return res.json(result);
}

function provinceRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const dataSource = [
    {province_id: 1, province_name: "北京市"}, {province_id: 2, province_name: "天津市"}, {province_id: 3, province_name: "上海市"},
    {province_id: 4, province_name: "重庆市"}, {province_id: 5, province_name: "河北省"}, {province_id: 6, province_name: "山西省"},
    {province_id: 7, province_name: "台湾省"}, {province_id: 8, province_name: "辽宁省"}, {province_id: 9, province_name: "吉林省"},
    {province_id: 10, province_name: "黑龙江省"}, {province_id: 11, province_name: "江苏省"}, {province_id: 12, province_name: "浙江省"},
    {province_id: 13, province_name: "安徽省"}, {province_id: 14, province_name: "福建省"}, {province_id: 15, province_name: "江西省"},
    {province_id: 16, province_name: "山东省"}, {province_id: 17, province_name: "河南省"}, {province_id: 18, province_name: "湖北省"},
    {province_id: 19, province_name: "湖南省"}, {province_id: 20, province_name: "广东省"}, {province_id: 21, province_name: "甘肃省"},
    {province_id: 22, province_name: "四川省"}, {province_id: 23, province_name: "贵州省"}, {province_id: 24, province_name: "海南省"},
    {province_id: 25, province_name: "云南省"}, {province_id: 26, province_name: "青海省"}, {province_id: 27, province_name: "陕西省"},
    {province_id: 28, province_name: "广西壮族自治区"}, {province_id: 29, province_name: "西藏自治区"}, {province_id: 30, province_name: "宁夏回族自治区"},
    {province_id: 31, province_name: "新疆维吾尔自治区"}, {province_id: 32, province_name: "内蒙古自治区"}, {province_id: 33, province_name: "澳门特别行政区"},
    {province_id: 34, province_name: "香港特别行政区"}
  ]
  const result = {
    data: dataSource,
    code: 0,
    msg: 'success'
  };
  return res.json(result);
}

function cityRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const dataSource = [
    {city_id: 144, city_name: "广州市"}, {city_id: 238, city_name: "深圳市"}, {city_id: 263, city_name: "珠海市"},
    {city_id: 213, city_name: "汕头市"}, {city_id: 373, city_name: "韶关市"}, {city_id: 37, city_name: "佛山市"},
    {city_id: 215, city_name: "江门市"}, {city_id: 245, city_name: "湛江市"}, {city_id: 296, city_name: "茂名市"},
    {city_id: 289, city_name: "肇庆市"}, {city_id: 164, city_name: "惠州市"}, {city_id: 204, city_name: "梅州市"},
    {city_id: 214, city_name: "汕尾市"}, {city_id: 220, city_name: "河源市"}, {city_id: 358, city_name: "阳江市"},
    {city_id: 239, city_name: "清远市"}, {city_id: 10, city_name: "东莞市"},{city_id: 13, city_name: "中山市"},
    {city_id: 252, city_name: "潮州市"},{city_id: 171, city_name: "揭阳市"},{city_id: 30, city_name: "云浮市"}
  ]
  const result = {
    data: dataSource,
    code: 0,
    msg: 'success'
  }
  return res.json(result);
}

function industryRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const dataSource = [
    {industry_id: "S11", industry_name: "农林牧渔"}, {industry_id: "S21", industry_name: "采掘"}, {industry_id: "S22", industry_name: "化工"},
    {industry_id: "S23", industry_name: "钢铁"}, {industry_id: "S24", industry_name: "有色金属"}, {industry_id: "S27", industry_name: "电子"},
    {industry_id: "S28", industry_name: "汽车"}, {industry_id: "S33", industry_name: "家用电器"}, {industry_id: "S34", industry_name: "食品饮料"},
    {industry_id: "S35", industry_name: "纺织服装"}, {industry_id: "S36", industry_name: "轻工制造"}, {industry_id: "S37", industry_name: "医药生物"},
    {industry_id: "S41", industry_name: "公用事业"}, {industry_id: "S42", industry_name: "交通运输"}, {industry_id: "S43", industry_name: "房地产"},
    {industry_id: "S45", industry_name: "商业贸易"}, {industry_id: "S46", industry_name: "休闲服务"}, {industry_id: "S48", industry_name: "银行"},
    {industry_id: "S49", industry_name: "非银金融"}, {industry_id: "S51", industry_name: "综合"}, {industry_id: "S61", industry_name: "建筑材料"},
    {industry_id: "S62", industry_name: "建筑装饰"}, {industry_id: "S63", industry_name: "电气设备"}, {industry_id: "S64", industry_name: "机械设备"},
    {industry_id: "S65", industry_name: "国防军工"}, {industry_id: "S71", industry_name: "计算机"},
    {industry_id: "S72", industry_name: "传媒"}, {industry_id: "S73", industry_name: "通信"}
  ]
  const result = {
    data: dataSource,
    code: 0,
    msg: 'success'
  }
  return res.json(result);
}

function stockRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const dataSource = [
    {stock_code: "300001", stock_name: "特锐德"}, {stock_code: "300002", stock_name: "神州泰岳"},
    {stock_code: "300003", stock_name: "乐普医疗"}, {stock_code: "300004", stock_name: "南风股份"},
    {stock_code: "300005", stock_name: "探路者"}, {stock_code: "300006", stock_name: "莱美药业"},
    {stock_code: "300007", stock_name: "汉威科技"}, {stock_code: "300008", stock_name: "天海防务"},
    {stock_code: "300009", stock_name: "安科生物"}, {stock_code: "300010", stock_name: "立思辰"}
  ]
  const result = {
    data: dataSource,
    code: 0,
    msg: 'success'
  }
  return res.json(result);
}

export default {
  'GET /api/member/identity': identityRule,
  'GET /api/member/search': searchRule,
  'GET /api/dictionary/provinces': provinceRule,
  'GET /api/dictionary/cities': cityRule,
  'GET /api/dictionary/industries': industryRule,
  'GET /api/dictionary/stocks': stockRule
};
