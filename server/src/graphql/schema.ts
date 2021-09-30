const { gql } = require('apollo-server');

export const typeDefs = gql`
    
    type User{
      emailId: String! 
      password: String
      passPortInfo:PassPortInfo
      visaInfo:VisaInfo
      flightInformation:FlightInformation
      checkin:CheckIn
    }

    type PassPortInfo {
      firstName:String
      lastName:String
      passPortNo:String
      nationality:String
    }

    type VisaInfo {
      controlNo:String
      dateOfExp:String
    }

    type FlightInformation {
      flightNo:String,
      source:String,
      destination:String,
      dateofFlight:String,
      Class:String
    }

    type CheckIn {
      entry:String
      security:String
      gate:String
    }

    type Query {
      getUser(emailId:String):User
      getAllUsers:[User]
    }

    type Mutation {
      signUp(emailId: String, userData: UserInput): String
      changeUserPassword(emailId: String, password: String): String
    }

    input UserInput {
      emailId: String! 
      password: String!
      passPortInfo:PassPortInfoInput
      visaInfo:VisaInfoInput
      flightInformation:FlightInformationInput
      checkin:CheckInInput
    }

    input PassPortInfoInput {
      firstName:String
      lastName:String
      passPortNo:String
      nationality:String
    }

    input VisaInfoInput {
      controlNo:String
      dateOfExp:String
    }

    input FlightInformationInput {
      flightNo:String,
      source:String,
      destination:String,
      dateofFlight:String,
      Class:String
    }

    input CheckInInput {
      entry:String
      security:String
      gate:String
    }
  `;