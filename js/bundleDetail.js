$(function() {
    var userToken = window.sessionStorage.getItem('userToken');
    var selectedBundleId = window.sessionStorage.getItem('selectedBundleId');
    $.ajax({
        url: 'http://54.79.111.71:1337/api/bundles/' + selectedBundleId,
        headers: {
            'x-token':userToken
        },
        method: 'GET',
        success: function(res){
            var bundle = res.data;
            // image
            $('#image').attr("src",'../images/bundle' + selectedBundleId + '.jpeg');
            // updated at
            $('#updatedTime').text(bundle.updatedAt);
            // bundle name
            $('#bundleName').text(bundle.name);
            // base price
            $('#basePrice').text('$' + bundle.basePrice);
            // bundle products
            var products = res.data.bundleProducts;
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
            
        },
        error: function(){
           // when API failed, go to login page
           window.location.href='index.html';
       }
    })
});

// go to product detail page
function goToProductDetailPage(productId) {
    // store selected product id
    window.sessionStorage.setItem('selectedProductId', productId);
    // go to product detail page
    window.location.href='productDetail.html';
}
