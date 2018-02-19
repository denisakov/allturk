//UTILITIES
var counter = (function() {
  var privateCounter = 1;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  };
})();
$(document).on('click', '.add-product', function () {
    var currentCount = $('.repeat-product').length;
    var newCount = counter.value();
    var lastRepeatingGroup = $('.repeat-product').last();
    var template = $('.repeat-product').first();
    var newSection = template.clone();
    var newHeading = $('h3', newSection).append(' ' + newCount);

    lastRepeatingGroup.removeClass('current-product');
    newSection.insertAfter(lastRepeatingGroup).hide().addClass('product' + newCount).slideDown(1000);
    newSection.find("input").each(function (index, input) {
        var i = $(this).attr('id');
        $(this).attr('id', i + newCount);
    });
    newSection.find("label").each(function (index, label) {
        var l = $(this);
        l.attr('for', l.attr('for') + newCount);
    });
    newSection.find("button").each(function (index, button) {
        var b = $(this);
        b.attr('id', b.attr('id') + newCount);
        b.attr('name', b.attr('name') + newCount);
        b.attr('style', '');
    });
    counter.increment();
    return false;
});

$(document).on('click', '.delete-product', function () {
    var currentIndex = $(this).attr('id').replace(/\D/g,'').trim();
    var currentProduct = $('.product' + currentIndex).remove();
    console.log(currentProduct);
    // currentProduct.remove();
    return true;
});
// Bind to the submit event of our form
function formSubmit(event) {

	// Abort any pending request
	if (request) {
		request.abort();
	}
	// setup some local variables
	var $form = $('#order');

	// Let's select and cache all the fields
	var $inputs = $form.find("input, select, button, textarea");

	// Serialize the data in the form
	var serializedData = $form.serialize();

	// Let's disable the inputs for the duration of the Ajax request.
	// Note: we disable elements AFTER the form data has been serialized.
	// Disabled form elements will not be serialized.
	$inputs.prop("disabled", true);

	// Fire off the request to /form.php
	request = $.ajax({
		url: "https://script.google.com/a/macros/userconversion.com/s/AKfycbw3Sp6Ivvh0ROz9HO_VFfuiis0KnfsNQPQtwhi3HtcLNV_emGdJ/exec",
		method: "POST",
		dataType: 'jsonp',
		data: serializedData
	});

	// Callback handler that will be called on success
	request.done(function (response, textStatus, jqXHR) {
		// Log a message to the console
	});

	// Callback handler that will be called on failure
	request.fail(function (jqXHR, textStatus, errorThrown) {
		// Log the error to the console

	});

	// Callback handler that will be called regardless
	// if the request failed or succeeded
	request.always(function (response) {
		// Reenable the inputs
		$inputs.prop("disabled", false);
		console.log(response.result + ". Row " + response.row + " was created.");
	});

	// Prevent default posting of form
	if (event) event.preventDefault();
};
function clearForm() {
	$('#order')[0].reset();
}
$('#order').submit(function (e) {
	e.preventDefault();
	//console.log('The button is clicked');
	// update hidden inputs
	formSubmit();
	setTimeout(function () {
		// var r = confirm("Form Submitted. You can now close the window or select \"OK\" to create a new form");
		// if (r == true) {
		clearForm();
		// }
	}, 500)
});