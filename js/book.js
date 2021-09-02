const resultsDiv = document.getElementById('results-div');
const totalResult = document.getElementById('total-result');
const blankSearch = document.getElementById('blank-search');
const wrongSearch = document.getElementById('wrong-search');

/**function style--for display spinner  & display body (block/none)*/
const toggleSpinner = spinnerStyle => {
    document.getElementById('spinner').style.display = spinnerStyle;
}
const bodyResult = spinnerStyle => {
    document.getElementById('search-result').style.display = spinnerStyle;
}

/*function fetching data by link */
const loadBook = () => {

    /**functionCall-[spinner showed and body result hide when loading]*/
    toggleSpinner('block');
    bodyResult('none');

    /**taking search value */
    const searchText = document.getElementById('search-text');
    const searchValue = searchText.value;


    /**test for blank search */
    if (searchText.value.length === 0) {
        toggleSpinner('none');
        blankSearch.textContent = '';
        const div = document.createElement('div');
        div.innerHTML = `<h3 class="text-danger text-center fw-bold">Opps!Please Write Something...</h3>`;
        blankSearch.appendChild(div);

    } else {
        /**remove error msg when new search occur */
        document.getElementById('blank-search').textContent = '';


        const url = `https://openlibrary.org/search.json?q=${searchValue}`;
        searchText.value = '';
        fetch(url)
            .then(res => res.json())
            .then(data => displayBook(data.docs));

    }
}

/**function for display books based on search */
const displayBook = books => {

    /**test for unauthorize search */
    if (books.length === 0) {
        toggleSpinner('none');
        wrongSearch.textContent = '';
        const div = document.createElement('div');
        div.innerHTML = `<h3 class="text-danger text-center fw-bold">Sorry!No Result Found...</h3>`;
        wrongSearch.appendChild(div);
    }

    /**inserting result of total search result */
    totalResult.innerHTML = `<p>Showing result ${books.slice(0,30).length} of ${books.length}</p>`;
    resultsDiv.textContent = '';


    /**inserting each result in the  result-div */
    books.slice(0, 30).forEach(book => {

        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card h-100 border border-success rounded-3">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i?book.cover_i:6701651}-M.jpg"
                class = "p-3 h-100 card-img-top" >
                <div class="card-body">
                    <h5 class="card-title">Book Name:<span class="text-success  fw-bold"> ${book.title}</span></h5>
                    <p class="card-text">Author Name: <span class="text-success fw-bold">${book.author_name?book.author_name[0]:'Unknown'}</span></p>
                    <p class="card-text">First Publish:<span class="text-success fw-bold"> ${book.first_publish_year?book.first_publish_year:'Unknown'}</span></p>
                    <p class="card-text">Publisher:<span class="text-success fw-bold">${book.publisher?book.publisher[0]:
                    'Unknown'}</span></p>
                                       
                </div>
            </div>
        
        `;
        resultsDiv.appendChild(div);

    });

    /**function -spinner hide and body result showed after loading*/
    toggleSpinner('none');
    bodyResult('block');
}

/**remove content when new search occur */
document.getElementById('search-btn').addEventListener('click', () => {
    document.getElementById('total-result').textContent = '';
    document.getElementById('wrong-search').textContent = '';

});