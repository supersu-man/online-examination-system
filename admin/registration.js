$(()=>{
    $('#loginButton').on('click', ()=>{
        window.location.href="../user/login.html" 
    })
    $('#registerButton').on('click', ()=>{
        var username = $('#username').val()
        var email  = $('#email').val()
        console.log(email)
        var password1 = $('#password1').val()
        var password2 = $('#password2').val()
        if(password1 != password2){
            alert("Passwords don't match")
        } else{
            var formData = {'username' : username, 'password': password1, 'email' : email}
            $.ajax({
                timeout: 5000,
                method: 'post',
                url: "http://localhost:3000/addUser",
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(formData),
                success: (data)=>{
                    if(data){
                        alert("User registered successfully")
                    } else{
                        alert("Error")
                    }
                },
                error: (err)=>{
                    alert("Something went wrong")
                }
            })
        }
    })
})