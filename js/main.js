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
               // create category list
               $('#categoriesContainer').append('<a href="#' + category.name + '" class="list-group-item list-group-item-action category-name">' + category.name + '</a>');
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
    
    // list all products
    $.ajax({
        url: 'http://54.79.111.71:1337/api/products',
        headers: {
            'x-token':userToken
        },
        method: 'GET',
        success: function(res){
            var products = res.data;
            var i;
            for (i=0; i < products.length; i++) {
                var product = products[i];
                $('#' + product.category.name + 'Row').append(
                    '<div class="col-md-4">' +   
                        '<div class="card product-item" onclick="goToProductDetailPage(' + product.id + ')">' +
                            '<img class="card-img-top" src="' + product.image + '" alt="' + product.name + '">' +
                            '<div class="card-body">' + 
                                '<h7 class="card-title">' + product.name + '</h7>' +
                            '</div>' +
                            '<div class="card-footer">' +
                                '<span>$' + product.price + '</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>');
            }
        }
    });
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

// go to product detail page
function goToProductDetailPage(productId) {
    // store selected product id
    window.sessionStorage.setItem('selectedProductId', productId);
    // go to product detail page
    window.location.href='productDetail.html';
}















// scroll top btn
window.onscroll = function() {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scrollTopBtn").style.display = "block";
    } else {
        document.getElementById("scrollTopBtn").style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}