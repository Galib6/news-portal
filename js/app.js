const catagory = async () => {
    const url = "https://openapi.programming-hero.com/api/news/categories";
    const res = await fetch(url);
    const catagoryListData = await res.json()
    const categoryes = catagoryListData.data.news_category
    console.log(categoryes)
    const categoryLi = document.getElementById("pills-tab");
    categoryes.forEach(categoryName => {
        console.log(categoryName);
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
    const newsPortalData = await res.json()
    console.log(newsPortalData)
    const newsPortal = newsPortalData.data;
    console.log(newsPortal);

    const allNewsContainer = document.getElementById('news-container')


    newsPortal.forEach(newsCard => {
        console.log(newsCard)
        const newsDiv = document.createElement("div");
        newsDiv.innerHTML = `
        
        <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="..." class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${newsCard.title}</h5>
                                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                                    additional content. This content is a little bit longer.</p>
                                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                                    additional content. This content is a little bit longer.</p>
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                <div class="row  row-cols-2  row-cols-md-4">
                                    <div class="col ">
                                        <div class="d-flex ">
                                            <div>
                                                <img src="images/student/student-5.png" alt="">
                                            </div>
                                            <div class="d-flex flex-column ms-2 align-self-baseline">
                                                <p class="m-0 fw-bold">
                                                    Awlad Hossain
                                                </p>
                                                <p class="m-0">
                                                    UI Designer
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
                                        <p><i class="fa-solid fa-arrow-right"></i></p>
                                    </div>
                                </div>
                            </div>
    
                        </div>
                    </div>
                </div>
        
        `
        allNewsContainer.appendChild(newsDiv)

    })




}


