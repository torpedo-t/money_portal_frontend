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
        return `
        <div id='transaction-card' data-id=${this.id}>
        <p>${this.amount}</p>
        <p>${this.transaction_type}</p>
        </div>
        <br><br>`;
    }
}



Transaction.all = [];