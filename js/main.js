$(function() {
    var userToken = window.sessionStorage.getItem('userToken');

    $.ajax({
       url: 'http://54.79.111.71:1337/api/categories',
       headers: {
           'x-token':userToken
       },
       method: 'GET',
       success: function(res){
           var categories = res.data;
           var i;
           for (i=0; i < categories.length; i++) {
               var category = categories[i];
               $('#categoriesContainer').append('<a href="#" class="list-group-item list-group-item-action">' + category.name + '</a>');
           }
       },
       error: function(){
           // when API failed, go to login page
           window.location.href='index.html';
       }
   }); 
});