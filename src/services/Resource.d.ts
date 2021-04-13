declare namespace Resource { // 资源数据接口管理
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

  export interface FundManageInterface { // 公募基金管理人
    id: number; // id
    company: string; // 基金管理公司
    legal_represent: string; // 法定代表人
    general: string; // 总经理
    reg_capital: string; // 注册资本
    reg_date: string; // 成立日期
    deadline: string; // 存续截止日
  }

  export interface FundManagerInterface { // 公募基金经理
    id: number; // id
    code: number; // 基金代码
    fund_name: string; // 基金名称
    user_name: string; // 姓名'
    is_office: boolean; // 是否在任
    arrival_date: string; // 到任日期
    leave_date: string; // 离职日期
    stay_count: number; // 在职天数
    growth_rate: string; // 任职期基金净值增长
    is_register: number; // 注册用户
  }

  export interface FundPositionInterface { // 公募基金持仓明细
    id: number; // id
    fund_name: string; // 基金名称
    fund_code: number; // 基金代码
    sec_name: string; // 证券名称
    sec_code: number; // 证券代码
    hold_count: number; // 持股数量
    market_value: number; // 市值
    net_rate: string; // 占资产净值比例
    report_date: string; // 报告日期
  }

  export interface FundPractitionerInterface { // 公募基金从业人员
    id: number;
    name: string; // 姓名
    gender: number; // 性别
    educate: string; // 学历
    pratice_organize: string; // 执业机构
    pratice_job: string; // 执业岗位
    certificate_no: string; // 证书编号
    certificate_date: string; // 证书取得日期
    certificate_expire: string; // 证书有效期
    is_link: number; // 关联状态
    is_effective: number; // 是否有效
  }

  export interface FundProductInterface { // 公募基金产品
    id: number; // id
    fund_code: number; // 基金代码
    fund_name: string; // 基金名称
    fund_company: string; // 基金管理公司
    fund_manager: string; //基金经理
    cur_size: number; // 最新规模
    fund_type: number; // 基金类型
  }

  export interface InvestorListInterface { // 线下投资者名录
    id: number; // id
    name: string; // 投资者名称
    type: string; // 投资者类型
    email: string; // 邮箱
  }

  export interface PrivateManageInterface { // 私募基金管理人
    org_name: string; // 机构名称
    user_name: string; // 姓名
    category: string; // 管理类别
    reg_city: string; // 注册城市
    reg_no: string; // 登记编号
    staff_count: number; // 员工人数
    user_count: number; // 用户数量
    reg_address: string; // 注册地址
    office_address: string; // 办公地址
    aseet_size: number; // 资产规模
    self_asset: number; // 自主发行产品规模
    counselor_size: number; // 顾问管理产品规模
  }

  export interface PrivateProductInterface { // 私募基金产品
    id: number; // id
    pro_name: string; // 基金名称
    pri_name: string; // 私募基金管理人名称
    host_name: string; // 托管人名称
    pro_type: string; // 管理类型
    run_status: string; // 运作状态
    reg_date: string; // 成立时间
    record_date: string; // 备案时间
  }

}