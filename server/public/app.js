const socket = io('ws://localhost:3500')   

const activity = document.querySelector('.activity')        //get activity varible
const msgInput = document.querySelector('input')            //make input variable global

function sendMessage(e){
  e.preventDefault()   
  if (msgInput.value) {    
    socket.emit('message', msgInput.value)       
    input.value = ""      
  }
  input.focus()         
}

document.querySelector('form')     
  .addEventListener('submit', sendMessage)


socket.on("message", (data) => {
  activity.textContent = ""
  const li = document.createElement('li')
  li.textContent = data
  document.querySelector('ul').appendChild(li)
}) 

msgInput.addEventListener('keypress', ()=>{           //msg input is having the keypress event
  socket.emit('activity', socket.id.substring(0,5))   //emit actity event with socket id as data
})

let activityTimer

socket.on('activity', (name)=>{
  activity.textContent = `${name} is typing...`

  //Clear after 3 seconds
  clearTimeout(activityTimer)   //resets the time
  activityTimer = set(()=>{
    activity.textContent=""
  }, 3000)
})

