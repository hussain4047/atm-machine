#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 5000;
let myPin = 1234;
console.log(chalk.blue("\n \tWelcome to Hussain - ATM Machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter your pin code: ")
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\nPin is Correct, Login Successfully!\n"));
    // console.log(`Current Account Balance  is ${myBalance}`);
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.yellow("Select an Operation"),
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: chalk.yellow("Select a Withdrawal method:"),
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: chalk.yellow("Select Amount:"),
                    choices: [1000, 2000, 3000, 5000, 10000, 20000, 50000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("Insufficient balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(chalk.green(`\n \t${fastCashAns.fastCash} Withdraw Successfully!`));
                console.log(chalk.blue(`\nYour Remaining Balance is ${myBalance}\n`));
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: chalk.yellow("Enter the amount you want to withdraw:")
                }
            ]);
            if (amountAns.amount >= myBalance) {
                console.log(chalk.red("\n \tInsufficient Balance\n"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(chalk.green(`\n \t${amountAns.amount} Withdraw Successfully!`));
                console.log(chalk.blue(`\nYour Remaining Balance is: ${myBalance}\n`));
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(chalk.magenta(`\nYour Account Balance is: ${myBalance}\n`));
    }
}
else {
    console.log(chalk.red("\tPin is Incorrect, Try Again!"));
}
