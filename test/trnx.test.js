const axios = require('axios');
const jsonData = require('../env.json');
const fs = require('fs');
const { expect } = require('chai');
const userData = require('../users.json')

describe("User can do transaction", () => {
    before(async () => {
        var response = await axios.post(`${jsonData.baseUrl}/user/login`,
            {
                "email": "salman@roadtocareer.net",
                "password": "1234"
            },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            })
        console.log(response.data)
        let token_value = response.data.token;
        jsonData.token = token_value;
        fs.writeFileSync('env.json', JSON.stringify(jsonData))

    })

    it("Deposit 5000 TK to the Agent", async () => {
        var agentAccount = userData[userData.length - 1].Agent_phone_number;
        var response = await axios.post(`${jsonData.baseUrl}/transaction/deposit`,
            {
                "from_account":"SYSTEM",
                "to_account":agentAccount,
                "amount":5000
            },
            {

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": jsonData.token,
                    "X-AUTH-SECRET-KEY": jsonData.secretKey
                }

            }).then((res) => res.data)

        console.log(response);
        expect(response.message).contains("successful")

        var Trnx = response.trnxId;

        var transaction = {

            TrnxId: Trnx,
        }

        userData.push(transaction);

        fs.writeFileSync('users.json', JSON.stringify(userData))
        console.log("Saved!")

    })
    it("Deposit 2000 TK to the Customer", async () => {
        var agentAccount = userData[userData.length - 2].Agent_phone_number;
        var customerAccount = userData[userData.length - 3].Customer_phone_number;
        var response = await axios.post(`${jsonData.baseUrl}/transaction/deposit`,
            {
                "from_account":agentAccount,
                "to_account":customerAccount,
                "amount":2000
            },
            {

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": jsonData.token,
                    "X-AUTH-SECRET-KEY": jsonData.secretKey
                }

            }).then((res) => res.data)

        console.log(response);
        expect(response.message).contains("successful")
    })

    it("Check balance of Customer", async () => {

        var customerPhone = userData[userData.length - 3].Customer_phone_number;
        var response = await axios.get(`${jsonData.baseUrl}/transaction/balance/${customerPhone}`,
            {

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": jsonData.token,
                    "X-AUTH-SECRET-KEY": jsonData.secretKey
                }

            }).then((res) => res.data)

        console.log(response.message);
        expect(response.message).contains("User balance")
    })

    it("Check Statement by Trnx Id", async () => {

        var transactionId = userData[userData.length - 1].TrnxId;
        var response = await axios.get(`${jsonData.baseUrl}/transaction/search/${transactionId}`,
            {

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": jsonData.token,
                    "X-AUTH-SECRET-KEY": jsonData.secretKey
                }

            }).then((res) => res.data)

        console.log(response.message);
        expect(response.message).contains("Transaction list")
    })
    it("Withdraw 1000 TK by Customer", async () => {
        var agentAccount = userData[userData.length - 2].Agent_phone_number;
        var customerAccount = userData[userData.length - 3].Customer_phone_number;
        var response = await axios.post(`${jsonData.baseUrl}/transaction/withdraw`,
            {
                "from_account":customerAccount,
                "to_account":agentAccount,
                "amount":1000
            },
            {

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": jsonData.token,
                    "X-AUTH-SECRET-KEY": jsonData.secretKey
                }

            }).then((res) => res.data)

        console.log(response);
        expect(response.message).contains("successful")
        expect(response.currentBalance).equal(990)
    })

    it("Send 500 TK to another customer", async () => {
        var customerAccount = userData[userData.length - 3].Customer_phone_number;
        var response = await axios.post(`${jsonData.baseUrl}/transaction/sendmoney`,
            {
                "from_account":customerAccount,
                "to_account":"01505649131",
                "amount":500
            },
            {

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": jsonData.token,
                    "X-AUTH-SECRET-KEY": jsonData.secretKey
                }

            }).then((res) => res.data)

        console.log(response);
        expect(response.message).contains("successful")
        expect(response.currentBalance).equal(485)
    })

    it("Check Customer Statement", async () => {

        var customerPhone = userData[userData.length - 3].Customer_phone_number;
        var response = await axios.get(`${jsonData.baseUrl}/transaction/statement/${customerPhone}`,
            {

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": jsonData.token,
                    "X-AUTH-SECRET-KEY": jsonData.secretKey
                }

            }).then((res) => res.data)

        console.log(response.message);
        expect(response.message).contains("Transaction list")
    })
})
