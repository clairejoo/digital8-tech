$('#loginForm').submit(function(event){
    event.preventDefault();
    
    var loginData = $('#loginForm').serialize();
    
    $.ajax({
        url: 'http://54.79.111.71:1337/api/user/login',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        },
        method: 'POST',
        data: loginData,
        success: function(res){
            // store user token
            window.sessionStorage.setItem('userToken', res.data.token);
            
            // go to main page
            window.location.href='main.html';
        },
        error: function(){
            console.log('error');
        }
    });
});

