const _ = require('lodash');

export const resolvers = {
  Query: {
    getUser:(parent:any, {emailId}: {emailId:String} , {dataSources}:{dataSources :any}, info:any) => {
      console.log(emailId)
      return dataSources.UserAPI.getUser(emailId);
    },
    getAllUsers:(parent:any, args:{args:any} , {dataSources}:{dataSources :any}, info:any) => {
      return dataSources.UserAPI.getAllUsers();
    },
  },

  Mutation:{
    signUp:(parent: any, args: any,{dataSources}:{dataSources :any}) => {
      return dataSources.UserAPI.signUp(args.emailId,args.userData);
    },

    changeUserPassword:(parent: any, args: any,{dataSources}:{dataSources :any}) => {
      return dataSources.UserAPI.changeUserPassword(args.emailId,args.password);
    },
  
  }

};
