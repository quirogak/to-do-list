const genToDos = (() => {

    const createTodo = (title,description,dueDate,notes,priority,checkList) => {

        const getTitle = () => title

        const getDescription = () => description

        const getDueDate = () => dueDate

        const getNotes = () => notes

        const getPriority = () => priority

        const getCheckList = () => checkList


        return {getTitle,getDescription,getDueDate,getNotes,getCheckList,getPriority}

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

     ToDoElements[ToDoElements.length-1].newTodoContainer.remove() 

    }


   const addToDoDOM = () => {

    const tabContainer = document.querySelector(".todos-container")
    const newToDo = document.createElement("button")

    newToDo.classList.add("todo-tab", "number"+parseInt(ToDoElements.length-1))
    tabContainer.appendChild(newToDo)
    
    //Assign a name to the left-part tab 
    newToDo.textContent = ToDoObjectList[ToDoObjectList.length-1].getTitle()

    //when the user clicks submit, the todo container gets removed.
    removeContainer()


   }

   const returnToDosDOM = (currentToDoIndex) => {

    const currentToDo = ToDoObjectList[currentToDoIndex]
    genToDosDOM(currentToDoIndex)

    document.querySelector(".title-input"+currentToDoIndex).value = currentToDo.getTitle()




}




 const returnTabDetails = (index) => {

    const currentToDoIndex = index.slice(-1)
    returnToDosDOM(currentToDoIndex)

   }

   

    //Event Listener Functions

 const callReturnTab = () => {

    addToDoDOM()
    removeContainer()

    const currentToDoIndex = ToDoElements.length-1
    const currentToDoIndexString = currentToDoIndex.toString()
    const currentToDoTab = document.querySelector(".number"+currentToDoIndexString)

   
    currentToDoTab.addEventListener("click", (e) => {

       const index = e.target.classList[1]
       returnTabDetails(index)


       })

 }





    //Event Listeners

    addButton.addEventListener("click", () => {

        newToDo()

        ToDoElements[ToDoElements.length-1].submitToDo.addEventListener("click", newToDoObject)

        ToDoElements[ToDoElements.length-1].submitToDo.addEventListener("click", callReturnTab)
        

    })

   }






    //Event Listeners


   

   const searchLogic = () => {

   }
 

   
   return {genToDosLogic}

})();

genToDos.genToDosLogic()
