JSON.stringify({
    id: ID,
    product_name: $('#product_name').val().trim(),
    product_description: $('#product_description').val().trim(),
    image: $('#image_URL').val().trim(),
    product_price: $('#product_price').val().trim(),
    qty_on_hand: $('#qty_on_hand').val().trim()
})


success: function(result) {
        $("#div1").html(JSON.stringify(result))
    },
    error: function(result) {
        $("#div1").html(JSON.stringify(result))
    }