
const genObjects = (() => {

    const createProject = (title,description,addToDo) => {

         title = title

         description = description

         addToDo = addToDo


        return {title,description,addToDo}


    }

    const createToDo = (title,description,dueDate,priority,checked) => {

        title = title
        description = description
        dueDate = dueDate  //later i can make the dueDate as a function that calculates the days left.
        priority = priority
        checked = checked

        return {title,description,dueDate,priority,checked}

    }

    return {createProject,createToDo}

})();


const genDomElements = (() => {

    const genProjectsDOM = (i) => {

        const rightPart = document.querySelector(".right-part")

        const newProjectContainer = document.createElement("div")
        rightPart.appendChild(newProjectContainer)
        newProjectContainer.classList.add("project-container")


        const titleInput = document.createElement("input")
        newProjectContainer.appendChild(titleInput)
        titleInput.type = "text"
        titleInput.classList.add("project-title")
        titleInput.classList.add("title-input"+i)
        titleInput.value = "New Title"

 
        const descriptionInput = document.createElement("textarea")
        newProjectContainer.appendChild(descriptionInput)
        descriptionInput.type = "text"
        descriptionInput.classList.add("project-desc")
        descriptionInput.classList.add("desc-input"+i)
        descriptionInput.value = "Description..."

       
        const toDosContainer = document.createElement("div")
        newProjectContainer.appendChild(toDosContainer)
        toDosContainer.classList.add("todos-container")

 
        const submitProject = document.createElement("button")
        newProjectContainer.appendChild(submitProject)
        submitProject.classList.add("submit-button")
        submitProject.classList.add("submit-project-button"+i)
        submitProject.textContent = "Submit Details"

      

        const submitToDo = document.createElement("button")
        newProjectContainer.appendChild(submitToDo)
        submitToDo.type ="button"
        submitToDo.classList.add("submit-todo")
        submitToDo.classList.add("submit-todo-button"+i)
        submitToDo.textContent = "+"


        return {titleInput,descriptionInput,submitToDo,submitProject}

   } 


   const genToDosDOM = (projectIndex,toDoIndex) =>{

        const toDosContainer = document.querySelector(".todos-container")

        const toDoContainer = document.createElement("div")
        toDoContainer.classList.add("todo-container")
        toDoContainer.classList.add("todo-container"+toDoIndex)
        toDosContainer.appendChild(toDoContainer)

        const basicElementsContainer = document.createElement("div")
        basicElementsContainer.classList.add("basic-elements-container")
        toDoContainer.appendChild(basicElementsContainer)

        const deleteButton = document.createElement("button")
        deleteButton.classList.add("delete-button")
        deleteButton.classList.add("delete-button"+toDoIndex)
        deleteButton.textContent = "x"
        basicElementsContainer.appendChild(deleteButton)
        

        const toDoTitle = document.createElement("input")
        basicElementsContainer.appendChild(toDoTitle)
        toDoTitle.value = "New to-do"
        toDoTitle.type = "text"
        toDoTitle.classList.add("todo-title"+toDoIndex)
        toDoTitle.classList.add("expand-todo")
        

        const checkToDo = document.createElement("input")
        basicElementsContainer.appendChild(checkToDo)
        checkToDo.type = "checkbox"
        checkToDo.classList.add("checkbox"+toDoIndex)
        checkToDo.classList.add("checkbox"+projectIndex)

        const descriptionInput = document.createElement("input")
        toDoContainer.appendChild(descriptionInput)
        descriptionInput.type = "text"
        descriptionInput.classList.add("todo-desc"+toDoIndex)
        descriptionInput.classList.add("todo-description")
        descriptionInput.value = "Description..."
        

        const dateInput = document.createElement("input")
        toDoContainer.appendChild(dateInput)
        dateInput.type = "date"
        dateInput.classList.add("todo-date"+toDoIndex)
        dateInput.classList.add("todo-date")


        const priorityColor = document.createElement("select")
        toDoContainer.appendChild(priorityColor)
        priorityColor.classList.add("todo-priority"+toDoIndex)
        priorityColor.classList.add("todo-priority")

        const highPriority = document.createElement("option")
        highPriority.value = "High"
        highPriority.textContent = "High"
        priorityColor.appendChild(highPriority)

        const MediumPriority = document.createElement("option")
        MediumPriority.value = "Medium"
        MediumPriority.textContent = "Medium"
        priorityColor.appendChild(MediumPriority)

        const LowPriority = document.createElement("option")
        LowPriority.value = "Low"
        LowPriority.textContent = "Low"
        priorityColor.appendChild(LowPriority)



        return {toDoTitle}
   }

   

   return {genProjectsDOM,genToDosDOM}

   
})();

   

   



const projectsLogic = (() => {

  //Global constants

   const projectElements = []

   const projectObjectList = []

   const addButton = document.querySelector(".new-project")



   //Functions

   const newProjectDOM = () => {

    projectElements.push(genDomElements.genProjectsDOM(projectElements.length))

   }


   const newProjectObject = () => {

    const currentProject = projectElements[projectElements.length-1]

    const title = currentProject.titleInput.value
            
    const description = currentProject.descriptionInput.value
    
    const addToDo = currentProject.submitToDo.value


    projectObjectList.push(genObjects.createProject(title, description, addToDo))

   }
   

   const removeContainer = () => {

    const projectContainer = document.querySelector(".project-container")
     projectContainer.remove()

    }

   const checkContainer = () => {
    
        if(document.querySelector(".project-container") != null){
            removeContainer()
        }
        
    }
    


   const addProjectDOM = () => {

    const tabContainer = document.querySelector(".tab-container")
    const newProject = document.createElement("button")

    newProject.classList.add("project-tab", "number"+parseInt(projectElements.length-1))
    tabContainer.appendChild(newProject)
    
    //Assign a name to the left-part tab 
    newProject.textContent = projectObjectList[projectObjectList.length-1].title

    //when the user clicks submit, the Project container gets removed.
    removeContainer()


   }

   const returnProjectsDOM = (currentProjectIndex) => {

    const currentProject = projectObjectList[currentProjectIndex]
    genDomElements.genProjectsDOM(currentProjectIndex)

    document.querySelector(".title-input"+currentProjectIndex).value = currentProject.title
    document.querySelector(".desc-input"+currentProjectIndex).value = currentProject.description

}

   const updateProjectObject = (e) => {

    const index = e.target.classList[1]
    const currentProjectIndex = index.slice(-1)
    const currentObject = projectObjectList[currentProjectIndex]

    currentObject.title = document.querySelector(".title-input"+currentProjectIndex).value
    currentObject.description = document.querySelector(".desc-input"+currentProjectIndex).value

    updateTab(currentProjectIndex,currentObject.title)
    removeContainer()

}

   const updateTab = (currentProjectIndex,newValue) => {

    const currentProjectTab = document.querySelector(".number"+currentProjectIndex)
    currentProjectTab.textContent = newValue

}

   const returnProjectAndToDos = (currentProjectIndex) => {

    checkContainer()
    returnProjectsDOM(currentProjectIndex)
    toDosLogic.returnToDoDOM(currentProjectIndex).genToDoElements()
    const currentSubmitButton = document.querySelector(".submit-project-button"+currentProjectIndex)
    
    currentSubmitButton.addEventListener("click", (e)=> {updateProjectObject(e)})

}



   const callReturnTab = (e) => {

    addProjectDOM()
    const index = e.target.classList[1]
    const currentProjectIndex = index.slice(-1)
    const currentProjectTab = document.querySelector(".number"+currentProjectIndex)

    currentProjectTab.addEventListener("click", () => {returnProjectAndToDos(currentProjectIndex)})

 }

   const newProject = () => {

    checkContainer()
    newProjectDOM()
    toDosLogic.newToDo()


    projectElements[projectElements.length-1].submitProject.addEventListener("click", newProjectObject)

    projectElements[projectElements.length-1].submitProject.addEventListener("click", callReturnTab)
 }


   const searchLogic = () => {

   }

   addButton.addEventListener("click",newProject)
 

   
   return {}

})();


const toDosLogic = (() => {

    
 const toDoElementsList = []
 const toDoObjectsList = []
    
   const newToDo = () => {

    const toDoElements = []
    let toDoObjects = []

    const submitToDoButton = document.querySelector(".submit-button")
    const addToDoButton = document.querySelector(".submit-todo")


    const storeToDosDOM = (e)  => {
        const index = e.target.classList[1]
        const currentProjectIndex = index.slice(-1)
        const toDoIndex = toDoElements.length

        toDoElements.push(genDomElements.genToDosDOM(currentProjectIndex,toDoIndex))
        expandToDos.expandToDoLogic(toDoIndex)
    } 


    const pushElementsList = () => {
        toDoElementsList.push(toDoElements)
    }

    const pushObjectsList = () => {
        toDoObjectsList.push(toDoObjects)
    }
    

    const newToDoObject = () => {

        for(i = 0; i < toDoElements.length ; i++){

        toDoTitleValue =  toDoElements[i].toDoTitle.value
        console.log(toDoElements[i])
        toDoObjects.push(genObjects.createToDo(toDoTitleValue))

        }
            
    }

    addToDoButton.addEventListener("click", (e) => {storeToDosDOM(e)})
    submitToDoButton.addEventListener("click",newToDoObject)
    submitToDoButton.addEventListener("click",pushElementsList)
    submitToDoButton.addEventListener("click",pushObjectsList)
        
  }

     
 const returnToDoDOM = (projectIndex) => {

        
        const numberOfToDos = toDoElementsList[projectIndex].length
        const submitToDoButton = document.querySelector(".submit-button")
        const addToDoButton = document.querySelector(".submit-todo")

        addToDoButton.className = "old-submit-todo"
        const oldSubmitToDo = document.querySelector(".old-submit-todo")
        
        

    const genToDoElements = () => {

            for(i = 0; i < numberOfToDos; i++){

                genDomElements.genToDosDOM(projectIndex,i)

                //If we want to add any other value about our to-dos, we can add it here, but first, we should add them inside of our Object Functions.

                document.querySelector(".todo-title"+i).value = toDoObjectsList[projectIndex][i].title   
            } 
            callExpandToDo()
        }

    const newToDoObjectOldProject = () => {

            const updatedNumberOfToDos = toDoElementsList[projectIndex].length

            for(i = 0; i < updatedNumberOfToDos ; i++){

                  toDoTitleValue =  document.querySelector(".todo-title"+i).value
                  toDoDescriptionValue = document.querySelector(".todo-desc"+i).value

                  console.log(toDoDescriptionValue)

                  //if the object doesn't exists, push the new object, if it already exists, then change the details .

                  if( toDoObjectsList[projectIndex][i] === undefined  ){

                    toDoObjectsList[projectIndex].push(genObjects.createToDo(toDoTitleValue,toDoDescriptionValue))
                  }
                  else {
                    toDoObjectsList[projectIndex][i].title = toDoTitleValue
                    toDoObjectsList[projectIndex][i].description = toDoDescriptionValue
                  }
            
                }
        }

    const newToDoDOMOldProject = () => {

                toDoElementsList[projectIndex].push(genDomElements.genToDosDOM(projectIndex,i))

        }

    const callExpandToDo = () => {

        const updatedNumberOfToDos = toDoElementsList[projectIndex].length

        for(i = 0; i < updatedNumberOfToDos; i++){expandToDos.expandToDoLogic(i)}
    }

        oldSubmitToDo.addEventListener("click",newToDoDOMOldProject)
        oldSubmitToDo.addEventListener("click",callExpandToDo)
        submitToDoButton.addEventListener("click",newToDoObjectOldProject)
        

        return {genToDoElements}

    }




    return {newToDo,returnToDoDOM}
   
})();



const expandToDos = (() => {


    //cleaned code and started the basic structure of expand to-do logic
  
   
 const expandToDoLogic = (currentToDoIndex) => {

    
    const currentToDo = document.querySelector(".todo-title"+currentToDoIndex)

    const expandToDo = (e) => {

        const toDoIndex = e.target.classList[0].slice(-1)
        const currentToDoDetails = document.querySelector(".expand-todo"+toDoIndex)

        showDescription(toDoIndex)
        showDueDate(toDoIndex)
        showPriorityInput(toDoIndex)
        adjustToDoParent(toDoIndex)

        
    }

    const showDescription = (toDoIndex) => {

        const descriptionInput = document.querySelector(".todo-desc"+toDoIndex)
        descriptionInput.style.width = "80%"
        descriptionInput.style.height = "15px"
        descriptionInput.style.padding = "2px"
        descriptionInput.style.border = "1px solid black"

    }

    const showDueDate = (toDoIndex) =>{

        const dueDateInput = document.querySelector(".todo-date"+toDoIndex)
        dueDateInput.style.width = "80%"
        dueDateInput.style.height = "15px"
        dueDateInput.style.padding = "2px"
        dueDateInput.style.border = "1px solid black"

    }

    const showPriorityInput = (toDoIndex) =>{

        const priorityInput = document.querySelector(".todo-priority"+toDoIndex)
        priorityInput.style.width = "85%"
        priorityInput.style.height = "22px"
        priorityInput.style.padding = "2px"
        priorityInput.style.border = "1px solid black"

    }

    const adjustToDoParent = (toDoIndex) =>{

        const toDoContainer = document.querySelector(".todo-container"+toDoIndex)

        toDoContainer.style.gap = "20px"
    }


    

   
    
    
    currentToDo.addEventListener("click", (e) => {expandToDo(e)})
   
 }

 



 return {expandToDoLogic}




})();