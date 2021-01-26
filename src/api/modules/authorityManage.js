import request from "../../utils/request"

export default {
    //获取全部系统用户
    findAllUser(data) {
        return request({
            url: "/mirage/sysUser/findAllUser",
            method: "post",
            data
        })
    },
    //获取所有的用户角色
    getRoles(data) {
        return request({
            url: "/mirage/role/getRoles",
            method: "get",
            data
        })
    },
    //添加用户
    insertUser(data) {
        return request({
            url: "/mirage/sysUser/insertUser",
            method: "post",
            data
        })
    },
    //根据用户id获取用户信息
    findUserById(data) {
        return request({
            url: "/mirage/sysUser/findUserById",
            method: "post",
            data
        })
    },
    //修改用户
    editUser(data) {
        return request({
            url: "/mirage/sysUser/editUser",
            method: "post",
            data
        })
    },
    //删除用户
    delUserById(data) {
        return request({
            url: "/mirage/sysUser/delUserById",
            method: "post",
            data
        })
    },
    //获取所有的角色
    getRoles(data) {
        return request({
            url: "/mirage/role/getRoles",
            method: "get",
            data
        })
    },
    //获取菜单列表
    getMenuList(data) {
        return request({
            url: "/mirage/menu/getMenuList",
            method: "get",
            data
        })
    },
    //添加角色
    addRole(data) {
        return request({
            url: "/mirage/role/addRole",
            method: "post",
            data
        })
    },
    //修改角色信息
    updRole(data) {
        return request({
            url: "/mirage/role/updRole",
            method: "post",
            data
        })
    },
    //删除角色
    delRole(data) {
        return request({
            url: "/mirage/role/delRole",
            method: "post",
            data
        })
    },
    //获取当前角色的菜单Id
    getCurrentRoleMenuList(data) {
        return request({
            url: "/mirage/menu/getCurrentRoleMenuList",
            method: "post",
            data
        })
    },
    //根据id查询角色详情
    getRoleById(data) {
        return request({
            url: "/mirage/role/getRoleById",
            method: "post",
            data
        })
    },
}