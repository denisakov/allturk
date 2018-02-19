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
$.watermarker.setDefaults({ color: '#f00', left: 8 });
$('input[type=textarea]').watermark();