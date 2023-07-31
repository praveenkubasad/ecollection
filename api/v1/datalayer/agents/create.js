const Accounts = require("../../models/accounts");
const Users = require("../../models/user")

const create = async(userObj)=>{
    const agent = new Users(userObj)

    await agent.save()
    return agent.toObject();

}

module.exports = create;