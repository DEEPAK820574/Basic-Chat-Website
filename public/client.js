const socket=io();
let fname;
let textarea= document.querySelector("textarea");
let messageArea=document.querySelector('.message_area');
console.log(textarea);

 do{
    fname=prompt("enter your name:");
 }while(!fname);

/* textarea.addEventListener('keyup',(event)=>{
   if(event.keyCode === 13){
      sendMessage(event.target.value);
   }
});*/
textarea.addEventListener("keydown", function(event) {
   if (event.keyCode === 13) {
      sendMessage(event.target.value);
   }
 });

 function  sendMessage(message){
      
   /* let msg={
        user:fname,
        message:message.trim()
    };*/

    appendMessage({
      user:fname,
      message:message.trim()
  },"outgoing");

  textarea.value='';

  scrollDown();

    socket.emit("message",{
      user:fname,
      message:message.trim()
  });
 };

 function  appendMessage(msg,type){
    let mainDiv=document.createElement("div");
    let className=type;
    mainDiv.classList.add(className, "message");

 
    mainDiv.innerHTML=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
`;
    messageArea.appendChild(mainDiv);
   
 };

 //response
socket.on('message',(msg)=>{
  appendMessage(msg,'incoming');
  scrollDown();
   });


   function scrollDown(){
      messageArea.scrollTop=messageArea.scrollHeight;
   }