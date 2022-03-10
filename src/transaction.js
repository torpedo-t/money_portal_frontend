class Transaction {
    constructor (transaction, transactionAttributes) {
        this.id = transaction.id
        this.amount = transactionAttributes.amount
        this.transaction_type = transactionAttributes.transaction_type
        this.memo = transactionAttributes.memo
        this.bank_account = transactionAttributes.bank_account
        Transaction.all.push(this)
    }

    renderTransactionCard() {
        // iterate through this.bank_account.transactions
        // each iteration will return transaction.amount, transaction.transaction_type
        return `
        <div id='transactionCard' data-id=${this.id} data-bank-id=${this.bank_account.id}>
        <h2>${this.bank_account.name}</h2>
        <h3>${this.bank_account.account_type}</h3>
        <p>Balance: ${this.bank_account.starting_balance}</p>
        <script type="text/javascript">
        let transactions = ${this.bank_account.transactions}
        for (let i = 0; i < transactions.length; i++) {
            console.log(transactions[i].amount)
            console.log(transactions[i].transaction_type)
        }
        </script>
        <p>Amount: ${this.amount}</p>
        <p>Type: ${this.transaction_type}</p>
        </div>
        <br><br>`;
    }

    renderNewTransactionForm() {
        return `
        <div class='create-transaction-form' data-id=${this.id}>
        <form id='create-transaction-form' data-bank-id=${this.bank_account.id}>
        <h3>Create a new transaction</h3>
        <input id='amount' type='text' name='amount' value='' placeholder='Enter amount' class='input-text'>
        <p>Choose Transaction type:</p>
        <select id='transaction-type' name='transaction-type' value=${this.transaction_type}>
            <option value="Deposit">Deposit</option>
            <option value="Withdraw">Withdraw</option>
        </select>
        <br></br>
        <input id='memo' type='text' name='memo' value='' placeholder="Description" class='input-text'>
        <br></br>
        <input id='create-button' type='submit' name='submit' value='Create New Transaction'>
        </form>
        </div>`;
    }

        // getOwnPropertyNames() {
    //     Object.getOwnPropertyNames(Transaction.prototype).forEach((amount, transaction_type) => {
    //         return `
    //         <p>${amount}</p>
    //         <p>${transaction_type}</p>`;
    //     })
    // }
}

Transaction.all = [];