const endPoint = "http://localhost:3000/api/v1/bank_accounts"

const endPoint1 = "http://localhost:3000/api/v1/bank_accounts/:id/transactions"

document.addEventListener('DOMContentLoaded', () => {

    const createBankAccountForm = document.querySelector("#create-bank-account-form")

    createBankAccountForm.addEventListener("submit", (e) => createBankAccountHandler(e))
    
    getBankAccounts()
    
    })

    function getBankAccounts() {
        
        fetch(endPoint)
        .then(response => response.json())
        .then(accounts => {
            
            accounts.data.forEach(bankAccount => {
                // debugger
                let newBankAccount = new BankAccount(bankAccount, bankAccount.attributes)
                document.querySelector('#bank-account-card').innerHTML += newBankAccount.renderBankAccountCard()
                
            })
            document.querySelectorAll(".view").forEach(button => {
                console.log(button.dataset.id)

            button.addEventListener('click', (e) => getBankAccountTransactions(e.target.dataset.id))
    })
})

            
            // var buttons = document.querySelectorAll(".view");
            // for (i = 0; i < buttons.length; i++){
            //     console.log(buttons)
            //     console.log(buttons[i].dataset.id)
            //     console.log(buttons[i].parentElement.dataset.id)
            //     buttons[i].addEventListener('click', (buttons[i]) => getBankAccountTransactions(buttons[i].parentElement.dataset.id))
            // }

            // const buttons = document.querySelectorAll('.view');
            // buttons.forEach(button => {
            //     console.log(button)
            //     console.log(button.parentElement.dataset.id)
            //     // button.addEventListener('click', getBankAccountTransactions(button.parentElement.dataset.id))
            // })

}

function createBankAccountHandler(e) {
    e.preventDefault()
    const nameInput = document.querySelector("#name").value
    const accountTypeInput = document.querySelector("#account-type").value
    const startingBalanceInput = parseInt(document.querySelector("#starting-balance").value)
    const lowBalanceAlertInput = parseInt(document.querySelector("#low-balance-alert").value)
    postFetchBankAccounts(nameInput, accountTypeInput, startingBalanceInput, lowBalanceAlertInput)
}

function postFetchBankAccounts(name, accountType, startingBalance, lowBalanceAlert) {
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

    function getBankAccountTransactions(id) {
        // debugger
        fetch(endPoint + `/${id}` + `/transactions`)
        .then(response => response.json())
        .then(transactions => {
            // debugger
            transactions.data.forEach(transaction => {
            // console.log(transaction)
                let newTransaction = new Transaction(transaction, transaction.attributes)

                const container = document.querySelector('#container');

                const bankAccountCard = document.querySelector('#bank-account-card')

                removeAllChildNodes(container);

                removeAllChildNodes(bankAccountCard);

                document.querySelector('#transaction-card').innerHTML += newTransaction.renderTransactionCard()
            })
        })
    }
    
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

