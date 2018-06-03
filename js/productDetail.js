$(function() {
    var userToken = window.sessionStorage.getItem('userToken');
    var selectedProductId = window.sessionStorage.getItem('selectedProductId');
    $.ajax({
        url: 'http://54.79.111.71:1337/api/products/' + selectedProductId,
        headers: {
            'x-token':userToken
        },
        method: 'GET',
        success: function(res){
            var product = res.data;
            // category
            $('#category').text(product.category.name);
            // image
            $('#image').attr("src",product.image);
            // updated at
            $('#updatedTime').text(product.updatedAt);
            // product name
            $('#productName').text(product.name);
            // product price
            $('#productPrice').text('$' + product.price);
            // product description
            $('#productDescription').text(product.description);
        },
        error: function(){
           // when API failed, go to login page
           window.location.href='index.html';
       }
    })
});