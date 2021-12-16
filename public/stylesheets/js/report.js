$(function() {

        
    $("#report-file").change(function() {
        var html = ''
        for(let i = 0; i< (this.files).length; i++) {
            var temp = '<li>'+(this.files)[i].name+'</li>';
            html +=temp;
        }
        document.getElementById("list-files-upload").innerHTML = html;
    })

})