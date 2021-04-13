declare namespace Base { // 基础数据接口管理

  export interface ListRequestType { // 列表请求状态
    code: number;
    msg: string;
    total: number;
    data: T;
  }

  export interface ResponseType { // 操作类请求状态
    code: number;
    msg: string;
  }

  export interface OrganizeInterface { // 机构接口
    id: number; // id
    number: string; // 编号
    fund_name: string; // 基金名称
    reg_no: string; // 登记编号
    found_date: string; // 成立时间
    reg_date: string; // 注册时间
    reg_address: string; // 注册地址
    staff: number; // 员工人数
    fund_type: number; // 基金类型
    issue: number; // 自主发行规模
    manage: number; // 管理产品规模
    legal_represent: string; //法定代表人
    reg_capital: string; // 注册资本
  }

  export interface IndustryInterface { // 行业接口
    industry_id: string; // 行业id
    industry_name: string; // 行业名称
    industry_type: number; // 行业分类
  }

  export interface StockInterface { // 股票代码接口
    id: number; // id
    code: string; // 代码
    name: string; // 名称
    shorthand: string; // 简写
    addtime: string; // 添加时间
    fullName: string; // 全称
    address: string; // 地址
    work_address: string; // 工作地址
    telephone: string; // 联系方式
    email: string; // 邮箱
    capital_all: number; // 总股本
    capital_it: number; // 流通股本
  }
}
