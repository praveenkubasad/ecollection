const auth = require("../models/auth");
const User = require("../models/user");
const Errors = require("../utils/constants").errors;
const Success = require("../utils/constants").successMessages;
const {accounts,agents} = require("../datalayer");
const Dailycollection = require("../models/dailycollection");
const TotalCollection = require("../models/tc");
const getAgetnById = require("../datalayer/agents/getById")
const moment = require('moment')
const AccountContants = require("../utils/constants").account;
const connectToDB = require("../../../core/db").connectToDB;
const getDailyCollectionById = require("../datalayer/collections/getById")
const updateDailyCollectionById = require("../datalayer/collections/updateById")
const updateTotalCollectionById = require('../datalayer/totalcollections/updateById')
const getTotalCollectionById = require("../datalayer/totalcollections/getById")
const {
    internalServerError,
    errorMessage,
    successMessage
} = require("../utils/response");
const {
    patch
} = require("../routes/auth");
const { object } = require("@hapi/joi");

module.exports.getWeeklyCollectionReports = async(req,res)=>{
    try{
        const data = req.tokenData
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setHours(0,0,0,0)
        startOfWeek.setDate(today.getDate() - today.getDay());

        const endOfWeek = new Date(today);
        endOfWeek.setHours(23,59,59,999);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        const filter = (data.role == "admin")? {agentId:data.authId}: ""
        let query={}
        if(data.role == "admin"){
            //
        }else{
            query.agentId=data.authId
            query.date={
                $gte: moment(startOfWeek).format('DD/MM/YYYY'),
                $lte: moment(endOfWeek).format('DD/MM/YYYY')
            }
        }
        let result = await TotalCollection.find(query)
        result = (result.length)?result : [result]
        const totalAmount = result.reduce((total,singleValue)=>{
            return total+ singleValue?.totalAmount
        },0)
        let obj={}
        const totalByAgent = result.reduce((acc,agent)=>{            
            acc[agent.agentId]=acc[agent.agentId] || []            
            acc[agent.agentId].push(agent)
            return acc
        },{});
      
          const weeklyReport = result.reduce((result, transaction) => {
            const { agentId, createdAt } = transaction;
            const weekNumber = getWeekNumber(new Date(createdAt));
          
            const agentEntry = result.find((entry) => entry.agent === agentId);
            if (agentEntry) {
              const weekEntry = agentEntry.weeks.find((week) => week.weekNumber === weekNumber);
              if (weekEntry) {             
                weekEntry.details.push({
                  agentId: transaction.agentId,
                  accountHolderName: transaction.accountHolderName,
                  date: transaction.date,
                  mode: transaction.mode,
                  amount: transaction.amount,
                });
                weekEntry.totalAmount += transaction.totalAmount; 
              } else {
                agentEntry.weeks.push({
                  weekNumber,
                  totalAmount: transaction.totalAmount,
                  details: [
                    {
                      agentId: transaction.agentId,
                      accountHolderName: transaction.accountHolderName,
                      date: transaction.date,
                      mode: transaction.mode,
                      amount: transaction.amount,
                    },
                  ],
                });
              }
            } else {
              result.push({
                agent: agentId,
                weeks: [
                  {
                    weekNumber,
                    totalAmount: transaction.totalAmount,
                    details: [
                      {
                        agentId: transaction.agentId,
                        accountHolderName: transaction.accountHolderName,
                        date: transaction.date,
                        mode: transaction.mode,
                        //amount: transaction.totalAmount,
                      },
                    ],
                    // Initialize totalAmount with the current amount
                  },
                ],
              });
            }
          
            return result;
          }, []);
          

        return res.status(200).json({
            status: Success.SUCCESS,
            totalAmount:(totalAmount)?totalAmount:0,
            message: weeklyReport
        });

    }catch(error){
        internalServerError(res, error);
    }
}

module.exports.getMonthlyCollectionReports = async(req,res)=>{
  const year = 2023
  const month = 7
  const startDate = new Date(Date.UTC(year, month - 1, 1));

  // Create a Date object representing the start of the next month
  const endDate = new Date(Date.UTC(year, month, 1));

  try {
    // Query the database using Mongoose
    const transactions = await TotalCollection.find({
      //agentId: agentId,
      createdAt: {
        $gte: startDate, // Greater than or equal to the start of the month
        $lt: endDate,    // Less than the start of the next month
      },
    });
    const data =transactions /* Your JSON data here */;

// Helper function to get the month and year for a given date
const getMonthNumber = (date) => {
  const month = date.getMonth() + 1; // Month is zero-based, so adding 1 to get the actual month number
  const year = date.getFullYear();
  return `${month}/${year}`;
};

// Group transactions by agentId and month
const monthlyReport = data.reduce((result, transaction) => {
  const { agentId, createdAt } = transaction;
  const monthNumber = getMonthNumber(new Date(createdAt));

  const agentEntry = result.find((entry) => entry.agent === agentId);
  if (agentEntry) {
    const monthEntry = agentEntry.months.find((month) => month.monthNumber === monthNumber);
    if (monthEntry) {
      monthEntry.details.push({
        agentId: transaction.agentId,
        accountHolderName: transaction.accountHolderName,
        date: transaction.date,
        mode: transaction.mode,
        amount: transaction.amount,
      });
      monthEntry.totalAmount += transaction.amount; // Add the amount to the totalAmount
    } else {
      agentEntry.months.push({
        monthNumber,
        details: [
          {
            agentId: transaction.agentId,
            accountHolderName: transaction.accountHolderName,
            date: transaction.date,
            mode: transaction.mode,
            amount: transaction.amount,
          },
        ],
        totalAmount: transaction.amount, // Initialize totalAmount with the current amount
      });
    }
  } else {
    result.push({
      agent: agentId,
      months: [
        {
          monthNumber,
          details: [
            {
              agentId: transaction.agentId,
              accountHolderName: transaction.accountHolderName,
              date: transaction.date,
              mode: transaction.mode,
              amount: transaction.amount,
            },
          ],
          totalAmount: transaction.amount, // Initialize totalAmount with the current amount
        },
      ],
    });
  }

  return result;
}, []);

console.log(monthlyReport);

    //return transactions;
    return res.status(200).json({
      status: Success.SUCCESS,
     // totalAmount:(totalAmount)?totalAmount:0,
      message: monthlyReport
  });
  }catch(error){
    internalServerError(res, error);
  }

}

const getSum=(total,num)=>{
    return total.totalAmount+num.totalAmount
}

const getWeekNumber = (date) => {
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay() + 1); // Set to Monday of the week
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6); // Set to Sunday of the week
  
    return `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`;
  };

