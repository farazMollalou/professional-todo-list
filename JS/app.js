// modals DOM code 
const modals_list = document.querySelector('.modal-bg').children
// modals DOM code 

let selected_task_id = null


function options_clk_handler(event) {
    let options_box = event.target.nextElementSibling
    options_box.classList.add("show_actions")
}

function close_options_box(e) {
    let desired_option_box = e.target.parentElement
    desired_option_box.classList.remove("show_actions")
}

function hide_task(e) {
    let task_elem = e.target.parentElement.parentElement
    task_elem.classList.add("hide")

    show_remove_confirm_modal(task_elem)
}

function show_remove_confirm_modal(task_elem) {
    modals_list[2].classList.add('active')
    modal_bg.classList.add("active")

    selected_task_id = task_elem.dataset.task_id
}

function remove_from_storage(id) {
    let storage_tasks = (JSON.parse(localStorage.getItem("today_list"))).tasks
    let updated_taskList = storage_tasks.filter(task => task.id != id)

    daily_plan = {
        tasks: [
            ...updated_taskList
        ],
        global_note: (JSON.parse(localStorage.getItem("today_list"))).global_note
    }

    localStorage.setItem("today_list", JSON.stringify(daily_plan))
    location.reload()
}

// local storage coding start
const task_list_show_field = document.querySelector(".todo-list-wrapper .body .task-list")
let written_tasks = []
let daily_plan = {
    note: "",
    tasks: []
}

const showTasksOnDOM = tasks => {
    task_list_show_field.innerHTML = ""
    tasks.forEach(task => {
        task_list_show_field.insertAdjacentHTML("afterbegin", `<div class="task ${task.priority}" data-task_id="${task.id}">
        <i class="btn fa fa-check"></i>
        <span class="task-title">${task.title}</span>
        <i class="fa fa-cog" onclick="options_clk_handler(event)"></i>
        <div class="action-btn-box">
            <i class="btn fa fa-eraser" onclick="hide_task(event)"></i>
            <i class="btn fa fa-eye"></i>
            <i class="btn fa fa-pen"></i>
            <i class="btn fa fa-times" onclick="close_options_box(event)"></i>
        </div>
    </div>`)
    })
}

window.addEventListener('load', () => {
    written_tasks = (JSON.parse(localStorage.getItem("today_list"))).tasks
    showTasksOnDOM(written_tasks)
    if (!written_tasks) {
        written_tasks = []
    }
})
// local storage coding end


// modal closing code
const modal_closers_list = document.querySelectorAll(".modal_closer")

modal_closers_list.forEach((modal_closer, index) => {
    modal_closer.addEventListener('click', () => {
        modal_bg.classList.remove('active')
        modals_list[index].classList.remove('active')
    })
})
// modal closing code


// add new task btn start
const add_new_task_modal_btn = document.querySelector('#add_new_task_modal_btn')
const modal_bg = document.querySelector('.modal-bg')
const new_task_title = document.querySelector(".new-task-form .new-task-input")
const newTaskAddBtn = document.querySelector(".new-task-form .add-btn")
const task_note = document.querySelector(".new-task-form .description-container textarea")

add_new_task_modal_btn.addEventListener('click', () => {
    modal_bg.classList.add("active")
    setTimeout(() => {
        modals_list[0].classList.add('active')
    }, 300)
})

newTaskAddBtn.addEventListener("click", e => {

    e.preventDefault()

    newTask = {
        title: new_task_title.value,
        isCompleted: false,
        priority: "normal",
        note: task_note.value,
        id: written_tasks.length
    }

    daily_plan = {
        tasks: [
            ...written_tasks, newTask
        ],
        global_note: ""
    }

    localStorage.setItem("today_list", JSON.stringify(daily_plan))

    window.location.reload()
})

// add new task btn end

const daily_note_btn = document.querySelector('#daily_note_btn')

daily_note_btn.addEventListener("click", () => {
    modal_bg.classList.add("active")
    modals_list[1].classList.add('active')
})

// confirm remove task start

modals_list[2].children[3].children[0].addEventListener('click', () => remove_from_storage(selected_task_id))

// confirm remove task end