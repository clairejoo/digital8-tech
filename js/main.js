$(function() {
    var userToken = window.sessionStorage.getItem('userToken');
    // categories container
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
               $('#categoriesContainer').append('<a href="#" class="list-group-item list-group-item-action category-name">' + category.name + '</a>');
           }
       },
       error: function(){
           // when API failed, go to login page
           window.location.href='index.html';
       }
   }); 
    
    // bundles carousel slides
    for (i=1; i < 4; i++) {
        callGetOneBundleApi(i);
    }
    
    
})

function callGetOneBundleApi(i) {
    var userToken = window.sessionStorage.getItem('userToken');
    $.ajax({
        url: 'http://54.79.111.71:1337/api/bundles/' + i,
        headers: {
            'x-token':userToken
        },
        method: 'GET',
        success: function(res){
            var bundle = res.data;
            var activeString;
            if (i == 1) {
                activeString = " active";
            }
            else {
                activeString = "";
            }
            $('#bundlesCarousel').append(
                '<div class="carousel-item' + activeString + '">' +
                    '<img class="d-block w-100" src="/images/bundle' + i + '.png" alt="slide' + i + '">' +
                    '<div class="carousel-caption d-none d-md-block">' +
                        '<span class="bundle-text">' + bundle.name + '</span>' +
                        '<span class="bundle-text bundle-price">$' + bundle.basePrice + '</span>' +
                    '</div>' +
                '</div>');
        }
    });
}