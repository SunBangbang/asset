// 列表
export function demoList() {
  return {
    url: 'demo/list',
    type: 'post',
    data: {
      "code": 200,
      "msg": null,
      "data": [{
          id:1,
          name:'listTest1',
          sum:30000,
          orderCreator:'张三',
          createTime:'2022-4-7 12:00:00'
      },{
          id:2,
          name:'listTest2',
          sum:5000.33,
          orderCreator:'张三',
          createTime:'2022-4-8 12:30:21'
      },{
          id:3,
          name:'listTest3',
          sum:10000,
          orderCreator:'张三',
          createTime:'2022-4-8 12:15:03'
      },{
          id:4,
          name:'listTest4',
          sum:600,
          orderCreator:'李四',
          createTime:'2022-4-8 18:23:13'
      }]
    }
  }
}

// 计划申请列表
export function PlanList() {
  return {
    url: 'plan/list',
    type: 'post',
    data: {
      "code": 200,
      "msg": null,
      "data": [{
          id:1,
          phone:'18888888888',
          project_number:'listTest1',
          project_name:'计划名称1',
          apply_date:'2022-4-7 12:00:00',
          examine_date:'2022-4-7 12:00:00',
          Role_to_be_approved:'李四',
          applicant_organisation:'南京银行',
          applicant:'超级管理员',
          problem_impact_degree:'3',
          Start_date_of_upgrade_plan:'2022-4-7',
          approval_status:'1',
          problems_of_system:'一个测试的问题系统',
          problem_description:'一个测试的问题描述',
          Boost_demand:'一个测试的提升需求',
      },{
          id:2,
          phone:'18888888888',
          project_number:'listTest2',
          project_name:'计划名称2',
          apply_date:'2022-4-7 12:00:00',
          examine_date:'2022-4-7 12:00:00',
          Role_to_be_approved:'李四',
          applicant_organisation:'南京银行',
          applicant:'超级管理员',
          problem_impact_degree:'3',
          Start_date_of_upgrade_plan:'2022-4-7',
          approval_status:'0',
          problems_of_system:'一个测试的问题系统',
          problem_description:'一个测试的问题描述',
          Boost_demand:'一个测试的提升需求',
      },{
          id:3,
          phone:'18888888888',
          project_number:'listTest3',
          project_name:'计划名称3',
          apply_date:'2022-4-7 12:00:00',
          examine_date:'2022-4-7 12:00:00',
          Role_to_be_approved:'李四',
          applicant_organisation:'南京银行',
          applicant:'超级管理员',
          problem_impact_degree:'3',
          Start_date_of_upgrade_plan:'2022-4-7',
          approval_status:'0',
          problems_of_system:'一个测试的问题系统',
          problem_description:'一个测试的问题描述',
          Boost_demand:'一个测试的提升需求',
      },{
          id:4,
          phone:'18888888888',
          project_number:'listTest4',
          project_name:'计划名称4',
          apply_date:'2022-4-7 12:00:00',
          examine_date:'2022-4-7 12:00:00',
          Role_to_be_approved:'李四',
          applicant_organisation:'南京银行',
          applicant:'超级管理员',
          problem_impact_degree:'3',
          Start_date_of_upgrade_plan:'2022-4-7',
          approval_status:'1',
          problems_of_system:'一个测试的问题系统',
          problem_description:'一个测试的问题描述',
          Boost_demand:'一个测试的提升需求',
      },{
          id:5,
          phone:'18888888888',
          project_number:'listTest5',
          project_name:'计划名称5',
          apply_date:'2022-4-7 12:00:00',
          examine_date:'2022-4-7 12:00:00',
          Role_to_be_approved:'李四',
          applicant_organisation:'南京银行',
          applicant:'超级管理员',
          problem_impact_degree:'3',
          Start_date_of_upgrade_plan:'2022-4-7',
          approval_status:'1',
          problems_of_system:'一个测试的问题系统',
          problem_description:'一个测试的问题描述',
          Boost_demand:'一个测试的提升需求',
      },{
          id:6,
          phone:'18888888888',
          project_number:'listTest6',
          project_name:'计划名称6',
          apply_date:'2022-4-7 12:00:00',
          examine_date:'2022-4-7 12:00:00',
          Role_to_be_approved:'李四',
          applicant_organisation:'南京银行',
          applicant:'超级管理员',
          problem_impact_degree:'3',
          Start_date_of_upgrade_plan:'2022-4-7',
          approval_status:'1',
          problems_of_system:'一个测试的问题系统',
          problem_description:'一个测试的问题描述',
          Boost_demand:'一个测试的提升需求',
      },{
          id:7,
          phone:'18888888888',
          project_number:'listTest7',
          project_name:'计划名称7',
          apply_date:'2022-4-7 12:00:00',
          examine_date:'2022-4-7 12:00:00',
          Role_to_be_approved:'李四',
          applicant_organisation:'南京银行',
          applicant:'超级管理员',
          problem_impact_degree:'1',
          Start_date_of_upgrade_plan:'2022-4-7',
          approval_status:'0',
          problems_of_system:'一个测试的问题系统',
          problem_description:'一个测试的问题描述',
          Boost_demand:'一个测试的提升需求',
      },{
          id:8,
          phone:'18888888888',
          project_number:'listTest8',
          project_name:'计划名称8',
          apply_date:'2022-4-7 12:00:00',
          examine_date:'2022-4-7 12:00:00',
          Role_to_be_approved:'李四',
          applicant_organisation:'南京银行',
          applicant:'超级管理员',
          problem_impact_degree:'3',
          Start_date_of_upgrade_plan:'2022-4-7',
          approval_status:'0',
          problems_of_system:'一个测试的问题系统',
          problem_description:'一个测试的问题描述',
          Boost_demand:'一个测试的提升需求',
      },]
    }
  }
}
