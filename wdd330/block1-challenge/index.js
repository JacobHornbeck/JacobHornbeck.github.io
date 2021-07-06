import Task from './Task.js'

/* Helper Functions */
    function lsWrite(key, value, stringify=true) {
        localStorage.setItem(key, (stringify ? JSON.stringify(value) : value))
    }
    function lsRead(key, parse=true) {
        const data = localStorage.getItem(key) || "[]"
        return (parse ? JSON.parse(data) : data)
    }
    function create(type) {
        return document.createElement(type)
    }
/* Helper Functions */

/* Task Functions */
    function deleteTask(taskId) {
        /* Read From LocalStorage */
        const tasks = lsRead('tasks')

        /* Filter Out The One To Delete */
        const leftoverTasks = tasks.filter(task => {
            return task.id !== taskId
        })

        /* Write The Remaining Tasks Back Into LS */
        lsWrite('tasks', leftoverTasks)

        const elem2Remove = document.querySelector(`#${taskId}`)
        elem2Remove.style.animation = "deleteTask 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
        setTimeout(() => {
            elem2Remove.style.animation = ""
            elem2Remove.remove()

            if (document.querySelector('.todoList').innerHTML === "")
                document.querySelector('.todoList').innerHTML = '<p class="centered">Sorry, we couldn\'t find any tasks</p>'
        }, 500);
    }

    function addTask(taskContent) {
        TasksTodo()

        /* Read From LocalStorage */
        const tasks = lsRead('tasks')
        const taskId = `task${Date.now()}`

        /* Write To LocalStorage With New Task */
        tasks.push(new Task(taskId, taskContent))
        lsWrite('tasks', tasks)

        /* Build List Item */
        const listItem = create('li')
        const label = create('label')
        const span = create('span')
        const input = create('input')
        const button = create('button')

        listItem.id = taskId
        span.textContent = taskContent
        input.setAttribute('type', 'checkbox')
        input.addEventListener('change', () => {
            completeTask(taskId, input)
        })
        button.textContent = "—"
        button.classList.add('delete')
        button.addEventListener('click', () => {
            deleteTask(taskId)
        })

        /* Add To HTML View */
        const todoListElem = document.querySelector('.todoList')
        if (todoListElem.innerHTML === '<p class="centered">Sorry, we couldn\'t find any tasks</p>')
            todoListElem.innerHTML = ""
        label.appendChild(input)
        label.appendChild(span)
        listItem.appendChild(label)
        listItem.appendChild(button)
        listItem.style.animation = "newTask 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
        todoListElem.appendChild(listItem)
        setTimeout(() => {
            listItem.style.animation = ""
        }, 500);
    }

    function completeTask(taskId, elem, filter) {
        const tasks = lsRead('tasks')
        const taskIndex = tasks.findIndex(task => task.id === taskId)
        tasks[taskIndex].completed = !tasks[taskIndex].completed
        lsWrite('tasks', tasks)
        
        if ((elem.checked && filter==="todo") || (!elem.checked && filter==="done")) {
            setTimeout(() => {
                const task2complete = document.querySelector(`#${taskId}`)
                
                task2complete.style.animation = "completeTask 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
                setTimeout(() => {
                    task2complete.remove()
    
                    if (document.querySelector('.todoList').innerHTML === "")
                        document.querySelector('.todoList').innerHTML = '<p class="centered">Sorry, we couldn\'t find any tasks</p>'
                }, 500);
            }, 100);
        }
    }
/* Task Functions */

/* Loading Tasks */
    function loadTasks(filter="todo") {
        /* Clear Task List */
        document.querySelector('.todoList').innerHTML = ""

        /* Read From LocalStorage */
        const tasks = lsRead('tasks').filter(task => {
            return ((filter === "todo" && !task.completed) ||
                    (filter === "done" && task.completed) ||
                    (filter === "all"))
        })

        if (tasks.length > 0) {
            /* For Each Task */
            tasks.map((task) => {
                /* Build List Item */
                const listItem = create('li')
                const label = create('label')
                const span = create('span')
                const input = create('input')
                const button = create('button')

                listItem.id = task.id
                span.textContent = task.content
                input.setAttribute('type', 'checkbox')
                if (task.completed)
                    input.checked = true
                input.addEventListener('change', () => {
                    completeTask(task.id, input, filter)
                })
                button.textContent = "—"
                button.classList.add('delete')
                button.addEventListener('click', () => {
                    deleteTask(task.id)
                })

                /* Add To HTML View */
                label.appendChild(input)
                label.appendChild(span)
                listItem.appendChild(label)
                listItem.appendChild(button)
                document.querySelector('.todoList').appendChild(listItem)
            })
        }
        else {
            document.querySelector('.todoList').innerHTML = '<p class="centered">Sorry, we couldn\'t find any tasks</p>'
        }
    }
/* Loading Tasks */

/* Page Switch Functions */
    function AllTasks() {
        document.querySelector('#filterAll').classList.add('active')
        document.querySelector('#filterTodo').classList.remove('active')
        document.querySelector('#filterDone').classList.remove('active')
        document.querySelector('#pageTitle').textContent = "All Tasks"
        loadTasks("all")
    }
    function TasksTodo() {
        document.querySelector('#filterAll').classList.remove('active')
        document.querySelector('#filterTodo').classList.add('active')
        document.querySelector('#filterDone').classList.remove('active')
        document.querySelector('#pageTitle').textContent = "Tasks Todo"
        loadTasks("todo")
    }
    function TasksDone() {
        document.querySelector('#filterAll').classList.remove('active')
        document.querySelector('#filterTodo').classList.remove('active')
        document.querySelector('#filterDone').classList.add('active')
        document.querySelector('#pageTitle').textContent = "Tasks Done"
        loadTasks("done")
    }
/* Page Switch Functions */



/* Adding Event Listeners */
    document.querySelector('.addTodo').addEventListener('submit', (e) => {
        e.preventDefault()

        const taskContent = document.querySelector('#todoContent').value
        if (taskContent) {
            addTask(taskContent)
            document.querySelector('#todoContent').value = ""
        }
    })
    document.querySelector('#filterAll').addEventListener('click', AllTasks)
    document.querySelector('#filterTodo').addEventListener('click', TasksTodo)
    document.querySelector('#filterDone').addEventListener('click', TasksDone)
    window.onload = loadTasks()
/* Adding Event Listeners */