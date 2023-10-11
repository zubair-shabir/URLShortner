const shortBtn = document.getElementById('short-btn');
const reloadBtn = document.getElementById('reload-btn');
const copyBtn = document.getElementById('copy-btn');
let shortenUrlTextarea = document.getElementById("shortnedUrl");



shortBtn.addEventListener('click', shortenUrl);

function shortenUrl(){
    
    let originalUrl = document.getElementById('originalUrl').value;
    if(originalUrl == ""){
        (() => {
            Toastify({
                text: "Please Enter URL!",
                duration: 1000,
                offset: {
                    x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                    y: 50 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                  },
                  style: {
                    background : "#FF3333",
                    borderRadius:  "5px",
                    fontSize: "14px",
                  }
                }).showToast();
        })();
        return;
    }
    let apiUrl = "https://tinyurl.com/api-create.php?url=" + encodeURIComponent(originalUrl);
    

    fetch(apiUrl).then(response => response.text()).then(
        data => {
            shortenUrlTextarea.value = data;
            
            if(data != 'Error'){
                copyBtn.style.display = "block"
                
            }
        }).catch(Error => {
            shortenUrlTextarea.value = "Error : Unable to Shorten URL!"
        });
}




copyBtn.addEventListener('click' , () => {

    navigator.clipboard.writeText(shortenUrlTextarea.value);
    Toastify({
        text: "URL Copied!",
        duration: 2000,
        offset: {
            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 50 // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        
        }).showToast();
})

reloadBtn.addEventListener('click', () => {
    location.reload();
})