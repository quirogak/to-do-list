const genToDos = (() => {

    const createTodo = (title,description,dueDate,notes,priority,checkList) => {

         title = title

         description = description

         dueDate = dueDate

         notes = notes

         priority = priority

         checkList = checkList


        return {title,description,dueDate,notes,priority,checkList}

    }


   

   const genToDosDOM = (i) => {

        const rightPart = document.querySelector(".right-part")

        const newTodoContainer = document.createElement("div")
        rightPart.appendChild(newTodoContainer)
        newTodoContainer.classList.add("todo-container")


        const titleContainer = document.createElement("div")
        newTodoContainer.appendChild(titleContainer)

        const title = document.createElement("h2")
        titleContainer.appendChild(title)
        title.textContent = "Title"
 
        const titleInput = document.createElement("input")
        titleContainer.appendChild(titleInput)
        titleInput.type = "text"
        titleInput.classList.add("title-input"+i)

 
        const descriptionInput = document.createElement("input")
        newTodoContainer.appendChild(descriptionInput)
        descriptionInput.type = "text"
        descriptionInput.classList.add("desc-input"+i)

 
        const todoDate = document.createElement("input")
        newTodoContainer.appendChild(todoDate)
        todoDate.type = "date"
        todoDate.classList.add("todo-date"+i)

 
        const notesInput = document.createElement("input")
        newTodoContainer.appendChild(notesInput)
        notesInput.type = "text"
        notesInput.classList.add("notes-input"+i)


        const tasksContainer = document.createElement("div")
        newTodoContainer.appendChild(tasksContainer)

        const tasksCheckList = document.createElement("input")
        tasksContainer.appendChild(tasksCheckList)
        tasksCheckList.type = "text"
        tasksCheckList.classList.add("tasks-checklist"+i)

        const submitTask = document.createElement("button")
        tasksContainer.appendChild(submitTask)
        submitTask.type ="button"
        submitTask.classList.add("submit-task-button"+i)
        submitTask.textContent = "Add Task"

 
        const priorityCheckList = document.createElement("button")
        newTodoContainer.appendChild(priorityCheckList)
        priorityCheckList.classList.add("priority-checklist"+i)
        priorityCheckList.textContent = "Set Priorities"

       
 
        const submitToDo = document.createElement("button")
        newTodoContainer.appendChild(submitToDo)
        submitToDo.classList.add("submit-todo-button"+i)
        submitToDo.textContent = "Submit"

        return {newTodoContainer,titleInput,descriptionInput,todoDate,notesInput,priorityCheckList,tasksCheckList,submitToDo}

   } 



   const genToDosLogic = () => {

  //Global constants

   const ToDoElements = []

   const ToDoObjectList = []

   const addButton = document.querySelector(".new-todo")



   //Functions

   const newToDo = () => {

    ToDoElements.push(genToDosDOM(ToDoElements.length))

   }


   const newToDoObject = () => {

    const currentToDo = ToDoElements[ToDoElements.length-1]

    const title = currentToDo.titleInput.value
            
    const description = currentToDo.descriptionInput.value
    
    const dueDate = currentToDo.todoDate.value
    
    const notes = currentToDo.notesInput.value
    
    const priority = currentToDo.priorityCheckList.value
    
    const checkList = currentToDo.tasksCheckList.value


    ToDoObjectList.push(createTodo(title, description, dueDate, notes, priority, checkList))

   }

   const removeContainer = () => {

    const toDoContainer = document.querySelector(".todo-container")
     toDoContainer.remove()

    }

    const checkContainer = () => {
    
        if(document.querySelector(".todo-container") != null){
            removeContainer()
        }
        
    }
    


   const addToDoDOM = () => {

    const tabContainer = document.querySelector(".todos-container")
    const newToDo = document.createElement("button")

    newToDo.classList.add("todo-tab", "number"+parseInt(ToDoElements.length-1))
    tabContainer.appendChild(newToDo)
    
    //Assign a name to the left-part tab 
    newToDo.textContent = ToDoObjectList[ToDoObjectList.length-1].title

    //when the user clicks submit, the todo container gets removed.
    removeContainer()


   }

   const returnToDosDOM = (currentToDoIndex) => {

    const currentToDo = ToDoObjectList[currentToDoIndex]
    genToDosDOM(currentToDoIndex)

    document.querySelector(".title-input"+currentToDoIndex).value = currentToDo.title

    document.querySelector(".desc-input"+currentToDoIndex).value = currentToDo.description

    document.querySelector(".todo-date"+currentToDoIndex).defaultValue = currentToDo.dueDate

    document.querySelector(".notes-input"+currentToDoIndex).value = currentToDo.notes


}

const updateToDoObject = (e) => {

    const index = e.target.classList[0]
    const currentToDoIndex = index.slice(-1)
    const currentToDo = document.querySelector(".title-input"+currentToDoIndex)
    const currentObject = ToDoObjectList[currentToDoIndex]


    currentObject.title = currentToDo.value
            
   

    updateTab(e,currentToDo.value)

    removeContainer()

}

const updateTab = (e,newValue) => {

    const index = e.target.classList[0]
    const currentToDoIndex = index.slice(-1)
    const currentToDoTab = document.querySelector(".number"+currentToDoIndex)

    currentToDoTab.textContent = newValue


}







    //Event Listener Functions

 const callReturnTab = (e) => {

    addToDoDOM()
    const index = e.target.classList[0]
    const currentToDoIndex = index.slice(-1)
    const currentToDoTab = document.querySelector(".number"+currentToDoIndex)

   
    currentToDoTab.addEventListener("click", () => {

        checkContainer()
        returnToDosDOM(currentToDoIndex)
        const currentSubmitButton = document.querySelector(".submit-todo-button"+currentToDoIndex)

        currentSubmitButton.addEventListener("click", (e)=> {

            updateToDoObject(e)
        })



       })

 }





    //Event Listeners

    addButton.addEventListener("click", () => {

        
        checkContainer()
        newToDo()


        ToDoElements[ToDoElements.length-1].submitToDo.addEventListener("click", newToDoObject)

        ToDoElements[ToDoElements.length-1].submitToDo.addEventListener("click", callReturnTab)
        
        

    })

   }








   

   const searchLogic = () => {

   }
 

   
   return {genToDosLogic}

})();

genToDos.genToDosLogic()
