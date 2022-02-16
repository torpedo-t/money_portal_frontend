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
        <div id='bank-account-card'>
        <button class="view" onclick="getBankAccountTransactions()" data-id=${this.id}>View</>
        <h3>${this.name}</h3>
        <p>${this.account_type}</p>
        </div>
        <br><br>`;
    }
}

BankAccount.all = [];