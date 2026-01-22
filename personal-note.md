AJAX - Asynchronous Java Script and xml 


syntax for the fetch command is
This code should be inside the anonymous function in event listener or in a separate function  

	fetch(// url)
	.then(function(response){
		return: response
	})
	.then(function(data){
		//use the data here
	})
	.catch(function(error){
		//things to do when error occured
	})

trick to remember the syntax fetch the URL then we get response and then we can use the data 

**async/await version**
async must be added in the function where await is used
	
	async function pdfDownload(){
		try{
	
	            const response = await fetch(index);
	
	            const data = await response.text();
	
	            const parser = new DOMParser();
	
	            const indexDom = parser.parseFromString(data, "text/html");
	
	            indexFileFetcher(indexDom, introSection, skillSection);
	
	        }catch(error){
	
	            alert(error);
	
	        }
	}