function renderExpense(expenseInfo) {
	return `
    <tbody>
        {statusSortedExpenses.map((expense, index) => (
            <tr key={index}>
                <td>
                    {expense.bucket_name}
                    <input
                        type="checkbox"
                        style={checkboxDisplayStyle}
                        name={checkboxName}
                        value={expense.id}
                        onChange={onChangeFunction}
                    ></input>
                </td>
                <td>
                    {expense.expense_date}
                    <br />
                    {expense.receipt_name}
                </td>
                <td>{expense.amount}</td>
                <td>
                    <Dropdown>
                        <Dropdown.Toggle size="sm" variant="secondary">
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <ReceiptModal />
                                </Dropdown.Item>
                                {/* <Dropdown.Item>
            Edit
            </Dropdown.Item> */}
                                <Dropdown.Item
                                    onClick={() => this.deleteExpense(expense.id, index)}
                                >
                                    Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Toggle>
                    </Dropdown>
                </td>
            </tr>
        ))}
    </tbody>
    `;
}
