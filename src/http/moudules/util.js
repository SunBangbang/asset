import axios from '../axios'
// 列表
export const execAction=(data)=> {
  return axios({
    url: '/data.action',
    method: 'post',
    data
  })
}
