// expenses in array, maping array to put expenses in the html elements
const expenses = [
    {
      name: 'Coffee',
      amount: '40 PLN',
      category: 'Food',
      date: '2022-07-16'
    },
    {
      name: 'Bread',
      amount: '8 PLN',
      category: 'Food',
      date: '2022-08-03'
    },
    {
      name: 'Cheese',
      amount: '21 PLN',
      category: 'Food',
      date: '2022-08-03'
    },
    {
      name: 'Fuel',
      amount: '320 PLN',
      category: 'Car',
      date: '2022-08-14'
    },
    {
      name: 'Bread',
      amount: '8 PLN',
      category: 'Food',
      date: '2022-09-01'
    },
    {
      name: 'Ham',
      amount: '14 PLN',
      category: 'Food',
      date: '2022-09-01'
    },
    {
      name: 'Butter',
      amount: '6 PLN',
      category: 'Food',
      date: '2022-09-10'
    },
    {
      name: 'Fuel',
      amount: '320 PLN',
      category: 'Car',
      date: '2022-09-10'
    },
    {
      name: 'Car Wash',
      amount: '60 PLN',
      category: 'Car',
      date: '2022-09-10'
    }
  ];

const expenseList = document.querySelector('.expense-list');

const expenseItemsHTML = expenses.map(expensesArrayToHtml).join('');

function expensesArrayToHtml(expense) {
  return `
    <li class="expense-item">
      <div class="info">
        <div class="category">${expense.category}</div>
        <div class="amount">${expense.amount}</div>
        <div class="name">${expense.name}</div>
        <div class="date">${expense.date}</div>
      </div>
    </li>
  `;
}

expenseList.innerHTML = expenseItemsHTML;

// sum expenses in array, maping array to put sum expenses in the html elements


const sumExpenses = [
    {
      month: '2022-07',
      amount: '40 PLN'
    },
    {
      month: '2022-08',
      amount: '349 PLN'
    },
    {
      month: '2022-09',
      amount: '408 PLN'
    }
  ];

const sumExpensesList = document.querySelector('.period-wrapper');

const sumExpensesItemsHTML = sumExpenses.map(sumExpensesArrayToHtml).join('');

function sumExpensesArrayToHtml(sumExpenses) {
  return `
    <div class="period">
      <div class="month">${sumExpenses.month}</div>
      <div class="amount">${sumExpenses.amount}</div>
    </div>
  `;
}

sumExpensesList.innerHTML = sumExpensesItemsHTML;

// sum categories expenses in array, maping array to put values in the html elements

let sumFoodExpenses = 0;

for (const expense of expenses) {
  if (expense.category === 'Food') {
    const amount = parseFloat(expense.amount.split(' ')[0]);
    sumFoodExpenses += amount;
  }
}

let sumCarExpenses = 0;

for (const expense of expenses) {
  if (expense.category === 'Car') {
    const amount = parseFloat(expense.amount.split(' ')[0]);
    sumCarExpenses += amount;
  }
}

const categoryExpenses = [
  {
    category: 'Food',
    amount: sumFoodExpenses
  },
  {
    category: 'Car',
    amount: sumCarExpenses
  }
]

const categoryExpensesList = document.querySelector('.category-total-wrapper');

const categoryExpensesItemsHTML = categoryExpenses.map(categoryExpensesArrayToHtml).join('');

function categoryExpensesArrayToHtml(categoryExpenses) {
  return `
    <div class="category-total">
      <div class="category">${categoryExpenses.category}</div>
      <div class="amount">${categoryExpenses.amount} PLN</div>
    </div>
  `;
}

categoryExpensesList.innerHTML = categoryExpensesItemsHTML;


//adding class to header mobile

const headerElement = document.querySelector('.page-wrapper');

function checkScreenWidth() {
if (window.innerWidth < 768) {
    headerElement.classList.add("mobile");
  } else {
    headerElement.classList.remove('mobile');
  }
}

checkScreenWidth();

window.addEventListener('resize', checkScreenWidth);

//mobile navigation

const navMobile = document.querySelector('.mobile-nav'),
openBtn = document.querySelector('.btn-mobile-nav-open'),
closeBtn = document.querySelector('.btn-mobile-nav-close'),
pageWrapper = document.querySelector('.page-wrapper');

openBtn.addEventListener('click', () => {
    navMobile.classList.add('visible');
    pageWrapper.classList.add('gray');
    navMobile.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
    navMobile.classList.remove('visible');
    pageWrapper.classList.remove('gray');
    navMobile.classList.add('hidden');
});



// pagination logic
const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.getElementById("paginated-list");
const listItems = paginatedList.querySelectorAll("li");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const paginationLimit = 5;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage = 1;

const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};

const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};

const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);

  paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonsStatus();
  
  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((item, index) => {
    item.classList.add("hidden");
    if (index >= prevRange && index < currRange) {
      item.classList.remove("hidden");
    }
  });
};

window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);

  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});