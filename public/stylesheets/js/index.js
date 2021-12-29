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
            $(parent).find(".invoice-product-name").val(product_name);
    
            // Take product price --it is product_price_list[product_index]
            var product_price = product_price_list[product_index];
            $(parent).find(".invoice-product-price").val(product_price);
        }
        else {
            //take parent element
            var parent = $(this).closest('.dynamic-field__content');
            
            //Take product_name -- it is product_name_list[product_index];
            var product_name = product_name_list[product_index];
            $(parent).find(".invoice-product-name").val("KHÔNG TÌM THẤY SẢN PHẨM");
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
        <label for="invoice-product-name__${i}" class="form-label">Tên sản phẩm</label>
        <input id="invoice-product-name__${i}" style="display:block;padding:8px;" class="invoice-product-name form-control" name="product_name">
    </div>
    <div class="col-md-2-5 mb-3">
        <label for="invoice-product-quantity__${i}" class="form-label">Số lượng</label>
        <input type="number" min="0" step="1" value="0" class="form-control" id="invoice-product-quantity__${i}" name="product_quantity">
    </div>
    <div class="col-md-2-5 mb-3">
        <label for="invoice-product-price__${i}" class="form-label">Giá tiền</label>
        <input id="invoice-product-price__${i}" style="display:block;padding:8px;" class="invoice-product-price form-control" name="product_price">
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
        
        //A flag to know any input field exist
        store_add_index +=1;
        var newElement = $(createItem(store_add_index));
        $('#list_dynamic_items').append(newElement);

        // Delete-item
        $('.delete-item').click(function() {
            $(this).closest('.dynamic-field__content').remove();

            store_add_index -=1;
            //Auto re calculate invoice code when delete a product field
            calculate_cost();
            calculate_payback();
        });

        // Add auto calculate invoice cost
        $('input[name="product_quantity"]').change(function() {
            calculate_cost();
        })

        // Add input change event to input field
        addInputChange();
    });


    //Calculate payback
    $('#customer-pay').change(function() {
        calculate_payback();
    });
});

function calculate_cost() {
    var sum = 0;

    let quantity_arr = $('input[name="product_quantity"]');
    let price_arr = $('.invoice-product-price');

    for(let i = 0; i< quantity_arr.length; i++) {
        sum += $(quantity_arr[i]).val() * Number($(price_arr[i]).val());
    }
    
    //Put invoice cost into its place
    $('#invoice_cost').val(sum);
    calculate_payback();

}

function calculate_payback() {
    // Take customer pay
    let customer_pay = Number($('#customer-pay').val());
    let invoice_cost = Number($('#invoice_cost').val());
    // Calculate money to payback customer
    var pay_back = customer_pay - invoice_cost;
    $('#customer-pay-back').val(pay_back);
}



function cancel_invoice() {
    location.reload(true);
}

$(function() {
    // Pagination for product




    const number_of_page = $('.page-link').length;
    $('.page-link').click(function() {
        let urlParams = new URLSearchParams(window.location.search);
        urlParams.set('page', $(this).text());
        window.location.search = urlParams;
    });



    $('#next-page').click(function() {
        let urlParams = new URLSearchParams(window.location.search);
        var current_page = Number(urlParams.get('page'));
        if(current_page <= number_of_page - 1) {
            current_page +=1;
        }
        current_page = String(current_page)
        urlParams.set('page', current_page);
        window.location.search = urlParams;
    })

    $('#pre-page').click(function() {
        let urlParams = new URLSearchParams(window.location.search);
        var current_page = Number(urlParams.get('page'));
        if(current_page > 1) {
            current_page -=1;
        }
        current_page = String(current_page)
        urlParams.set('page', current_page);
        window.location.search = urlParams;
    })

    // Active page
    let urlParams = new URLSearchParams(window.location.search);
    var page_number = urlParams.get('page');
    const list_page_link = $('.page-link');
    for(var i = 0; i <list_page_link.length; i++) {
        if($(list_page_link[i]).text() == page_number) {
            $(list_page_link[i]).addClass('active-page');
        }
    }

    // Active taskbar
    const taskbar_items = $('.sidebar-nav__item');
    const sidebar_task__link = $('.sidebar-task__link');
    let urlPath = window.location.pathname;
    for(var i=0; i <sidebar_task__link.length; i++) {
        if($(sidebar_task__link[i]).attr('href') == urlPath || urlPath.includes($(sidebar_task__link[i]).attr('href'))) {
            // || urlPath.includes($(sidebar_task__link[i]).attr('href'))
            $(sidebar_task__link[i]).addClass('active-task__link');
            $(taskbar_items[i]).addClass('active-task');
        }      
    }


    // Other pagination
    // $('#pagination').pagination({
    //     dataSource: [1,2,3,4,5,6,7,8,9,0,1,2,3,44,5,6,7,8,9,0,1,2,23,4,5,4,7,5,45,57,43,346,34,47],
    //     pageSize:20,
    //     prevText:'&#8592;',
    //     nextText:'&#8594;'
    // });

    // var container = $('#pagination');
    // console.log(container.pagination('getSelectedPageNum'));
})

$(function() {
    var staff_code;
    let delete_confirm_btn = $('#delete-confirm-btn');
    const submit_delete_modal = $("[name='submit-delete-modal']");
    $('#delete-staff__modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        staff_code = button.data('id'); // Extract info from data-* attributes
    });
    delete_confirm_btn.click(function() {
        submit_delete_modal.attr("action", "/manager/staff-management/" + staff_code + "?_method=DELETE");
        submit_delete_modal.submit();
    })
});
