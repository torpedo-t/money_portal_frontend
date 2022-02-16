const endPoint = "http://localhost:3000/api/v1/bank_accounts"


// const something = document.querySelectorAll(".view")
// .each (button => {
    // button.addEventListener('click', (e) => getBankAccountTransactions(e.target.dataset.id))
// }
// )


document.addEventListener('DOMContentLoaded', () => {
    getBankAccounts()
    // getBankAccountTransactions()

    const createBankAccountForm = document.querySelector("#create-bank-account-form")

    createBankAccountForm.addEventListener("submit", (e) => createBankAccountHandler(e))

    document.querySelectorAll(".view").forEach(button => {
        // debugger
        button.addEventListener('click', (e) => getBankAccountTransactions(e.target.dataset.id))
        debugger
    })
    })

    // document.querySelectorAll(".view").each (button => {
    //     button.addEventListener('click', (id) => getBankAccountTransactions(target.dataset.id))
    // }

    function getBankAccounts() {
        fetch(endPoint)
        .then(response => response.json())
        .then(accounts => {
            accounts.data.forEach(bankAccount => {
                // debugger
                let newBankAccount = new BankAccount(bankAccount, bankAccount.attributes)
                document.querySelector('#bank-account-card').innerHTML += newBankAccount.renderBankAccountCard()
            })
    })
}

function createBankAccountHandler(e) {
    e.preventDefault()
    const nameInput = document.querySelector("#name").value
    const accountTypeInput = document.querySelector("#account-type").value
    const startingBalanceInput = parseInt(document.querySelector("#starting-balance").value)
    const lowBalanceAlertInput = parseInt(document.querySelector("#low-balance-alert").value)
    postFetchBankAccounts(nameInput, accountTypeInput, startingBalanceInput, lowBalanceAlertInput)
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
            document.querySelector('#bank-account-card').innerHTML += newBankAccount.renderBankAccountCard()
        })
    }


    //e.target.dataset.id
    function getBankAccountTransactions(id) {
        // debugger
        fetch(endPoint + `/${id}` + `/transactions`)
        .then(response => response.json())
        .then(transactions => {
            transactions.data.forEach(transaction => {
            //    debugger
                let newTransaction = new Transaction(transaction, transaction.attributes)

                const container = document.querySelector('#container');

                removeAllChildNodes(container);

                document.querySelector('#transaction-card').innerHTML += newTransaction.renderTransactionCard()
            })
        })
    }

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    

