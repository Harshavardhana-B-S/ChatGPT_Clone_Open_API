const submitBtn=document.getElementById("submit");
const displayText=document.querySelector(".outputBox")
const input=document.getElementById("inputTag");
const historyConatiner=document.querySelector(".historyConatiner");
const addChat=document.querySelector(".addChat");

submitBtn.addEventListener("click",displayMessage);

async function displayMessage(){
    // console.log("clicked")

    const Options={
        method:'POST',
        headers:{
            'Authorization':`Bearer ${API_KEY}`,
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: input.value}],
            max_tokens: 100
        })
    }
    
    
    try{
        const response= await fetch('https://api.openai.com/v1/chat/completions', Options);
        const data = await response.json();
        displayText.textContent= data.choices[0].message.content;
        if(data.choices[0].message.content){
            const para=document.createElement('p');
            para.textContent=input.value;
            historyConatiner.append(para);

        }
        // console.log(data);
    }
    catch(error){
        console.log(error);

    }
}

addChat.addEventListener("click",()=>{
    input.value="";
    displayText.textContent='';

})