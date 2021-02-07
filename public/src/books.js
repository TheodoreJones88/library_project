function findAuthorById(authors, id) {
  return authors.find(author => id === author.id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  // making an empty array
  const partitioned = [];
  // getting access to the books that haven't been returned
  let loanedOut = books.filter(({borrows}) => !borrows.returned).slice(0,6);
  // getting access to the books that have been returned
  let returned = books.filter(({borrows}) => borrows[0].returned);
  // returning after pushing new arrays into partitioned array
  partitioned.push(loanedOut, returned);
  return partitioned;
  
}

function getBorrowersForBook(book, accounts) {
  // creating a new array based on certain criteria
  let borrowed = book.borrows.map(status => {
    // finding each account to see if they have borrowed said book
    const borrower = accounts.find(account => status.id === account.id);
    // returning after spreading the new objects (one with a new key) into the newly created array
    return {...borrower, "returned": status.returned};
  });
  // returning the new array while limiting the results to 10 max
return borrowed.slice(0,10);
};

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
