user_param = localStorage.getItem("user_id");


const AddWishOrBorrow = (book_id, user_id, param) => {
  wishlishInfo = {
    user_id,
    book_id,
    param,
  };


  if (param === 'wish') {

    fetch(`https://oasisarchivesapi.onrender.com/wishlist/?user_id=${user_id}&book_id=${book_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length===0) {
          fetch("https://oasisarchivesapi.onrender.com/wishlist/", {
            method: "POST",
            headers: { "content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
              "book": book_id,
              "user": user_id,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              // localStorage.setItem()
            })
            .catch(error => {
              // Handle fetch errors
              console.error('There was a problem with the fetch operation:', error);
            })
          document.getElementById("wishlist").outerHTML = `
          <button class="btn btn-light" > ✔️Added to wishlist</button>
          `
      }
      else{
        document.getElementById("wishlist").outerHTML = `
          <button class="btn btn-light" > ✔️Already in wishlist</button>
          `

      }
    }
    )
  }
 
  else {
    fetch(`https://oasisarchivesapi.onrender.com/Books/${book_id}`)
    .then((res)=>res.json())
    .then((data)=>{
       if (data["numbers"]===0){
        document.getElementById("borrow").outerHTML = `
       
        <button class="btn btn-danger" > Not available now</button>
        `;
       }
       else{
        fetch(`https://oasisarchivesapi.onrender.com/borrow/?user_id=${user_id}&book_id=${book_id}&returned=False`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length===0) {
            console.log(" No data here");
          fetch("https://oasisarchivesapi.onrender.com/borrow/", {
            method: "POST",
            headers: { "content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
              "book": book_id,
              "user": user_id,
            }),
          })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch(error => {
              // Handle fetch errors
              console.error('There was a problem with the fetch operation:', error);
            })
          document.getElementById("borrow").outerHTML = `
       
       <button class="btn btn-light" > ✔️ Borrowed</button>
       `;
}
        else {

          document.getElementById("borrow").outerHTML = `
       
        <button class="btn btn-light" > ✔️Already Borrowed</button>
        `;

        }
      })

       }

    })

    


  }
}

const removeFromWish = (bookId) => {
  console.log("gotta remove from wishlist");
  fetch(`https://oasisarchivesapi.onrender.com/wishlist/?user_id=${user_param}&book_id=${bookId}`, {
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      fetch(`https://oasisarchivesapi.onrender.com/wishlist/${data[0].id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      })
        // .then((res)=>res.json())
        // .then((info)=>console.log(info))
        .then(() => {
          location.reload();
        })
    })

}

const handlewishlist = () => {
  const parent = document.getElementById("wishlist");
  // parent.innerHTML= ``;
  fetch(`https://oasisarchivesapi.onrender.com/Books/?user_id=${user_param}`)
    .then((res) => res.json())
    .then((data) => {
      const title = document.getElementById("wishLength") ; 
      title.innerText = `${data.length} book(s) in your wishlist `;
      title.classList.add('text-center', 'text-4xl', 'text-danger', 'm-4');
      parent.appendChild(title);
      data.forEach((info) => {
        const div = document.createElement("div");
        div.classList.add('card', 'w-50', 'm-auto', 'mt-2', 'bg-green-500/75', 'text-center', 'rounded-lg');
        div.innerHTML = `
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
    <button id="borrow" onclick="AddWishOrBorrow(${info.id}, ${user_param}, 'borrow')" class="btn btn-danger w-full m-auto my-1">Borrow Now</button>
      <button onclick="removeFromWish(${info.id})" class="btn btn-warning w-full m-auto my-1">Remove from wishlist</button>
  </div>
</div>
            
            `;
        parent.appendChild(div);
      });
    })

}


handlewishlist();




