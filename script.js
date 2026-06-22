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
const taskBoard=document.querySelector('.task-board')
const prioritySwatches=document.querySelectorAll('.swatch')

const editModal=document.querySelector('.edit-modal')
const editModalcontainer=document.querySelector('.edit-modal-container-content')
// const toolBox=document.querySelector('.tool-box')
const allSwatch=document.querySelector('.all')

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}


// console.log(uuidv4());
const allStatus=['todo','inprogress','done']
const priorities=['pink','green','blue','black']
const tasks=[
    {
        desc:"Fixed Api Timeout",
        status:"todo",
        priority:'pink',
        id:uuidv4(),
        dateCreated:new Date().toISOString(),
         locked:true
    },
    {
        desc:"Build autopayment flow",
        status:"inprogress",
        priority:'blue',
        id:uuidv4(),
        dateCreated:new Date().toISOString(),
        locked:false
    },
    {
        desc:"build a auto debit icon",
        status:"done",
        priority:'green',
        id:uuidv4(),
        dateCreated:new Date().toISOString(),
         locked:true
    },
    {
        desc:"Add new payment method",
        status:"todo",
        priority:'black',
        id:uuidv4(),
        dateCreated:new Date().toISOString(),
         locked:true
    }

]
function createTaskUi(task){
    const statusLabels = {
        todo: 'To Do',
        inprogress: 'In Progress',
        done: 'Done'
    }
    const priorityLabels = {
        pink: 'P0',
        green: 'P1',
        blue: 'P2',
        black: 'P3'
    }
    const statusLabel = statusLabels[task.status] || task.status
    const priorityLabel = priorityLabels[task.priority] || task.priority

    return `<div class="task-card ${task.priority}" data-id="${task.id}">
        <p class="task-desc">${task.desc}</p>
        <div class="task-meta">
            <span class="task-status status-${task.status}">${statusLabel}</span>
            <span class="task-priority priority-${task.priority}">${priorityLabel}</span>
        </div>
        ${task.locked ? '<i class="bi bi-lock"></i>' : '<i class="bi bi-unlock"></i>'}
        ${task.locked === false ? '<i class="bi bi-pencil-fill"></i>' : ''}
        <i class="bi bi-trash"></i>
    </div>`
}
function renderListToUi(container,list){
    // const fragment=document.createDocumentFragment()
    for(let task of list){
         container.insertAdjacentHTML('beforeend', createTaskUi(task))
        //  const deletIcon=document.createElement('')
    }
   
}
function renderTasks(taskList = tasks){
    todoTaskContainer.innerHTML=""
    inProgressContainer.innerHTML=""
    doneTaskContainer.innerHTML=""
const todoTasks=taskList.filter((task)=>{
   return task.status==='todo'
})
const inProgressTasks=taskList.filter((task)=>{
    return task.status==='inprogress'
})
const doneTasks=taskList.filter((task)=>{
   return  task.status==='done'
})
renderListToUi(todoTaskContainer,todoTasks)
renderListToUi(inProgressContainer,inProgressTasks)
renderListToUi(doneTaskContainer,doneTasks)
}
prioritySwatches.forEach((swatch)=>{
    swatch.addEventListener('click',()=>{
        const selectedPriority=swatch.classList[1]
        if(selectedPriority==='all'){
            renderTasks(tasks)
            return
        }
        const filteredTasks=tasks.filter((task)=>{
            return task.priority===selectedPriority
        })
        // console.log(filteredTasks)
        renderTasks(filteredTasks)
    })
})

function addTask(task){
    tasks.push(task)
    renderTasks()
}
function deleteTask(idToBeDeleted){
    const taskIdx=tasks.findIndex((task)=>task.id===idToBeDeleted)
    if(taskIdx===-1){
        throw new Error('Invalid Id');   
    }
    tasks.splice(taskIdx,1)
    renderTasks()
}
function lockTask(id){
const task=tasks.find((t)=>t.id===id)
task.locked=true
// render
if(!task){
    throw new Error('id is not valid')
}
renderTasks()
}
function unlockTask(id){
const task=tasks.find((t)=>t.id===id)
task.locked=false
if(!task){
    throw new Error('id is not valid')
}
// re-render
renderTasks()

}
function createEditModalUi(task){
    if(!task){
        return
    }
    editModalcontainer.innerHTML=''
    const editForm=document.createElement('form')
    const descLabel=document.createElement('label')
    descLabel.innerText='Task Description:'
    const textarea=document.createElement('textarea')
    textarea.value=task.desc
    const statusLabel=document.createElement('label')
    statusLabel.innerText='Status:'
    const statusDropdown=document.createElement('select')
    for(let status of allStatus){
        const option=document.createElement('option')
        option.value=status
        option.innerText=status
        statusDropdown.append(option)
    }
    statusDropdown.value=task.status
    const priorityLabel=document.createElement('label')
    priorityLabel.innerText='Priority:'
    const prioritiesDropdown=document.createElement('select')
    for(let priority of priorities){
         const option=document.createElement('option')
        option.value=priority
        option.innerText=priority
        prioritiesDropdown.append(option)
    }
    prioritiesDropdown.value=task.priority
    const saveBtn=document.createElement('button')
    saveBtn.type='button'
    saveBtn.innerText='Save'
    const cancelEditBtn=document.createElement('button')
    cancelEditBtn.type='button'
    cancelEditBtn.innerText='Cancel'
   saveBtn.addEventListener('click',()=>{
        task.desc=textarea.value
        task.status=statusDropdown.value
        task.priority=prioritiesDropdown.value
        editModal.style.display='none'
        renderTasks()
   })
    cancelEditBtn.addEventListener('click',()=>{
        editModal.style.display='none'
    })
    editForm.append(descLabel, textarea, statusLabel, statusDropdown, priorityLabel, prioritiesDropdown, saveBtn, cancelEditBtn)
    editModalcontainer.append(editForm)
}
function openEditModal(id){
const task=tasks.find((t)=>t.id===id)
if(!task){
    return
}
createEditModalUi(task)
editModal.style.display='block'
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
    taskBoard.addEventListener('click',(e)=>{
        // console.log(e.target)
        if(e.target.nodeName!=='I'){
            return
        }
        // console.log(e.target.parentElement.getAttribute('data-id'))
        if(e.target.nodeName==='I' && e.target.classList.contains('bi-trash')){
             const taskIdToBeDeleted=e.target.parentElement.getAttribute('data-id')  
            deleteTask(taskIdToBeDeleted)
            return
        }
        // console.log("clicked")
        // Toggling lock and unlock icon 
        if(e.target.nodeName==='I' && e.target.classList.contains('bi-lock')){
            // unlock the task
            const id=e.target.parentElement.getAttribute('data-id')
            unlockTask(id)
            return
        }
         if(e.target.nodeName==='I' && e.target.classList.contains('bi-unlock')){
            // task should be locked
             const id=e.target.parentElement.getAttribute('data-id')
            // unlockTask(id)
            lockTask(id)
            return
        }
        if(e.target.nodeName==='I' && e.target.classList.contains('bi-pencil-fill')){
            const id=e.target.parentElement.getAttribute('data-id')
            // console.log('edit',id)
            openEditModal(id)
            return
        }
       
    })

} 

function initializeApp(){
renderTasks()
registerEventListeners()
}
initializeApp()


