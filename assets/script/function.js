let savedTheme = localStorage.getItem("theme")

document.addEventListener('DOMContentLoaded',() =>{
    let themeBtn = document.createElement('button');
    let btnSection = document.querySelector('.btn-section');
    let pdfBtn = document.createElement('button');

    btnSection.appendChild(themeBtn);
    btnSection.appendChild(pdfBtn);

    pdfBtn.textContent = "Download Resume"
    
    
    
        
        //applying the dark theme here    
        function darkTheme(){    
            let navBar = document.querySelector(".navbar");
            navBar.setAttribute("data-bs-theme","dark");

            let header = document.querySelector(".header-light");
            if (header){
                header.classList.replace("header-light", "header-dark");
            }
            

            let bodyTheme = document.querySelector(".body-color") || document.querySelector(".body-white-theme");  
            if (bodyTheme.classList.contains("body-white-theme")){
                bodyTheme.classList.replace("body-white-theme", "body-color");
            }

            //this only applicable in experience.html
            let categoriesExp = document.querySelectorAll(".exp-category-light","exp-category");
            if (categoriesExp.length>0){
                for (let i = 0; i<categoriesExp.length; i++){
                    if(categoriesExp[i].classList.contains("exp-category-light")){
                        categoriesExp[i].classList.replace("exp-category-light" , "exp-category");
                    }
                }
            }
            themeBtn.setAttribute("class","switch-theme-dark");
            pdfBtn.setAttribute("class","switch-theme-dark");
            themeBtn.textContent = "Light mode";
            savedTheme = "dark";
        }

        function lightTheme(){   
            let navBar = document.querySelector(".navbar");
            navBar.setAttribute("data-bs-theme","light");

            let header = document.querySelector(".header-dark");
            if (header){
                header.classList.replace("header-dark", "header-light");
            }
            
            
            let bodyTheme = document.querySelector(".body-color"); 
            if (bodyTheme.classList.contains("body-color")){
                bodyTheme.classList.replace("body-color", "body-white-theme");
            }

            //this only applicable in experience.html
            let categoriesExp = document.querySelectorAll(".exp-category", ".exp-category-light");
            if (categoriesExp.length>0){
                for (let i = 0; i<categoriesExp.length; i++){
                    if(categoriesExp[i].classList.contains("exp-category")){
                        categoriesExp[i].classList.replace("exp-category" , "exp-category-light");
                    }
                }
            }
            themeBtn.setAttribute("class","switch-theme-light")
            pdfBtn.setAttribute("class","switch-theme-light");
            themeBtn.textContent = "Dark mode"
            savedTheme = "light"
        }
        

    if(savedTheme == null || savedTheme == "dark"){
        savedTheme = "dark";
        darkTheme();
    }else {
        savedTheme = "light"
        lightTheme();
    }

    themeBtn.addEventListener("click",() =>{
        if(savedTheme === "dark"){
            lightTheme();
            localStorage.setItem("theme", "light")
        }else if(savedTheme === "light"){
            darkTheme();
            localStorage.setItem("theme", "dark")
        }
    })

    //this is for the pdf download
    pdfBtn.addEventListener("click",pdfDownload);

    function pdfDownload(){
        let currentPage = "";
        //selecting the current page by title and will save the link in a variable
        switch(document.title){
            case "Sam Joseph | Portfolio":
                currentPage = "index.html";
                break;
            case "Sam Joseph | Project":
                currentPage = "projects.html";
                break;
            case "Sam Joseph | Experience":
                currentPage = "experience.html"
                break;
            default:
                alert("Unable to load the page")

        }
        
    
        let index = "index.html";
        let project = "projects.html";
        let experience = "experience.html";
        // Clearing the current page inoder to pull the data for download
        document.body.innerHTML = "";
        let introSection = document.createElement("section");
        let skillSection = document.createElement("section");
        let ulSkill = document.createElement("ul");
        let expSection = document.createElement(" ");

        /* here I will grab the content from index.html */

        fetch(index)
        .then(function(response){
            return response.text();
        })
        .then(function(data){
            let parser = new DOMParser();
            let indexDom = parser.parseFromString(data,"text/html");
            indexFileFetcher(indexDom)
        })

        function indexFileFetcher(dom){

            let card = dom.querySelectorAll(".card-text");
            
            for(let el of card){
                let cardText = document.createElement("p");
                cardText.innerText = el.textContent;
                introSection.appendChild(cardText);
            }

            let intro = dom.querySelectorAll(".intro");

            for(let el of intro){
                let elText = el.textContent
                let pTag = document.createElement("p");
                pTag.innerText = elText;
                introSection.appendChild(pTag);
            }

            
            let skill = dom.querySelectorAll(".skills");

            for (let el of skill){
                let li = document.createElement("li");
                li.textContent = el.textContent;
                ulSkill.appendChild(li);
            }
            skillSection.appendChild(ulSkill);


            // Here I will pull data from experience.html

            

        }

        fetch(experience)
            .then(function(response){
                return response;
            })
            .then(function(data){
                let parser = new DOMParser();
                let experienceDom = parser.parseFromString(data,"text/html");
                experienceFileFetcher(experienceDom)
            })

            function experienceFileFetcher(dom){
                let exp = dom.querySelectorAll(".exp-category");

                for (let el of exp){
                    if(el.tagName === "h2"){}
                    let hTag = document.createElement("p");

                    hTag.innerHtml = "<strong></strong>"
                }
            }
            // Elements that I need to add in the final DOM
            //introSection
            //skillSection


    }
    
})
