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

                const buttons = document.querySelectorAll('.view');
                buttons.forEach(button => {
                // console.log(button)
                // console.log(button.parentElement.dataset.id)
                button.addEventListener('click', (button) => {
                    // debugger
                    getBankAccountTransactions(button.target.dataset.id)
                })
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
            debugger
            transactions.data.forEach(transaction => {
            // debugger
                let newTransaction = new Transaction(transaction, transaction.attributes)

                const container = document.querySelector('#container');

                const bankAccountCard = document.querySelector('#bank-account-card')

                removeAllChildNodes(container);

                removeAllChildNodes(bankAccountCard);

                document.querySelector('#transaction-card').innerHTML += newTransaction.renderTransactionCard()

                document.querySelector('.transaction-form-container').innerHTML += newTransaction.renderNewTransactionForm()

                const createTransactionForm = document.querySelector("#new-transaction-form")

                createTransactionForm.addEventListener("submit", (e) => createTransactionHandler(e))
            })
        })
    }

    function createTransactionHandler(e) {
        e.preventDefault()
        const amountInput = document.querySelector("#amount").value
        const transactionTypeInput = document.querySelector("#transaction-type").value
        const memoInput = parseInt(document.querySelector("#memo").value)
        postFetchBankAccountTransactions(amountInput, transactionTypeInput, memoInput)
    }

    function postFetchBankAccountTransactions(amount, transactionType, memo) {
        fetch(endPoint + `/${id}` + `/transactions`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                amount: amount,
                transaction_type: transactionType,
                memo: memo
            })
        })
        .then(response => response.json())
        .then(transaction => {
            const transactionData = transaction.data
            let newTransaction = new Transaction(transactionData, transactionData.attributes)
            document.querySelector('#transaction-card').innerHTML += newTransaction.renderTransactionCard()
        })
    }
    
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

