// Source - https://stackoverflow.com/a/2117523
// Posted by broofa, modified by community. See post 'Timeline' for change history
// Retrieved 2026-06-15, License - CC BY-SA 4.0
const todoTaskContainer=document.querySelector('.todo-tasks')
const inProgressContainer=document.querySelector('.inprogress-tasks')
const doneTaskContainer=document.querySelector('.done-tasks')
const addTaskButton=document.getElementById('add-task-button')
const form=document.querySelector('form')
const addTaskbtn=document.querySelector('#add-task-button')
const modalContainer=document.querySelector('.modal-container')
const closeModalBtn=document.querySelector('#close-modal-button')
function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

// console.log(uuidv4());

const tasks=[
    {
        desc:"Fixed Api Timeout",
        status:"todo",
        priority:'pink',
        id:uuidv4(),
        dateCreated:new Date().toISOString()
    },
    {
        desc:"Build autopayment flow",
        status:"inprogress",
        priority:'blue',
        id:uuidv4(),
        dateCreated:new Date().toISOString()
    },
    {
        desc:"build a auto debit icon",
        status:"done",
        priority:'green',
        id:uuidv4(),
        dateCreated:new Date().toISOString()
    },
    {
        desc:"Add new payment method",
        status:"todo",
        priority:'black',
        id:uuidv4(),
        dateCreated:new Date().toISOString()
    }

]
function createTaskUi(task){
    return `<div class="task-card ${task.priority}">
        <p>${task.desc}</p>
        <p>${task.status}</p>
        <p>${task.priority}</p>
    </div>`
}
function renderListToUi(container,list){
    // const fragment=document.createDocumentFragment()
    for(let task of list){
        const taskElement=document.createElement('div')
        taskElement.innerHTML=createTaskUi(task)
// fragment.append(createtaskUi(task))
// const deleteIcon=document.createElement('')
         container.append(taskElement)
    }
   
}
function renderTasks(){
    todoTaskContainer.innerHTML=""
    inProgressContainer.innerHTML=""
    doneTaskContainer.innerHTML=""
const todoTasks=tasks.filter((task)=>{
   return task.status==='todo'
})
const inProgressTasks=tasks.filter((task)=>{
    return task.status==='inprogress'
})
const doneTasks=tasks.filter((task)=>{
   return  task.status==='done'
})
renderListToUi(todoTaskContainer,todoTasks)
renderListToUi(inProgressContainer,inProgressTasks)
renderListToUi(doneTaskContainer,doneTasks)
}

function addTask(task){
    tasks.push(task)
    renderTasks()
}
function registerEventListeners(){
    form.addEventListener('submit',(e)=>{
        
      e.preventDefault()
    //   console.log(form.elements)
      const taskDesc=form.elements[0].value
      const priorityInp=document.querySelector('.add-task-modal form input:checked')
    //   console.log(taskDesc)
    //   console.log(priorityInp.value)
    const newTask={
        id:uuidv4(),
        desc:taskDesc,
        status:'todo',
        priority:priorityInp.value,
        dateCreated:new Date().toISOString()

    }
    addTask(newTask)
    modalContainer.style.display='none'
    })
    addTaskbtn.addEventListener('click',(e)=>{
        modalContainer.style.display='block'
    })
    closeModalBtn.addEventListener('click',(e)=>{
        modalContainer.style.display='none'
    })
} 

function initializeApp(){
renderTasks()
registerEventListeners()
}
initializeApp()


