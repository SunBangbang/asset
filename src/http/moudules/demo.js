import axios from '../axios'
// 列表
export const demoList=(data)=> {
  return axios({
    url: '/demo/list',
    method: 'post',
    data
  })
}

export const PlanList=(data)=> {
  return axios({
    url: '/plan/list',
    method: 'post',
    data
  })
}
