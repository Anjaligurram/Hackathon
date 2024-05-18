const expenseForm = document.getElementById("forminput");
const expenseList = document.getElementById("explist");
const totalAmountElement = document.getElementById("total");
const summaryList = document.getElementById("summaryList");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function renderExpenses() {
    expenseList.innerHTML = "";
    summaryList.innerHTML = "";
    let totalAmount = 0;
    const categorySummary = {};

    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];
        const expenseRow = document.createElement("tr");
        expenseRow.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td>
                <span class="edit-btn" data-id="${i}">Edit</span> | 
                <span class="delete-btn" data-id="${i}">Delete</span>
            </td>
        `;
        expenseList.appendChild(expenseRow);

        totalAmount += expense.amount;

        if (categorySummary[expense.category]) {
            categorySummary[expense.category] += expense.amount;
        } else {
            categorySummary[expense.category] = expense.amount;
        }
    }

    totalAmountElement.textContent = totalAmount.toFixed(2);

    for (const category in categorySummary) {
        const summaryItem = document.createElement("li");
        summaryItem.textContent = `${category}: $${categorySummary[category].toFixed(2)}`;
        summaryList.appendChild(summaryItem);
    }

    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense(event) {
    event.preventDefault();

    const expenseName = document.getElementById("name").value;
    const expenseAmount = parseFloat(document.getElementById("amount").value);
    const expenseCategory = document.getElementById("category").value;
    const expenseDate = document.getElementById("date").value;

    if (expenseName === "" || isNaN(expenseAmount) || expenseCategory === "" || expenseDate === "") {
        alert("Please enter valid expense details.");
        return;
    }

    const expense = {
        name: expenseName,
        amount: expenseAmount,
        category: expenseCategory,
        date: expenseDate,
    };

    expenses.push(expense);
    renderExpenses();

    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("date").value = "";
}

function deleteExpense(event) {
    if (event.target.classList.contains("delete-btn")) {
        const expenseIndex = parseInt(event.target.getAttribute("data-id"));
        expenses.splice(expenseIndex, 1);
        renderExpenses();
    }
}

function editExpense(event) {
    if (event.target.classList.contains("edit-btn")) {
        const expenseIndex = parseInt(event.target.getAttribute("data-id"));
        const expense = expenses[expenseIndex];

        document.getElementById("name").value = expense.name;
        document.getElementById("amount").value = expense.amount;
        document.getElementById("category").value = expense.category;
        document.getElementById("date").value = expense.date;

        expenses.splice(expenseIndex, 1);
        renderExpenses();
    }
}

expenseForm.addEventListener("submit", addExpense);
expenseList.addEventListener("click", deleteExpense);
expenseList.addEventListener("click", editExpense);

renderExpenses();
