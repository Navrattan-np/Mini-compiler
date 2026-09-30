const runBtn = document.querySelector("#run-button button");
const text = document.querySelector("#code");
const output = document.querySelector("#output-text");

runBtn.addEventListener("click", async function() {
      let code = text.value;
      
      if(code.trim() === ""){
        console.log("Code is empty");
        return;
      }

      runBtn.innerText = "Running...";
      
      // Point to your new Vercel serverless function
      const targetUrl = "/api/compile";

      try {
         const response = await fetch(targetUrl, {
             method: 'POST',
             headers : {
               "Content-Type": "application/json"
             },
             // Notice we DO NOT send keys here anymore
             body: JSON.stringify({
                script: code,
                language: "cpp",
                versionIndex: "5"
             })
         });

         const data = await response.json();
         console.log("Api response: ", data);
         
         if (data.output) {
             output.innerText = data.output;
         } else if (data.error) {
             output.innerText = data.error;
         }

      } catch(error) {
         console.log("Network error: ", error);
         output.innerText = "Network error occurred.";
      } finally {
         runBtn.innerText = "Run";
      }
});