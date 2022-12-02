
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
        dueDate = dueDate
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


    
 /*
        const priorityAddToDo = document.createElement("button")
        newTodoContainer.appendChild(priorityAddToDo)
        priorityAddToDo.classList.add("priority-AddToDo"+i)
        priorityAddToDo.textContent = "Set Priorities"

     */
 
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
        toDoContainer.classList.add("todo-container"+toDoIndex)
        toDoContainer.classList.add("todo-container"+projectIndex)
        toDosContainer.appendChild(toDoContainer)

        const deleteButton = document.createElement("button")
        deleteButton.classList.add("delete-button")
        deleteButton.classList.add("delete-button"+toDoIndex)
        deleteButton.textContent = "x"
        toDoContainer.appendChild(deleteButton)
        

        const toDoTitle = document.createElement("input")
        toDoContainer.appendChild(toDoTitle)
        toDoTitle.value = "New to-do"
        toDoTitle.type = "text"
        toDoTitle.classList.add("todo-title"+toDoIndex)
        toDoTitle.classList.add("expand-todo")
        

        const checkToDo = document.createElement("input")
        toDoContainer.appendChild(checkToDo)
        checkToDo.type = "checkbox"
        checkToDo.classList.add("checkbox"+toDoIndex)
        checkToDo.classList.add("checkbox"+projectIndex)


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

   const newProject = () => {

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


    //Event Listener Functions

 const callReturnTab = (e) => {

    addProjectDOM()
    const index = e.target.classList[1]
    const currentProjectIndex = index.slice(-1)
    const currentProjectTab = document.querySelector(".number"+currentProjectIndex)

   //return project & todos
    currentProjectTab.addEventListener("click", () => {
 
        checkContainer()
        returnProjectsDOM(currentProjectIndex)
        toDosLogic.returnToDoDOM(currentProjectIndex).genToDoElements()


        const currentSubmitButton = document.querySelector(".submit-project-button"+currentProjectIndex)
        

        currentSubmitButton.addEventListener("click", (e)=> {
            updateProjectObject(e)
            

        })




    })

 }



    //Event Listeners

  addButton.addEventListener("click", () => {

        
        checkContainer()
        newProject()
        toDosLogic.newToDo()


        projectElements[projectElements.length-1].submitProject.addEventListener("click", newProjectObject)

        projectElements[projectElements.length-1].submitProject.addEventListener("click", callReturnTab)


        
        

    })

   

   const searchLogic = () => {

   }
 

   
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


    addToDoButton.addEventListener("click", (e) => {

        const index = e.target.classList[1]
        const currentProjectIndex = index.slice(-1)
        const toDoIndex = toDoElements.length

        toDoElements.push(genDomElements.genToDosDOM(currentProjectIndex,toDoIndex))
        expandToDos.expandToDoLogic(currentProjectIndex)
        

     })

     const pushElementsList = () => {
        toDoElementsList.push(toDoElements)
    }

    const pushObjectsList = () => {
        toDoObjectsList.push(toDoObjects)
    }
    

    const newToDoObject = () => {

        for(i = 0; i < toDoElements.length ; i++){

        toDoTitleValue =  toDoElements[i].toDoTitle.value
        toDoObjects.push(genObjects.createToDo(toDoTitleValue))


        }
        
        
    }
        //Event Listeners

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

            console.log(toDoObjectsList[projectIndex])

            
            
    
        }

        const newToDoObjectOldProject = () => {

            const updatedNumberOfToDos = toDoElementsList[projectIndex].length

            for(i = 0; i < updatedNumberOfToDos ; i++){

                  toDoTitleValue =  document.querySelector(".todo-title"+i).value

                  //if the object doesn't exists, push the new object, if it already exists, then change the details .

                  if( toDoObjectsList[projectIndex][i] === undefined  ){

                    toDoObjectsList[projectIndex].push(genObjects.createToDo(toDoTitleValue))
                    

                  }

                  else {
                    toDoObjectsList[projectIndex][i].title = toDoTitleValue
                  }
            
                }




        }

        const newToDoDOMOldProject = () => {

                toDoElementsList[projectIndex].push(genDomElements.genToDosDOM(projectIndex,i))
            

        }


     

      

        //Event Listeners
        
        oldSubmitToDo.addEventListener("click",newToDoDOMOldProject)
        submitToDoButton.addEventListener("click",newToDoObjectOldProject)
        







        return {genToDoElements}

        
        
    }




    return {newToDo,returnToDoDOM}
   
})();



const expandToDos = (() => {

  
   
 const expandToDoLogic = (projectIndex) => {

    const currentToDo = document.querySelector(".expand-todo")


    const expandToDo = () => {
        
    }
    
    currentToDo.addEventListener("click",expandToDo)
   
   
 }

 



 return {expandToDoLogic}




})();