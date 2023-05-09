

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

             // Get existing data from local storage
             const savedData = JSON.parse(localStorage.getItem('savedData')) || [];

             // Add new data to array
             savedData.push({
                 input: input.value,
                 output: data.choices[0].message.content,
                 paraText: input.value // Add para text to saved data
             });
 
             // Save updated array to local storage
             localStorage.setItem('savedData', JSON.stringify(savedData));

           
            const para=document.createElement('p');
            para.textContent=input.value;
            para.addEventListener("click",(event)=>{
                const savedData = JSON.parse(localStorage.getItem('savedData'));
                const input = event.target.textContent;
                const output = savedData.find(data => data.input === input)?.output;
                if (output) {
                    displayText.textContent = output;
                  }
            })
            historyConatiner.append(para);

        }
        // console.log(data);
    }
    catch(error){
        console.log(error);

    }
}

// Load saved data on page load
window.addEventListener('load', () => {
    const savedData = JSON.parse(localStorage.getItem('savedData')) || [];
    savedData.forEach(data => {
      const para = document.createElement('p');
      para.textContent = data.paraText;
      para.addEventListener("click",(event)=>{
        const input = event.target.textContent;
        const output = savedData.find(data => data.input === input)?.output;
        if (output) {
          displayText.textContent = output;
        }
      });
      historyConatiner.append(para);
    });
  });


addChat.addEventListener("click",()=>{
    input.value="";
    displayText.textContent='';

})