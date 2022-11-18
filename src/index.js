
const genObjects = (() => {

    const createProject = (title,description,addToDo) => {

         title = title

         description = description

         addToDo = addToDo


        return {title,description,addToDo}


    }

    const createToDo = (title,description,dueDate,priority) => {

        title = title
        description = description
        dueDate = dueDate
        priority = priority

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
        titleInput.classList.add("title-input"+i)

 
        const descriptionInput = document.createElement("input")
        newProjectContainer.appendChild(descriptionInput)
        descriptionInput.type = "text"
        descriptionInput.classList.add("desc-input"+i)

 
        /*
        const todoDate = document.createElement("input")
        newTodoContainer.appendChild(todoDate)
        todoDate.type = "date"
        todoDate.classList.add("todo-date"+i)

 
        const notesInput = document.createElement("input")
        newTodoContainer.appendChild(notesInput)
        notesInput.type = "text"
        notesInput.classList.add("notes-input"+i)
*/

        const tasksContainer = document.createElement("div")
        newProjectContainer.appendChild(tasksContainer)

        const tasksAddToDo = document.createElement("input")
        tasksContainer.appendChild(tasksAddToDo)
        tasksAddToDo.type = "text"
        tasksAddToDo.classList.add("tasks-AddToDo"+i)

        const submitTask = document.createElement("button")
        tasksContainer.appendChild(submitTask)
        submitTask.type ="button"
        submitTask.classList.add("submit-task-button"+i)
        submitTask.textContent = "Add To-Do"

 /*
        const priorityAddToDo = document.createElement("button")
        newTodoContainer.appendChild(priorityAddToDo)
        priorityAddToDo.classList.add("priority-AddToDo"+i)
        priorityAddToDo.textContent = "Set Priorities"

     */
       
 
        const submitProject = document.createElement("button")
        newProjectContainer.appendChild(submitProject)
        submitProject.classList.add("submit-project-button"+i)
        submitProject.textContent = "Submit"

        return {newProjectContainer,titleInput,descriptionInput,tasksAddToDo,submitProject}

   } 

   return {genProjectsDOM}

   
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
    
    const AddToDo = currentProject.tasksAddToDo.value


    projectObjectList.push(genObjects.createProject(title, description, AddToDo))

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

    const index = e.target.classList[0]
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
    const index = e.target.classList[0]
    const currentProjectIndex = index.slice(-1)
    const currentProjectTab = document.querySelector(".number"+currentProjectIndex)

   
    currentProjectTab.addEventListener("click", () => {

        checkContainer()
        returnProjectsDOM(currentProjectIndex)
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


        projectElements[projectElements.length-1].submitProject.addEventListener("click", newProjectObject)

        projectElements[projectElements.length-1].submitProject.addEventListener("click", callReturnTab)
        
        

    })

   

   const searchLogic = () => {

   }
 

   
   return {}

})();


