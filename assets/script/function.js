import {darkTheme, lightTheme} from "./theme.js";
import {indexFileFetcher, projectFileFetcher, experienceFileFetcher} from "./fileFetcher.js"
let savedTheme = localStorage.getItem("theme")

document.addEventListener('DOMContentLoaded',() =>{
    let themeBtn = document.createElement('button');
    let btnSection = document.querySelector('.btn-section');
    let pdfBtn = document.createElement('button');

    btnSection.appendChild(themeBtn);
    btnSection.appendChild(pdfBtn);

    pdfBtn.textContent = "Download Resume"
      

    if(savedTheme == null || savedTheme == "dark"){
        savedTheme = "dark";
        darkTheme(themeBtn, pdfBtn, savedTheme);
    }else {
        savedTheme = "light"
        lightTheme(themeBtn, pdfBtn, savedTheme);
    }

    themeBtn.addEventListener("click",() =>{
        if(savedTheme === "dark"){
            localStorage.setItem("theme", "light")
            savedTheme = lightTheme(themeBtn, pdfBtn, savedTheme);
        }else if(savedTheme === "light"){
            localStorage.setItem("theme", "dark")
            savedTheme = darkTheme(themeBtn, pdfBtn, savedTheme);
        }
    })

    //this is for the pdf download
    pdfBtn.addEventListener("click",pdfDownload);

    async function pdfDownload(){
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

        try{
            const response = await fetch(index);
            const data = await response.text();
            const parser = new DOMParser();
            const indexDom = parser.parseFromString(data, "text/html");
            indexFileFetcher(indexDom, introSection, skillSection);
        }catch(error){
            alert(error);
        }

        // fetch(index)
        // .then(function(response){
        //     return response.text();
        // })
        // .then(function(data){
        //     let parser = new DOMParser();
        //     let indexDom = parser.parseFromString(data,"text/html");
        //     indexFileFetcher(indexDom, introSection, skillSection);
        // })
        // .catch(function(error){
        //     alert(error);
        // })


        // Here I will pull data from experience.html

        try{
            const response = await fetch(experience);
            const data = await response.text();
            const parser = new DOMParser();
            const experienceDom = parser.parseFromString(data, "text/html");
            experienceFileFetcher(experienceDom, expSection);
        }catch(error){
            alert(error)
        }

        // fetch(experience)
        //     .then(function(response){
        //         return response.text();
        //     })
        //     .then(function(data){
        //         let parser = new DOMParser();
        //         let experienceDom = parser.parseFromString(data,"text/html");
        //         experienceFileFetcher(experienceDom, expSection)
        //     })
        //     .catch(function(error){
        //         alert(error)
        //     })

            

            /* here I will pull data from project.html */

        try{
            const response = await fetch(project)
            const data = await response.text();
            const parser = new DOMParser();
            const projectDom = parser.parseFromString(data, "text/html");
            projectFileFetcher(projectDom, projectSection)
        }catch(error){
            alert(error);
        }

        // fetch(project)
        //     .then(function(response){
        //         return response.text();
        //     })
        //     .then(function(data){
        //         let parser = new DOMParser();
        //         let projectDom = parser.parseFromString(data, "text/html");
        //         projectFileFetcher(projectDom, projectSection);
        //     })

        
            

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

            printBtn.classList.add("btn-hide");
            backBtn.classList.add("btn-hide");


            printBtn.addEventListener("click",() => {
                
                
                window.print();
                
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
