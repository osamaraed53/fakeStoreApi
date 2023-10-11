const endpoint = "https://fakestoreapi.com/products"
const query = "?limit=20"
// will contain product as object every product in different object
let arrOfObjectOffaceStore = [];

function Product (title=undefined,price=undefined,description=undefined,image="undefined",id=undefined){
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description ;
    this.image = image;
    this.displayData = function(){
        console.log(`title: ${this.title} price: ${this.price} description: ${this.description} img src: ${this.image} `);
    }
}

// this function and return it as a array of object google bard help me to add async and await
async function getDataFromFaceStoreApi(endpoint,query,arr){
    let new_arr = [];
    await fetch(`${endpoint}${query}`)
        .then(response=>response.json())
        .then(json=> {
            new_arr = json.map((item)=>{
                let obj = new Product(item.title, item.price, item.description, item.image);
            arr.push(obj);
        return obj;
        }
    )
    })
    .catch(error =>console.error("Error",error));
}


function dispalyCardOfFake(arr,id){
    let cards =document.querySelector("#cardsOfFake");
    const newCard = document.createElement("div");
    newCard.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${arr[id].image}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${arr[id].title}</h5>
            
            <p class="card-text"><small class="text-muted">${arr[id].price}</small></p>
        </div>
    </div>
    `;
    // <p class="card-text">${arr[id].description}</p>
    cards.appendChild(newCard);
 
}



// function dispalyCard(arr,id){
//     let cards =document.querySelector("#cards");
//     const newCard = document.createElement("div");
//     newCard.innerHTML = `
//     <div class="card" style="width: 18rem;">
//     <img class="card-img-top" src="${arr[id].image}" alt="Card image cap">
//         <div class="card-body">
//             <h5 class="card-title">${arr[id].title}</h5>
//             <p class="card-text">${arr[id].description}</p>
//             <p class="card-text"><small class="text-muted">${arr[id].price}</small></p>
//         </div>
//         <div class="card-body">
//             <a href="#" class="card-link">Update</a>
//             <a href="#" class="card-link">Delete</a>
//         </div>
//     </div>
//     `;
//     cards.appendChild(newCard);
 
// }


function dispalyAllCards(arr ,lenOfArr ,opreation){
    for(let i=0;i<lenOfArr ; i++){
        opreation(arr,i);
    }
}



async function fakeStore() {
  await getDataFromFaceStoreApi(endpoint,query,arrOfObjectOffaceStore);

  // Check the length of the arrOfObject array before calling the dispalyAllCards() function.
  if (arrOfObjectOffaceStore.length > 0) {
    dispalyAllCards(arrOfObjectOffaceStore,arrOfObjectOffaceStore.length,dispalyCardOfFake);
    console.log("go")
  } else {
    console.log("No products found.");
  }
}

// async and await*****************

fakeStore();

// -------------------------------------------------------------------



// function Post (id=undefined,title=undefined,content=undefined){
//     this.id = id;
//     this.title = title;
//     this.content = content;
//     this.displayData = function(){
//         console.log(`id: ${this.id} title: ${this.title} content: ${this.content}`);
//     }
// }


function displayDataInCard(obj,index){
    let form1=  document.getElementById("cards");
    const newPost = document.createElement("div");
    newPost.innerHTML =`<div class="card">
    <div class="card-body">
      <h5 class="card-title">${obj[index].title}</h5>
      <p class="card-text">${obj[index].content}</p>
      <a data-id=${obj[index].id} href="#add_button" class="btn btn-primary update">update</a>
      <a data-id=${obj[index].id} href="" class="btn btn-primary delete">delete</a>
    </div>
  </div>

    `
    form1.appendChild(newPost);
}



async function getDataFromJson(id=''){
    
    const response = await fetch(`http://localhost:3000/posts/${id}`);
    const data = await response.json();
    return data;

}


async function main(){

    const data = await getDataFromJson();
    dispalyAllCards(data,data.length,displayDataInCard);

}


const form1=  document.getElementById("form1");

form1.add.addEventListener("click", function(event){
    event.preventDefault();
    const title = form1.title.value ;
    const content =form1.title.value ;
    let newPost = {title,content};
    console.log(newPost)

    fetch('http://localhost:3000/posts',
    {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost)
    })
    .then(response => response.JSON() )
    .then(sendData =>displayDataInCard(sendData) )


}
)

let cards=  document.getElementById("cards");
cards.addEventListener("click" , (event)=>{
    if(event.target.classList.contains("delete")){
        const idof = event.target.getAttribute("data-id")
         fetch (`http://localhost:3000/posts/${idof}`,{
        method: "DELETE",
         })
        .then(() => console.log("done"))
         }
 
});



cards.addEventListener("click" , (event)=>{
    if(event.target.classList.contains("update")){
        const idof = event.target.getAttribute("data-id")
        let titles = prompt("new title")
        let contents = prompt("new content")

         fetch (`http://localhost:3000/post/${idof}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(
            {title : titles,
            content:contents}
            ),
         })
        .then(() => retrive())
         }
 
});



main()
