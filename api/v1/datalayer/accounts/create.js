const Accounts = require("../../models/accounts");

const create = async(userObj)=>{
    const account = new Accounts(userObj)
    await account.save()
    return account.toObject();

}

module.exports = create;