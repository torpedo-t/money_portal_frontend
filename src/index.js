const endPoint = "http://localhost:3000/api/v1/bank_accounts"

document.addEventListener('DOMContentLoaded', () => {
    getBankAccounts()

    const createBankAccountForm = document.querySelector("#create-bank-account-form")

    createBankAccountForm.addEventListener("submit", (e) => createBankAccountHandler(e))

    
    })

    function getBankAccounts() {
        fetch(endPoint)
        .then(response => response.json())
        .then(accounts => {
            accounts.data.forEach(bankAccount => {
                // debugger
                let newBankAccount = new BankAccount(bankAccount, bankAccount.attributes)
                document.querySelector('#bank-account-container').innerHTML += newBankAccount.renderBankAccountCard()
            })
    })
}

function createBankAccountHandler(e) {
    e.preventDefault()
    const nameInput = document.querySelector("#name").value
    const accountTypeInput = document.querySelector("#account-type").value
    const startingBalanceInput = parseInt(document.querySelector("#starting-balance").value)
    const lowBalanceAlertInput = parseInt(document.querySelector("#low-balance-alert").value)
    postFetch(nameInput, accountTypeInput, startingBalanceInput, lowBalanceAlertInput)
}

function postFetch(name, accountType, startingBalance, lowBalanceAlert) {
        fetch(endPoint, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: name,
                account_type: accountType,
                starting_balance: startingBalance,
                low_balance_alert: lowBalanceAlert
            })
        })
        .then(response => response.json())
        .then(bankAccount => {
            const bankAccountData = bankAccount.data
            let newBankAccount = new BankAccount(bankAccountData, bankAccountData.attributes)
            document.querySelector('#bank-account-container').innerHTML += newBankAccount.renderBankAccountCard()
        })
    }


