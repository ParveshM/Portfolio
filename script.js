var $submitForm = $("#submitForm");
if ($submitForm.length) {
    $submitForm.validate({
        rules: {
            name: {
                required: true,
                minlength: 4
            },
            message: {
                required: true                
            },
            email: {
                required: true,
                email: true
            }
        },
        errorPlacement: function(error, element) {
        
            error.insertAfter(element);
        },
        highlight: function(element, errorClass, validClass) {
                        return false;
        }
    });
}



$("#submitForm").submit((e) => {
    e.preventDefault();
    var $submitForm = $("#submitForm");
    if ($submitForm.valid()) { 
        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbwyoA5EkwEHWhCxht48JuyxJMJJfBdKgtAATo6_kfuSGObbhdSF1YwoVI-iq6z3LpBZ/exec",
            data: $submitForm.serialize(),
            method: "post",
            success: function (response) {
                alert("Form submitted successfully");
                window.location.reload();
            },
            error: function (err) {
                alert("Something went wrong");
            }
        });
    }
});





addEventListener("load", function () {
    setTimeout(hideURLbar, 0)
}, false);

function hideURLbar() {
    window.scrollTo(0, 1)
}
