const addPlayerBtn = document.getElementById("addPlayer")
const position = document.getElementById("position")
const username = document.getElementById("userName")
const age = document.getElementById("age")
const team = document.getElementById("team")
const displayName = document.getElementById("displayName")
const displayImg = document.getElementById("displayImg")
const displayAge = document.getElementById("displayAge")
const displayTeam = document.getElementById("displayTeam")
const displayPosition = document.getElementById("displayPosition")
const displayHome = document.getElementById("displayHome")
const deleteBtn = document.getElementById("deletePlayer")
const displayAway = document.getElementById("displayAway")

const playerArray = []
const playerArrayAway = []


class addPlayer {
    constructor(username, position, age, team, image) {
        this.username = username,
        this.position = position,
        this.age = age,
        this.team = team,
        this.image = displayImg.src
    }
}
addPlayerBtn.addEventListener("click", ()=>{
    stadium.style.display = "none"
    show.forEach((field)=>{
        field.style.display = "block"
    })
    let uploadTag = document.getElementById("upload")
    let upload = uploadTag.files[0]
    displayName.innerHTML = "Name: "+username.value
    displayAge.innerHTML = "Age: "+age.value
    displayTeam.innerHTML = "Team: "+team.value
    displayPosition.innerHTML = "Position: "+position.value
    if(!username.value || !age.value){
        alert("Enter Player information")
    }
    else if(age.value.match(/^[^0-9]+$/)){
        alert("Age should be in number format")
    }
    else if(displayHome.childElementCount > 10 && team.value == "Home"){
        alert("Home squad is full")
    }
    else if(displayAway.childElementCount > 10 && team.value == "Away"){
        alert("Away squad is full")
    }
    else if(document.querySelector(".display"+team.value +" ."+position.value) != null){
        alert("position already taken")
        username.value = ""
        age.value = ""
        displayImg.src = "images/user.png"
        uploadTag.value = ""
    }
    else if (upload == undefined){
        displayImg.src = "images/user.png"
        let player = new addPlayer(username.value, position.value, age.value, team.value,displayImg.src)
        if (team.value == "Home") {
            playerArray.push(player)
        }
        else{
            playerArrayAway.push(player)
        }
        username.value = ""
        age.value = ""
        displayImg.src = "images/user.png"
        uploadTag.value = ""
        if(team.value == "Home"){
            mapHome()
        }
        else{
            mapAway()
        }
    }
    else{
        const reader = new FileReader
        reader.addEventListener("load", (e)=>{
            const img = e.target.result
            displayImg.src = img
            let player = new addPlayer(username.value, position.value, age.value, team.value,img)
            if (team.value == "Home") {
                playerArray.push(player)
            }
            else{
                playerArrayAway.push(player)
            }
            username.value = ""
            age.value = "" 
            uploadTag.value = ""
            if(team.value == "Home"){
                mapHome()
            }
            else{
                mapAway()
            }
        })
        reader.readAsDataURL(upload)
    }
})

const mapHome = () =>{
    let display = document.getElementById(`displayHome`)
    display.innerHTML = ""
    playerArray.map((output, index)=>{
        display.innerHTML += `
            <div class="eachPlayer ${output.position}" onclick="display('${index}','${output.team}')">
                <div class="round"><img src="${output.image}" alt=""></div>
                <p>${output.username}</p>
            </div>
        `
    })
        // alert("Player signed successfully")
}

const mapAway = () =>{
    let display = document.getElementById(`displayAway`)
    display.innerHTML = ""
    playerArrayAway.map((output, index)=>{
        display.innerHTML += `
            <div class="eachPlayer ${output.position}" onclick="display('${index}','${output.team}')">
                <div class="round"><img src="${output.image}" alt=""></div>
                <p>${output.username}</p>
            </div>
        `
    })
        
}

let outIndex;
let teamOut

const display = (index, teamOutput) =>{
    const displayName = document.getElementById("displayName")
    const displayImg = document.getElementById("displayImg")
    const displayAge = document.getElementById("displayAge")
    const displayTeam = document.getElementById("displayTeam")
    const displayPosition = document.getElementById("displayPosition")
    outIndex = index
    teamOut = teamOutput
    document.querySelector(".playerEdit").style.display = "flex"
    if (teamOutput == "Home"){
        displayName.innerHTML = "Name: "+playerArray[index].username
        displayAge.innerHTML = "Age: "+playerArray[index].age
        displayTeam.innerHTML = "Team: "+playerArray[index].team
        displayPosition.innerHTML = "Position: "+playerArray[index].position
        displayImg.src = playerArray[index].image
    }
    else{
        displayName.innerHTML = "Name: "+playerArrayAway[index].username
        displayAge.innerHTML = "Age: "+playerArrayAway[index].age
        displayTeam.innerHTML = "Team: "+playerArrayAway[index].team
        displayPosition.innerHTML = "Position: "+playerArrayAway[index].position
        displayImg.src = playerArrayAway[index].image
    }
}


const editPlayer = document.getElementById("editPlayer")
const saveChanges = document.getElementById("saveChanges")
const editDialogue = document.querySelector(".edit")
const section = document.querySelector("section")
const editUsername = document.getElementById("editUsername")
const editAge = document.getElementById("editAge")
const editDisplayImg = document.getElementById("editDisplayImg")
let editImg = document.getElementById("upload2")
let base64;
editPlayer.addEventListener("click", ()=>{
    editDialogue.style.display = "flex"
    section.style.filter = "blur(10px)"
    if (teamOut == "Home") {
        editUsername.value = playerArray[outIndex].username
        editAge.value = playerArray[outIndex].age
        editDisplayImg.src = playerArray[outIndex].image
    }
    else{
        console.log(playerArrayAway);
        
        editUsername.value = playerArrayAway[outIndex].username
        editAge.value = playerArrayAway[outIndex].age
        editDisplayImg.src = playerArrayAway[outIndex].image
    }
})
editImg.addEventListener("change", ()=>{
    const file = editImg.files[0]
    const reader = new FileReader
    reader.addEventListener("load", (e)=>{
        base64 = e.target.result
        editDisplayImg.src = base64
        // console.log(playerArray[index]);
    })
    reader.readAsDataURL(file)
})
saveChanges.addEventListener("click", ()=>{
    console.log(editImg.files);
    
    if (editImg.files[0] == undefined ) {
        if(teamOut == "Home"){
            let player = new addPlayer(editUsername.value, playerArray[outIndex].position, editAge.value, playerArray[outIndex].team,playerArray[outIndex].image)
            playerArray.splice(outIndex,1,player)
        }
        else{
            let player = new addPlayer(editUsername.value, playerArrayAway[outIndex].position, editAge.value, playerArrayAway[outIndex].team,playerArrayAway[outIndex].image)
            playerArrayAway.splice(outIndex,1,player)
        }
        editDialogue.style.display = "none"
        section.style.filter = "blur(0px)"
    }
    else{
        if(teamOut == "Home"){
            let player = {
                username: editUsername.value,
                position: playerArray[outIndex].position,
                age: editAge.value,
                team:playerArray[outIndex].team,
                image: base64
            }
            playerArray.splice(outIndex,1,player)
        }
        else{
            let player = {
                username: editUsername.value,
                position: playerArrayAway[outIndex].position,
                age: editAge.value,
                team:playerArrayAway[outIndex].team,
                image: base64
            }
            playerArrayAway.splice(outIndex,1,player)
        }
        editDialogue.style.display = "none"
        section.style.filter = "blur(0px)"
        if(teamOut == "Home"){
            const display = document.getElementById(`displayHome`)
                display.innerHTML = ""
                playerArray.map((output, index)=>{
                    display.innerHTML += `
                        <div class="eachPlayer ${output.position}" onclick="display('${index}','${output.team}')">
                            <div class="round"><img src="${output.image}" alt=""></div>
                            <p>${output.username}</p>
                        </div>
                    `
                })
        }
        else{
            const display = document.getElementById(`displayAway`)
                display.innerHTML = ""
                playerArrayAway.map((output, index)=>{
                    display.innerHTML += `
                        <div class="eachPlayer ${output.position}" onclick="display('${index}','${output.team}')">
                            <div class="round"><img src="${output.image}" alt=""></div>
                            <p>${output.username}</p>
                        </div>
                    `
                })
        }
    }
    if(teamOut == "Home"){
        displayName.innerHTML = "Name: "+playerArray[outIndex].username
        displayAge.innerHTML = "Age: "+playerArray[outIndex].age
        displayTeam.innerHTML = "Team: "+playerArray[outIndex].team
        displayPosition.innerHTML = "Position: "+playerArray[outIndex].position
        displayImg.src = playerArray[outIndex].image
    }
    else{
        displayName.innerHTML = "Name: "+playerArrayAway[outIndex].username
        displayAge.innerHTML = "Age: "+playerArrayAway[outIndex].age
        displayTeam.innerHTML = "Team: "+playerArrayAway[outIndex].team
        displayPosition.innerHTML = "Position: "+playerArrayAway[outIndex].position
        displayImg.src = playerArrayAway[outIndex].image
    }
    editImg.value = ""
})

deleteBtn.addEventListener("click", ()=>{
    if(teamOut == "Home"){
        playerArray.splice(outIndex,1)
        const displayHome = document.getElementById(`displayHome`)
            displayHome.innerHTML = ""
            playerArray.map((output, index)=>{
                displayHome.innerHTML += `
                    <div class="eachPlayer ${output.position}" onclick="display('${index}','${output.team}')">
                        <div class="round"><img src="${output.image}" alt=""></div>
                        <p>${output.username}</p>
                    </div>
                `
            })
        console.log(playerArray);
        
    }
    else{
        playerArrayAway.splice(outIndex,1)
        const displayAway = document.getElementById(`displayAway`)
        displayAway.innerHTML = ""
        playerArrayAway.map((output, index)=>{
            displayAway.innerHTML += `
                <div class="eachPlayer ${output.position}" onclick="display('${index}','${output.team}')">
                    <div class="round"><img src="${output.image}" alt=""></div>
                    <p>${output.username}</p>
                </div>
            `
        })
        console.log(playerArrayAway);
        
    }
    displayName.innerHTML = "Name: Null"
    displayAge.innerHTML = "Age: Null"
    displayTeam.innerHTML = "Team: Null"
    displayPosition.innerHTML = "Position: Null"
    displayImg.src = "images/user.png"
    document.querySelector(".playerEdit").style.display = "none"
})


homeMan.src = "images/ancelotti.jpeg"
const manHomeValue = document.getElementById("homeManSelect")
manHomeValue.addEventListener("change", ()=>{
    const manImg = document.getElementById("homeMan")
    manImg.src = "images/"+manHomeValue.value+".jpeg"
})

const manAwayValue = document.getElementById("awayManSelect")
manAwayValue.addEventListener("change", ()=>{
    const manImg = document.getElementById("awayMan")
    manImg.src = "images/"+manAwayValue.value+".jpeg"
})


// 
const formation = document.getElementById("formation")
const stadium = document.getElementById("stadium")
const stadiumBtn = document.getElementById("stadiumBtn")
const show = document.querySelectorAll(".show")
formation.addEventListener("click", ()=>{
    stadium.style.display = "none"
    show.forEach((field)=>{
        field.style.display = "block"
    })
})

let counter = 1
stadiumBtn.addEventListener("click", ()=>{
    counter++;
    if(counter <=7){
        stadium.src = "images/"+counter+".jpeg"
    }
    else{
        counter = 0
    }
    stadium.style.display = "block"
    show.forEach((field)=>{
        field.style.display = "none"
    })
})

