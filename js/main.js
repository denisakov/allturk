//UTILITIES
var counter = (() => {
  var privateCounter = 2;
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
    //var currentCount = $('.repeat-product').length;
    var newCount = counter.value();
    //console.log(newCount);
    var lastRepeatingGroup = $('.repeat-product').last();
    var template = $('.repeat-product').first();
    var newSection = template.clone();
    var newHeading = $('h4', newSection).append(' ' + newCount);
    //var replaceProductSection = ;

    lastRepeatingGroup.removeClass('current-product');
    // newSection.insertAfter(lastRepeatingGroup).hide().addClass('product' + newCount).slideDown(1000);
    newSection.insertBefore($(this)).hide().addClass('product' + newCount).slideDown(1000);

    $('.replace-product').last().attr('class','replace-product' + newCount);
    $('.replace-product'+ newCount).attr('style','display: none;');
    newSection.find("input").each(function (index, input) {
        var i = $(this).attr('id');
        $(this).attr('id', i + newCount);
        $(this).val('');
        if ($(this).attr('name') == 'productPrice' || $(this).attr('name') == 'productQty' || $(this).attr('name') == 'productNoPackaging' || $(this).attr('name') == 'productCheck'){
        	$(this).change(function () {
			    updateTotal();
			});
        }
    });
    newSection.find("a").each(function (index, a) {
        var a = $(this).attr('id');
        $(this).attr('id', a + newCount);
    });
    newSection.find("label").each(function (index, label) {
        var l = $(this);
        l.attr('for', l.attr('for') + newCount);
    });
    newSection.find("button").each(function (index, button) {
        var b = $(this);
        b.attr('for', b.attr('for') + newCount);
        b.attr('id', b.attr('id') + newCount);
        b.attr('name', b.attr('name') + newCount);
        b.attr('style', '');
    });
    counter.increment();
    return false;
});
$(document).on('click', 'a[name=productReplaceAdd]', function (event) {
	event.preventDefault();
    var currentIndex = $(this).attr('id').replace(/\D/g,'').trim();
    var currentReplaceProduct = $('.replace-product' + currentIndex);
    currentReplaceProduct.attr('style','display: block;');
    //console.log(currentReplaceProduct);
    // currentProduct.remove();
    
    return true;
});
$(document).on('click', '.delete-product', function (event) {
	event.preventDefault();
    var currentIndex = $(this).attr('id').replace(/\D/g,'').trim();
    var currentProduct = $('.product' + currentIndex).remove();
    // console.log(currentProduct);
    counter.decrement();
    updateTotal()
    return true;
});
//Replace product controls

$(document).on('click', '.replace-delete-product', function (event) {
	event.preventDefault();
    var currentIndex = $(this).attr('id').replace(/\D/g,'').trim();
    var currentReplaceProduct = $('.replace-product' + currentIndex);
    currentReplaceProduct.find("input").each(function (index, input) {
    	$(this).val('');
    });
    currentReplaceProduct.attr('style','display: none;');

    //console.log('found the replacement' + $(this));
    // currentProduct.remove();
    
    return true;
});
(function(){
	var request;
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
			type: "POST",
			url: "https://script.google.com/macros/s/AKfycbyIZXopHL1bzFykYHptdOTIHkspO759-qi1xEjIPMcwz0S2HKZl/exec?source=allturk",
			dataType: "jsonp",
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
			//$inputs.prop("disabled", false);
			console.log(response.result);
		});
		// clearForm();
		$('.message').attr('style','display:block;');
		setTimeout(function(){
			$('.message').attr('style','display:none;');
			window.location.reload();
		},3000);

		// Prevent default posting of form
		//if (event) event.preventDefault();
	};
	function clearForm() {
		// $('#order')[0].reset();

		window.location.reload();
		return;
	}
	$('#order').submit(function (e) {
		e.preventDefault();
		//console.log('The button is clicked');
		// update hidden inputs
		formSubmit();
	});
})();
//Calculations
$('input[name=productPrice]').change(function () {
    updateTotal();
});
$('input[name=productQty]').change(function () {
    updateTotal();
});
$('input[name=productNoPackaging]').change(function () {
    updateTotal();
});
$('input[name=productCheck]').change(function () {
    updateTotal();
});

var updateTotal = function () {
    var total = 0;
    var price = $('input[name=productPrice]');
    var qty = $('input[name=productQty]');
    var unpack = $('input[name=productNoPackaging]');
    var check = $('input[name=productCheck]');
    $("div[class^='main-product']").each(function(index,input){
    	var p = parseFloat($(this).find(price).val());
    	var q = parseFloat($(this).find(qty).val());
    	var u = $(this).find(unpack).is(':checked');
    	var c = $(this).find(check).is(':checked');
    	if(!isNaN(p) && !isNaN(q)){
	    	total += p * q;
	    	if (u){
	    		total += 1*q;
	    	}
	    	if(c){
	    		total += 2*q;
	    	}
	    	console.log(total);
	    }
    });

 //    total += parseFloat($('input[name=productPrice]').val())*parseFloat($('input[name=productQty]').val());
 //    //console.log(isNaN(total));
    if(!isNaN(total)){
	    $('.total').html('TRY ' + total);
	} else {
		$('.total').html('TRY 0');
	}
};

// Update total on page load
updateTotal();