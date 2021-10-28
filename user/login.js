import Cookies from "../node_modules/js-cookie/dist/js.cookie.mjs"

$(()=>{
    checkSession()
    $('#loginButton').on('click', ()=>{
        var username = $('#username').val()
        var password = $('#password').val()
        console.log(Cookies.get('username'))
        loginValidation(username, password, (data)=>{
            if(data){
                saveCredentials(username,password)
                login()
            }else{
                console.log("Invalid Login.")
            }
        })
    })
})

function checkSession(){
    var username = Cookies.get('username')
    var password = Cookies.get('password')
    loginValidation(username, password, (data)=>{
        if(data){
            login()
        }else{
            console.log("Invalid Login.")
        }
    })
}

function loginValidation(username, password, callback){
    var formData = {'username' : username, 'password': password}
    $.ajax({
        timeout: 5000,
        method: 'post',
        url: "http://localhost:3000/login",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(formData),
        success: (data)=>{
            callback(data)
        }
    })
}

function login(){
    console.log("Logging in")
    createUser((data)=>{
        if(data){
            window.location.href="./index.html"
        }
    })
}

function createUser(callback){
    var formData = {'username' : Cookies.get('username'), 'password': Cookies.get('password')}
    $.ajax({
        timeout: 5000,
        method: 'post',
        url: "http://localhost:3000/createUser",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(formData),
        success: (data)=>{
            callback(data)
        }
    })
}

function saveCredentials(username,password){
    Cookies.set('username',username)
    Cookies.set('password',password)
}