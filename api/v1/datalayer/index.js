
const accounts={
    getById: require("./accounts/getById"),
    create: require("./accounts/create"),
    updateById: require("./accounts/updateById")
}

const agents = {
    getById: require("./accounts/getById"),
    create: require("./accounts/create"),
    updateById: require("./accounts/updateById")
}

const connections = {
    getConnection : require('./connections/connection')
}
module.exports={
    accounts,
    agents,
    connections
}