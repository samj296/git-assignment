
function indexFileFetcher(dom, introSection, skillSection){

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

function experienceFileFetcher(dom, expSection){
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
                        };
                    };               
                };
};

function projectFileFetcher(dom, projectSection){

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
                        for(let l of el.children){
                            let li = document.createElement("li");
                            li.textContent = l.textContent;
                            ulProject.appendChild(li);
                        }
                        projectSection.appendChild(ulProject);
                    };
                };
            };
};

export {indexFileFetcher, projectFileFetcher, experienceFileFetcher}