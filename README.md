# Deploy An Automated Checkin l System
In this code we have leveraged blockchain technology and biometrics to automate a passport control system.

This is achieved here by tracking the status of a traveller, and storing all related updates on a blockchain ledger. As users go through each flight checkpoint, such as retrieving their ticket, checking in to security, etc, the application will receive some biometric data, such as an image of their face, iris, or fingerprint. The biometric data is then validated, and the check-in event is then stored on a blockchain.

<img src="">

# Steps

1. [Provision Cloud Services](#1-provision-cloud-services)
2. [Clone Git Repository](#2-clone-git-repository)
3. [Package Smart Contract](#3-package-smart-contract)
4. [Deploy Blockchain Ledger](#4-deploy-blockchain-ledger)
5. [Deploy Facial Comparison Service](#5-deploy-facial-comparison-service)
6. [Deploy Node.js application](#6-deploy-cloud-services)

## Install Prerequisites:

### Node.js + NPM
If expecting to run this application locally, please continue by installing [Node.js](https://nodejs.org/en/) runtime and NPM. We'd suggest using [nvm](https://github.com/creationix/nvm) to easily switch between node versions, which can be done with the following commands.


<!-- ### GoLang
Golang is a programming language we'll use to write "smart contracts". Smart contracts are essentially functions that can be used to query and update the ledger.

Golang can be installed by visiting the following [link](https://golang.org/dl/), and downloading the package for your operating system.

On OS X, we can install go by downloading and selecting the `.pkg` file, and click through the prompt. If using Linux, we can install go by downloading the `.tar.gz` file and extracting it to `/usr/local`

```
tar -C /usr/local -xzf go*tar.gz
```

By default, the "GOPATH" environment variable should be set to `$HOME/go`. Set this `GOPATH` variable in your `~/.bash_profile`.
```
GOPATH=$HOME/go
``` -->

## 1. Provision Cloud Services
Navigate to the following links to provision each service. The free "Lite" plan will suffice for this demonstration.

- [Cloudant](https://cloud.ibm.com/catalog/services/cloudant)
- [Kubernetes](https://cloud.ibm.com/kubernetes/catalog/cluster)


## 2. Clone Git Repository
```
git clone
```


## 3. Package Smart Contract

We have used VSCode via a graphic interface. 

These smart contracts are written in Golang, so the source code for the smart contracts will need to be copied to the src folder in your `GOPATH`. This can be done like so.
```
mkdir -p $GOPATH/src/github.com/JackTheHack
cp chaincode/*go $GOPATH/src/github.com/JackTheHack/
```

After this step, there should be several `.go` files in the directory, we can confirm with a `ls` command like so
```
ls $GOPATH/src/github.com/JackTheHack
airexit_chaincode.go airexit_chaincode_certs.go
```

- Open VS Code

- In the menu, Click "File" and then "Open" (Or press CMD + O). Navigate to the directory where your `GOPATH` directory is set (this should default to `~/go`), and select the directory at `$GOPATH/src/github.com/JackTheHack`

- Press "F1", and choose the option "IBM Blockchain Platform"

- Select the language as Go and paste the contract code in generated chain code.

- In the "Smart Contract Packages" section, Click on three dots and select Package Open Project.

- Select the packaging output format as .cds

- In the "Smart Contract Packages" section, right click on the newly generated smart contract, and then click "export" to save the generate chaincode as a `.cds` file. Keep note of the directory, as we'll need to reference it later.

## 4. Deploy a Blockchain Network

We'll then need to deploy an Hyperledger network. This is done by provisioning each component in a docker container, and running configuration scripts to create and join a peer and channel. 

<!--
A local Hyperledger Fabric network can be deployed by running the following commands.
```
cd local
./startFabric.sh
```

After the network is up and running, we'll need to install the "Smart Contracts" / "Chaincode", which are a series of functions that have the ability to modify the ledger. This is done by copying the source code into the cli container, and then running `peer chaincode install` and `peer chaincode instantiate` to activate the chaincode. These commands can be executed by running the included script below.

```
./installChaincode.sh
``` -->

We can use the Hyperledger fabric scripts to provision a network like so.
```
cd local
./startFabric.sh

# confirm hyperledger containers are up and running
docker ps
```

Next, we'll need to install the "Smart Contracts" / "Chaincode", which are a series of functions that have the ability to modify the ledger. This is done by copying the source code into the cli container, and then running `peer chaincode install` and `peer chaincode instantiate` to activate the chaincode.

```
./installChaincode.sh
```

The install script should result in the following output. Confirm that all status codes have the value of "200" and "OK"

<!-- After the chaincode has been installed, we can run a sample chaincode invocation to confirm things are configured properly. This can be done by using the `docker exec` command, and providing arguments to target our hyperledger network and invoke the `read_everything` function. This should return a 200 status code and a JSON object with `products`, `retailer`, and `regulator` keys.

```
docker exec cli peer chaincode invoke -o orderer.example.com:7050 -C mychannel -n food -c '{"Args":["read_everything"]}'
``` -->

## 5. Deploy Facial Comparison Service
To validate a passenger's biometric identity, we can simply start the service in a docker container like so

```
docker run -it -p 9000:9000 kkbankol/face_recognition python ~/face_recognition/server.py
```

This will start a Flask server that accepts images via a POST request, and has the ability to compare two facial images using the [facial_recognition](https://github.com/ageitgey/face_recognition) library.

Once the container is up, we can test the facial comparison service with curl.

We'll start by submitting a picture to be registered with the service. Note the number at the end of the register endpoint is the passport number or driver's license ID.
```
curl -X POST localhost:9000/register/1234 -F "file=@${image_path}"
```
And then comparing a different image like so
```
curl -X POST localhost:9000/compare/1234 -F "file=@${compared_image_path}"
```

If a similar facial structure is detected, we'll get a HTTP `200 OK` response, also with a payload `{'message':'faces match'}`

Otherwise, we'll get a `406 NOT ACCEPTABLE` response, with the payload `{'message':'faces do not match'}`

In a separate tab, you can run `docker logs $(docker ps -lq)` to view the logs of the latest container. The logs should look like so
```
request payload received
comparing faces
face_distance
[0.34975307]
```

The "face_distance" value is the primary score here, and the lower the score, the closer the match. The library author suggests a threshold of about 0.6.

## 6. Deploy Node.js application
Install frontend dependencies
Start frontend server
Install backend dependencies
Start backend server
```
export DB_TEST_CREDENTIALS=https://{CLOUDANT_DB_ENDPOINT}
export DEPLOY_TYPE=local
node server.js
```

Now, we can begin simulating the following stages of a passenger checking in to their flight.

- Check in, retrieve flight ticket
- Security
- Board plane at Gate

Each of these steps will be saved as an "event" on the blockchain ledger, which will reference the Traveller information and their picture at each checkpoint.

We can begin the simulation by navigating to the "Check In" section. This view renders a WebCam with facial tracking. Once the traveller's face is centered, they can select the "Capture" button. This will take a photograph, trim the background, and store that check in information on the blockchain.

This same process can be repeated for both the security check-in and the boarding gate.

Authorized airport employees can also see a high level overview of passenger checkins in the "Monitor" view.


Behind the scenes, these events can be validated by smart contracts on the ledger. For example, we have a smart contract defined here titled `verify_traveller_status`. This should be triggered once a user is checking in to the airport.

