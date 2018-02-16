//UTILITIES
$(document).on('click', '.add-product', function () {
    var currentCount = $('.repeat-product').length;
    var newCount = currentCount + 1;
    var lastRepeatingGroup = $('.repeat-product').last();
    var template = $('.repeat-product').first();
    var newSection = template.clone();
    var newHeading = $('h3', newSection).append(' ' + newCount);

    lastRepeatingGroup.removeClass('current-product');
    newSection.insertAfter(lastRepeatingGroup).hide().addClass('current-product new-product').slideDown(1000);
    newSection.find("input").each(function (index, input) {
        var i = $(this).attr('id');
        $(this).attr('id', i + newCount);
    });
    newSection.find("label").each(function (index, label) {
        var l = $(this);
        l.attr('for', l.attr('for') + newCount);
    });
    return false;
});