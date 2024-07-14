const handleReview=(event)=>{
    event.preventDefault();
    user_param= localStorage.getItem("user_id");
    book_param= new URLSearchParams(window.location.search).get("BookId");
    review= document.getElementById("submitReview").value;
    console.log(review);
    fetch("https://oasisarchivesapi.onrender.com/review/",{
      method: "POST",
      headers: {"content-type": "application/json; charset=UTF-8"},
      body: JSON.stringify({
        "book": book_param,
        "user": user_param,
        "body": review
    }),

    })
    .then((res)=>res.json())
    .then((data)=>{
      window.location.reload();
    })
    
}

user_param= localStorage.getItem("user_id");

const returnBook =(book_id)=>{
    console.log("return function");
    

    fetch(`https://oasisarchivesapi.onrender.com/borrow/?user_id=${user_param}&book_id=${book_id}`,)
    .then((res)=>res.json())
    .then((data)=>{
        data.forEach((info)=>{
            if (info.returned === false){

                fetch(`https://oasisarchivesapi.onrender.com/borrow/${info.id}/`,{
                method: "PUT",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({
                    "id": info.id,
                    "returned": true,
                    "book": book_id,
                    "user": user_param,
                })
            })
            .then(()=>{
                // localStorage.setItem("hasReturned", JSON.stringify(data))
                // console.log(data);
                location.reload();
              })
            }
    
            else{
            
            }
           
        })
        
        
        // .then(console.log("returned"))

        
    })
};


const handleBorrowlist=()=>{
    const parent=document.getElementById("borrowlist");
    // const returned = JSON.parse(localStorage.getItem("hasReturned"));
    // console.log(returned);
    parent.innerHTML= ``;

    fetch(`https://oasisarchivesapi.onrender.com/borrowed_books/?user_id=${user_param}&returned=False/`)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        document.getElementById("borrowLength").innerText=`${data.length} book(s) has been borrowed`
        data.forEach((info)=>{
          const div= document.createElement("div");
            div.innerHTML=`
            <div class="card bg-violet-200/90 w-96 shadow-xl">
  <figure class="px-2 pt-2">
    <img
      src="${info.image}"
      alt="Book Image"
      class="rounded-xl w-full h-48 object-cover"
    />
  </figure>
  <div class="card-body text-left">
    <h2 class="card-title">
      <a target="_blank" href="book-details.html?BookId=${info.id}">
        <p class="text-primary">${info.title}</p>
        <br> by ${info.author}
      </a>
    </h2>
    <p>Publish Date: ${info.date}<br>Genre: ${info.genre}</p>
    <button onclick="returnBook(${info.id})" id="returnedBook" class="btn btn-danger m-3">Return Now</button>
  </div>
</div>
            
            `;

        parent.appendChild(div);
        });

    })
}
handleBorrowlist();