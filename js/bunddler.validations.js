/*
Contains functions that override default asp.net validator functions for enhanced UI experience.
*/

ValidatorUpdateDisplay = function (val) {
    if (typeof (val.display) == "string") {
        if (val.display == "None") {
            return;
        }
        if (val.display == "Dynamic") {
            if (val.isvalid) {
                $(val).hide("fast");
                //if (!control[0].hasErrors) control.removeClass('error'); 
            }
            else {
                $(val).show("fast"); 
                //control[0].hasErrors = true;
                //control.addClass('error');
            }
            return;
        }
    }
    if ((navigator.userAgent.indexOf("Mac") > -1) && (navigator.userAgent.indexOf("MSIE") > -1)) {
        val.style.display = "inline";
    }
    val.style.visibility = val.isvalid ? "hidden" : "visible";
}


function AllValidatorsValid(validators) {
    var result = true;
    var invalidControls = new Array();

    if ((typeof (validators) != "undefined") && (validators != null)) {
        var i;
        for (i = 0; i < validators.length; i++) {
            var control = validators[i].controltovalidate;
            var valid = validators[i].isvalid;

            // If first occurence of control
            if (!invalidControls[control])
                invalidControls[control] = false;

            if (!valid) {
                result = false;
                invalidControls[control] = true;
            }
        }
    }

    for (var c in invalidControls) {
        var control = $('#' + c);
        var invalid = eval('invalidControls.' + c);

        if (invalid)
            control.addClass('error');
        else
            control.removeClass('error');
    }

    return result;
}

//// Manual client-side validation of Validator Groups
function validateGroups(groups) {
    var validationResults = new Array();
    var i;

    // 1) Validate groups
    for (i = 0; i < groups.length; i++) {
        validationResults.push(Page_ClientValidate(groups[i]));
    }

    // 2) Validate validators
    //for (i = 0; i < Page_Validators.length; i++) {
    //    ValidatorValidate(Page_Validators[i]); //this forces validation in all groups
    //}

    // 3) Display all summaries.
    try{
        for (i = 0; i < Page_ValidationSummaries.length; i++) {
            summary = Page_ValidationSummaries[i];
            //does this summary need to be displayed?
            if (displayValidationSummary(summary.validationGroup)) {
                summary.style.display = ""; //"none"; "inline";
            }
        }
    }
    catch(Exception){}
    

    // 4) Check all validation groups - if valid
    var valid = ($.inArray(false, validationResults) == -1);

    // 5) Show validation summary block if not valid
    if (!valid)
        $('#pnlValidationFailed').show();
    else
        $('#pnlValidationFailed').hide();

    return valid;
}

// Show validation summary by group
function displayValidationSummary(valGrp) {
    var rtnVal = false;
    for (i = 0; i < Page_Validators.length; i++) {
        if (Page_Validators[i].validationGroup == valGrp) {
            if (!Page_Validators[i].isvalid) { //at least one is not valid.
                rtnVal = true;
                break; //exit for-loop, we are done.
            }
        }
    }
    return rtnVal;
}

// Blocks control is validation is valid
function blockIfValid(container) {
    var isValid = true;
    if (typeof (Page_ClientValidate) == 'function')
        isValid = Page_ClientValidate();

    try{
        if (isValid)
            container.block();
    }
    catch (e)
    {
    }   
}

//// Enable or disable validation group
//function enableValidationGroup(validationGroupName, isEnable) {
//    for (i = 0; i < Page_Validators.length; i++) {
//        if (Page_Validators[i].validationGroup == validationGroupName) {
//            ValidatorEnable(Page_Validators[i], isEnable);
//        }
//    }
//}
