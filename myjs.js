//burger menu

function menuFunction() {
    var x = document.getElementById('myLinks');
    if (x.style.display === 'block') {
      x.style.display = 'none';
    } else {
      x.style.display = 'block';
    }
  }


// get users from link


const user = [];

async function getUsers() {
   return fetch("https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else throw new Error("user doesn't exist");
    })
    .then((data) => {
      createMainList(data);
      user.push(...data);
      return user;
    })
    .catch((err) => console.error(err));
}
getUsers()


async function createMainList(users) {
    let mainUl =  document.getElementById('main-ul');
    
    for (let i = 0; i < users.length; i++) {
        let userObj = encodeURIComponent(JSON.stringify(users[i]))
        mainUl.innerHTML += `<li data-user=${userObj } onclick="createCard(this)"> <a class="main-link" href="#"> ${users[i].name}</a> </li>`;
      }
}

function createCard(user){
    if (!user) return 
     
    let dataUser = user.getAttribute('data-user');
    let us = JSON.parse(decodeURIComponent(dataUser))
    

    document.getElementById('companyName').innerHTML = us.name;
    document.getElementById('gmailBox').innerHTML = us.email;
    document.getElementById('inputBox').value = us.boxes

    countTotalBays(us.boxes)
    
}



function countTotalBays(box){
    let sum = 0;
    let boxes = box?.split(/[, ]+/);


   boxes?.forEach(num => {
      if(!num) return 0;
      sum += +num
      
    });

    let totalBays = sum/10;

    document.getElementById('numOfBays').innerHTML = Math.ceil(totalBays);
}


