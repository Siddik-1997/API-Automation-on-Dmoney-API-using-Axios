# API-Automation-on-Dmoney-API-using-Axios
**Axios is a popular JavaScript library used for making HTTP requests, including API automation. It's simple, easy to use, supports multiple platforms, has interceptor support, uses Promises, and can handle response data in different formats.**

## Technology Used:

- Rest Assured
- commons-configuration
- Jackson Databind
- TestNG
- Java
- Gradle
- intellij idea
- Allure

## How to run this project:

- Clone this project
- hit the following command: ```gradle clean test```
- for Allure Report hit: ```allure generate allure-results --clean -o allure-report``` and ```allure serve allure-results```

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


