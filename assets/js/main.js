import log from './index.js'

const api = 'http://localhost:3000/courses';
var data_table = [];

// GET COURSES FROM API
var getCourses = async (callback) => {
    var response = await fetch(api) // FETCH is a function !!
    var data = await response.json()
    return data;
}

// RENDER COURSES TO HTML FROM DATA
var renderCourses = async () => {
    var listcourses = document.querySelector('.list-courses');
    var html = '';
    var data = await getCourses();

    data.forEach((item) => {
        html += `
        <br/>
        <li id="id-${item.id}">
            <h3 style="color: yellow">${item.name} (id = ${item.id})</h3>
            <br/>
            <p style="color: white">${item.description}</p>
            <br/>
            <table>
                <tr>
                    <td><button style="font-size: 17px" onclick="deleteCourse(${item.id})">Xóa</button></td>
                    <td><button style="font-size: 17px" onclick="openForm(${item.id})">Sửa</button></td>
                </tr>       
            </table>
        </li>
        `
        data_table.push(item);
    });

    listcourses.innerHTML += html;
}

// CREATE COURSE TO DATABASE
function createCourse(callback) {
    var createbtn = document.querySelector('button#create');
    var data = {};

    createbtn.onclick = () => {
        data.name = document.querySelector('input[name="name"]').value;
        data.description = document.querySelector('input[name="description"]').value;
        
        if (data.name !== '' && data.description !== '') {
            const option = {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json'
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            }
    
            fetch(api, option)
                .then((response) => response.json())
                .then(callback)
                .finally(() => {alert('Thêm dữ liệu thành công!!')})
        } else {
            alert('Bạn phải điền đẩy đủ Name và Description!')
        }
    }
    
}

// DELETE COURSE FROM DATABASE THROUGH API
function deleteCourse(id) {
    const option = {
        method:'DELETE',
        headers: {
          'Content-Type':'application/json',
        },
    };

    fetch(api + '/' + id, option)
        .then((response) => response.json())
        .then(() => {
            var liToDelete = document.querySelector('#id-' + id);
            liToDelete.remove()
        })
        .finally(() => {alert(`Xóa dữ liệu <id = ${id}> thành công!!`)});
}

// CHANGE COURSE INFOMATION
var global_id;

function openForm(id) {
        global_id = id;
        var getValue = data_table.find((item) => {return item.id === id});
        document.getElementById("popupForm").style.display = "block";
        document.querySelector('input[name="name_2"]').value = getValue.name;
        document.querySelector('input[name="description_2"]').value = getValue.description;
}
  
function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}

function changeCourse() {
    var data = {};
    data.name = document.querySelector('input[name="name_2"]').value;
    data.description = document.querySelector('input[name="description_2"]').value;
    
    if (data.name === '' && data.description === '') {
        alert('Bạn chưa nhập đầy đủ Name và Description!');
    } else {
        const option = {
            method: 'PUT',
            headers: {
            'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(api + '/' + global_id, option)
            .then((response) => response.json())
            .then((data) => {
                var ulToChange = document.querySelector('#id-' + global_id);
                ulToChange.innerHTML = `
                    <h3 style="color: yellow">${data.name}</h3>
                    <br/>
                    <p style="color: white">${data.description}</p>
                    <br/>
                    <table>
                        <tr>
                            <th><button style="font-size: 18px" onclick="deleteCourse(${item.id})">Xóa</button></th>
                            <th><button style="font-size: 18px" onclick="openForm(${item.id})")>Sửa</button></th>
                        </tr>       
                    </table>
                `
            .finally(() => {alert('Sửa dữ liệu thành công!!')})
        });
    }

    document.getElementById("popupForm").style.display = "none";
}

function start() {
    renderCourses();
    createCourse(renderCourses);
}

start();

// ---ASYNC AWAIT TEST---
var hello = async () => {
    return "hello"
}

var result1 = await hello();
log(result1)