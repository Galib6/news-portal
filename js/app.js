let array = [];
const catagory = async () => {
    const url = "https://openapi.programming-hero.com/api/news/categories";
    const res = await fetch(url);
    const catagoryListData = await res.json()
    const categoryes = catagoryListData.data.news_category
    // console.log(categoryes)
    const categoryLi = document.getElementById("pills-tab");
    categoryes.forEach(categoryName => {
        // console.log(categoryName);
        const categoryList = document.createElement('li');
        categoryList.classList.add("nav-item");
        categoryList.innerHTML = `
        <button onclick="clickHandler(${categoryName.category_id}, '${categoryName.category_name}')" class="nav-link " id="pills-home-tab" data-bs-toggle="pill" type="button">${categoryName.category_name}</button>
        `
        categoryLi.appendChild(categoryList)


    })
}

catagory();


const clickHandler = async (categoryId, categoryName) => {
    toggleSpinner(true);
    const url = ` https://openapi.programming-hero.com/api/news/category/0${categoryId}`
    // console.log(url);
    const res = await fetch(url);
    const newsPortalData = await res.json();
    // console.log(newsPortalData)
    const newsPortal = newsPortalData.data;
    // console.log(newsPortal);

    const itemFound = document.getElementById('items-found')
    // console.log(itemFound)
    itemFound.innerText = newsPortal.length;

    const foundCategory = document.getElementById("found-category");
    // console.log(categoryName);
    foundCategory.innerText = categoryName;

    // console.log(newsPortal.length)

    const noNews = document.getElementById('no-found-messege')
    if (newsPortal.length === 0) {
        toggleSpinner(false);
        noNews.classList.remove('d-none');
    }
    else {
        noNews.classList.add('d-none');
    }
    addingNewsCard(newsPortal);
    array = [];
    newsPortal.forEach(news => {
        array.push(news);
        // console.log(array)
    })

};
// short by 
const shotingcard = (value) => {
    if (value === true) {
        array.sort(function (a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            }
            if (a.title.toLowerCase() > b.title.toLowerCase()) { return 1; }
            return 0;
        });

    }
    else if (value === 5) {
        array.sort((a, b) => {
            return b.total_view - a.total_view;
        });

    }
    else {
        array.sort(function (a, b) {
            if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
            if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
            return 0;
        });
    }


    addingNewsCard(array);
}

// Trending 

const todayPickFilter = () => {
    const array1 = [];
    array.forEach(element => {
        const isTodaysPick = (element.others_info.is_todays_pick)
        if (isTodaysPick === true) {
            array1.push(element);
        }
        else {
            return
        }


    })
    try {
        array1.push(element)
    }
    catch (err) {
        console.log(err)
    }
    // array.others_info.is_todays_pick
    console.log(array1)
    addingNewsCard(array1);
}
const todayTrendingFilter = () => {
    const array2 = [];
    array.forEach(element => {
        const isTrendingPick = (element.others_info.is_trending)
        // console.log(isTrendingPick);
        if (isTrendingPick === true) {
            array2.push(element);
        }
        else {
            return
        }
        try {
            array1.push(element)
        }
        catch (err) {
            console.log(err)
        }

    })
    // array.others_info.is_todays_pick
    console.log(array2)
    addingNewsCard(array2);
}



const addingNewsCard = (arrayValue) => {
    const allNewsContainer = document.getElementById('news-container')
    allNewsContainer.textContent = '';
    const itemFound = document.getElementById('items-found')
    // console.log(itemFound)
    itemFound.innerText = arrayValue.length;

    arrayValue.forEach(newsCard => {
        // console.log(newsCard)
        const newsDiv = document.createElement("div");
        newsDiv.innerHTML = `
        
        <div class="card mb-3 shadow p-3 mb-5 bg-white rounded border-0" onclick="loadNewsDetails('${newsCard._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailModal">
                    <div class="row g-0">
                        <div class="col-md-3">
                            <img src="${newsCard.thumbnail_url}" class="img-fluid rounded-start w-100" alt="...">
                        </div>
                        <div class="col-md-9">
                            <div class="card-body mt-4">
                                <h3 class="card-title">${newsCard.title}</h3>
                                <p class="card-text">${newsCard.details.slice(0, 300)}...</p>
                                <p class="card-text">This may be provided through many different media: word of mouth, printing, postal systems, broadcasting, electronic communication, or through the testimony of observers and witnesses to events.</p>
                                <div class="row  row-cols-2  row-cols-md-4">
                                    <div class="col ">
                                        <div class="d-flex ">
                                            <div>
                                                <img src="${newsCard.author.img ? newsCard.author.img : "image not found"}" style="width: 40px;
                                                height: 40px; border-radius: 155px;" alt="">
                                            </div>
                                            <div class="d-flex flex-column ms-2 align-self-baseline">
                                                <p class="m-0 fw-bold">
                                                ${newsCard.author.name ? newsCard.author.name : "confidential"}
                                                </p>
                                                <p class="m-0">
                                                <small class="text-muted">${newsCard.author.published_date ? newsCard.author.published_date : "Confidential"}</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col ">
                                        <div class=" d-flex justify-content-center mt-3">
                                            <p class= "text-warning"><i class="fa-solid fa-eye"></i><span class="ms-2">${newsCard.total_view ? newsCard.total_view : "Not found"}</span>
                                            <p>
                                        </div>
                                    </div>
                                    <div class="col  mt-3">
                                        <p class= "text-warning">
                                            <i class="fa-solid fa-star-half-stroke"></i>
                                            <i class="fa-regular fa-star"></i>
                                            <i class="fa-regular fa-star"></i>
                                            <i class="fa-regular fa-star"></i>
                                            <i class="fa-regular fa-star"></i>
                                        </p>
                                    </div>
                                    <div class="col ms-auto d-flex justify-content-center mt-3">
                                    <a class= "text-warning" onclick="loadNewsDetails('${newsCard._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailModal"> <i class="fa-solid fa-arrow-right"></i></a>
                                </div>
                            </div>
    
                        </div>
                    </div>
                </div>
        
        `
        allNewsContainer.appendChild(newsDiv);
        toggleSpinner(false);
    })
}


const loadNewsDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    // console.log(url);
    const res = await fetch(url)
    const data = await res.json();
    // console.log(data.data[0]);
    displayNewsDetails(data.data[0])
}

const displayNewsDetails = (newsInfo) => {
    // console.log(newsInfo);
    const modalTitle = document.getElementById("newsDetailModalLabel");
    modalTitle.innerText = newsInfo.title;
    const newsDetails = document.getElementById('news-details');
    // console.log(newsDetails)
    newsDetails.innerHTML = `
    
        <small>Published date:${newsInfo.author.published_date}</small>
        <br>
        <img class="img-fluid w-100 py-3" src="${newsInfo.image_url}" alt="">
        <p>${newsInfo.details}</p>
        <p class="Text-primary py-3">Total View : ${newsInfo.total_view ? newsInfo.total_view : "Confidential"}</p>
    `
}

const toggleSpinner = isloading => {
    const loaderSection = document.getElementById('loader');
    if (isloading) {
        loaderSection.classList.remove("d-none");
    }
    else {
        loaderSection.classList.add('d-none')
    }
}
clickHandler(8, "All News");

