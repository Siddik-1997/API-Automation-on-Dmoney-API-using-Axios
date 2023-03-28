# API-Automation-on-Dmoney-API-using-Axios

**Axios is a popular JavaScript library that is commonly used for making HTTP requests from a web browser or Node.js. Axios makes it easy to send asynchronous HTTP requests to REST endpoints and perform CRUD (Create, Read, Update, Delete) operations on resources.**

**Axios is often used for API automation because it provides a simple and elegant API for making HTTP requests and handling responses. It supports various features like request and response interceptors, automatic transformation of JSON data, cancellation of requests, and much more.**

## Technology Used:

- Axios
- Java Script
- Visual Studio Code
- Mochawesome

## How to run this project:

- Clone this project
- hit the following command: ```npm test file .\test\*.test.js```
- for Mochawesome Report: ```--reporter mochawesome --reporter-options reportDir=Reports,reportFilename=report.html```


## Project Scenerio: 

 - Call login API
 - Create  a new customer and an agent
 - Search by the customer phone number
 - Deposit 5000 tk to the Agent from system
 - Deposit 2000 tk by agent to customer 
 - Check balance of customer
 - Check statement by trnxId 
 - Withdraw 1000 tk by customer and assert expected balance
 - Send 500 tk to another customer and assert expected balance
 - Check customer statement
 
 ## Test case Report based on Scenerio:
 
 - Google Drive Link: https://docs.google.com/spreadsheets/d/10p-oGjvae8Sym4mF2KTysWvbABNuhPsj/edit?usp=sharing&ouid=102526777056504026911&rtpof=true&sd=true
 
 ## Mochawesome Report:
 
![Screenshot (46)](https://user-images.githubusercontent.com/123433625/228039868-767c8209-279e-4078-910f-c4ec993b51ed.png)


## Video Output:



https://user-images.githubusercontent.com/123433625/228039972-764fe3e5-e7d3-4877-b430-7859607bf2a6.mp4


