$(function() {
    var userToken = window.sessionStorage.getItem('userToken');

    $.ajax({
       url: 'http://54.79.111.71:1337/api/categories',
       headers: {
           'x-token':userToken
       },
       method: 'GET',
       success: function(res){
           console.log(res);
       },
       error: function(){
           window.location.href='index.html';
       }
   }); 
});