if (typeof Bunddler == "undefined") Bunddler = {};

// This class implements controller for receiving web shop order
Bunddler.WebOrder = function(options) {
    Bunddler.WebOrder.prototype.init(options);
};

Bunddler.WebOrder.prototype =
{
    init: function (options) {
        var context = this;
        context.options = $.extend(Bunddler.WebOrder.defaults, options);        
        context.options.isEmbedded = false;

        try {
            //context.options.isEmbedded = (window.parent != null && typeof window.parent.postMessage != 'undefined');
            context.options.isEmbedded = window.self != window.top;
        }
        catch (e) { }

        context.weightUnit = enums.weightUnit;
        context.pageContent = $('#pageContent');
        context.orderContainer = $('#orderContainer');
        context.itemsContainer = $('#itemsContainer');
        context.totalsContainer = $('.totals .total', this.orderContainer);
        context.errorsContainer = $('#errors');
        context.items = [];

        
        if (context.options.predefinedUrls){
            context.addPredefinedItems(context.options.predefinedUrls);
        }
        else {//default empty feature product placeholder
            context.addItem(true);
        }

        // Main event handlers
        $("input[name='rblAccount']").change(context.updateAccountSelection);
        $('#aAdd').click(function () { context.addItem(); return false; });
        $('#txtEmail').checkAvailability(2, $('#emailValidation'));
        $('#aSubmit').click(function () { context.submit(); });
        $('#additionalFieldsContainer input, #additionalFieldsContainer select').change(function () { context.refreshTotals(); });

        // Focus first input
        if (!isAuthenticated)
            $('#txtName').focus();
        else {
            //$('.name input', this.itemsContainer).focus();
        }

        context.updateAccountSelection();
        context.adjustEmbeddedSize();
    },

    addPredefinedItems: function (urls) {
        var context = this;
        if (urls) {
            urls.forEach(function (url) {
                    if (url) {
                        context.addItem(true, null, url);
                    }
                }
            );
        }
    },

    adjustEmbeddedSize: function () {
        var context = this;
        if (context.options.isEmbedded) {
            window.parent.postMessage("0|" + context.pageContent.width() + "|" + context.pageContent.height(), "*");
        }
    },

    updateAccountSelection: function () {
        var context = this;
        if ($('#rbNewUser').is(':checked')) {
            $('#pnlName').show();
            $('#pnlForgotPassword').hide();

            if (typeof ValidatorEnable != 'undefined' && $('#txtNameRequired').length > 0)
                ValidatorEnable($('#txtNameRequired')[0], true);

            $('#txtEmail').checkAvailability(2, $('#emailValidation'));
            $('#txtName').focus();
        }
        else {
            $('#pnlName').hide();
            $('#pnlForgotPassword').show();

            if (typeof ValidatorEnable != 'undefined' && $('#txtNameRequired').length > 0)
                ValidatorEnable($('#txtNameRequired')[0], false);

            $('#txtEmail').unbind('blur');
            $('#emailValidation').empty();
            $('#txtEmail').focus();
        }
    },

    addItem: function (noAnimation, parent, prefillUrl) {
        var context = this;

        var item =
        {
            Name: '',
            Article: '',
            Url: '',
            Color: '',
            Size: '',
            CurrencyCode: context.items.length == 0 ? (tenantSettings.order.defaultCurrency != '' ? tenantSettings.order.defaultCurrency : Bunddler.defaults.currencies[0].CurrencyCode) : context.items[context.items.length - 1].CurrencyCode,
            //CurrencyCode: context.items.length == 0 ? Bunddler.defaults.currencies[0].CurrencyCode : context.items[context.items.length - 1].CurrencyCode,
            CustomerPrice: 0,
            Quantity: 1,
            Index: context.items.length,
            Substitutions: [],
            RemoveOriginalPackage: tenantSettings.order.removeOriginalPackageDefault,
            Parent: parent
        };

        if (parent == null)
            context.items.push(item);
        else {
            if (typeof parent.Substitutions == 'undefined' || parent.Substitutions == null)
                parent.Substitutions = [];
            parent.Substitutions.push(item);
        }

        // Render
        var element = context.renderItem(item);
        if (context.items.length > 1 && !noAnimation)
            element.addClass('hide');

        if (parent == null)
            context.itemsContainer.append(element);
        else {
            if (parent.Substitutions.length == 1)
                parent.element.after(element.addClass('last'));
            else {
                parent.Substitutions[parent.Substitutions.length - 2].element.after(element.addClass('last'));
                element.prev().removeClass('last');
            }
        }
        context.refreshTotals();

        if (!noAnimation) {
            element.slideDown(200, function () {
                if (!context.options.isEmbedded) {
                    $('html, body').animate({ scrollTop: element.offset().top }, 500);
                }
            });
        }

        if (noAnimation != true)
            $('.url input', element).focus();

        context.adjustEmbeddedSize();

        if (prefillUrl) {
            item.Url = prefillUrl;
            var urlInput = $('.url input', element);
            urlInput.val(prefillUrl);
            context.prefillItemByUrl(prefillUrl, urlInput, element);
        }
    },

    renderItem: function (item) {
        var context = this;
        //var element = $(context.options.itemTemplate);
        var element = $.tmpl('salesOrderItemTemplate', item);
        element[0].item = item;
        item.element = element;

        //hide not allowed fields
        if (!tenantSettings.order.allowItemComment)
            $('.field.controls a.add-comment, .field.controls .or', element).hide();

        if (!tenantSettings.order.allowSubstitution)
            $('.field.controls a.add-substitution, .field.controls .or', element).hide();

        // Set values
        var currencies = $('.field.price select', element);
        $.each(Bunddler.defaults.currencies, function (i, e) {
            currencies.append($('<option></option>').attr('value', e.CurrencyCode).text(e.Symbol == '' ? e.CurrencyCode : e.Symbol));
        })
        currencies.val(item.CurrencyCode);
        $('[watermark]', element).each(function (i, e) { $(e).watermark($(e).attr("watermark")); });

        // Substitutions settings
        if (item.Parent == null) {
            $('.field.controls', element).removeClass('hide');
            element.addClass('level-0');

            // Checkboxes (remove original package, check item)
            if (tenantSettings.order.allowRemoveOriginalPackage || tenantSettings.order.allowItemCheck) {
                $('div.checkboxes', element).removeClass('hide');

                if (tenantSettings.order.allowRemoveOriginalPackage) {
                    $('span.removeOriginalPackage', element).removeClass('hide');
                    var c1 = $('input.removeOriginalPackage', element);
                    c1.attr('id', 'removeOriginalPackage' + (new Date()).getTime());
                    c1.next().attr('for', c1.attr('id'));
                    if (item.RemoveOriginalPackage)
                        c1.attr('checked', true);
                }

                if (tenantSettings.order.allowItemCheck) {
                    $('span.checkItem', element).removeClass('hide');
                    var c1 = $('input.checkItem', element);
                    c1.attr('id', 'checkItem' + (new Date()).getTime());
                    c1.next().attr('for', c1.attr('id'));
                    if (item.CheckItem)
                        c1.attr('checked', true);
                }
            }
        }
        else
            element.addClass('substitution');

        // Assign events
        // ---
        $('.control a', element).click(function () { context.deleteItem(item); return false; });
        $('.field.price select,', element).change(function () { context.refreshTotals(); });
        $('.field.price input, .field.quantity input', element).change(function () { context.refreshTotals(); }).numeric();
        // Article
        $('.field.name a', element).click(function () {
            context.showArticle(element);
            $('.field.article input', element).focus();
            return false;
        });
        if (tenantSettings.order.requireArticle)
            $('.field.name a', element).click();

        // Comment
        if (tenantSettings.order.allowItemComment)
            $('.field.controls a.add-comment,', element).click(function () {
                var commentField = $('.field.comment', element);
                if (commentField.hasClass('hide')) {
                    commentField.removeClass('hide');
                    $('input', commentField).focus();
                }
                else
                    commentField.addClass('hide');
                return false;
            });

        // Substitution
        if (tenantSettings.order.allowSubstitution)
            $('.field.controls a.add-substitution,', element).click(function () {
                element.addClass('has-substitutions');
                context.addItem(false, item);
                return false;
            });

        // Weight
        var weight = $('.field.weight select', element);
        weight.append($('<option>').val(context.weightUnit.Kilogram).text(lang.b.weightUnit.Kilogram));
        weight.append($('<option>').val(context.weightUnit.Pound).text(lang.b.weightUnit.Pound));
        weight.val(item.WeightUnit);

        // Add prefill triggers
        var urlInput = $('.url input', element);
        urlInput.on('paste blur', function () {
            setTimeout(function () {
                var url = urlInput[0].value;
                if (url && url !== urlInput.attr('previousUrl')) {
                    context.prefillItemByUrl(url, urlInput, element);
                }
            }, 100);
        });

        return element;
    },

    prefillItemByUrl: function (url, urlElement, orderItemElem) {
        var context = this;

        urlElement.addClass('loading');
        urlElement.attr('previousUrl', url);

        $.ajax({
            url: applicationPath + context.options.getSalesOrderItemDetailsByUrl,
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            data: { url: url }
        })
        .done(function (data) {
            var item = JSON.parse(data.d);
            if (item) {
                context.prefillItem(orderItemElem, item);
            }
        })
        .fail(function (data) {
            console.error(data);
        })
        .always(function () {
            urlElement.removeClass('loading');
        });
    },

    showArticle:function(element) {
        $('.field.name label span', element).hide();
        $('.field.name', element).addClass('with-article');
        $('.field.article', element).removeClass('hide').show();
    },

    prefillItem: function (element, item) {
        var context = this;

        //Set product name
        var nameElement = $('.field.name input:first', element);
        if (item.name && nameElement.val() === '')
            nameElement.val(item.name);

        //Set product article
        var articleElement = $('.field.article input:first', element);
        if (item.article && articleElement.val() === '') {
            context.showArticle(element);
            $('.field.article input:first', element).val(item.article);
        }

        //Set currency
        var priceElement = $('.field.price input:first', element);
        if (item.currencyCode && priceElement.val() === '') {
            var productCurrency = Bunddler.defaults.currencies.filter( function(currency) {
                return currency.CurrencyCode === item.currencyCode;
            })[0];
            if (productCurrency) {
                var currencies = $('.field.price select', element);
                currencies.val(productCurrency.CurrencyCode);

                if (item.customerPrice) {
                    priceElement.val(item.customerPrice);
                }
            }
        }

        //Set size
        var sizeElement = $('.field.size input:first', element);
        if (item.size && sizeElement.val() === '') {
            if (sizeElement.length) {
                sizeElement.val(item.size);
            }
        }

        //Set color
        var colorElement = $('.field.color input:first', element);
        if (item.color && colorElement.val() === '') {
            if (colorElement.length) {
                colorElement.val(item.color);
            }
        }

        // if user not authenticated set input focus into name field
        var loginPanel = $("#pnlLoginSignup");
        if (loginPanel.length) {
            $("input:first", "#pnlName").focus();
        } else {
            $("input[value='']:not(:checkbox,:button):visible:first", element).focus();
        }

        context.refreshTotals(); 
    },

    deleteItem: function (item) {
        var context = this;
        if (item.Parent == null) {
            for (var i = item.Substitutions.length - 1; i >= 0; i--) {
                context.deleteItem(item.Substitutions[i]);
            }
            context.items.remove(item.Index);
        }
        else {
            item.Parent.Substitutions.remove(item.Index);
            if (item.Parent.Substitutions.length == 0)
                item.Parent.element.removeClass('has-substitutions');

            if (item.Index == item.Parent.Substitutions.length && item.Index > 0)
                item.Parent.Substitutions[item.Index - 1].element.addClass('last');
        }

        var element = item.element;
        element.hide(200, function () { element.remove(); context.refreshTotals(); context.adjustEmbeddedSize(); });
    },

    refreshTotals: function () {
        var context = this;
        var items = $('div.item', context.itemsContainer);
        var count = $('div.item.level-0', context.itemsContainer).length;
        var totals = new Array(Bunddler.defaults.currencies.length);
        var index = 0;
        var subIndex = 0;

        $.each(items, function (i, e) {
            var el = $(e);

            if (e.item.Parent == null) {
                $('.number', el).text(index + 1);
            }

            if (count == 1 && e.item.Parent == null)
                $('.control', el).addClass('hide');
            else
                $('.control', el).removeClass('hide');

            // Claculate item total price
            var currencyCodeId = $('select', el)[0].selectedIndex;

            var price = parseFloat($('.price input:first', el).val());
            if (isNaN(price) || price < 0) {
                price = 0;
                $('.price input:first', el).val('');
            }

            var deliveryPrice = parseFloat($('.price input.deliveryPrice', el).val());
            if (isNaN(deliveryPrice) || deliveryPrice < 0) {
                deliveryPrice = 0;                
                $('.price input.deliveryPrice', el).val('');
            }

            var quantity = parseFloat($('.quantity input', el).val());
            if (isNaN(quantity) || quantity < 1)
                quantity = 1;
            quantity = Math.round(quantity);
            $('.quantity input', el).val(quantity);

            var weight = parseFloat($('.weight input', el).val());
            if (isNaN(weight) || weight <= 0) {
                weight = 0;
                $('.weight input', el).val('');
            }

            if (e.item.Parent == null) {
                if (totals[currencyCodeId] == null)
                    totals[currencyCodeId] = quantity * price + deliveryPrice;
                else
                    totals[currencyCodeId] += quantity * price + deliveryPrice;
            }

            // Save all values in object
            e.item.Index = e.item.Parent == null ? index : subIndex;
            e.item.Name = $('.name input', el).val();
            e.item.Article = $('.article input', el).val();
            e.item.Url = $('.url input', el).val();
            e.item.Color = $('.color input', el).val();
            e.item.Size = $('.size input', el).val();
            e.item.CurrencyCode = $('select', el).val();
            e.item.CustomerPrice = price.toString();
            e.item.DeliveryPrice = deliveryPrice.toString();
            e.item.Quantity = quantity;
            e.item.Weight = weight;
            e.item.WeightUnit = $('.weight select', el).val();
            e.item.RemoveOriginalPackage = $('input.removeOriginalPackage', el).is(':checked')
            e.item.CheckItem = $('input.checkItem', el).is(':checked');

            if (!$('.field.comment', el).hasClass('hide'))
                e.item.CustomerNote = $('.comment input', el).val();
            else
                e.item.CustomerNote = '';

            if (e.item.Parent == null) {
                index++;
                subIndex = 0;
            }
            else
                subIndex++;

        });

        // Calculate custom commission if custom order type is set
        if ($('#pnlCustomOrderType').length > 0) {
            var customOrderTypeId = $('#pnlCustomOrderType input:checked').val();
            var commission = context.calculateCommissionForCustomOrderType(customOrderTypeId);
            if (commission != null && commission.amount > 0) {
                for (var i = 0; i < Bunddler.defaults.currencies.length; i++){
                    if (Bunddler.defaults.currencies[i].CurrencyCode == commission.currencyCode) {
                        if (totals[i] == null)
                            totals[i] = commission.amount;
                        else
                            totals[i] += commission.amount;
                    }
                }
            }
        }
        
        // Add total discount if specified
        if ($('#pnlTotalDiscount').length > 0) {
            var currencyCodeId = $('#pnlTotalDiscount select')[0].selectedIndex;
            var price = parseFloat($('#pnlTotalDiscount .price input').val());

            if (!isNaN(price)) {
                if (totals[currencyCodeId] == null)
                    totals[currencyCodeId] = price;
                else
                    totals[currencyCodeId] += price;
            }
        }

        // Add total delivery price if specified
        if ($('#pnlTotalDelivery').length > 0) {
            var currencyCodeId = $('#pnlTotalDelivery select')[0].selectedIndex;
            var price = parseFloat($('#pnlTotalDelivery .price input').val());

            if (!isNaN(price)) {
                if (totals[currencyCodeId] == null)
                    totals[currencyCodeId] = price;
                else
                    totals[currencyCodeId] += price;
            }
        }

        context.totalsContainer.empty();
        $.each(totals, function (i, e) {
            if (e != null) {
                var symbol = Bunddler.defaults.currencies[i].Symbol == '' ? Bunddler.defaults.currencies[i].CurrencyCode : Bunddler.defaults.currencies[i].Symbol;
                context.totalsContainer.append($('<div/>').text(symbol + ' ' + e.toFixed(2)));
            }
        });

    },

    // Calculates default commission to be added according to custom order type rule
    calculateCommissionForCustomOrderType: function (customOrderTypeId) {
        var context = this;
        var customOrderType = null;
        var result = null;

        // Find custom order type rule
        if (typeof tenantSettings.order.customOrderTypes != 'undefined')
            for (var i = 0; i < tenantSettings.order.customOrderTypes.length; i++)
                if (tenantSettings.order.customOrderTypes[i].Id == customOrderTypeId) {
                    customOrderType = tenantSettings.order.customOrderTypes[i];
                    break;
                }

        if (customOrderType == null)
            return result;

        var total = 0;
        var currencyCode = customOrderType.CommissionCurrencyCode;
        $.each(context.items, function (i, item) {
            if (item.Parent == null) {
                var amount = item.CustomerPrice * item.Quantity;
                if (item.CurrencyCode != currencyCode)
                    amount = convertCurrency(item.CurrencyCode, currencyCode, amount);

                var commissionAmount = amount * customOrderType.DefaultCommission / 100;
                if (commissionAmount < customOrderType.MinItemCommissionAmount)
                    commissionAmount = customOrderType.MinItemCommissionAmount;

                total += commissionAmount;
            }
        });

        if (total < customOrderType.MinTotalCommissionAmount)
            total = customOrderType.MinTotalCommissionAmount;

        return { currencyCode: currencyCode, amount: total };
    },

    // Save changes and submit to server
    submit: function () {
        var context = this;
        var valid = true;
        context.errorsContainer.empty();

        // Validate login info
        if (typeof Page_ClientValidate == 'function')
            valid = Page_ClientValidate();
        if (!valid)
            return;

        // Validate order form 
        // Urls
        $('.url input', context.itemsContainer).each(function (i, e) {
            var el = $(e);
            if (el.val() == '') {
                valid = false;
                el.addClass('error');
            }
            else 
                    el.removeClass('error');
        });
        // Prices
        $('.field.price input:not(.deliveryPrice)', context.itemsContainer).each(function (i, e) {
            var el = $(e);
            var price = parseFloat(el.val());
            if (isNaN(price) || price <= 0) {
                valid = false;
                el.addClass('error');
            }
            else
                el.removeClass('error');
        });

        // Delivery Prices
        $('.field.price.customer input.deliveryPrice', context.itemsContainer).each(function (i, e) {
            var el = $(e);
            var text = el.val();
            var price = parseFloat(text);
            if (text != '' && (isNaN(price) || price < 0)) {
                valid = false;
                el.addClass('error');
            }
            else
                el.removeClass('error');
        });

        // Articles
        if (tenantSettings.order.requireArticle) {
            $('.article input', context.itemsContainer).each(function (i, e) {
                var el = $(e);
                if (el.val() == '') {
                    valid = false;
                    el.addClass('error');
                }
                else
                    el.removeClass('error');
            });
        }

        // Ship type
        if ($("input[name='ctl00$content$ctl00$rbtlShipTypes']").length > 0) {
            if ($('input[name=ctl00$content$ctl00$rbtlShipTypes]:checked').val() == null) {
                $('label', $('#rbtlShipTypes').parent().parent()).addClass('error');
                valid = false;
            }
            else
                $('label', $('#rbtlShipTypes').parent().parent()).removeClass('error');
        }

        if (!valid) {
            context.errorsContainer.text(lang.b.fieldsRequired);
            return;
        }

        context.pageContent.block({ message: null, overlayCSS: { backgroundColor: '#fff', opacity: 0.4} });

        // Submit order to server
        context.refreshTotals();

        // Calculate additional expenses to be added
        var expenses = [];

        // Calculate custom commission if custom order type is set
        if ($('#pnlCustomOrderType').length > 0) {
            var customOrderTypeId = $('#pnlCustomOrderType input:checked').val();
            var commission = context.calculateCommissionForCustomOrderType(customOrderTypeId);
            if (commission != null && commission.amount > 0) {
                expenses.push({ Name: lang.t.commission, CurrencyCode: commission.currencyCode, CustomerAmount: commission.amount });
            }
        }

        // Add total discount if specified
        if ($('#pnlTotalDiscount').length > 0) {
            var currencyCode = $('#pnlTotalDiscount select').val();
            var price = parseFloat($('#pnlTotalDiscount .price input').val());
            if (!isNaN(price) && price != null && price != 0)
                expenses.push({ Name: lang.b.discount, CurrencyCode: currencyCode, CustomerAmount: price });
        }

        // Add total delivery price if specified
        if ($('#pnlTotalDelivery').length > 0) {
            var currencyCodeId = $('#pnlTotalDelivery select')[0].selectedIndex;
            var price = parseFloat($('#pnlTotalDelivery .price input').val());
            if (!isNaN(price) && price != null && price != 0)
                expenses.push({ Name: lang.b.deliveryPrice, CurrencyCode: currencyCode, CustomerAmount: price });
        }

        var comments = $('#txtComments').val();
        if (comments == $('#txtComments').attr('watermark'))
            comments = '';

        var customOrderTypeId = null;
        if ($('#pnlCustomOrderType').length > 0)
            customOrderTypeId = $('#pnlCustomOrderType input:checked').val();
        
        var data = {
            order: {
                Customer: {
                    IsNew: $('#rbNewUser').is(':checked'),
                    Name: $('#txtName').val(),
                    Email: $('#txtEmail').val(),
                    Password: $('#txtPassword').val()
                },
                CustomOrderType: customOrderTypeId,
                SalesOrderItems: cloneSalesOrderItems(context.items),
                ShipTypeId: $('input[name="ctl00$content$ctl00$rbtlShipTypes"]:checked').val(),
                Expenses: expenses,
                Comments: comments,
                TenantId: tenantId,
                OrderOrigin: 0 // Сorresponds to SalesOrderOrigin.WebsiteWebForm
            }
        };

        if (data.order.Customer.Name == undefined)
            data.order.Customer.Name = '';
        if (data.order.Customer.Email == undefined)
            data.order.Customer.Email = '';
        if (data.order.Customer.Password == undefined)
            data.order.Customer.Password = '';

        $.ajax({
            url: applicationPath + context.options.placeWebOrderUrl,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            data: $.toJSON(data),
            success: function (data) {
                var result = data.d;
                if (!result.Success) {
                    context.errorsContainer.empty().html(result.Message);
                    context.pageContent.unblock();
                    return;
                }

                if (context.options.isEmbedded) {
                    $('#pnlOrder').hide();
                    context.pageContent.unblock();
                    $('#aSuccess').attr('href', result.Url);
                    $('#pnlSuccess').show();
                    context.adjustEmbeddedSize();
                }
                else
                    window.location = result.Url;
            },

            error: function (data, status, e) {
                if (status != 'abort')
                    context.errorsContainer.empty().html(lang.b.generalError4);

                context.pageContent.unblock();
            }
        });
    }
}

Bunddler.WebOrder.defaults = {
    placeWebOrderUrl: '/Services/wcf/v1.0/Frontend.svc/PlaceWebOrder',
    getSalesOrderItemDetailsByUrl: '/Services/wcf/v1.0/Frontend.svc/GetSalesOrderItemDetailsByUrl',
    salesOrderItemTemplate: $.template('salesOrderItemTemplate',
        '<div class="item">' +
        '    <div class="substitution-note">' +
                lang.t.substitution + ':' +
        '    </div>' +
        '    <div class="number"></div>' +
        '    <div class="main">' +
        '       <div class="field url">' +
        '            <label><span class="req">*</span>${lang.t.url}:</label>' +
        '            <div class="value"><input type="text" maxlength="1024" watermark="http://" /></div>' +
        '        </div>' +
        '        <div class="field name">' +
        '            <label>${lang.t.itemName}: <span class="small">(<a href="#">${lang.t.isArticleExist}</a>)</span></label>' +
        '            <div class="value"><input type="text" maxlength="256"/></div>' +
        '        </div>' +
        '        <div class="field article hide">' +
        '            <label>{{if tenantSettings.order.requireArticle}}<span class="req">*</span>{{/if}}${lang.t.article}:</label>' +
        '            <div class="value"><input type="text" maxlength="256"/></div>' +
        '        </div>' +
        '        {{if tenantSettings.order.allowColor}}' +
        '        <div class="field color">' +
        '            <label>${lang.t.color}:</label>' +
        '            <div class="value"><input type="text" maxlength="32"/></div>' +
        '        </div>' +
        '        {{/if}}' +
        '        {{if tenantSettings.order.allowSize}}' +
        '        <div class="field size">' +
        '            <label>${lang.t.size}:</label>' +
        '            <div class="value"><input type="text" maxlength="32"/></div>' +
        '        </div>' +
        '        {{/if}}' +
        '        <div class="field price ' + (tenantSettings.order.allowDeliveryPrice ? 'has-delivery-price' : '') + '">' +
        '            <label>' + (tenantSettings.order.allowDeliveryPrice ? lang.t.priceAndDeliveryPrice : lang.t.price) + ':</label>' +
        '            <div class="value">' +
        '               <select></select><input type="text" watermark="0.00" maxlength="7"/>&nbsp;</span>' +
        '               {{if tenantSettings.order.allowDeliveryPrice}}' +
        '                   <input type="text" watermark="0.00" maxlength="7" class="deliveryPrice"/>' +
        '               {{/if}}' +
        '            </div>' +
        '        </div>' +        
        '        <div class="field quantity">' +
        '            <label>${lang.t.quantity}:</label>' +
        '            <div class="value"><input type="text" value="1" maxlength="3"/></div>' +
        '        </div>' +
        '        {{if tenantSettings.order.allowWeight}}' +
        '        <div class="field weight">' +
        '            <label>${lang.t.weight}:</label>' +
        '            <div class="value"><select></select><input type="text" watermark="0" maxlength="7"/></div>' +
        '        </div>' +
        '        {{/if}}' +
        '        <div class="field controls hide">' +
        '            <span class="small"><a href="#" class="add-comment">${lang.buttons.addComment}</a> <span class="or">${lang.t.or}</span> <a href="#" class="add-substitution">${lang.buttons.addSubstitution}</a></span>' +
        '        </div>' +
        '        <div class="field comment hide">' +
        '            <label>${lang.t.comment}:</label>' +
        '            <div class="value"><input type="text" maxlength="256"/></div>' +
        '        </div>' +
        '        <div class="clear"></div>' +
        '        <div class="checkboxes hide">' +
        '           <span class="check removeOriginalPackage hide"><input type="checkbox" class="removeOriginalPackage"/><label>${lang.t.removeOriginalPackage}</label></span>' +
        '           <span class="check checkItem hide"><input type="checkbox" class="checkItem"/><label>${lang.t.checkItem}</label></span>' +
        '        </div>' +
        '    </div>' +

        '    <div class="control">' +
        '        <a class="delete" href="#"></a>' +
        '    </div>' +

        '    <div class="clear"></div>' +
        '</div>')
}


function oAuthComplete(userId, userName, loginUrl) {
    $('#pnlLoginSignup').hide();
    $('#rbReturningUser').attr('checked', true);
    var settingsLink = '<a href="//' + baseDomain + '/customer/profile">' + userName + '</a>';
    $('#pnlCustomerLoginInfo').html(lang.b.loginName +" "+ settingsLink +'.').show();
    $('#txtEmail').val('');

    if (typeof ValidatorEnable != 'undefined') {
        if ($('#txtNameRequired').length > 0)
            ValidatorEnable($('#txtNameRequired')[0], false);

        if ($('#txtEmailRequired').length > 0)
            ValidatorEnable($('#txtEmailRequired')[0], false);

        if ($('#txtEmailRegular').length > 0)
            ValidatorEnable($('#txtEmailRegular')[0], false);

        if ($('#txtPasswordRequired').length > 0)
            ValidatorEnable($('#txtPasswordRequired')[0], false);

        if ($('#txtPasswordRegular').length > 0)
            ValidatorEnable($('#txtPasswordRegular')[0], false);
    }
}

// Add listener to login event
if (typeof window.addEventListener != 'undefined') {
    window.addEventListener("message", bunddlerLoginEventReceived, false);
}
else if (typeof window.attachEvent != 'undefined') {
    window.attachEvent("onmessage", bunddlerLoginEventReceived);
}

function bunddlerLoginEventReceived(event) {
    if (!(event.origin == "http://bunddler.com" || event.origin == "http://bunddler2.com") || event == null || event.data == null)
        return;
    var params = event.data.split("|");
    if (params[0] == "1")
        oAuthComplete(params[1], params[2], params[3]);
}