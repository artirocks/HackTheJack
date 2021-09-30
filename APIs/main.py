from fastapi import FastAPI
import requests
import json
from typing import Any, Dict, AnyStr, List, Union
  
f = open('./database/users.json',)

data = json.load(f)
app = FastAPI()

JSONObject = Dict[AnyStr, Any]
JSONArray = List[Any]
JSONStructure = Union[JSONArray, JSONObject]

@app.get('/')
def home():
    return {"message": "welcome to the Airport Server !"}

@app.get('/users/{emailId}')
def getWeather(emailId:str):
    for userInfo in data['user']:
        if(userInfo["emailId"]==emailId):
            return userInfo

@app.get('/users')
def getWeather():
    f = open('./database/users.json',)
    data = json.load(f)
    return data["user"]

@app.post("/signup")
async def root(arbitrary_json: JSONStructure = None):
    dictionary = {}
    for i in arbitrary_json:
        encoding = 'utf-8'
        key = i.decode("utf-8") 
        a = {key:arbitrary_json[i]}
        dictionary[key] = arbitrary_json[i]
    print(dictionary)
    json_object = json.dumps(dictionary, indent = 4) 
    print(json_object)
    f = open('./database/users.json',)
    data = json.load(f)
    data['user'].append(dictionary)
    a_file = open("./database/users.json", "w")
    json.dump(data, a_file)
    a_file.close()
    return {"received_data": arbitrary_json}

    
    
    

@app.put('/changepassword/{emailId}/{password}')
def changeUserPassword(emailId:str,password:str):
    f = open('./database/users.json',)
    data = json.load(f)
    f.close()
    for userInfo in data['user']:
        if(userInfo["emailId"]==emailId):
            userInfo["password"] = password
    a_file = open("./database/users.json", "w")
    json.dump(data, a_file)
    a_file.close()
    return "Password is changed !"
