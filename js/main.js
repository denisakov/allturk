function updateAccountSelection() {
    if ($('#rbNewUser').is(':checked')) {
        $('#pnlName').show();
        // $('#pnlForgotPassword').hide();

        $('#txtName').focus();
    }
    else {
        $('#pnlName').hide();
        $('#txtEmail').focus();
    }
};
// $(document).on("change","input[name='rblAccount']",updateAccountSelection());
// $("input[name='rblAccount']").change(updateAccountSelection());
// $('#aAdd').click(function () { context.addItem(); return false; });
// $('#txtEmail').checkAvailability(2, $('#emailValidation'));
// $('#aSubmit').click(function () { context.submit(); });
// $('#additionalFieldsContainer input, #additionalFieldsContainer select').change(function () { context.refreshTotals(); });

// $(document).on('change', 'input[type=radio][name=gender]', function () {
//         alert('hi');
//     });
$("input[name='rblAccount']").click(updateAccountSelection());