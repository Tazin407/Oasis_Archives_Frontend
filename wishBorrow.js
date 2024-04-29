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
      const title = document.createElement("div");
      title.innerText = `${data.length} book(s) in your wishlist `;
      title.classList.add('text-center', 'text-4xl', 'text-danger', 'm-4');
      parent.appendChild(title);
      data.forEach((info) => {
        const div = document.createElement("div");
        div.classList.add('card', 'w-50', 'm-auto', 'mt-2', 'bg-green-500/75', 'text-center', 'rounded-lg');
        div.innerHTML = `
            <img class="w-25 m-auto mt-3" src="${info.image}" alt="Book image">
            <h5 class="card-header"> <a href="book-details.html?BookId=${info.id}"><span class="underline underline-offset-1">${info.title}</span></a><br> by ${info.author}</h5>
            
    <div class="card-body">
      <h5 class="card-title">genre: ${info.genre}</h5>
      <p class="card-text">ISBN: 30942573t498</p>

      <button id="borrow" onclick="AddWishOrBorrow(${info.id}, ${user_param}, 'borrow')" class="btn btn-danger m-3">Borrow Now</button>
      <button onclick="removeFromWish(${info.id})" class="btn btn-warning m-3">Remove from wishlist</button>
    </div>
            `;
        parent.appendChild(div);
      });
    })

}


handlewishlist();




