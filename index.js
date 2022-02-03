const endPoint = "http://localhost:3000/api/v1/bank_accounts"

document.addEventListener('DOMContentLoaded', () => {
    getBankAccounts()
    })

    function getBankAccounts() {
        fetch(endPoint)
        .then(response => response.json())
        .then(accounts => {
            accounts.data.forEach(bankAccount => {
                debugger
                const bankAccountMarkup = `
                `
            })
    })
}