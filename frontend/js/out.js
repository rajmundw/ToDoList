/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n$(function () {\n\n    //JSON url\n    var url = \"https://rajmundw.github.io/ToDoList/frontend\";\n\n    //attribute ID\n    var counter = 0;\n\n    //drag elements to drag&drop\n    var dragStartInnerText = '';\n    var dragStartClassName = '';\n    var dragStartCheckboxValue = '';\n\n    //drop elements to drag&drop\n    var dropInnerText = '';\n    var dropClassName = '';\n    var dropCheckboxValue = '';\n\n    // function to get response from JSON and make divs with tasks\n    var getResponse = function getResponse() {\n        //ajax GET method to get answer\n        $.ajax({\n            method: \"GET\",\n            url: url + \"/tasks\",\n            dataType: \"json\"\n        }).done(function (response) {\n            //make counter value this same as last element ID on JSON\n            //check condition to avoid error\n            if (response.length > 0) {\n                //catch last element and give this value for counter\n                var lastElement = response[response.length - 1];\n                lastElement.id;\n                counter = lastElement.id;\n                response.forEach(function (element) {\n\n                    //create element to put in #tasks\n                    // main div 400x40\n                    var allTaskDiv = document.createElement('div');\n\n                    allTaskDiv.setAttribute('id', element.id);\n\n                    //create a possibility to moving div\n                    allTaskDiv.setAttribute('draggable', 'true');\n\n                    //add function on events to drag&drop\n                    allTaskDiv.ondragover = dragOver;\n                    allTaskDiv.ondragleave = dragLeave;\n                    allTaskDiv.ondrop = drop;\n                    allTaskDiv.ondragstart = dragStart;\n                    allTaskDiv.ondragend = dragEnd;\n\n                    //make a checkbox\n                    var inputCheckBox = document.createElement('input');\n                    //div to removing task\n                    var trush = document.createElement('div');\n                    //there will be show text about task\n                    var taskTextDiv = document.createElement('div');\n                    //lines on left side\n                    var divWithLines = document.createElement('div');\n                    //main section for tasks\n                    var tasksDivAllcontainer = document.querySelector('section#tasks');\n                    //img element more precisely trash\n                    var trushBackground = document.createElement('img');\n\n                    //add to element event to delete\n                    trushBackground.onclick = deleteTask;\n\n                    //set src for img element\n                    trushBackground.setAttribute(\"src\", \"./img/trash.png\");\n                    //add type to checkbox input\n                    inputCheckBox.type = \"checkbox\";\n                    // add event on change checkbox to make a done task\n                    inputCheckBox.onchange = checkAsDone;\n\n                    //add classes for new dom elements\n                    allTaskDiv.className = 'task-main-div';\n                    inputCheckBox.className = 'input-checkbox';\n                    trush.className = 'trush';\n                    taskTextDiv.className = element.taskClassName;\n                    divWithLines.className = 'div-with-lines';\n                    //add task text from input to input of list of tasks\n\n                    var boolen = function boolen() {\n                        if (element.taskCheckboxValue == \"true\") {\n                            return true;\n                        } else {\n                            return false;\n                        }\n                    };\n\n                    taskTextDiv.innerText = element.taskText;\n                    inputCheckBox.checked = boolen();\n\n                    //append whole element to DOM\n                    tasksDivAllcontainer.appendChild(allTaskDiv);\n                    allTaskDiv.appendChild(inputCheckBox);\n                    allTaskDiv.appendChild(divWithLines);\n                    allTaskDiv.appendChild(taskTextDiv);\n                    trush.appendChild(trushBackground);\n                    allTaskDiv.appendChild(trush);\n                });\n            }\n        });\n    };\n\n    //first question to server when we open website and load previous tasks\n    getResponse();\n\n    // plus left bottom side of todolist\n    var plus = document.querySelector('#new-task').firstElementChild;\n\n    // when cursor will be on plus cursor will became a pointer\n    plus.addEventListener(\"mouseover\", function () {\n        this.style.cursor = 'pointer';\n    });\n\n    //when we will on plus we add new task or new div which will show mistake\n    plus.addEventListener(\"click\", function () {\n\n        //increment ID attribute\n        counter++;\n\n        // catch input with task text\n        var taskText = this.parentElement.querySelector('input');\n        //catch div with error text\n        var errorDiv = document.querySelector('#to-do-list').firstElementChild;\n        //condition if it is true side show error else ...\n        if (taskText.value.length == 0) {\n            //add class to show error\n            errorDiv.className = 'show-error';\n        } else {\n            //remove class error\n            errorDiv.className = 'no-error';\n            //create element to put in #tasks\n\n            // main div 400x40\n            var allTaskDiv = document.createElement('div');\n\n            allTaskDiv.setAttribute('id', counter);\n\n            //create a possibility to moving div\n            allTaskDiv.setAttribute('draggable', 'true');\n\n            //add function on events to drag&drop\n            allTaskDiv.ondragover = dragOver;\n            allTaskDiv.ondragleave = dragLeave;\n            allTaskDiv.ondrop = drop;\n            allTaskDiv.ondragstart = dragStart;\n            allTaskDiv.ondragend = dragEnd;\n\n            //make a checkbox\n            var inputCheckBox = document.createElement('input');\n            //div to removing task\n            var trush = document.createElement('div');\n            //there will be show text about task\n            var taskTextDiv = document.createElement('div');\n            //lines on left side\n            var divWithLines = document.createElement('div');\n            //main section for tasks\n            var tasksDivAllcontainer = document.querySelector('section#tasks');\n            //img element more precisely trash\n            var trushBackground = document.createElement('img');\n\n            //add to element event to delete\n            trushBackground.onclick = deleteTask;\n\n            //set src for img element\n            trushBackground.setAttribute(\"src\", \"./img/trash.png\");\n            //add type to checkbox input\n            inputCheckBox.type = \"checkbox\";\n            // add event on change checkbox to make a done task\n            inputCheckBox.onchange = checkAsDone;\n\n            //add classes for new dom elements\n            allTaskDiv.className = 'task-main-div';\n            inputCheckBox.className = 'input-checkbox';\n            trush.className = 'trush';\n            taskTextDiv.className = 'task-text-div';\n            divWithLines.className = 'div-with-lines';\n            //add task text from input to input of list of tasks\n            taskTextDiv.innerText = taskText.value;\n\n            //append whole element to DOM\n            tasksDivAllcontainer.appendChild(allTaskDiv);\n            allTaskDiv.appendChild(inputCheckBox);\n            allTaskDiv.appendChild(divWithLines);\n            allTaskDiv.appendChild(taskTextDiv);\n            trush.appendChild(trushBackground);\n            allTaskDiv.appendChild(trush);\n            //reset entrance input task text\n            taskText.value = '';\n\n            //ajax element to put in JSON\n            var task = {\n                taskText: taskTextDiv.innerText,\n                taskClassName: \"task-text-div\",\n                taskCheckboxValue: inputCheckBox.checked\n            };\n            //ajax method\n            $.ajax({\n                method: \"POST\",\n                url: url + \"/tasks\",\n                dataType: \"json\",\n                data: task\n            }).done(function (response) {\n                //response\n            });\n        }\n    });\n\n    // function to delete tasks\n    function deleteTask() {\n        //catch main task div to remove\n        this.parentElement.parentElement.remove();\n        //catch this element id to remove element from JSON\n        var elementId = this.parentElement.parentElement.id;\n        //ajax deleting\n        $.ajax({\n            method: \"DELETE\",\n            url: url + ('/tasks/' + elementId),\n            dataType: \"json\"\n        }).done(function (response) {\n            //use a ajax GET method to get to know that last element was deleted because if it's JSON takes this same ID\n            // and conuter will increment so we will have problem with deleting and changing elements\n            $.ajax({\n                method: \"GET\",\n                url: url + \"/tasks\",\n                dataType: \"json\"\n            }).done(function (response) {\n                //make counter value this same as last element ID on JSON\n                if (response.length > 0) {\n                    var lastElement = response[response.length - 1];\n                    lastElement.id;\n                    counter = lastElement.id;\n                }\n            });\n        });\n    }\n\n    //function to check tasks as done\n    function checkAsDone() {\n        //div which text will change class\n        var tekstTaskDiv = this.parentElement;\n\n        //chacking that chackbox is checked or not thanks to checking class\n        if (tekstTaskDiv.children[2].className == \"task-text-div\") {\n            tekstTaskDiv.children[2].className = \"task-text-div-done\";\n        } else {\n            tekstTaskDiv.children[2].className = \"task-text-div\";\n        }\n\n        //catch element id to change it on JSON\n        var elementId = tekstTaskDiv.id;\n\n        //edited object to put in json\n        var task = {\n            taskText: tekstTaskDiv.children[2].innerText,\n            taskClassName: tekstTaskDiv.children[2].className,\n            taskCheckboxValue: tekstTaskDiv.children[0].checked\n        };\n        //ajax method\n        $.ajax({\n            method: \"PATCH\",\n            url: url + ('/tasks/' + elementId),\n            dataType: \"json\",\n            data: task\n        }).done(function (response) {});\n    }\n\n    //belowe to dragEnd are functions which are added to events drag&drop in click event\n    function dragOver(e) {\n        e.preventDefault();\n        this.style.backgroundColor = 'lightgrey';\n    }\n\n    function dragStart() {\n        this.style.border = '2px black solid';\n        dragStartInnerText = this.children[2].innerText;\n        dragStartClassName = this.children[2].className;\n        dragStartCheckboxValue = this.children[0].checked;\n        console.log(dragStartCheckboxValue);\n    }\n\n    function drop(e) {\n        e.stopPropagation();\n        this.style.backgroundColor = 'white';\n\n        dropClassName = this.children[2].className;\n        dropInnerText = this.children[2].innerText;\n        dropCheckboxValue = this.children[0].checked;\n\n        this.children[2].innerText = dragStartInnerText;\n        this.children[2].className = dragStartClassName;\n        this.children[0].checked = dragStartCheckboxValue;\n\n        var task = {\n            taskText: this.children[2].innerText,\n            taskClassName: this.children[2].className,\n            taskCheckboxValue: this.children[0].checked\n        };\n        //ajax method\n        $.ajax({\n            method: \"PATCH\",\n            url: url + ('/tasks/' + this.id),\n            dataType: \"json\",\n            data: task\n        }).done(function (response) {});\n    }\n\n    function dragLeave(e) {\n        e.stopPropagation();\n        this.style.backgroundColor = 'white';\n    }\n\n    function dragEnd() {\n        this.style.borderTop = '0';\n        this.style.borderLeft = '2px solid lightgrey';\n        this.style.borderRight = '2px solid lightgrey';\n        this.style.borderBottom = '2px solid lightgrey';\n\n        this.children[2].innerText = dropInnerText;\n        this.children[2].className = dropClassName;\n        this.children[0].checked = dropCheckboxValue;\n\n        var task = {\n            taskText: this.children[2].innerText,\n            taskClassName: this.children[2].className,\n            taskCheckboxValue: this.children[0].checked\n        };\n        $.ajax({\n            method: \"PATCH\",\n            url: url + ('/tasks/' + this.id),\n            dataType: \"json\",\n            data: task\n        }).done(function (response) {});\n    }\n\n    //above are functions to drop&down\n});\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ })

/******/ });