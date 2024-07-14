

const getParams = () => {
    book_param = new URLSearchParams(window.location.search).get("BookId");
    user_param = localStorage.getItem("user_id");

    if (user_param) {
        fetch(`https://oasisarchivesapi.onrender.com/users/All_Users/${user_param}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.first_name);
                document.getElementById("username").innerText = `Hello ${data.first_name}`
            })

    }

    fetch(`https://oasisarchivesapi.onrender.com/Books/${book_param}`)
        .then((res) => res.json())
        .then((data) => loadDetails(data, user_param));

    fetch(`https://oasisarchivesapi.onrender.com/review/?book_id=${book_param}`)
        .then((res) => res.json())
        .then((data) => loadReview(data));
}

getParams();


const loadDetails = (data) => {
    user_id = localStorage.getItem("user_id");
    // data.forEach(info)=>
    const parent = document.getElementById("detail-box");
    const result = document.createElement("div");
    result.classList.add("flex","flex-wrap","justify-center");
    result.innerHTML = `
            <div class="book-image m-auto p-3 ">
            <img class="rounded" src="${data.image}" alt="Book Image">
        
        </div>
        <div class="book-details p-4 bg-white rounded-lg w-11/12 ">
            <h1  class="font-bold text-3xl text-red-900">${data.title}</h1>
            <h4  class="text-xl m-1">by ${data.author}</h4><br>
            
            <h1 class="m-2" >Genre: ${data.genre}</h1>
            <h1 class="m-2" >ISBN: ${data.ISBN}</h1>
            <h1 class="m-2" >Publishing date: ${data.date}</h1>
            <h2 class="m-2" >${data.numbers} Available right now</h2> <br> <br>
        <button id="borrow" onclick="AddWishOrBorrow(${data.id}, ${user_id}, 'borrow')" class="btn btn-success m-1" >Borrow now</button><br>
                <button id="wishlist" onclick="AddWishOrBorrow(${data.id}, ${user_id}, 'wish')" class="btn btn-warning m-1 " >Add to Wishlist</button></div>
        `

    parent.appendChild(result);
};




const loadReview = (info) => {

    const parent = document.getElementById("review");
    parent.innerHTML = `<h1 class="text-2xl m-2 text-center text-pink-900 p-2" >* ${info.length} Reviews till now*</h1>`

    info.forEach((review) => {

        fetch(`https://oasisarchivesapi.onrender.com/users/All_Users/${review.user}`)
            .then((res) => res.json())
            .then((data) => {


                const div = document.createElement("div")
                div.innerHTML = `
        
      <div class="reviews bg-gradient m-3 p-2 rounded">
  
      <h1 class=" m-1">💬 ${data.email}</h1>
      <p class="m-2 text-4xl" >${review.body}</p>
  
        `;
                parent.appendChild(div);

            })


    })



}


