let submit = document.getElementById('submit');
let title = document.getElementById('title');
let description = document.getElementById('description');


submit.addEventListener("click", function () {
    addTitle = title.value;
    addDescription = description.value;

    let taskForm = {
        addTitle,
        addDescription
    };

    if (title.value.trim() != 0 && description.value.trim() != 0) {
        let task = localStorage.getItem("taskData");
        if (task == null) {
            taskObj = [];
        } else {
            taskObj = JSON.parse(task);
        }
        taskObj.push({
            'titles': addTitle,
            'descriptions': addDescription
        });
        localStorage.setItem("taskData", JSON.stringify(taskObj));
        
    }
    taskForm = '';
    showTask();
    pageing();
})


function pageing(){
    let task = localStorage.getItem("taskData");

    if (task == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(task);
    };

    var pageIteam = 2;
    var totalPageContent = taskObj.length;
    var pageNumber = 0;
    var pageContent = $('.page-content')

    if(totalPageContent % pageIteam == 0){
        pageNumber = totalPageContent / pageIteam;
    }else if(totalPageContent % pageIteam >= 1){
        pageNumber = totalPageContent / pageIteam;
        pageNumber++;
        pageNumber = Math.floor(pageNumber);
    };

    
    var pages = document.getElementById('pages');
    pages.innerHTML = ``;

    for(let i=1; i <= pageNumber; i++){
        pages.innerHTML += `<li class="page-item page-item-num"><a class="page-link" href="#"> ${i} </a></li>`;
    };

    pageContent.each(function(i){
        $(this).hide();
        if(i + 1 <= pageIteam){
            pageContent.eq(i).show();
        };
    });

    $('.page-item-num').click(function(){
        pageContent.hide();

        var page = $(this).text();
        console.log(page)
        var temp = page - 1;
        var start = temp * pageIteam;

        for (let i = 0; i<pageIteam; i++ ){
            pageContent.eq(start + i).show();
        }
    });
    
}



// show task

function showTask() {
    let task = localStorage.getItem("taskData");

    if (task == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(task);
    };

    let taskContainer = document.getElementById('tasks');
    taskContainer.innerHTML = '';

    taskObj.forEach((item, index) => {
        taskContainer.innerHTML += `
        <div class="card mb-3 page-content">
            <div class="card-body">
                <div class="row" data-val-id=1>
                    <div class="col-sm-3 text-left">
                        <p>
                            ${item.titles}
                        </p>
                    </div>
                    <div class="col-sm-7 text-left">
                        <p>
                            ${item.descriptions}
                        </p>
                    </div>
                    <div class="col-sm-2 text-right">
                        <button class="btn m-3" onclick="edit(${index})" >Edit</button>
                        <a href="#" onclick="deleteTask(${index})" class="btn btn-danger mr-3">X</a>
                    </div>
                </div>  
            </div>
        </div>
        `;
    });
    
};


// editTask
function edit(index) {

    document.getElementById('editTitle').value = index;
    document.getElementById('editDescription').value = index;

    let task = localStorage.getItem("taskData");
    let taskObj = JSON.parse(task);

    title.value = taskObj[index]['titles'];
    description.value = taskObj[index]['descriptions'];

    document.getElementById('submit').style.display = "none";
    document.getElementById('update').style.display = "block";

}

//deleteTask
function deleteTask(index) {
    let task = localStorage.getItem("taskData");
    let taskObj = JSON.parse(task);
    taskObj.splice(index, 1);
    localStorage.setItem("taskData", JSON.stringify(taskObj));

    showTask();
    pageing();
}

//updateTask
let update = document.getElementById('update');

update.addEventListener("click", function () {
    let task = localStorage.getItem("taskData");
    let taskObj = JSON.parse(task);

    let updateTitle = document.getElementById('editTitle').value;
    let updateDescription = document.getElementById('editDescription').value;

    for (keys in taskObj[updateTitle]) {
        if (keys == 'titles') {
            taskObj[updateTitle].titles = document.getElementById('title').value;
        }
    };
    for (keys in taskObj[updateDescription]) {
        if (keys == 'descriptions') {
            taskObj[updateDescription].descriptions = document.getElementById('description').value;
        }
    };
    localStorage.setItem("taskData", JSON.stringify(taskObj));

    document.getElementById('editTitle').value = '';
    document.getElementById('editDescription').value = '';

    document.getElementById('submit').style.display = "block";
    document.getElementById('update').style.display = "none";

    showTask();
    pageing();
});

//delete all
let deleteBtn = document.getElementById('delete');

deleteBtn.addEventListener("click", function () {

    let task = localStorage.getItem("taskData");
    let taskObj = JSON.parse(task);
    if (task == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(task);
        taskObj = [];
    };

    localStorage.setItem("taskData", JSON.stringify(taskObj));

    document.getElementById('submit').style.display = "block";
    document.getElementById('update').style.display = "none";
    showTask();
    pageing();
});


showTask();
pageing();