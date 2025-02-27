const socket = new WebSocket('ws://localhost:3000')
console.log("hi")
function sendMessage(e){
  e.preventDefault()  //Don't reload page
  const input = document.querySelector('input') //get input element
  if (input.value) {    
    socket.send(input.value)
    input.value = ""      //restart input element
  }
  input.focus()         //focus back onto the input
}

document.querySelector('form')     
  .addEventListener('submit', sendMessage) //lsiten for a submit form form then send message funciton

//Listen for messages
socket.addEventListener("message", ({data}) => {//destrcture message obejct when we receive one
  const li = document.createElement('li')
  li.textContent = data
  document.querySelector('ul').appendChild(li)
}) 

