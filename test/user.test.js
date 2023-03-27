const { expect } = require('chai');
const axios = require('axios');
const jsonData = require('../env.json');
const fs = require('fs')
const { faker } = require('@faker-js/faker')
var rand = require('../generateRandom')

const userData = require('../users.json')

describe("User can do login", () => {

    it("User can login successfully", async () => {
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
        expect(response.data.message).contains("Login successfully")
        let token_value = response.data.token;
        jsonData.token = token_value;
        fs.writeFileSync('env.json', JSON.stringify(jsonData))

    })

    var Customer_name = faker.name.fullName();
    var Customer_email = faker.internet.email().toLowerCase();
    var Customer_phone_number = "015010" + rand(10000, 99999);
    it("Admin can create customer", async () => {
        var response = await axios.post(`${jsonData.baseUrl}/user/create`, {
            "name": Customer_name,
            "email": Customer_email,
            "password": "1234",
            "phone_number": Customer_phone_number,
            "nid": "123456789",
            "role": "Customer"
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": jsonData.token,
                "X-AUTH-SECRET-KEY": jsonData.secretKey
            }
        }).then((res) => res.data.user)
        console.log(response)

        var id = response.id;
        var name = response.name;
        var email = response.email;
        var phone_number = response.phone_number;

        var newUser = {
            Customer_id: id,
            Customer_name: name,
            Customer_email: email,
            Customer_phone_number: phone_number,
        }

        userData.push(newUser);

        fs.writeFileSync('users.json', JSON.stringify(userData))
        console.log("Saved!")
    })

    var Agent_name = faker.name.fullName();
    var Agent_email = faker.internet.email().toLowerCase();
    var Agent_phone_number = "015010" + rand(10000, 99999);
    it("Admin can create Agent", async () => {
        var response = await axios.post(`${jsonData.baseUrl}/user/create`, {
            "name": Agent_name,
            "email": Agent_email,
            "password": "1234",
            "phone_number": Agent_phone_number,
            "nid": "123456789",
            "role": "Agent"
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": jsonData.token,
                "X-AUTH-SECRET-KEY": jsonData.secretKey
            }
        }).then((res) => res.data.user)
        console.log(response.message)

        var id = response.id;
        var name = response.name;
        var email = response.email;
        var phone_number = response.phone_number;

        var newAgent = {
            Agent_id: id,
            Agent_name: name,
            Agent_email: email,
            Agent_phone_number: phone_number,
        }

        userData.push(newAgent);

        fs.writeFileSync('users.json', JSON.stringify(userData))
        console.log("Saved!")
    })

    it("Admin can search user by Phone Number", async () => {

        var userPhone = userData[userData.length - 2].Customer_phone_number;
        var response = await axios.get(`${jsonData.baseUrl}/user/search/Phonenumber/${userPhone}`,
            {

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": jsonData.token,
                    "X-AUTH-SECRET-KEY": jsonData.secretKey
                }

            }).then((res) => res.data)

        console.log(response.message);
        expect(response.message).contains("User found")
    })

})