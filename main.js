let tasks = []


const addBtn = document.getElementById('addBtn');
const input = document.getElementById('taskInput');
const Container = document.getElementById('taskContainer');
const menu = document.getElementById('menu');
const editOption = document.getElementById('editOption');
const doneOption = document.getElementById('doneOption');
const deleteOption = document.getElementById('deleteOption');


let clickedTaskIndex = null;

//a function to display our tasks
function showTasks(){
    if(tasks.length === 0){
        Container.innerHTML = "<p>No Tasks Yet</p>";
    }
    else{

        let listHTML = "<ol>";
        for (let i =0; i<tasks.length;i++){
            const task = tasks[i];
            const doneStyle = task.done ? 'style="text-decoration: line-through; color: gray;"' : "";

            listHTML+= `<li data-index = "${i}" ${doneStyle}>${task.text}</li>`;
        }

        listHTML += "</ol>";
        Container.innerHTML = listHTML


        // add double click listener to each list element
        const allTasks = Container.querySelectorAll('li');
        allTasks.forEach((li) => {
            li.addEventListener('click', (event)=> showMenu(event, li));
        });
    }
}


//function to add Tasks
function addTask(){
    let newTask = input.value.trim();
    if(newTask===''){
        alert("Please enter a valid tasks");
        return
    }

    tasks.push({text:newTask, done:false});
    input.value="";
    showTasks();
}

//show custom menu near mouse

function showMenu(event, li){
    event.preventDefault(); 
      event.stopPropagation(); 
    clickedTaskIndex = parseInt(li.dataset.index);

    menu.style.display = "block";
    menu.style.left = `${event.pageX}px`
    menu.style.top =  `${event.pageY}px`
}


//hide menuwhen clicking somehwere else
document.addEventListener("click", (event) => {
  if (!menu.contains(event.target)) {
    menu.style.display = "none";
  }
});


//Edit task 
editOption.addEventListener("click", () => {
    const newText = prompt("Edit your task:", tasks[clickedTaskIndex].text);
    if( newText !== null && newText.trim() !== ""){
        tasks[clickedTaskIndex].text = newText.trim();
        showTasks();
    }

    menu.style.display = 'none';

});

// marking a task as done
doneOption.addEventListener("click", () => {
    tasks[clickedTaskIndex].done = !tasks[clickedTaskIndex].done;
    showTasks();
    menu.style.display = 'none'
})


//deleting a task completely
deleteOption.addEventListener('click', ()=>{
    tasks.splice(clickedTaskIndex, 1);
    showTasks();
    menu.style.display= "none";
})

addBtn.addEventListener('click', addTask);

showTasks();
























