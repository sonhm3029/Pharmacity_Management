// let addInputChange = require('./invoice');
var store_add_index = 0;

function addInputChange() {
    $('.dynamic-field__content input[type="text"]').change(function() {
        var product_code = $(this).val();
        var product_index = product_code_list.findIndex( dbproduct_code => dbproduct_code == product_code );
       
        if(product_index != -1) {
            //take parent element
            var parent = $(this).closest('.dynamic-field__content');
            
            //Take product_name -- it is product_name_list[product_index];
            var product_name = product_name_list[product_index];
            $(parent).find(".invoice-product-name").html(product_name);
    
            // Take product price --it is product_price_list[product_index]
            var product_price = product_price_list[product_index];
            $(parent).find(".invoice-product-price").html(product_price);
        }
    })
}

function createItem(i) {
    return `<div class="form-row dynamic-field__content">
    <div class="col-md-2-5 mb-3">
        <label for="invoice-product-code__${i}" class="form-label">Mã Sản Phẩm</label>
        <input type="text" class="form-control" id="invoice-product-code__${i}" name="product_code">
    </div>
    <div class="col-md-2-5 mb-3">
        <h3>Tên sản phẩm</h3>
        <span id="invoice-product-name__${i}" style="display:block;padding:8px;" class="invoice-product-name"></span>
    </div>
    <div class="col-md-2-5 mb-3">
        <label for="invoice-product-quantity__${i}" class="form-label">Số lượng</label>
        <input type="number" min="0" step="1" value="0" class="form-control" id="invoice-product-quantity__${i}" name="product_quantity">
    </div>
    <div class="col-md-2-5 mb-3">
        <h3>Giá tiền</h3>
        <span id="invoice-product-price__${i}" style="display:block;padding:8px;" class="invoice-product-price"></span>
    </div>
    <div class="col-md-2-5">
        <div class="trash_btn">
            <label for="" class="form-label"></label>
            <div>
                <button class="btn_round delete-item" type="button">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        </div> 
    </div>
</div>`;
}

$(function() {
      
    // Add item 
    $('#add-new-field').click(function() {
        
        store_add_index +=1;
        var newElement = $(createItem(store_add_index));
        $('#list_dynamic_items').append(newElement);

        // Delete-item
        $('.delete-item').click(function() {
            $(this).closest('.dynamic-field__content').remove();
            store_add_index -=1;
        });

        // Add input change event to input field
        addInputChange();
    });
});


function cancel_invoice() {
    location.reload(true);
}

