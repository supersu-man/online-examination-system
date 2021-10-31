import Cookies from "../node_modules/js-cookie/dist/js.cookie.mjs"

let qNum = 1
let qArray = []

$(()=> {

    checkForSession()

    setQuestionsData(()=>{
        setOptionsData()
        setNavbarData()
    })
    
    $('#prev').on('click',() => {
        if(qArray.length>0 && qNum>1){
            saveOptionData((data)=>{
                if(data){
                    qNum--;
                    setQuestionsData(()=>{
                        setOptionsData()
                    })
                }
            })
        } 
    })

    $('#save').on('click',() => {
        saveOptionData((data)=>{})
    })

    $('#nxt').on('click',() => {
        if(qArray.length>0 && qNum<qArray.length){
            saveOptionData((data)=>{
                if(data){
                    qNum++;
                    setQuestionsData(()=>{
                        setOptionsData()
                    })
                }
            })
        }
    })

    $('#logout').on('click', () => {
        Cookies.remove('username')
        Cookies.remove('password')
        window.location.href = "./login.html"
    });

    $('#menu-button').on('click',() => {
        $('#menu-button').toggleClass('active');
        $('#sidebar').toggleClass('active');
    });

    $('#question-list').on('click', '.list-each', function(){
        var id = $(this).attr('id')
        qNum = id.slice(-1)
        setQuestionsData(()=>{
            setOptionsData()
        })
    });

})

function checkForSession(){
    var username = Cookies.get("username")
    var password = Cookies.get("password")
    loginValidation(username, password, (data)=>{
        createUser((result)=>{
            if(!data || !result){
                window.location.href = "./login.html"
            }
        })
    })
}

function setNavbarData(){
    for (let index = 0; index < qArray.length; index++) {
        var q = `<li id="list-each-Q${index+1}" class="list-each">Q${index+1}</li>`
        $('#question-list').append(q) 
    }
}

function setQuestionsData(callback){
    getQuestionsData(()=>{
        $('#question').text(qArray[qNum-1]['question'])
        $('#a').text(qArray[qNum-1]['option_1'])
        $('#b').text(qArray[qNum-1]['option_2'])
        $('#c').text(qArray[qNum-1]['option_3'])
        $('#d').text(qArray[qNum-1]['option_4'])
        callback()
    })
}

function getQuestionsData(callback) {
    $.get("http://localhost:3000/getQuestions",(data) => {
        qArray = data
        callback()
    })
}

function setOptionsData() {
    getOptionsData((data)=>{
        try {
            var option = data[0]['q'+qNum]
            if(option==null){
                $('#optionA').prop("checked", false)
                $('#optionB').prop("checked", false)
                $('#optionC').prop("checked", false)
                $('#optionD').prop("checked", false)
            }else{
                $('#option'+option).prop("checked", true)
            }
        } catch (error) {}
    })
}

function getOptionsData(callback) {
    const formData = {'username' : Cookies.get('username')}
    $.ajax({
        timeout: 5000,
        method: 'post',
        url: "http://localhost:3000/getOptions",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(formData),
        success: (data)=>{
            callback(data)
        }
    })
}


function saveOptionData(callback) {
    var option = $('input[name="radio"]:checked').attr('id')
    if(option == undefined){
        callback(true)
    }else{
        const formData = {'qnum': qNum,'option' : option, 'username' : Cookies.get('username')}
        $.ajax({
            timeout: 5000,
            method: 'post',
            url: "http://localhost:3000/saveOption",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(formData),
            success: (data)=>{
                callback(data)
            }
        })
    }
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
        },
        error : ()=>{
            window.location.href = "./login.html"
        }
    })
}