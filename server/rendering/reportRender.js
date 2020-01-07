function renderExpense (expense) {
    return `
    <tr>
        <th scope="row">${expense.id}</th>
        <td>${expense.receipt_name}</td>
        <td>${expense.amount}</td>
        <td>${expense.expense_date}</td>
    </tr>
    `
}

function renderExpenseTable(expenses) {
    return `
        <table class="table">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Receipt Name</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
        </tr>
        </thead>
        <tbody>
        ${expenses.map(renderExpense).join('')}
        </tbody>
        </table>
`
}

function renderExpenseImages() {
    return `
    <P style="page-break-before: always">
    <table class="table">
    <tr>
        <th scope="row">${expense.id}</th>
        <th>${expense.receipt_name}</td>
        <th>${expense.amount}</td>
        <th>${expense.expense_date}</td>
    </tr>
    <tr>
        <img src="${expense.image}" class="img-fluid" alt="Receipt #${expense.id}">
    </tr>
    </table>
    `
}

module.exports = {
    renderExpenseTable:renderExpenseTable
}