
$(()=>{
    $('#loginButton').on('click', ()=>{
        var username = $('#username').val()
        var password = $('#password').val()
        var formData = {'username' : username, 'password': password}
        $.ajax({
            timeout: 5000,
            method: 'post',
            url: "http://localhost:3000/addAdmin",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(formData),
            success: (bool)=>{
                if(bool){
                    window.location.href = "./marks.html"
                }
                else{                
                    alert("Error")
                }
            },
            error: (err)=>{
                alert("Something went wrong")
            }
        })
    })
})