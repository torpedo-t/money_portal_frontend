class BankAccount {
    constructor(bankAccount, bankAccountAttributes) {
        // debugger
        this.id = bankAccount.id;
        // debugger
        this.name = bankAccountAttributes.name;
        this.account_type = bankAccountAttributes.account_type
        this.starting_balance = bankAccountAttributes.startingBalance;
        this.low_balance_alert = bankAccountAttributes.lowBalanceAlert;
        this.transactions = bankAccountAttributes.transactions
        BankAccount.all.push(this);
        // debugger
    }

    renderBankAccountCard() {
        return `
        <div id='bank-account-card' data-id=${this.id}>
        <button class="view" data-id=${this.id}>View</>
        <h3>${this.name}</h3>
        <p>${this.account_type}</p>
        </div>
        <br><br>`;
    }

    renderNewTransactionForm() {
        return `
        <div class='create-transaction-form'>
        <form id='create-transaction-form' data-id=${this.id}>
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

    renderTransactionCard() {
        // iterate through this.bank_account.transactions
        // each iteration will return transaction.amount, transaction.transaction_type
        return `
        <div id='transaction-card' data-id=${this.id}>
        <h2>${this.name}</h2>
        <h3>${this.account_type}</h3>
        <script type="text/javascript">
        let transactions = ${this.transactions}
        for (let i = 0; i < transactions.length; i++) {
            console.log(transactions[i].amount)
            console.log(transactions[i].transaction_type)
        }
        </script>
        </div>
        <br><br>`;
    }
}

BankAccount.all = [];