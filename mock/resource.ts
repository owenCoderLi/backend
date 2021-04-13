import { Request, Response } from 'express';

const manageList = (current: number, pageSize: number) => {
  const manageListData: Array<any> = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 20 + i;
    manageListData.push({
      id: index, // id
      company: `基金管理公司${index}`, // 基金管理公司
      legal_represent: `法定代表人${index}`, // 法定代表人
      general: `总经理${index}`, // 总经理
      reg_capital: `${Math.floor(Math.random() * 4) + 1}万`, // 注册资本
      reg_date: '2020-10-12', // 成立日期
      deadline: '2020-12-12', // 存续截止日
      code: `2321${Math.round(Math.random() * 20 + 18)}`, // 基金代码
      fund_name: `基金名称${index}`, // 基金名称
      user_name: `姓名${index}`, // 姓名
      is_office: Math.floor(Math.random() * 2) + 1, // 是否在任
      arrival_date: '2020-12-22', // 到任日期
      leave_date: '2020-12-23', // 离职日期
      stay_count: `${Math.round(Math.random() * 20 + 18)}`, // 在职天数
      growth_rate: `${Math.round(Math.random() * 10 + 14)}`, // 任职期基金净值增长
      is_register: Math.round(Math.random() * 4 + i), // 注册用户
    });
  }
  return manageListData;
};

const positionList = (current: number, pageSize: number) => {
  const positionListData: Array<any> = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 20 + i;
    positionListData.push({
      id: index, // id
      fund_name: `基金名称${index}`, // 基金名称
      fund_code: `2512${Math.round(Math.random() * 10 + 14)}`, // 基金代码
      sec_name: `证券名称${index}`, // 证券名称
      sec_code: `6122${Math.round(Math.random() * 10 + 14)}`, // 证券代码
      hold_count: `${Math.round(Math.random() * 10 + 14)}`, // 持股数量
      market_value: Math.round(Math.random() * 10 + 4), // 市值
      net_rate: `${Math.round(Math.random() * 10 + 14)}.${Math.round(Math.random() * 4 )}`, // 占资产净值比例
      report_date: '2021-01-01', // 报告日期

      name: `姓名${index}`, // 姓名
      gender: Math.round(Math.random() * 2), // 性别
      educate: `学历${index}`, // 学历
      pratice_organize: `执业机构${index}`, // 执业机构
      pratice_job: `执业岗位${index}`, // 执业岗位
      certificate_no: '291283818238182', // 证书编号
      certificate_date: '2020-12-21', // 证书取得日期
      certificate_expire: '2020-12-26', // 证书有效期
      is_link: Math.round(Math.random() * 2), // 关联状态
      is_effective: Math.round(Math.random() * 2), // 是否有效
    });
  }
  return positionListData;
}

const productList = (current: number, pageSize: number) => {
  const productListData: Array<any> = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 20 + i;
    productListData.push({
      id: index, // id
      fund_name: `基金名称${index}`, // 基金名称
      fund_code: `2512${Math.round(Math.random() * 10 + 14)}`, // 基金代码
      fund_company: `基金管理公司${index}`, // 基金管理公司
      fund_manager: `基金经理${index}`, //基金经理
      cur_size: Math.round(Math.random() * 2), // 最新规模
      fund_type: Math.round(Math.random() * 2), // 基金类型
      name: `投资者名称${index}`, // 投资者名称
      type: Math.round(Math.random() * 2), // 投资者类型
      email: `owenli@yuediaoyan.com`, // 邮箱
    });
  }
  return productListData;
}

const privateList = (current: number, pageSize: number) => {
  const productListData: Array<any> = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 20 + i;
    productListData.push({
      id: index, // id
      org_name: `机构名称${index}`, // 机构名称
      user_name: `姓名${index}`, // 姓名
      category: `管理类别${index}`, // 管理类别
      reg_city: `注册城市${index}`, // 注册城市
      reg_no: `登记编号${index}`, // 登记编号
      staff_count: `108`, // 员工人数
      user_count: `12${Math.round(Math.random() * 10 + 14)}`, // 用户数量
      reg_address: `注册地址${index}`, // 注册地址
      office_address: `办公地址${index}`, // 办公地址
      aseet_size: `12${Math.round(Math.random() * 10 + 14)}`, // 资产规模
      self_asset: Math.round(Math.random() * 10 + 14), // 自主发行产品规模
      counselor_size: Math.round(Math.random() * 15 + 14), // 顾问管理产品规模
      pro_name: `基金名称${index}`, // 基金名称
      pri_name: `私募基金管理人名称${index}`, // 私募基金管理人名称
      host_name: `托管人名称${index}`, // 托管人名称
      pro_type: `管理类型${index}`, // 管理类型
      run_status: `运作状态${index}`, // 运作状态
      reg_date: '2020-12-21', // 成立时间
      record_date: '2020-12-21' // 备案时间
    });
  }
  return productListData;
}

let manageListData = manageList(1, 100);
let positionListData = positionList(1, 120);
let productListData = productList(1, 200);
let privateListData = privateList(1, 160);

function manageRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  let dataSource = [...manageListData].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  const result = {data: dataSource, total: 100, code: 0, msg: 'success'};
  return res.json(result);
}
function managerRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  let dataSource = [...manageListData].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  const result = {data: dataSource, total: 100, code: 0, msg: 'success'};
  return res.json(result);
}
function positionRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  let dataSource = [...positionListData].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  const result = {data: dataSource, total: 100, code: 0, msg: 'success'};
  return res.json(result);
}
function practitionerRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  let dataSource = [...positionListData].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  const result = {data: dataSource, total: 100, code: 0, msg: 'success'};
  return res.json(result);
}
function productRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  let dataSource = [...productListData].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  const result = {data: dataSource, total: 100, code: 0, msg: 'success'};
  return res.json(result);
}
function investRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  let dataSource = [...productListData].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  const result = {data: dataSource, total: 100, code: 0, msg: 'success'};
  return res.json(result);
}
function priManageRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  let dataSource = [...privateListData].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  const result = {data: dataSource, total: 100, code: 0, msg: 'success'};
  return res.json(result);
}
function priListRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  let dataSource = [...privateListData].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  const result = {data: dataSource, total: 100, code: 0, msg: 'success'};
  return res.json(result);
}

export default {
  'GET /api/resource/fund_manage_list': manageRule,
  'GET /api/resource/fund_manager_list': managerRule,
  'GET /api/resource/fund_position_list': positionRule,
  'GET /api/resource/fund_practitioner_list': practitionerRule,
  'GET /api/resource/fund_product': productRule,
  'GET /api/resource/invest_list': investRule,
  'GET /api/resource/private_manage': priManageRule,
  'GET /api/resource/private_list': priListRule
};