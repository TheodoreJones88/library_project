function totalBooksCount(books) {
  return books.reduce((acc) => {
    return acc + 1;
  },0);
}

function totalAccountsCount(accounts) {
  return accounts.reduce((acc) => {
    return acc + 1;
  },0);
}

function booksBorrowedCount(books) {
  // filtering out the books that are loaned out by checking if the first object in the borrows array is false
  const borrowed = books.filter(({borrows}) => !borrows[0].returned);
  // returning the length of the newly filtered array
  return borrowed.reduce((acc) => {
    return acc + 1;
  },0);;
}

function getMostCommonGenres(books) {
let result = [{name: books[0].genre , count: 1}];

for(let i = 1; i < books.length; i++){
  let genre = books[i].genre;
  let index = result.findIndex(({name}) => name === genre);
  if(index === -1){
    let newObj = {name: genre, count: 1};
    result.push(newObj);
  }
  else{
    result[index].count++;
  }
}
result.sort((a,b) => b.count - a.count);

while(result.length > 5){
  result.pop();
}
return result;
}

function getMostPopularBooks(books) {
const newList = sortBooksByBorrows(books)
return newList.map(a => {
  return {
    name: a.title,
    count: a.borrows.length
  }
}).slice(0,5)
}

function getMostPopularAuthors(books, authors) {
const rentals = sortBooksByBorrows(books);
let found = rentals.map((a) => a.authorId);
let foundAuthors = found.map((b, idx) => {
  const thisAuthor = authors.find((a => a.id === b))
  return {name: `${thisAuthor.name.first} ${thisAuthor.name.last}`,
         count: rentals[idx].borrows.length}
});
return foundAuthors.slice(0,5);
}

function sortBooksByBorrows(books){
return books.sort((bookA, bookB) => bookB.borrows.length - bookA.borrows.length)
}


module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
