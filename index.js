let posts;


main();

async function loadData() {

    const response = await fetch('https://api.coinlore.net/api/tickers/?start=100&limit=100')
    const data = await response.json();
   return arr = [...data.data.map((item) => {
      return {
        name: item.name,
        rank: item.rank,
        price: item.price_usd,
        change: item.percent_change_24h,
      }
    })]

   

  }
  
  async function main() {
    posts = await loadData()
    const tbody = document.getElementById('crypto-table-body');
    const paginateNumbers = document.querySelector('.pagination');
    
    let currentPage = 1;
    let postsPerPage = 10;
    
    
    generatePagination(currentPage);
    
    
    function generatePagination(currentPage) {

      const indexOfLastPost = currentPage * postsPerPage;
      // page 1 = arr[10] - 11 posts
      // page 2 = arr[20]
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      // page 1 = arr[0] = 10 - 10 = arr[0]
      // page 2 = arr[10]
      const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
     
      loadDataIntoTable(currentPosts);
      
      displayPagination(currentPage - 1)
      addListeners();
      
    }
    
    function addListeners() {
      const rightArrow = document.querySelector('.arrow-right')
      const leftArrow = document.querySelector('.arrow-left')
      let pageNumbers = document.querySelectorAll('.page-num');

      pageNumbers.forEach((num) => {
        num.addEventListener('click', () => {
          generatePagination(+num.innerText)
        }, false)
      })

      rightArrow.addEventListener('click',() => {
        let currentPageIndex = +document.querySelector('.active').innerText;
        if (currentPageIndex <= pageNumbers.length - 1) {

          generatePagination(++currentPageIndex)

        }
      }, false)

      leftArrow.addEventListener('click',() => {
        let currentPageIndex = +document.querySelector('.active').innerText;
        if (currentPageIndex > 1) {

          generatePagination(--currentPageIndex)

        }
      }, false)
    }

    function displayPagination(active = 0) {
      const pageNumbers = [];

      for (let i = 1; i <= Math.ceil((posts.length / postsPerPage)); i++) {
        pageNumbers.push(i);
      }

      let html = `<li class="arrow-left"><a href="#!"><i class="material-icons">chevron_left</i></a></li>`;

      html += pageNumbers.map((num, index) => {

          if (index === active) {
            return `<li class="waves-effect page-num active"><a>${num}</a></li>`

          } else {
            return `<li class="waves-effect page-num"><a>${num}</a></li>`

          }
      }).join('')

      html += ` <li class="waves-effect arrow-right"><a href="#!"><i class="material-icons">chevron_right</i></a></li>`;
     
      paginateNumbers.innerHTML = html;
    }


    function loadDataIntoTable(filteredPost) {

      let html;

      html = filteredPost.map((item) => {
        return `
          <tr>
          <td>${item.name}</td>
          <td>${item.rank}</td>
          <td>${item.price}</td>
          <td>${item.change}</td>
          </tr>
        `
      }).join('')

      tbody.innerHTML = html;
    }









  }
  
  
