const endPoint = "http://localhost:3000/api/v1/bank_accounts"

document.addEventListener('DOMContentLoaded', () => {

    const createBankAccountForm = document.querySelector("#create-bank-account-form")

    createBankAccountForm.addEventListener("submit", (e) => createBankAccountHandler(e))
    
    getBankAccounts()


    // const buttons = document.querySelectorAll('.view');
    // buttons.forEach(button => {
    //     button.addEventListener('click', (button) => {
    //         debugger
    //         console.log(button)
    //     getBankAccountTransactions(button.target.dataset.id)
    //     })
    //     //debugger
    // }) 
})
     
    function getBankAccounts() {
        fetch(endPoint)
        .then(response => response.json())
        .then(accounts => {
            accounts.data.forEach(bankAccount => {
                let newBankAccount = new BankAccount(bankAccount, bankAccount.attributes)
                document.querySelector('#bank-account-card').innerHTML += newBankAccount.renderBankAccountCard()
            })
                const buttons = document.querySelectorAll('.view');
                buttons.forEach(button => {
                    button.addEventListener('click', (button) => {
                        debugger
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
            transactions.data.forEach(transaction => {
                let newTransaction = new Transaction(transaction, transaction.attributes)
                // conditions if !newTransaction
                const createBankAccountForm = document.querySelector('#create-bank-account-form')

                const bankAccountCard = document.querySelector('#bank-account-card')

                createBankAccountForm.setAttribute("style", "display : none")

                bankAccountCard.setAttribute("style", "display : none")

                const transactionCard = document.querySelector('#transaction-card')

                transactionCard.innerHTML += newTransaction.renderTransactionCard()

                const transactionFormContainer = document.querySelector(('.transaction-form-container'))

                transactionFormContainer.innerHTML += newTransaction.renderNewTransactionForm()
            
                const createTransactionForm = document.querySelector("#create-transaction-form")
                
                createTransactionForm.addEventListener("submit", (e) => createTransactionHandler(e))
            })
        })
    }

    function createTransactionHandler(e) {
        e.preventDefault()
        const idInput = e.target.dataset.bankId
        const amountInput = document.querySelector("#amount").value
        const transactionTypeInput = document.querySelector("#transaction-type").value
        const memoInput = parseInt(document.querySelector("#memo").value)
        postFetchBankAccountTransactions(idInput, amountInput, transactionTypeInput, memoInput)
    }

    function postFetchBankAccountTransactions(id, amount, transactionType, memo) {
        fetch(endPoint + `/${id}` + `/transactions`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                bank_account_id: id,
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

    function goBack() {

        const createBankAccountForm = document.querySelector('#create-bank-account-form')

        const bankAccountCard = document.querySelector('#bank-account-card')

        const transactionCard = document.querySelector('#transaction-card')

        const createTransactionForm = document.querySelector('#create-transaction-form')

        createBankAccountForm.setAttribute("style", "display : inline")

        bankAccountCard.setAttribute("style", "display : inline")

        transactionCard.setAttribute("style", "display : none")

        createTransactionForm.setAttribute("style", "display : none")
    }
    
    // function removeAllChildNodes(parent) {
    //     while (parent.firstChild) {
    //         parent.removeChild(parent.firstChild);
    //     }
    // }

