const endPoint = "http://localhost:3000/api/v1/bank_accounts"

document.addEventListener('DOMContentLoaded', () => {

    getBankAccounts()

    const createBankAccountForm = document.querySelector("#create-bank-account-form")
    createBankAccountForm.addEventListener("submit", (e) => createBankAccountHandler(e))
    // document.querySelector("#create-transaction-form").reset()
})
     
    function getBankAccounts() {
        fetch(endPoint)
        .then(response => response.json())
        .then(accounts => {
            accounts.data.forEach(bankAccount => {
                let newBankAccount = new BankAccount(bankAccount, bankAccount.attributes)
                // document.querySelector(".bank-account-card").reset()
                let bankAccountCard = document.querySelector('.bank-account-card')
                bankAccountCard.insertAdjacentHTML("afterbegin", newBankAccount.renderBankAccountCard())
            })
                const buttons = document.querySelectorAll('.view');
                buttons.forEach(button => {
                    button.addEventListener('click', (button) => {
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
                document.querySelector('#create-bank-account-form').reset()
                debugger
                document.querySelector('.bank-account-card').insertAdjacentHTML("afterbegin", newBankAccount.renderBankAccountCard())
                const buttons = document.querySelectorAll('.view');
                buttons.forEach(button => {
                    button.addEventListener('click', (button) => {
                    getBankAccountTransactions(button.target.dataset.id)
                })
            })
            })
            
        }

    function getBankAccountTransactions(id) {
        fetch(endPoint + `/${id}` + `/transactions`)
        .then(response => response.json())
        .then(transactions => {
            const createBankAccountForm = document.querySelector('#create-bank-account-form')
            const bankAccountCard = document.querySelector('.bank-account-card')
            const transactionCard = document.querySelector('.transaction-card')
            let transactionCardDisplaySetting = transactionCard.style.display

            if (transactionCardDisplaySetting === 'inline') {
                transactionCard.style.display = 'none';
            } else {
                transactionCard.style.display = 'inline';
            }
            createBankAccountForm.style.display = 'none'
            bankAccountCard.style.display = 'none'

            if (transactions.data.length === 0) {
                    let bankAccounts = BankAccount.all
                    bankAccounts.forEach(bankAccount => {
                        let bankAccountCard = document.querySelector("#bank-account-card")
                        let bankAccountId = bankAccountCard.dataset.id

                        if (bankAccount.id === bankAccountId) {
                            // document.querySelector(`#transaction-card-${bankAccount.id}`).remove()
                            const transactionCard = document.querySelector('.transaction-card')
                            // document.querySelector('#transactionCard').remove()
                            transactionCard.insertAdjacentHTML("afterbegin", bankAccount.renderTransactionCard())
                            const transactionFormContainer = document.querySelector(('.transaction-form-container'))
                            transactionFormContainer.insertAdjacentHTML("afterbegin", bankAccount.renderNewTransactionForm())
                            const createTransactionForm = document.querySelector("#create-transaction-form")
                            createTransactionForm.addEventListener("submit", (e) => createTransactionHandler(e))
                        }
                    })
                } else {
                    transactions.data.forEach(transaction => {
                    // document.querySelector(`#transaction-card-${transaction.id}`).remove()
                    let newTransaction = new Transaction(transaction, transaction.attributes)
                    // document.querySelector('#transactionCard').remove()
                    const transactionCard = document.querySelector('.transaction-card')
                    transactionCard.insertAdjacentHTML("afterbegin", newTransaction.renderTransactionCard())
                    const transactionFormContainer = document.querySelector(('.transaction-form-container'))
                    transactionFormContainer.insertAdjacentHTML("afterbegin", newTransaction.renderNewTransactionForm())
                    const createTransactionForm = document.querySelector("#create-transaction-form")
                    createTransactionForm.addEventListener("submit", (e) => createTransactionHandler(e))
                })
            }
        })
    }

    function createTransactionHandler(e) {
        e.preventDefault()
        if (!!e.target.dataset.bankId) {
            const idInput = e.target.dataset.bankId
            const amountInput = document.querySelector("#amount").value
            const transactionTypeInput = document.querySelector("#transaction-type").value
            const memoInput = parseInt(document.querySelector("#memo").value)
            postFetchBankAccountTransactions(idInput, amountInput, transactionTypeInput, memoInput)
        } else {
            const idInput = e.target.dataset.id
            const amountInput = document.querySelector("#amount").value
            const transactionTypeInput = document.querySelector("#transaction-type").value
            const memoInput = parseInt(document.querySelector("#memo").value)
            postFetchBankAccountTransactions(idInput, amountInput, transactionTypeInput, memoInput)
        }
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
        .then(bankAccountTransaction => {
            const transactionData = bankAccountTransaction.data
            let newTransaction = new Transaction(transactionData, transactionData.attributes)
            document.querySelector("#create-transaction-form").reset()
            document.querySelector('.transaction-card').insertAdjacentHTML("afterbegin", newTransaction.renderTransactionCard())
        })
    }

    function goBack() {
        const createBankAccountForm = document.querySelector('#create-bank-account-form')
        const bankAccountCard = document.querySelector('.bank-account-card')
        const transactionCard = document.querySelector('.transaction-card')
        const createTransactionForm = document.querySelector('#create-transaction-form')
        createBankAccountForm.setAttribute("style", "display : inline")
        bankAccountCard.setAttribute("style", "display : inline")
        transactionCard.setAttribute("style", "display : none")
        createTransactionForm.setAttribute("style", "display : none")
        document.querySelector('#transactionCard').remove()
    }
    
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

