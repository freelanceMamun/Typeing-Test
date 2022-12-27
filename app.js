// GLOVBAL VARIABLE 
let qoute = "" ,
    time  = 60 ,
    timer = "",
    mistaks = 0 ;



const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100"

const qouiteSection = document.querySelector("#quote");
const userInput =  document.querySelector("#quote-input");

window.onload = ()=>{
    userInput.value = "";
    document.querySelector("#start-test").style.display = "block";
    document.querySelector("#stop-test").style.display  = "none";
    userInput.disabled = true ;
    renderNewQoute();
}


const renderNewQoute = async () =>{
      const response =  await fetch(quoteApiUrl);
      let data = await response.json();
     qoute = data.content ;
     let arr = qoute.split("").map((value)=>{
        return "<span class='quote-chars'>"+ value +"</span>";
            
     });
     qouiteSection.innerHTML += arr.join("")
   
}

userInput.addEventListener("input",()=>{
    let qouteChares = document.querySelectorAll(".quote-chars") ;
     qouteChares =  Array.from(qouteChares)

     let userInputChares =  userInput.value.split("") ;
     qouteChares.forEach((char,index)=>{
        if(char.innerText == userInputChares[index]){
            char.classList.add("success");

        }else if (userInputChares[index] == null){
            if(char.classList.contains("success")){
                char.classList.remove("success")
            }else{
                char.classList.remove("fail");
            }
        }else{
            if(!char.classList.contains("fail")){
                   
                mistaks += 1
                char.classList.add("fail");
            }

            document.querySelector("#mistakes").innerText = mistaks ;
        }
         
        let check = qouteChares.every((elemtnt)=>{
            return elemtnt.classList.contains("success");
             
        });
        if(check){
            displayResult();
        }

     });


});

function updateTimer() {
    if (time == 0) {
      //End test if timer reaches 0
      displayResult();
    } else {
      document.getElementById("timer").innerText = --time + "s";
    }
  }
  
// Timer  
const timeReduce = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);
  };



const displayResult = () => {
    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    document.querySelector("#stop-test").style.display = "none";
    userInput.disabled = true ;
    let timeTake = 1 ;
    if(time != 0){
       timeTake = (60 - time)/ 100 ;
      }
       document.getElementById("wpm").innerText =
      (userInput.value.length / 5 / timeTake).toFixed(2) + " wpm";
    document.getElementById("accuracy").innerText =
      Math.round(
        ((userInput.value.length - mistaks) / userInput.value.length) * 100
      ) + " %";

};


const startTest = () => {
    mistaks  = 0 ;
    timer = "" ;
    userInput.disabled = false ;
    timeReduce();
    document.querySelector("#start-test").style.display = "none";
    document.querySelector("#stop-test").style.display = "block";

};




