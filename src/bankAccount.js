class BankAccount {
    constructor(bankAccount, bankAccountAttributes) {
        // debugger
        this.id = bankAccount.id;
        // debugger
        this.name = bankAccountAttributes.name;
        this.starting_balance = bankAccountAttributes.startingBalance;
        this.low_balance_alert = bankAccountAttributes.lowBalanceAlert;
        this.transactions = bankAccountAttributes.transactions
        BankAccount.all.push(this);
        // debugger
    }

    renderBankAccountCard() {
        return `
        <div data-id=${this.id}>
        <h3>${this.name}</h3>
        <button data-id=${this.id}>View</>
        </div>
        <br><br>`;
    }
}

BankAccount.all = [];