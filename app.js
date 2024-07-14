const getValue=(id)=>{
    value= document.getElementById(id).value;
    return value;
};

const changeModalText=(data)=>{
    document.getElementById("submitError").innerText=data;
    console.log((data))
}

const handleregister=(event)=>{
    event.preventDefault();
    console.log("hmm");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");
    const info = {
        first_name,
        last_name,
        email,
        password,
        confirm_password,
      };
      
    fetch("https://oasisarchivesapi.onrender.com/users/register/",{
        method :"POST",
        headers : {"content-type": "application/json"},
        body: JSON.stringify(info),
    })
    .then((res)=>res.json())
    .then((data) => {
        console.log(data);
        document.getElementById("submitError").innerText=data;
        document.getElementById("submitError").innerText=data["email"][0];
    });

};


const handleLogin = (event) =>{
    event.preventDefault();
    document.getElementById("spinner").innerHTML=`<span class="loading loading-spinner text-primary"></span>`
   
    const email= getValue('email')
    const password= getValue('password')
    const LoginInfo={
        email,
        password,
    }
    fetch("https://oasisarchivesapi.onrender.com/users/login/",{
        method :"POST",
        headers : {"content-type": "application/json"},
        body: JSON.stringify(LoginInfo),
    })
    .then((res)=>res.json())
    .then((data)=> {
        if (data.token && data.user_id){
            localStorage.setItem('token', data.token);
            localStorage.setItem('user_id', data.user_id);
            window.location.href = "authenticatedHomepage.html" ;
            
        }
        else{
            document.getElementById("error").innerText= data
        }
    });

    
};


const handlelogout=()=>{
    fetch(`https://oasisarchivesapi.onrender.com/users/logout/`)
    // .then((res)=>res.json())
    .then(()=>localStorage.clear())
    .then(()=>window.location.href= "Login_page.html");
    
}



const loadCatalogue= () =>{
    fetch("https://oasisarchivesapi.onrender.com/Books/")
    .then((res)=>res.json())
    .then((data)=>{
        const parent = document.getElementById("card-container");
        data.forEach((item)=>{
            bookId= item.id;
            const div= document.createElement("div");
            isLogged= localStorage.getItem("user_id");
            if (isLogged != null){

            // div.classList.add("flex")
            div.innerHTML=`
            <div class="card bg-violet-200/90 w-96 shadow-xl">
  <figure class="px-2 pt-2">
    <img
      src="${item.image}"
      alt="Book Image"
      class="rounded-xl w-full h-48 object-cover"
    />
  </figure>
  <div class="card-body text-left">
    <h2 class="card-title">
      <a target="_blank" href="book-details.html?BookId=${item.id}">
        <p class="text-primary">${item.title}</p>
        <br> by ${item.author}
      </a>
    </h2>
    <p>Publish Date: ${item.date}<br>Genre: ${item.genre}</p>
  </div>
</div>
            
            `;

            
            }
        else{

            div.innerHTML=`
             <div class="card bg-violet-200/90 w-96 shadow-xl">
  <figure class="px-2 pt-2">
    <img
      src="${item.image}"
      alt="Book Image"
      class="rounded-xl w-full h-48 object-cover"
    />
  </figure>
  <div class="card-body text-left">
    <h2 class="card-title">
      <a target="_blank" href="./Login_page.html">
        <p class="text-primary">${item.title}</p>
        <br> by ${item.author}
      </a>
    </h2>
    <p>Publish Date: ${item.date}<br>Genre: ${item.genre}</p>
  </div>
</div>
            
            `;
            
        }
        parent.appendChild(div);
        })
    })
    

};

loadCatalogue();
