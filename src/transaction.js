class Transaction {
    constructor (transaction, transactionAttributes) {
        this.id = transaction.id
        this.amount = transactionAttributes.amount
        this.transaction_type = transactionAttributes.transaction_type
        this.memo = transactionAttributes.memo
        this.bank_account = transactionAttributes.bank_account
        // debugger
        Transaction.all.push(this)
    }

    renderTransactionCard() {
        // debugger
        return `
        <div id='transaction-card' data-id=${this.id}>
        <p>${this.amount}</p>
        <p>${this.transaction_type}</p>
        </div>
        <br><br>`;
    }

    renderNewTransactionForm() {
        return `
        <div id='create-transaction-form' data-id=${this.id}>
        <form id='create-transaction-form' data-bank-id=${this.bank_account.id}>
        <h3>Create a new transaction</h3>
        <input id='amount' type='text' name='amount' value='' placeholder='Enter amount' class='input-text'>
        <p>Choose Transaction type:</p>
        <select id='transaction-type' name='transaction-type'>
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
}



Transaction.all = [];