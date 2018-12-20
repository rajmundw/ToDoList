$(function() {

    //JSON url
    const url = "https://rajmundw.github.io/ToDoList/frontend";

    //attribute ID
    let counter = 0

    //drag elements to drag&drop
    let dragStartInnerText = ''
    let dragStartClassName = ''
    let dragStartCheckboxValue = ''

    //drop elements to drag&drop
    let dropInnerText = ''
    let dropClassName = ''
    let dropCheckboxValue = ''

    // function to get response from JSON and make divs with tasks
    const getResponse=()=> {
        //ajax GET method to get answer
        $.ajax({
            method: "GET",
            url: url + "/tasks",
            dataType: "json"
        }).done(function (response) {
            //make counter value this same as last element ID on JSON
            //check condition to avoid error
            if (response.length > 0) {
                //catch last element and give this value for counter
                let lastElement = response[response.length - 1]
                lastElement.id
                counter = lastElement.id
                response.forEach(element=>{


                    //create element to put in #tasks
                    // main div 400x40
                    const allTaskDiv = document.createElement('div')

                    allTaskDiv.setAttribute('id',element.id)

                    //create a possibility to moving div
                    allTaskDiv.setAttribute('draggable', 'true')

                    //add function on events to drag&drop
                    allTaskDiv.ondragover = dragOver
                    allTaskDiv.ondragleave = dragLeave
                    allTaskDiv.ondrop = drop
                    allTaskDiv.ondragstart = dragStart
                    allTaskDiv.ondragend = dragEnd

                    //make a checkbox
                    const inputCheckBox = document.createElement('input')
                    //div to removing task
                    const trush = document.createElement('div')
                    //there will be show text about task
                    const taskTextDiv = document.createElement('div')
                    //lines on left side
                    const divWithLines = document.createElement('div')
                    //main section for tasks
                    const tasksDivAllcontainer = document.querySelector('section#tasks')
                    //img element more precisely trash
                    const trushBackground = document.createElement('img')

                    //add to element event to delete
                    trushBackground.onclick = deleteTask


                    //set src for img element
                    trushBackground.setAttribute("src", "./img/trash.png")
                    //add type to checkbox input
                    inputCheckBox.type = "checkbox"
                    // add event on change checkbox to make a done task
                    inputCheckBox.onchange = checkAsDone


                    //add classes for new dom elements
                    allTaskDiv.className = 'task-main-div'
                    inputCheckBox.className = 'input-checkbox'
                    trush.className = 'trush'
                    taskTextDiv.className = element.taskClassName
                    divWithLines.className = 'div-with-lines'
                    //add task text from input to input of list of tasks

                    const boolen=()=>{
                        if(element.taskCheckboxValue=="true"){
                            return true
                        }else{
                            return false
                        }
                    }

                    taskTextDiv.innerText = element.taskText
                    inputCheckBox.checked=boolen()

                    //append whole element to DOM
                    tasksDivAllcontainer.appendChild(allTaskDiv)
                    allTaskDiv.appendChild(inputCheckBox)
                    allTaskDiv.appendChild(divWithLines)
                    allTaskDiv.appendChild(taskTextDiv)
                    trush.appendChild(trushBackground)
                    allTaskDiv.appendChild(trush)
                })
            }

        })
    }


    //first question to server when we open website and load previous tasks
    getResponse()

    // plus left bottom side of todolist
    const plus = document.querySelector('#new-task').firstElementChild;

    // when cursor will be on plus cursor will became a pointer
    plus.addEventListener("mouseover", function () {
        this.style.cursor = 'pointer'
    })

    //when we will on plus we add new task or new div which will show mistake
    plus.addEventListener("click", function () {

        //increment ID attribute
        counter++

        // catch input with task text
        const taskText = this.parentElement.querySelector('input')
        //catch div with error text
        const errorDiv = document.querySelector('#to-do-list').firstElementChild
        //condition if it is true side show error else ...
        if (taskText.value.length == 0) {
            //add class to show error
            errorDiv.className = 'show-error'
        } else {
            //remove class error
            errorDiv.className = 'no-error'
            //create element to put in #tasks

            // main div 400x40
            const allTaskDiv = document.createElement('div')

            allTaskDiv.setAttribute('id',counter)

            //create a possibility to moving div
            allTaskDiv.setAttribute('draggable', 'true')

            //add function on events to drag&drop
            allTaskDiv.ondragover = dragOver
            allTaskDiv.ondragleave = dragLeave
            allTaskDiv.ondrop = drop
            allTaskDiv.ondragstart = dragStart
            allTaskDiv.ondragend = dragEnd

            //make a checkbox
            const inputCheckBox = document.createElement('input')
            //div to removing task
            const trush = document.createElement('div')
            //there will be show text about task
            const taskTextDiv = document.createElement('div')
            //lines on left side
            const divWithLines = document.createElement('div')
            //main section for tasks
            const tasksDivAllcontainer = document.querySelector('section#tasks')
            //img element more precisely trash
            const trushBackground = document.createElement('img')

            //add to element event to delete
            trushBackground.onclick = deleteTask


            //set src for img element
            trushBackground.setAttribute("src", "./img/trash.png")
            //add type to checkbox input
            inputCheckBox.type = "checkbox"
            // add event on change checkbox to make a done task
            inputCheckBox.onchange = checkAsDone

            //add classes for new dom elements
            allTaskDiv.className = 'task-main-div'
            inputCheckBox.className = 'input-checkbox'
            trush.className = 'trush'
            taskTextDiv.className = 'task-text-div'
            divWithLines.className = 'div-with-lines'
            //add task text from input to input of list of tasks
            taskTextDiv.innerText = taskText.value

            //append whole element to DOM
            tasksDivAllcontainer.appendChild(allTaskDiv)
            allTaskDiv.appendChild(inputCheckBox)
            allTaskDiv.appendChild(divWithLines)
            allTaskDiv.appendChild(taskTextDiv)
            trush.appendChild(trushBackground)
            allTaskDiv.appendChild(trush)
            //reset entrance input task text
            taskText.value = ''

            //ajax element to put in JSON
            const task = {
                taskText: taskTextDiv.innerText,
                taskClassName:"task-text-div",
                taskCheckboxValue:inputCheckBox.checked
            };
            //ajax method
            $.ajax({
                method: "POST",
                url: url + "/tasks",
                dataType: "json",
                data: task
            }).done(function (response) {
                //response
            });

        }
    })


    // function to delete tasks
    function deleteTask() {
        //catch main task div to remove
        this.parentElement.parentElement.remove()
        //catch this element id to remove element from JSON
        const elementId=this.parentElement.parentElement.id
        //ajax deleting
        $.ajax({
            method: "DELETE",
            url: url + `/tasks/${elementId}`,
            dataType: "json"
        }).done(function(response) {
            //use a ajax GET method to get to know that last element was deleted because if it's JSON takes this same ID
            // and conuter will increment so we will have problem with deleting and changing elements
            $.ajax({
                method: "GET",
                url: url + "/tasks",
                dataType: "json"
            }).done(function (response) {
                //make counter value this same as last element ID on JSON
                if (response.length > 0) {
                    let lastElement = response[response.length - 1]
                    lastElement.id
                    counter = lastElement.id
                }


            });
        })
    }

    //function to check tasks as done
    function checkAsDone() {
        //div which text will change class
        const tekstTaskDiv=this.parentElement

        //chacking that chackbox is checked or not thanks to checking class
        if (tekstTaskDiv.children[2].className == "task-text-div") {
            tekstTaskDiv.children[2].className = "task-text-div-done"
        } else {
            tekstTaskDiv.children[2].className = "task-text-div"
        }

        //catch element id to change it on JSON
        const elementId=tekstTaskDiv.id

        //edited object to put in json
        const task = {
            taskText: tekstTaskDiv.children[2].innerText,
            taskClassName:tekstTaskDiv.children[2].className,
            taskCheckboxValue:tekstTaskDiv.children[0].checked
        };
        //ajax method
        $.ajax({
            method: "PATCH",
            url: url + `/tasks/${elementId}`,
            dataType: "json",
            data: task
        })
            .done(function(response){

            });
    }


    //belowe to dragEnd are functions which are added to events drag&drop in click event
    function dragOver(e) {
        e.preventDefault()
        this.style.backgroundColor = 'lightgrey'
    }

    function dragStart() {
        this.style.border = '2px black solid'
        dragStartInnerText = this.children[2].innerText
        dragStartClassName = this.children[2].className
        dragStartCheckboxValue = this.children[0].checked
        console.log(dragStartCheckboxValue)
    }

    function drop(e) {
        e.stopPropagation();
        this.style.backgroundColor = 'white'

        dropClassName = this.children[2].className
        dropInnerText = this.children[2].innerText
        dropCheckboxValue = this.children[0].checked

        this.children[2].innerText = dragStartInnerText
        this.children[2].className = dragStartClassName
        this.children[0].checked = dragStartCheckboxValue

        const task = {
            taskText: this.children[2].innerText,
            taskClassName:this.children[2].className,
            taskCheckboxValue:this.children[0].checked
        };
        //ajax method
        $.ajax({
            method: "PATCH",
            url: url + `/tasks/${this.id}`,
            dataType: "json",
            data: task
        })
            .done(function(response){

            });

    }

    function dragLeave(e) {
        e.stopPropagation();
        this.style.backgroundColor = 'white'
    }

    function dragEnd() {
        this.style.borderTop = '0'
        this.style.borderLeft = '2px solid lightgrey'
        this.style.borderRight = '2px solid lightgrey'
        this.style.borderBottom = '2px solid lightgrey'

        this.children[2].innerText = dropInnerText
        this.children[2].className = dropClassName
        this.children[0].checked = dropCheckboxValue

        const task = {
            taskText: this.children[2].innerText,
            taskClassName:this.children[2].className,
            taskCheckboxValue:this.children[0].checked
        };
        $.ajax({
            method: "PATCH",
            url: url + `/tasks/${this.id}`,
            dataType: "json",
            data: task
        })
            .done(function(response){

            });
    }

    //above are functions to drop&down
})