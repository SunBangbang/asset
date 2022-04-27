export default {
    state: {
        perms: [
          "0d5464db-450f-4846-8c4f-188985dbd608:新增", 
          "0d5464db-450f-4846-8c4f-188985dbd608:编辑", 
          "0d5464db-450f-4846-8c4f-188985dbd608:删除", 
          "0d5464db-450f-4846-8c4f-188985dbd608:批量删除", 
          "0d5464db-450f-4846-8c4f-188985dbd608:查询"
        ],  // 用户权限标识集合
    },
    getters: {
   
    },
    mutations: {
        setPerms(state, perms){  // 用户权限标识集合
            state.perms = perms;
        }
    },
    actions: {
    }
}