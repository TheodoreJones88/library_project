function findAccountById(accounts, id) {
  // find match of id's  
  // return the matching users object
  return accounts.find((account) => account.id === id); 
}

function sortAccountsByLastName(accounts) {
  // access accounts last name
  // sort accounts by last name
  // return new array with user sorted by last name
  return accounts.sort(({name: {last: lastA}}, {name: {last: lastB}}) => (lastA > lastB ? 1 : -1));
}

function numberOfBorrows({id}, books) {
// get user's id from account
// get access to the "borrow" object to get the id
// get every time user's id matches borrow books id
// return a number for the ammount of times there was a match
const borrowed = books.filter(book => book.borrows.some(trans => trans.id ===  id));
return borrowed.reduce((acc) => {
  return acc + 1;
},0);
}

function getBooksPossessedByAccount(account, books, authors) {
  // accessing the account id directly by assigning it to a variable 
  const user = account.id
  // filtering through each borrowed book for matching user id's and if the book has been returned
  const checkedOut = books.filter(book => book.borrows[0].id === user && !book.borrows[0].returned);
  // finding author of checked out books
  // add the authors info to the checkedOut info
  const authorsBooks = checkedOut.map(book => {
    // accessing the books author ID directly
    let bookAuthorId = book.authorId;
    // creating a variable for an object that finds the matching ID's and imports that author object to the authorsBooks's object
    let authorObj = authors.find(author => author.id === bookAuthorId);
    // return after spreading the book object and the newly created 'author' object
    return {...book, 'author': authorObj}
  });
  // return the updated array with the newlist of authors who's books are checked out after the map method
  return authorsBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
