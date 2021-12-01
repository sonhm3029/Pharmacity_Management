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
