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
        <div id='new-transaction-form' data-id=${this.id}>
        <form id='new-transaction-form'>
        <h3>Create a new transaction</h3>
        <input id='amount' type='text' name='name' value='' placeholder='Enter amount' class='input-text'>
        <p>Choose Transaction type:</p>
        <select id='transaction-type' name='transaction-type'>
            <option value="Deposit">Deposit</option>
            <option value="Withdraw">Withdraw</option>
        </select>
        <br></br>

        <input id='memo' type='text' name='memo' value='' placeholder="Description" class='text-area'>
        <br></br>

        <input id='create-button' type='submit' name='submit' value='Create New Transaction'>
        </form>
        </div>`;
    }
}



Transaction.all = [];