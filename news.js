//*************************************************/ Dynamic Nav *******************************//
const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        fetch(url);
        const res = await fetch(url);
        const data = await res.json();
        displayCategories(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
}

const displayCategories = (categories) => {
    const newsCatagories = document.getElementById('new-catagory');
    categories.forEach(category => {
        // console.log(category);
        const categoryItem = document.createElement('li');
        categoryItem.classList.add('nav-item');
        categoryItem.innerHTML = `
        <a class="nav-link fw-bold p-2 ms-4" onclick= "loadNews('${category.category_id}')" href="#">${category.category_name}</a>
        `;
        newsCatagories.appendChild(categoryItem);
    });
}

//******************************************/ Dynamic News ***********************************************//
const loadNews = async (category_id) => {
    toggleSpinner(true);
    const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`;
    try {
        fetch(url);
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data);
    }
    catch (error) {
        console.log(error);
    }
}

const displayNews = (allNews) => {
    const allNewsItem = document.getElementById('all-news-item');
    allNewsItem.innerHTML = '';
    allNews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="card mb-3 mx-5">
        <div class="row g-0">
            <div class="col-md-4 col-sm-12">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details.slice(0, 500)}</p>
                    <div class="d-flex justify-content-around align-items-center">
                        <div class="d-flex align-items-center justify-content-around">
                            <img src="${news.author.img}" class="img-fluid rounded-circle" style="width:30px; height:30px;" alt="">
                            <div class="ps-2 pt-3">
                                <h6 class="m-0">${news.author.name ? news.author.name : "No name found"}</h6>
                                <p>${news.author.published_date ? news.author.published_date : "No date found"}</p>
                            </div>
                        </div>
                        <div class="d-flex align-items-center">
                            <i class="fa-regular fa-eye"></i>
                            <p class="fw-bold m-0 ps-1">${news.total_view ? news.total_view : "No views"}</p>
                        </div>
                        <div class="">
                            <i class="fa-sharp fa-solid fa-star" style="color: gray;"></i>
                            <i class="fa-sharp fa-solid fa-star" style="color: gray;"></i>
                            <i class="fa-sharp fa-solid fa-star" style="color: gray;"></i>
                            <i class="fa-sharp fa-solid fa-star" style="color: gray;"></i>
                            <i class="fa-regular fa-star-half-stroke" style="color: gray;"></i>
                        </div>
                        <div>
                            <button type="button" onclick="loadNewsDetails('${news._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
        allNewsItem.appendChild(newsDiv);
    });
    toggleSpinner(false);
}

//****************************************** News Modal *****************************************//
const loadNewsDetails = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    try {
        fetch(url);
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data[0]);
    }
    catch (error) {
        console.log(error);
    }
}

const displayNewsDetails = (newsDetails) => {
    // console.log(newsDetails);
    const newsDetailsModal = document.getElementById('news-details');
    newsDetailsModal.innerHTML = `
    <div>
     <img src="${newsDetails.image_url}" class="img-fluid">
    </div>
    <div class ="p-3">
     <h5>${newsDetails.title}</h5>
     <P style ="text-align: justify; text-justify: inter-word;">${newsDetails.details}</p>
    </div>
    <div class ="d-flex align-items-center justify-content-between">
     <div class="d-flex align-items-center ps-3">
        <img src="${newsDetails.author.img}" alt="" class="rounded-circle" style="height: 30px; width: 30px;">
       <div class="ps-2 pt-3">
        <h6 class ="m-0">${newsDetails.author.name ? newsDetails.author.name : "No name found"}</h6>
        <p>${newsDetails.author.published_date ? newsDetails.author.published_date : "No date found"}</p>
       </div>
     </div>
      <div class="d-flex align-items-center pe-3">
       <i class="fa-regular fa-eye"></i>
       <p class="fw-bold m-0 ps-1">${newsDetails.total_view ? newsDetails.total_view : "No view"}</p>
       </div>
    </div>
    `;
}

//************************************************* */ Toggle spinner *******************************************//
const toggleSpinner = isLoading => {
    const loderSection = document.getElementById('loader');
    if(isLoading){
        loderSection.classList.remove('d-none');
    }
    else{
        loderSection.classList.add('d-none');
    }
}

loadCategories();