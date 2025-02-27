const socket = io('ws://localhost:3500')      //using the script so we dont have to import

function sendMessage(e){
  e.preventDefault()  
  const input = document.querySelector('input') 
  if (input.value) {    
    socket.emit('message', input.value)       //emit the "message" event wiht the input.value
    input.value = ""      
  }
  input.focus()         
}

document.querySelector('form')     
  .addEventListener('submit', sendMessage)


socket.on("message", (data) => {
  const li = document.createElement('li')
  li.textContent = data
  document.querySelector('ul').appendChild(li)
}) 

