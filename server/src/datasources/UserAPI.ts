import fetch from "node-fetch";
const { RESTDataSource } = require('apollo-datasource-rest');

class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://127.0.0.1:8000';
  }

  async getAllUsers() {
    const data = await this.get(`/users/`);
    return data;
  }

  async getUser(emailId:{emailId:String}) {
    const data = await this.get(`/users/${emailId}`);
    return data;
  }

  async signUp(emailId:{emailId:String},userData:{userData:JSON}) {
    const headers = {
      "content-type": "application/json",
    };
    const requestOptions = {
      method: "PUT",
      headers,
    };
    const res = await fetch(
      `http://localhost:8000/signup/${emailId}/${userData}`,
      requestOptions
    );
    return await res.json();
  }

  async changeUserPassword(emailId:{emailId:String},password:{password:String}) {
    const headers = {
      "content-type": "application/json",
    };
    const requestOptions = {
      method: "PUT",
      headers,
    };
    const res = await fetch(
      `http://localhost:8000/changepassword/${emailId}/${password}`,
      requestOptions
    );
    return await res.json();
  }
  
}

module.exports = UserAPI;
