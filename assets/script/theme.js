/*    let themeBtn = document.createElement('button');
    let btnSection = document.querySelector('.btn-section');
    let pdfBtn = document.createElement('button');

*/

function darkTheme(themeBtn, pdfBtn, savedTheme){    
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
            return "dark";
}

function lightTheme(themeBtn, pdfBtn, savedTheme){   
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
            return "light"
}


export {darkTheme, lightTheme};