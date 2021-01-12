declare namespace Member { // 会员接口管理
  export interface SearchParamInterface { // 搜索参数接口
    status: number; // 认证状态
    phone: number; // 手机号
    name: string; // 姓名
    id: number; // 用户id
    organization: string; // 机构名称
    job: string; // 职位
    company: number; // 公司
    province: string; // 省份
    city: string; // 城市
    focusStock: number; // 关注股票
    focusIndustry: number; // 关注行业
    focusRange: number; // 关注范围
    register: Date; // 注册时间
    authenticate: Date; // 认证时间
    comType: number;// 上市类型
    userType: number;// 用户类型
    invType?: number;// 投资者-私募-投资者类型
    orgType?: number;// 投资者-私募-机构类型
    invProduct?: number;// 投资者-私募-管理产品
    pubSize?: number;// 投资者-私募-自主发行产品规模
    manageSize?: number;// 投资者-私募-顾问管理产品规模
    anaIndustry?: number;// 分析师-行业
    anaChief?: number;// 分析师-首席分析师
    anaNew?: number;// 分析师-新财富上榜
    mediationType?: number;// 中介机构-结构类型
    comIndustry?: number;// 上市公司高管-所属行业
    comType?: number;// 上市公司高管-公司类型
    executiveType?: number;// 上市公司高管-高管类型
    executiveThree?: number;// 上市公司高管-新三板高管
    executiveResource?: number;// 上市公司高管-关联资源库
    idNum: number;// 身份证号
    realStatus: number; // 身份证认证状态
    faceStatus: number; // 人脸识别状态
    assetStatus: number; // 资产证名状态
    private: number;// 私董会
    active: number;// 激活状态
    associated: number;// 关联机构
    vote: number;// 新财富投票机构
    sort: number;// 排序字段
    machine: number;// 机器人账号
    virtual: number;// 虚拟号
  }

  export interface MemberListInterface { // 认证用户列表接口
    id: number; // 用户id
    status: number; // 身份认证状态
    realStatus: number; // 身份证认证状态
    faceStatus: number; // 人脸识别状态
    assetStatus: number; // 资产证名状态
    name: string; // 姓名
    organization: string; // 机构
    phone: number; // 手机号
    idNum: number;// 身份证号
    register: Date; // 注册时间
  }

  export interface MemberDetailInterface { // 会员信息接口

  }

  export interface RequestType { // 列表请求状态
    code: number;
    msg: string;
    total?: number;
    data: T;
  }

  export interface OtherInterface { // 搜索页面非查询字段接口
    id: number;
    province_name: string;
    province_id: number;
    city_id: number;
    city_name: string;
    industry_id: number;
    industry_name: string;
    stock_name: string;
    stock_code: number;
  }
}