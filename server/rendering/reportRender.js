function renderExpense(expense) {
	return `
    <tr>
        <th scope="row">${expense.id}</th>
        <td>${expense.receipt_name}</td>
        <td>${expense.amount}</td>
        <td>${expense.expense_date}</td>
        <td>${expense.catagory_name}</td>
    </tr>
    `;
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
            <th scope="col">Catagory Name</th>
        </tr>
        </thead>
        <tbody>
        ${expenses.map(renderExpense).join('')}
        </tbody>
        </table>
        ${expenses.map(renderExpenseImages).join('')}
`;
}

function renderExpenseImages(expense) {
	return `

    <P style="page-break-after: always">
    <table class="table">
    <tbody>
    <tr>
    <th scope="row">${expense.id}</th>
    <td>${expense.receipt_name}</td>
    <td>${expense.amount}</td>
    <td>${expense.expense_date}</td>
    </tr>
    
    <tr>
    <td><img src="${expense.image}" class="img-fluid" alt="Receipt #${expense.id}"></td> 
    </tr>
    </tbody>
    </table>
    `;
}

module.exports = {
	renderExpenseTable: renderExpenseTable,
	renderExpenseImages: renderExpenseImages,
};
