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
        <button onclick="clickHandler(${categoryName.category_id})" class="nav-link " id="pills-home-tab" data-bs-toggle="pill" type="button">${categoryName.category_name}</button>
        `
        categoryLi.appendChild(categoryList)


    })
}

catagory();

const clickHandler = async (categoryId) => {
    const url = ` https://openapi.programming-hero.com/api/news/category/0${categoryId}`
    // console.log(url);
    const res = await fetch(url);
    const newsPortalData = await res.json();
    console.log(newsPortalData)
    const newsPortal = newsPortalData.data;
    console.log(newsPortal);

    const allNewsContainer = document.getElementById('news-container')
    allNewsContainer.textContent = '';


    newsPortal.forEach(newsCard => {
        // console.log(newsCard)
        const newsDiv = document.createElement("div");
        const itemFound = document.getElementById('items-found')
        // console.log(itemFound)
        const newsId = newsCard._id;
        itemFound.innerText = newsPortal.length;
        newsDiv.innerHTML = `
        
        <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-3">
                            <img src="${newsCard.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-9">
                            <div class="card-body mt-4">
                                <h5 class="card-title">${newsCard.title}</h5>
                                <p class="card-text">${newsCard.details.slice(0, 300)}...</p>
                                <p class="card-text">This may be provided through many different media: word of mouth, printing, postal systems, broadcasting, electronic communication, or through the testimony of observers and witnesses to events.</p>
                                <div class="row  row-cols-2  row-cols-md-4">
                                    <div class="col ">
                                        <div class="d-flex ">
                                            <div>
                                                <img src="${newsCard.author.img}" style="width: 40px;
                                                height: 40px; border-radius: 155px;" alt="">
                                            </div>
                                            <div class="d-flex flex-column ms-2 align-self-baseline">
                                                <p class="m-0 fw-bold">
                                                ${newsCard.author.name}
                                                </p>
                                                <p class="m-0">
                                                <small class="text-muted">${newsCard.author.published_date.slice(6, 16)}</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col ">
                                        <div class=" d-flex justify-content-center mt-3">
                                            <p><i class="fa-solid fa-eye"></i><span>1.5M</span>
                                            <p>
                                        </div>
                                    </div>
                                    <div class="col  mt-3">
                                        <p>
                                            <i class="fa-solid fa-star-half-stroke"></i>
                                            <i class="fa-regular fa-star"></i>
                                            <i class="fa-regular fa-star"></i>
                                            <i class="fa-regular fa-star"></i>
                                            <i class="fa-regular fa-star"></i>
                                        </p>
                                    </div>
                                    <div class="col ms-auto d-flex justify-content-center mt-3">
                                    <a  onclick="loadNewsDetails('${newsCard._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailModal"> <i class="fa-solid fa-arrow-right"></i></a>
                                </div>
                            </div>
    
                        </div>
                    </div>
                </div>
        
        `
        allNewsContainer.appendChild(newsDiv)

    })
}


const loadNewsDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    console.log(url);
    const res = await fetch(url)
    const data = await res.json();
    // console.log(data.data[0]);
    displayNewsDetails(data.data[0])
}

const displayNewsDetails = (newsInfo) => {
    console.log(newsInfo);
    const modalTitle = document.getElementById("newsDetailModalLabel");
    modalTitle.innerText = newsInfo.title;
    const newsDetails = document.getElementById('news-details');
    // console.log(newsDetails)
    newsDetails.innerHTML = `
        <small>Published date:${newsInfo.author.published_date}</small>
        <img class="img-fluid" src="${newsInfo.image_url}" alt="">
        <p></p>
        <p></p>
    `
}

