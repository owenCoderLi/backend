import React, {useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import {message, Select} from 'antd';
import {useMount, useDebounceFn} from 'ahooks';
import {querySearch, queryProvince, queryCity, queryIndustry, queryStock} from '@/services/memberService';

const {Option} = Select;
let provinceList: Array<Member.OtherInterface> = [];
let industryList: Array<Member.OtherInterface> = [];

// 搜索会员
const SearchPage: React.FC<{}> = () => {
  const [cityList, setCityList] = useState<Array<Member.OtherInterface>>([]); // 城市列表
  const [searchList, setSearchList] = useState<Array<Member.OtherInterface>>([]); // 股票代码列表

  const {run} = useDebounceFn((value) => {
    handlePromiseOption(value);
  }, {wait: 500}); // 防抖优化

  // 请求省份
  const handleRequestProvince = async () => {
    const res = await queryProvince();
    if(res.code === 0) {
      provinceList = res.data;
    } else {
      message.error(res.msg);
    }
  }
  // 请求城市
  const handleRequestCity = async (id: number) => {
    const res = await queryCity(id);
    if(res.code === 0) {
      setCityList(res.data);
    } else {
      message.error(res.msg);
    }
  }
  // 请求行业
  const handleRequestIndustry = async () => {
    const res = await queryIndustry();
    if(res.code === 0) {
      industryList = res.data;
    } else {
      message.error(res.msg);
    }
  }

  // 股票代码异步获取函数
  const handlePromiseOption = async (value: string) => {
    const res = await queryStock(value);
    if(res.code === 0) {
      setSearchList(res.data);
    } else {
      message.error(res.msg);
    }
  };

  // 初次渲染
  useMount(() => {
    handleRequestIndustry();
    handleRequestProvince();
  })

  // 股票搜索结果
  const options = searchList.map(list =>
    <Option key={`${list.stock_code}`} value={`${list.stock_code}`}>
      {list.stock_name}
    </Option>
  );

  // 表格列定义
  const columns: ProColumns<Member.SearchInterface>[] = [
    {title: '用户id', dataIndex: 'id'},
    {title: '姓名', dataIndex: 'name'},
    {title: '手机号', dataIndex: 'phone', hideInTable: true},
    {title: '身份认证状态', dataIndex: 'status', hideInTable: true,
      valueEnum: {
        0: { text: '不限', status: 'Default' },
        1: { text: '认证中', status: 'Processing' },
        2: { text: '已认证', status: 'Success' },
        3: { text: '未认证', status: 'Error' },
        4: { text: '认证不通过', status: 'Error'}
      }
    },
    {title: '实名认证状态', dataIndex: 'realStatus', hideInTable: true,
      valueEnum: {
        0: { text: '不限', status: 'Default' },
        1: { text: '认证中', status: 'Processing' },
        2: { text: '已认证', status: 'Success' },
        3: { text: '未认证', status: 'Error' },
        4: { text: '认证不通过', status: 'Error'}
      }
    },
    {title: '人脸识别状态', dataIndex: 'faceStatus', hideInTable: true,
      valueEnum: {
        0: { text: '不限', status: 'Default' },
        1: { text: '认证中', status: 'Processing' },
        2: { text: '已认证', status: 'Success' },
        3: { text: '未认证', status: 'Error' },
        4: { text: '认证不通过', status: 'Error'}
      }
    },
    {title: '资产证名状态', dataIndex: 'assetStatus', hideInTable: true,
      valueEnum: {
        0: { text: '不限', status: 'Default' },
        1: { text: '认证中', status: 'Processing' },
        2: { text: '已认证', status: 'Success' },
        3: { text: '未认证', status: 'Error' },
        4: { text: '认证不通过', status: 'Error'}
      }
    },
    {title: '机构', dataIndex: 'organization'},
    {title: '职位', dataIndex: 'job'},
    {title: '省份', dataIndex: 'province', hideInTable: true,
      renderFormItem: () => (
        <Select placeholder="请选择省份" onSelect={handleRequestCity}>
          {provinceList.map((item, index) =>
            <Option key={`${item.province_id}/${index}`} value={item.province_id}>
              {item.province_name ? item.province_name : ''}
            </Option>
          )}
        </Select>
      )
    },
    {title: '城市', dataIndex: 'city', hideInTable: true,
      renderFormItem: () => {
        if(cityList.length) {
          return (
            <Select placeholder="请选择城市">
              {cityList.map((item, index) =>
                <Option key={`${item.city_id}/${index}`} value={item.city_id}>
                  {item.city_name ? item.city_name : ''}
                </Option>
              )}
            </Select>
          )
        }
        return null;
      }
    },
    {title: '所属公司', dataIndex: 'company', hideInTable: true,
      renderFormItem: () => (
        <Select showSearch defaultActiveFirstOption={false} filterOption={false} onSearch={run}>
          {options}
        </Select>
      )
    },
    {title: '关注股票', dataIndex: 'focusStock', hideInTable: true,
      renderFormItem: () => (
        <Select showSearch defaultActiveFirstOption={false} filterOption={false} onSearch={run}>
          {options}
        </Select>
      )
    },
    {title: '关注行业', dataIndex: 'focusIndustry', hideInTable: true,
      renderFormItem: () => (
        <Select placeholder="请选择行业">
          {industryList.map((item, index) =>
            <Option key={`${item.industry_id}/${index}`} value={item.industry_id}>
              {item.industry_name ? item.industry_name : ''}
            </Option>
          )}
        </Select>
      )
    },
    {title: '关注范围', dataIndex: 'focusRange', hideInTable: true,
      valueEnum: {
        0: {text: '沪深AB股'}, 1: {text: '港股'}, 2: {text: '中概股'},
        3: {text: '新三板'}, 4: {text: '上市公司定增'}, 5: {text: '大宗交易'},
        6: {text: '股权质押融资'}, 7: {text: '并购'}
      }
    },
    {title: '注册时间', dataIndex: 'register', valueType: 'date'},
    {title: '认证时间', dataIndex: 'authenticate', hideInTable: true, valueType: 'date'},
    {title: '用户类型', dataIndex: 'userType', hideInTable: true,
      valueEnum: {
        0: {text: '投资者'}, 1: {text: '分析师'}, 2: {text: '投资顾问'},
        3: {text: '上市公司高管'}, 4: {text: '财经记者'}, 5: {text: '管理员'},
        6: {text: '中介机构'}
      }
    },
    {title: '投资者类型', dataIndex: 'invType', hideInTable: true,
      valueEnum: {
        0: {text: '公募基金'}, 1: {text: '私募基金'}, 2: {text: '产业资本'},
        3: {text: '险资机构'}, 4: {text: '券商自营/资管'}, 5: {text: 'QFII/RQFII'},
        6: {text: '其他机构投资者'}, 7: {text: '高净值个人'}
      },
      renderFormItem: (_, {defaultRender}, form) => {
        const status = form.getFieldValue('userType');
        if (status !== '0') { return false; }
        return defaultRender(_);
      }
    },
    {title: '私募机构类型', dataIndex: 'orgType', hideInTable: true,
      valueEnum: {
        0: {text: '私募证券投资基金'}, 1: {text: '股权/创业投资基金'},
        2: {text: '其他投资基金'}, 3: {text: '未备案投资机构'}
      },
      renderFormItem: (_, {defaultRender}, form) => {
        const status = form.getFieldValue('invType');
        if (status !== '1') { return false; }
        return defaultRender(_);
      },
    },
    {title: '私募管理产品', dataIndex: 'invProduct', hideInTable: true,
      valueEnum: {0: {text: '否'}, 1: {text: '有'}},
      renderFormItem: (_, {defaultRender}, form) => {
        const status = form.getFieldValue('invType');
        if (status !== '1') { return false; }
        return defaultRender(_);
      },
    },
    {title: '自发产品规模', dataIndex: 'pubSize', hideInTable: true,
      valueEnum: {
        0: {text: '0-1亿'}, 1: {text: '1-10亿'}, 2: {text: '10-20亿'},
        3: {text: '20-50亿'}, 4: {text: '50亿以上'}
      },
      renderFormItem: (_, {defaultRender}, form) => {
        const status = form.getFieldValue('invType');
        if (status !== '1') { return false; }
        return defaultRender(_);
      },
    },
    {title: '顾问管理产品规模', dataIndex: 'manageSize', hideInTable: true,
      valueEnum: {
        0: {text: '0-1亿'}, 1: {text: '1-10亿'}, 2: {text: '10-20亿'},
        3: {text: '20-50亿'}, 4: {text: '50亿以上'}
      },
      renderFormItem: (_, {defaultRender}, form) => {
        const status = form.getFieldValue('invType');
        if (status !== '1') { return false; }
        return defaultRender(_);
      },
    },
    {title: '分析师行业', dataIndex: 'anaIndustry', hideInTable: true,
      renderFormItem: (_, {}, form) => {
        const status = form.getFieldValue("userType");
        if (status !== '1') {return false;}
        return (
          <Select placeholder="请选择行业">
            {industryList.map((item, index) =>
              <Option key={`${item.industry_id}/${index}`} value={item.industry_id}>
                {item.industry_name ? item.industry_name : ''}
              </Option>
            )}
          </Select>
        )
      }
    },
    {title: '首席分析师', dataIndex: 'anaChief', hideInTable: true,
      valueEnum: {0: {text: '否'}, 1: {text: '有'}},
      renderFormItem: (_, {defaultRender}, form) => {
        const status = form.getFieldValue('userType');
        if (status !== '1') { return false; }
        return defaultRender(_);
      }
    },
    {title: '分析师新财富上榜', dataIndex: 'anaNew', hideInTable: true,
      valueEnum: {0: {text: '否'}, 1: {text: '有'}},
      renderFormItem: (_, {defaultRender}, form) => {
        const status = form.getFieldValue('userType');
        if (status !== '1') { return false; }
        return defaultRender(_);
      }
    },
    {title: '中介机构类型', dataIndex: 'mediationType', hideInTable: true,
      valueEnum: {
        0: {text: '券商投行'}, 1: {text: '财务顾问'}, 2: {text: '律师事务所'},
        3: {text: '会计师事务所'}, 4: {text: '其他中介机构'}
      },
      renderFormItem: (_, {defaultRender}, form) => {
        const status = form.getFieldValue('userType');
        if (status !== '6') { return false; }
        return defaultRender(_);
      }
    },
    {title: '高管行业', dataIndex: 'comIndustry', hideInTable: true,
      renderFormItem: (_, {}, form) => {
        const status = form.getFieldValue("userType");
        if(status !== '3') {return false;}
        return (
          <Select placeholder="请选择行业">
            {industryList.map((item, index) =>
              <Option key={`${item.industry_id}/${index}`} value={item.industry_id}>
                {item.industry_name ? item.industry_name : ''}
              </Option>
            )}
          </Select>
        )
      }
    },
    {title: '高管类型', dataIndex: 'executiveType', hideInTable: true,
      valueEnum: {
        0: {text: '董事长'}, 1: {text: '总经理'}, 2: {text: '董事会秘书'},
        3: {text: '证券事务代表'}, 4: {text: '其他董监高'}, 5: {text: '证券事务专员'},
        6: {text: '投资者关系经理'}
      },
      renderFormItem: (_, {defaultRender}, form) => {
        const status = form.getFieldValue('userType');
        if (status !== '3') { return false; }
        return defaultRender(_);
      }
    },
    {title: '高管新三板', dataIndex: 'executiveThree', hideInTable: true,
      valueEnum: {0: {text: '否'}, 1: {text: '有'}},
      renderFormItem: (_, {defaultRender}, form) => {
        const status = form.getFieldValue('userType');
        if (status !== '3') { return false; }
        return defaultRender(_);
      }
    },
    {title: '高管关联资源库', dataIndex: 'executiveResource', hideInTable: true,
      valueEnum: {0: {text: '否'}, 1: {text: '有'}},
      renderFormItem: (_, {defaultRender}, form) => {
        const status = form.getFieldValue('userType');
        if (status !== '3') { return false; }
        return defaultRender(_);
      }
    },
    {title: '上市类型', dataIndex: 'comType', hideInTable: true,
      valueEnum: {
        0: {text: 'A股'}, 1: {text: 'H股'}, 2: {text: '中概股'},
        3: {text: '新三板'}, 4: {text: '台湾地区'}, 5: {text: 'B股'}
      }
    },
    {title: '身份证号', dataIndex: 'idNum', hideInTable: true,
      valueEnum: {0: {text: '未填写'}, 1: {text: '已填写'}}
    },
    {title: '私董会', dataIndex: 'private', hideInTable: true,
      valueEnum: {0: {text: '否'}, 1: {text: '是'}}
    },
    {title: '激活状态', dataIndex: 'active', hideInTable: true,
      valueEnum: {0: {text: '未激活'}, 1: {text: '已激活'}}
    },
    {title: '关联机构', dataIndex: 'associated', hideInTable: true,
      valueEnum: {0: {text: '否'}, 1: {text: '是'}}
    },
    {title: '新财富投票机构', dataIndex: 'vote', hideInTable: true,
      valueEnum: {0: {text: '否'}, 1: {text: '是'}}
    },
    {title: '排序字段', dataIndex: 'sort', hideInTable: true,
      valueEnum: {0: {text: '注册时间'}, 1: {text: '约币数'}, 2: {text: '自选股数量'}}
    },
    {title: '机器人账号', dataIndex: 'machine', hideInTable: true,
      valueEnum: {0: {text: '否'}, 1: {text: '是'}}
    },
    {title: '虚拟号', dataIndex: 'virtual', hideInTable: true,
      valueEnum: {0: {text: '否'}, 1: {text: '是'}}
    },
    {title: '操作', dataIndex: 'option', valueType: 'option',
      render: () => (
        <a href="">详情</a>
      )
    }
  ];

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        dateFormatter="string"
        headerTitle="用户列表"
        rowKey="id"
        request={(params) => querySearch(params)}
        onSubmit={(params) => querySearch(params)}
        search={{defaultCollapsed: true}} >
      </ProTable>
    </PageContainer>
  )
}

export default SearchPage;