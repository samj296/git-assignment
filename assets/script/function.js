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
            let categoriesExp = document.querySelectorAll(".exp-category-light, .exp-category");
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
            let categoriesExp = document.querySelectorAll(".exp-category, .exp-category-light");
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
        let expSection = document.createElement("section");
        let projectSection = document.createElement("section");

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
        .catch(function(error){
            alert(error);
        })

        // function to call after fetching the file
        function indexFileFetcher(dom){

            let intro = dom.querySelectorAll(".intro");

            for(let el of intro){
                let elText = el.textContent
                let pTag = document.createElement("p");
                pTag.innerText = elText;
                introSection.appendChild(pTag);
            }

            
            let skills = dom.querySelectorAll(".skills");
            let skillHeader = document.createElement("h2");
            skillHeader.textContent = "Skills";
            skillSection.appendChild(skillHeader);
            let newUl = document.createElement("ul");
            for (let ul of skills){
                
                let uList = ul.querySelectorAll("li");
                for(let li of uList){
                    let newLi = document.createElement("li");
                    newLi.textContent = li.textContent;
                    newUl.appendChild(newLi);
                }
            }
            skillSection.appendChild(newUl);
        }

        // Here I will pull data from experience.html

        

        fetch(experience)
            .then(function(response){
                return response.text();
            })
            .then(function(data){
                let parser = new DOMParser();
                let experienceDom = parser.parseFromString(data,"text/html");
                experienceFileFetcher(experienceDom)
            })
            .catch(function(error){
                alert(error)
            })

            //function to call after fetching the file
            function experienceFileFetcher(dom){
                let exp = dom.querySelectorAll(".exp-category");
                let expHeader = document.createElement("h2");
                expHeader.textContent = "Experience";
                expSection.appendChild(expHeader);

                for (let category of exp){
                    for(let el of category.children){
                        if (el.tagName === "H2"){
                            let hTag = document.createElement("h3");
                            hTag.innerText = el.textContent;
                            expSection.appendChild(hTag);
                        }else if(el.tagName === "P"){
                            let expDate = document.createElement("p");
                            expDate.textContent = el.textContent;
                            expSection.appendChild(expDate);
                        }else if(el.tagName === "UL"){
                            let uList = document.createElement("ul");
                            for(let l of el.children){
                                let li = document.createElement("li");
                                li.textContent = l.textContent;
                                uList.appendChild(li);
                            }
                            expSection.appendChild(uList);
                        }
                    }                    
                }
            }

            /* here I will pull data from project.html */

        fetch(project)
            .then(function(response){
                return response.text();
            })
            .then(function(data){
                let parser = new DOMParser();
                let projectDom = parser.parseFromString(data, "text/html");
                projectFileFetcher(projectDom);
            })

            //function to call after fetching the file

        function projectFileFetcher(dom){

            let project = dom.querySelectorAll(".project");
            let projectHeader = document.createElement("h2");
            projectHeader.textContent = "Projects";
            projectSection.appendChild(projectHeader);
            for(let cat of project){
                for(let el of cat.children){
                    if(el.tagName === "H2"){
                        let pHeader = document.createElement("h3");
                        pHeader.textContent = el.textContent;
                        projectSection.appendChild(pHeader);
                    }else if(el.tagName === "UL"){
                        let ulProject = document.createElement("ul");
                        let projectHeader = document.createElement("h3");
                        for(let l of el.children){
                            let li = document.createElement("li");
                            li.textContent = l.textContent;
                            ulProject.appendChild(li);
                        }
                        projectSection.appendChild(ulProject);
                    }
                }
            }
        }
            

            // Elements that I need to add in the final DOM
            //introSection
            //skillSection
            //expSection
            //projectSection



            //Creating final HTML structue 

            let printBtn = document.createElement("button");
            printBtn.textContent = "Print";
            document.body.appendChild(printBtn);
            let backBtn = document.querySelector(".back-btn");

                if(!backBtn){
                    backBtn = document.createElement("button");
                    backBtn.textContent = "Back";
                    backBtn.setAttribute("class","back-btn")
                    
                    
                    backBtn.addEventListener("click",() =>{
                        window.location.href = currentPage;

                    })

                    document.body.prepend(backBtn);
                }


            printBtn.addEventListener("click",() => {
                
                printBtn.style.display = "none";
                backBtn.style.display = "none";
                window.print();
                
                printBtn.style.display = "inline-block";
                backBtn.style.display = "inline-block"
            })

            document.title = "Sam Joseph - Resume"; // this will show at the top of the page when printing

            let headerText = document.createElement("h2");
            headerText.textContent = "Sam Joseph";

            document.body.setAttribute("class", "pdf-body");
            document.body.appendChild(headerText);
            let addressText = document.createElement("p");
            addressText.innerHTML = `Kelowna, BC V1X 6X4 <br> sam_joseph@live.com | +1 250 687 1306`;
            document.body.appendChild(addressText);

            document.body.appendChild(introSection);
            introSection.setAttribute("class", "pdf-section");
            document.body.appendChild(skillSection);
            skillSection.setAttribute("class", "pdf-section");
            document.body.appendChild(projectSection);
            projectSection.setAttribute("class","pdf-section");
            document.body.appendChild(expSection);
            expSection.setAttribute("class", "pdf-section");

    }
    
})
