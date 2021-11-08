$(function() {
    
    

    var item = `<div class="form-row dynamic-field__content">
    <div class="col-md-2-5 mb-3">
        <label for="invoice-product-code" class="form-label">Mã Sản Phẩm</label>
        <input type="text" class="form-control" id="invoice-product-code" name="product_code">
    </div>
    <div class="col-md-2-5 mb-3">
        <h3>Tên sản phẩm</h3>
        <span id="invoice-product-name" style="display:block;padding:8px;">Demo ten</span>
    </div>
    <div class="col-md-2-5 mb-3">
        <label for="invoice-product-quantity" class="form-label">Số lượng</label>
        <input type="number" min="0" step="1" value="0" class="form-control" id="invoice-product-quantity" name="product_quantity">
    </div>
    <div class="col-md-2-5 mb-3">
        <h3>Giá tiền</h3>
        <span id="invoice-product-price" style="display:block;padding:8px;">100000</span>
    </div>
    <div class="col-md-2-5">
        <div class="copy_btn">
            <label for="" class="form-label"></label>
            <div>
                <button class="btn_round" type="button" onclick="addNewField()">
                    <i class="fa fa-copy"></i>
                </button>
            </div>
        </div>
        <div class="trash_btn">
            <label for="" class="form-label"></label>
            <div>
                <button class="btn_round" type="button" onclick="deleteField()">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        </div> 
    </div>
</div>`;

    // Add item 
    $('#add-new-field').click(function() {
        $('#list_dynamic_items').html(function(i, originHTML) {
            return originHTML + item;
        });
        
    });
});

function addNewField() {
    var item = `<div class="form-row dynamic-field__content">
    <div class="col-md-2-5 mb-3">
        <label for="invoice-product-code" class="form-label">Mã Sản Phẩm</label>
        <input type="text" class="form-control" id="invoice-product-code" name="product_code">
    </div>
    <div class="col-md-2-5 mb-3">
        <h3>Tên sản phẩm</h3>
        <span id="invoice-product-name" style="display:block;padding:8px;">Demo ten</span>
    </div>
    <div class="col-md-2-5 mb-3">
        <label for="invoice-product-quantity" class="form-label">Số lượng</label>
        <input type="number" min="0" step="1" value="0" class="form-control" id="invoice-product-quantity" name="product_quantity">
    </div>
    <div class="col-md-2-5 mb-3">
        <h3>Giá tiền</h3>
        <span id="invoice-product-price" style="display:block;padding:8px;">100000</span>
    </div>
    <div class="col-md-2-5">
        <div class="copy_btn">
            <label for="" class="form-label"></label>
            <div>
                <button class="btn_round" type="button" onclick="addNewField()">
                    <i class="fa fa-copy"></i>
                </button>
            </div>
        </div>
        <div class="trash_btn">
            <label for="" class="form-label"></label>
            <div>
                <button class="btn_round" type="button" onclick="deleteField()">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        </div> 
    </div>
    </div>`;
    var originHTML = document.getElementById('list_dynamic_items').innerHTML;
    document.getElementById('list_dynamic_items').innerHTML
    = originHTML + item;
}

function deleteField() {
    $('.dynamic-field__content:last-child').remove();
}

function cancel_invoice() {
    location.reload(true);
}


