// Global supported currencies
if (typeof Bunddler == "undefined") Bunddler = {};
if (typeof Bunddler.defaults == "undefined") Bunddler.defaults = {};

var console = window.console;
if (!console || !console.log || !console.error) {
    console = { log: function (e) { }, error: function (e) { } };
    //console = { log: function (e) { alert(e); }, error: function (e) { alert(e); } };
}

// jQuery JSON: http://code.google.com/p/jquery-json/
//(function (e) { e.toJSON = function (a) { if (typeof JSON == "object" && JSON.stringify) return JSON.stringify(a); var b = typeof a; if (a === null) return "null"; if (b != "undefined") { if (b == "number" || b == "boolean") return a + ""; if (b == "string") return e.quoteString(a); if (b == "object") { if (typeof a.toJSON == "function") return e.toJSON(a.toJSON()); if (a.constructor === Date) { var c = a.getUTCMonth() + 1; if (c < 10) c = "0" + c; var d = a.getUTCDate(); if (d < 10) d = "0" + d; b = a.getUTCFullYear(); var f = a.getUTCHours(); if (f < 10) f = "0" + f; var g = a.getUTCMinutes(); if (g < 10) g = "0" + g; var h = a.getUTCSeconds(); if (h < 10) h = "0" + h; a = a.getUTCMilliseconds(); if (a < 100) a = "0" + a; if (a < 10) a = "0" + a; return '"' + b + "-" + c + "-" + d + "T" + f + ":" + g + ":" + h + "." + a + 'Z"' } if (a.constructor === Array) { c = []; for (d = 0; d < a.length; d++) c.push(e.toJSON(a[d]) || "null"); return "[" + c.join(",") + "]" } c = []; for (d in a) { b = typeof d; if (b == "number") b = '"' + d + '"'; else if (b == "string") b = e.quoteString(d); else continue; if (typeof a[d] != "function") { f = e.toJSON(a[d]); c.push(b + ":" + f) } } return "{" + c.join(", ") + "}" } } }; e.evalJSON = function (a) { if (typeof JSON == "object" && JSON.parse) return JSON.parse(a); return eval("(" + a + ")") }; e.secureEvalJSON = function (a) { if (typeof JSON == "object" && JSON.parse) return JSON.parse(a); var b = a; b = b.replace(/\\["\\\/bfnrtu]/g, "@"); b = b.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]"); b = b.replace(/(?:^|:|,)(?:\s*\[)+/g, ""); if (/^[\],:{}\s]*$/.test(b)) return eval("(" + a + ")"); else throw new SyntaxError("Error parsing JSON, source is not valid."); }; e.quoteString = function (a) { if (a.match(i)) return '"' + a.replace(i, function (b) { var c = j[b]; if (typeof c === "string") return c; c = b.charCodeAt(); return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16) }) + '"'; return '"' + a + '"' }; var i = /["\\\x00-\x1f\x7f-\x9f]/g, j = { "\u0008": "\\b", "\t": "\\t", "\n": "\\n", "\u000c": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"} })(jQuery);

// jQuery $.tmpl plugin
//(function (a) { var r = a.fn.domManip, d = "_tmplitem", q = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /, b = {}, f = {}, e, p = { key: 0, data: {} }, h = 0, c = 0, l = []; function g(e, d, g, i) { var c = { data: i || (d ? d.data : {}), _wrap: d ? d._wrap : null, tmpl: null, parent: d || null, nodes: [], calls: u, nest: w, wrap: x, html: v, update: t }; e && a.extend(c, e, { nodes: [], parent: d }); if (g) { c.tmpl = g; c._ctnt = c._ctnt || c.tmpl(a, c); c.key = ++h; (l.length ? f : b)[h] = c } return c } a.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (f, d) { a.fn[f] = function (n) { var g = [], i = a(n), k, h, m, l, j = this.length === 1 && this[0].parentNode; e = b || {}; if (j && j.nodeType === 11 && j.childNodes.length === 1 && i.length === 1) { i[d](this[0]); g = this } else { for (h = 0, m = i.length; h < m; h++) { c = h; k = (h > 0 ? this.clone(true) : this).get(); a.fn[d].apply(a(i[h]), k); g = g.concat(k) } c = 0; g = this.pushStack(g, f, i.selector) } l = e; e = null; a.tmpl.complete(l); return g } }); a.fn.extend({ tmpl: function (d, c, b) { return a.tmpl(this[0], d, c, b) }, tmplItem: function () { return a.tmplItem(this[0]) }, template: function (b) { return a.template(b, this[0]) }, domManip: function (d, l, j) { if (d[0] && d[0].nodeType) { var f = a.makeArray(arguments), g = d.length, i = 0, h; while (i < g && !(h = a.data(d[i++], "tmplItem"))); if (g > 1) f[0] = [a.makeArray(d)]; if (h && c) f[2] = function (b) { a.tmpl.afterManip(this, b, j) }; r.apply(this, f) } else r.apply(this, arguments); c = 0; !e && a.tmpl.complete(b); return this } }); a.extend({ tmpl: function (d, h, e, c) { var j, k = !c; if (k) { c = p; d = a.template[d] || a.template(null, d); f = {} } else if (!d) { d = c.tmpl; b[c.key] = c; c.nodes = []; c.wrapped && n(c, c.wrapped); return a(i(c, null, c.tmpl(a, c))) } if (!d) return []; if (typeof h === "function") h = h.call(c || {}); e && e.wrapped && n(e, e.wrapped); j = a.isArray(h) ? a.map(h, function (a) { return a ? g(e, c, d, a) : null }) : [g(e, c, d, h)]; return k ? a(i(c, null, j)) : j }, tmplItem: function (b) { var c; if (b instanceof a) b = b[0]; while (b && b.nodeType === 1 && !(c = a.data(b, "tmplItem")) && (b = b.parentNode)); return c || p }, template: function (c, b) { if (b) { if (typeof b === "string") b = o(b); else if (b instanceof a) b = b[0] || {}; if (b.nodeType) b = a.data(b, "tmpl") || a.data(b, "tmpl", o(b.innerHTML)); return typeof c === "string" ? (a.template[c] = b) : b } return c ? typeof c !== "string" ? a.template(null, c) : a.template[c] || a.template(null, q.test(c) ? c : a(c)) : null }, encode: function (a) { return ("" + a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;") } }); a.extend(a.tmpl, { tag: { tmpl: { _default: { $2: "null" }, open: "if($notnull_1){_=_.concat($item.nest($1,$2));}" }, wrap: { _default: { $2: "null" }, open: "$item.calls(_,$1,$2);_=[];", close: "call=$item.calls();_=call._.concat($item.wrap(call,_));" }, each: { _default: { $2: "$index, $value" }, open: "if($notnull_1){$.each($1a,function($2){with(this){", close: "}});}" }, "if": { open: "if(($notnull_1) && $1a){", close: "}" }, "else": { _default: { $1: "true" }, open: "}else if(($notnull_1) && $1a){" }, html: { open: "if($notnull_1){_.push($1a);}" }, "=": { _default: { $1: "$data" }, open: "if($notnull_1){_.push($.encode($1a));}" }, "!": { open: ""} }, complete: function () { b = {} }, afterManip: function (f, b, d) { var e = b.nodeType === 11 ? a.makeArray(b.childNodes) : b.nodeType === 1 ? [b] : []; d.call(f, b); m(e); c++ } }); function i(e, g, f) { var b, c = f ? a.map(f, function (a) { return typeof a === "string" ? e.key ? a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + d + '="' + e.key + '" $2') : a : i(a, e, a._ctnt) }) : e; if (g) return c; c = c.join(""); c.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function (f, c, e, d) { b = a(e).get(); m(b); if (c) b = j(c).concat(b); if (d) b = b.concat(j(d)) }); return b ? b : j(c) } function j(c) { var b = document.createElement("div"); b.innerHTML = c; return a.makeArray(b.childNodes) } function o(b) { return new Function("jQuery", "$item", "var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('" + a.trim(b).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function (m, l, j, d, b, c, e) { var i = a.tmpl.tag[j], h, f, g; if (!i) throw "Template command not found: " + j; h = i._default || []; if (c && !/\w$/.test(b)) { b += c; c = "" } if (b) { b = k(b); e = e ? "," + k(e) + ")" : c ? ")" : ""; f = c ? b.indexOf(".") > -1 ? b + c : "(" + b + ").call($item" + e : b; g = c ? f : "(typeof(" + b + ")==='function'?(" + b + ").call($item):(" + b + "))" } else g = f = h.$1 || "null"; d = k(d); return "');" + i[l ? "close" : "open"].split("$notnull_1").join(b ? "typeof(" + b + ")!=='undefined' && (" + b + ")!=null" : "true").split("$1a").join(g).split("$1").join(f).split("$2").join(d ? d.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g, function (d, c, b, a) { a = a ? "," + a + ")" : b ? ")" : ""; return a ? "(" + c + ").call($item" + a : d }) : h.$2 || "") + "_.push('" }) + "');}return _;") } function n(c, b) { c._wrap = i(c, true, a.isArray(b) ? b : [q.test(b) ? b : a(b).html()]).join("") } function k(a) { return a ? a.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null } function s(b) { var a = document.createElement("div"); a.appendChild(b.cloneNode(true)); return a.innerHTML } function m(o) { var n = "_" + c, k, j, l = {}, e, p, i; for (e = 0, p = o.length; e < p; e++) { if ((k = o[e]).nodeType !== 1) continue; j = k.getElementsByTagName("*"); for (i = j.length - 1; i >= 0; i--) m(j[i]); m(k) } function m(j) { var p, i = j, k, e, m; if (m = j.getAttribute(d)) { while (i.parentNode && (i = i.parentNode).nodeType === 1 && !(p = i.getAttribute(d))); if (p !== m) { i = i.parentNode ? i.nodeType === 11 ? 0 : i.getAttribute(d) || 0 : 0; if (!(e = b[m])) { e = f[m]; e = g(e, b[i] || f[i], null, true); e.key = ++h; b[h] = e } c && o(m) } j.removeAttribute(d) } else if (c && (e = a.data(j, "tmplItem"))) { o(e.key); b[e.key] = e; i = a.data(j.parentNode, "tmplItem"); i = i ? i.key : 0 } if (e) { k = e; while (k && k.key != i) { k.nodes.push(j); k = k.parent } delete e._ctnt; delete e._wrap; a.data(j, "tmplItem", e) } function o(a) { a = a + n; e = l[a] = l[a] || g(e, b[e.parent.key + n] || e.parent, null, true) } } } function u(a, d, c, b) { if (!a) return l.pop(); l.push({ _: a, tmpl: d, item: this, data: c, options: b }) } function w(d, c, b) { return a.tmpl(a.template(d), c, b, this) } function x(b, d) { var c = b.options || {}; c.wrapped = d; return a.tmpl(a.template(b.tmpl), b.data, c, b.item) } function v(d, c) { var b = this._wrap; return a.map(a(a.isArray(b) ? b.join("") : b).filter(d || "*"), function (a) { return c ? a.innerText || a.textContent : a.outerHTML || s(a) }) } function t() { var b = this.nodes; a.tmpl(null, null, null, this).insertBefore(b[0]); a(b).remove() } })(jQuery)

// String methods
String.prototype.trim = function () { return (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")) }
String.prototype.trimLeftZeros =function () {return this.replace(/^[0]+/, "");};
String.prototype.startsWith = function (str) {return (this.match("^" + str) == str) }
String.prototype.endsWith = function (str) { return (this.match(str + "$") == str) }
String.prototype.maxLength = function (maxLength, showDots) { if (this == null || this.length <= maxLength) return this; return this.substring(0, maxLength) + (showDots ? "..." : ""); }
String.prototype.format = function () { var args = arguments; return this.replace(/{(\d+)}/g, function (match, number) { return typeof args[number] != 'undefined' ? args[number] : match; }); };
String.prototype.parseJsonDate = function() { var re = /-?\d+/;var m = re.exec(this);var d = new Date(parseInt(m[0]));return d; };

// jQuery Cookie: https://github.com/carhartl/jquery-cookie
// example: $.cookie('the_cookie_name', 'the_value', { expires: 7/*days*/, path: '/', domain: 'jquery.com', secure: true });
//jQuery.cookie = function (e, b, a) { if (arguments.length > 1 && String(b) !== "[object Object]") { a = jQuery.extend({}, a); if (b === null || b === undefined) a.expires = -1; if (typeof a.expires === "number") { var d = a.expires, c = a.expires = new Date; c.setDate(c.getDate() + d) } b = String(b); return document.cookie = [encodeURIComponent(e), "=", a.raw ? b : encodeURIComponent(b), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""].join("") } a = b || {}; c = a.raw ? function (f) { return f } : decodeURIComponent; return (d = RegExp("(?:^|; )" + encodeURIComponent(e) + "=([^;]*)").exec(document.cookie)) ? c(d[1]) : null };

// Load multiple CSS
$.extend({
    getManyCss: function(urls, callback, nocache){
        if (typeof nocache=='undefined') nocache=false;
        $.when(
            $.each(urls, function(i, url){
                if (nocache) url += '?_ts=' + new Date().getTime();
                $.get(url, function(){ $('<link>', {rel:'stylesheet', type:'text/css', 'href':url}).appendTo('head'); });
            })
        ).then(function(){ if (typeof callback=='function') callback(); });
    }
});

// jHtmlArea - http://jhtmlarea.codeplex.com - (c)2009 Chris Pietschmann
//(function (b) { b.fn.htmlarea = function (a) { if (a && typeof a === "string") { for (var c = [], b = 1; b < arguments.length; b++) c.push(arguments[b]); var b = d(this[0]), f = b[a]; if (f) return f.apply(b, c) } return this.each(function () { d(this, a) }) }; var d = window.jHtmlArea = function (a, b) { if (a.jquery) return d(a[0]); return a.jhtmlareaObject ? a.jhtmlareaObject : new d.fn.init(a, b) }; d.fn = d.prototype = { jhtmlarea: "0.7.0", init: function (a, c) { if (a.nodeName.toLowerCase() === "textarea") { var e = b.extend({}, d.defaultOptions, c); a.jhtmlareaObject = this; var f = this.textarea = b(a), j = this.container = b("<div/>").addClass("jHtmlArea").width(f.width()).insertAfter(f), l = this.toolbar = b("<div/>").addClass("ToolBar").appendTo(j); h.initToolBar.call(this, e); var k = this.iframe = b("<iframe/>").height(f.height()); k.width(f.width() - (b.browser.msie ? 0 : 4)); var i = this.htmlarea = b("<div/>").append(k); j.append(i).append(f.hide()); h.initEditor.call(this, e); h.attachEditorEvents.call(this); k.height(k.height() - l.height()); l.width(f.width() - 2); e.loaded && e.loaded.call(this) } }, dispose: function () { this.textarea.show().insertAfter(this.container); this.container.remove(); this.textarea[0].jhtmlareaObject = null }, execCommand: function (a, b, e) { this.iframe[0].contentWindow.focus(); this.editor.execCommand(a, b || !1, e || null); this.updateTextArea() }, ec: function (a, b, e) { this.execCommand(a, b, e) }, queryCommandValue: function (a) { this.iframe[0].contentWindow.focus(); return this.editor.queryCommandValue(a) }, qc: function (a) { return this.queryCommandValue(a) }, getSelectedHTML: function () { if (b.browser.msie) return this.getRange().htmlText; else { var a = this.getRange().cloneContents(); return b("<p/>").append(b(a)).html() } }, getSelection: function () { return b.browser.msie ? this.editor.selection : this.iframe[0].contentDocument.defaultView.getSelection() }, getRange: function () { var a = this.getSelection(); if (!a) return null; return a.getRangeAt ? a.getRangeAt(0) : a.createRange() }, html: function (a) { if (a) this.pastHTML(a); else return toHtmlString() }, pasteHTML: function (a) { this.iframe[0].contentWindow.focus(); var c = this.getRange(); b.browser.msie ? c.pasteHTML(a) : b.browser.mozilla ? (c.deleteContents(), c.insertNode(b(a.indexOf("<") != 0 ? b("<span/>").append(a) : a)[0])) : (c.deleteContents(), c.insertNode(b(this.iframe[0].contentWindow.document.createElement("span")).append(b(a.indexOf("<") != 0 ? "<span>" + a + "</span>" : a))[0])); c.collapse(!1); c.select() }, cut: function () { this.ec("cut") }, copy: function () { this.ec("copy") }, paste: function () { this.ec("paste") }, bold: function () { this.ec("bold") }, italic: function () { this.ec("italic") }, underline: function () { this.ec("underline") }, strikeThrough: function () { this.ec("strikethrough") }, image: function (a) { b.browser.msie && !a ? this.ec("insertImage", !0) : this.ec("insertImage", !1, a || prompt("Image URL:", "http://")) }, removeFormat: function () { this.ec("removeFormat", !1, []); this.unlink() }, link: function () { b.browser.msie ? this.ec("createLink", !0) : this.ec("createLink", !1, prompt("Link URL:", "http://")) }, unlink: function () { this.ec("unlink", !1, []) }, orderedList: function () { this.ec("insertorderedlist") }, unorderedList: function () { this.ec("insertunorderedlist") }, superscript: function () { this.ec("superscript") }, subscript: function () { this.ec("subscript") }, p: function () { this.formatBlock("<p>") }, h1: function () { this.heading(1) }, h2: function () { this.heading(2) }, h3: function () { this.heading(3) }, h4: function () { this.heading(4) }, h5: function () { this.heading(5) }, h6: function () { this.heading(6) }, heading: function (a) { this.formatBlock(b.browser.msie ? "Heading " + a : "h" + a) }, indent: function () { this.ec("indent") }, outdent: function () { this.ec("outdent") }, insertHorizontalRule: function () { this.ec("insertHorizontalRule", !1, "ht") }, justifyLeft: function () { this.ec("justifyLeft") }, justifyCenter: function () { this.ec("justifyCenter") }, justifyRight: function () { this.ec("justifyRight") }, increaseFontSize: function () { b.browser.msie ? this.ec("fontSize", !1, this.qc("fontSize") + 1) : b.browser.safari ? this.getRange().surroundContents(b(this.iframe[0].contentWindow.document.createElement("span")).css("font-size", "larger")[0]) : this.ec("increaseFontSize", !1, "big") }, decreaseFontSize: function () { b.browser.msie ? this.ec("fontSize", !1, this.qc("fontSize") - 1) : b.browser.safari ? this.getRange().surroundContents(b(this.iframe[0].contentWindow.document.createElement("span")).css("font-size", "smaller")[0]) : this.ec("decreaseFontSize", !1, "small") }, forecolor: function (a) { this.ec("foreColor", !1, a || prompt("Enter HTML Color:", "#")) }, formatBlock: function (a) { this.ec("formatblock", !1, a || null) }, showHTMLView: function () { this.updateTextArea(); this.textarea.show(); this.htmlarea.hide(); b("ul li:not(li:has(a.html))", this.toolbar).hide(); b("ul:not(:has(:visible))", this.toolbar).hide(); b("ul li a.html", this.toolbar).addClass("highlighted") }, hideHTMLView: function () { this.updateHtmlArea(); this.textarea.hide(); this.htmlarea.show(); b("ul", this.toolbar).show(); b("ul li", this.toolbar).show().find("a.html").removeClass("highlighted") }, toggleHTMLView: function () { this.textarea.is(":hidden") ? this.showHTMLView() : this.hideHTMLView() }, toHtmlString: function () { return this.editor.body.innerHTML }, toString: function () { return this.editor.body.innerText }, updateTextArea: function () { this.textarea.val(this.toHtmlString()) }, updateHtmlArea: function () { this.editor.body.innerHTML = this.textarea.val() } }; d.fn.init.prototype = d.fn; d.defaultOptions = { toolbar: [["html"], ["bold", "italic", "underline", "strikethrough", "|", "subscript", "superscript"], ["increasefontsize", "decreasefontsize"], ["orderedlist", "unorderedlist"], ["indent", "outdent"], ["justifyleft", "justifycenter", "justifyright"], ["link", "unlink", "image", "horizontalrule"], ["p", "h1", "h2", "h3", "h4", "h5", "h6"], ["cut", "copy", "paste"]], css: null, toolbarText: { bold: "Bold", italic: "Italic", underline: "Underline", strikethrough: "Strike-Through", cut: "Cut", copy: "Copy", paste: "Paste", h1: "Heading 1", h2: "Heading 2", h3: "Heading 3", h4: "Heading 4", h5: "Heading 5", h6: "Heading 6", p: "Paragraph", indent: "Indent", outdent: "Outdent", horizontalrule: "Insert Horizontal Rule", justifyleft: "Left Justify", justifycenter: "Center Justify", justifyright: "Right Justify", increasefontsize: "Increase Font Size", decreasefontsize: "Decrease Font Size", forecolor: "Text Color", link: "Insert Link", unlink: "Remove Link", image: "Insert Image", orderedlist: "Insert Ordered List", unorderedlist: "Insert Unordered List", subscript: "Subscript", superscript: "Superscript", html: "Show/Hide HTML Source View"} }; var h = { toolbarButtons: { strikethrough: "strikeThrough", orderedlist: "orderedList", unorderedlist: "unorderedList", horizontalrule: "insertHorizontalRule", justifyleft: "justifyLeft", justifycenter: "justifyCenter", justifyright: "justifyRight", increasefontsize: "increaseFontSize", decreasefontsize: "decreaseFontSize", html: function () { this.toggleHTMLView() } }, initEditor: function (a) { var b = this.editor = this.iframe[0].contentWindow.document; b.designMode = "on"; b.open(); b.write(this.textarea.val()); b.close(); if (a.css) { var e = b.createElement("link"); e.rel = "stylesheet"; e.type = "text/css"; e.href = a.css; b.getElementsByTagName("head")[0].appendChild(e) } }, initToolBar: function (a) { function c(c) { for (var d = b("<ul/>").appendTo(e.toolbar), i = 0; i < c.length; i++) { var g = c[i]; if ((typeof g).toLowerCase() === "string") if (g === "|") d.append(b('<li class="separator"/>')); else { var j = function (a) { var b = h.toolbarButtons[a] || a; return (typeof b).toLowerCase() === "function" ? function (a) { b.call(this, a) } : function () { this[b](); this.editor.body.focus() } } (g.toLowerCase()), m = a.toolbarText[g.toLowerCase()]; d.append(f(g.toLowerCase(), m || g, j)) } else d.append(f(g.css, g.text, g.action)) } } var e = this, f = function (a, c, d) { return b("<li/>").append(b("<a href='javascript:void(0);'/>").addClass(a).attr("title", c).click(function () { d.call(e, b(this)) })) }; if (a.toolbar.length !== 0 && h.isArray(a.toolbar[0])) for (var d = 0; d < a.toolbar.length; d++) c(a.toolbar[d]); else c(a.toolbar) }, attachEditorEvents: function () { var a = this, c = function () { a.updateHtmlArea() }; this.textarea.click(c).keyup(c).keydown(c).mousedown(c).blur(c); c = function () { a.updateTextArea() }; b(this.editor.body).click(c).keyup(c).keydown(c).mousedown(c).blur(c); b("form").submit(function () { a.toggleHTMLView(); a.toggleHTMLView() }); if (window.__doPostBack) { var d = __doPostBack; window.__doPostBack = function () { if (!theForm.onsubmit || theForm.onsubmit() != !1) return a && a.toggleHTMLView && (a.toggleHTMLView(), a.toggleHTMLView()), d.apply(window, arguments) } } }, isArray: function (a) { return a && typeof a === "object" && typeof a.length === "number" && typeof a.splice === "function" && !a.propertyIsEnumerable("length") } } })(jQuery);

// jHtmlArea Color Picker- http://jhtmlarea.codeplex.com - (c)2009 Chris Pietschmann﻿
//(function (d) { if (jHtmlArea) { var l = jHtmlArea.fn.forecolor; jHtmlArea.fn.forecolor = function (e) { if (e) l.call(this, e); else { var g = this, a = this.getRange(); jHtmlAreaColorPickerMenu(d(".forecolor", this.toolbar), { colorChosen: function (b) { d.browser.msie ? a.execCommand("ForeColor", false, b) : g.forecolor(b) } }) } } } var c = window.jHtmlAreaColorPickerMenu = function (e, g) { return new jHtmlAreaColorPickerMenu.fn.init(e, g) }; c.fn = c.prototype = { jhtmlareacolorpickermenu: "0.7.0", init: function (e, g) { var a = d.extend({}, c.defaultOptions, g), b = this, h = this.owner = d(e), f = h.position(); c.instance && c.instance.hide(); jHtmlAreaColorPickerMenu.instance = this; f = this.picker = d("<div/>").css({ position: "absolute", left: f.left + a.offsetLeft, top: f.top + h.height() + a.offsetTop, "z-index": a["z-index"] }).addClass("jHtmlAreaColorPickerMenu"); for (var i = 0; i < a.colors.length; i++) { var k = a.colors[i]; d("<div/>").css("background-color", k).appendTo(f).click(function (m) { return function () { a.colorChosen && a.colorChosen.call(this, m); b.hide() } } (k)) } d("<div/>").html("<div></div>Automatic").addClass("automatic").appendTo(f).click(function () { a.colorChosen && a.colorChosen.call(this, null); b.hide() }); var j = false; f.appendTo(h.parent()).show().mouseout(function () { j = true; b.currentTimeout = window.setTimeout(function () { j === true && b.hide() }, 1E3) }).mouseover(function () { if (b.currentTimeout) { window.clearTimeout(b.currentTimeout); b.currentTimeout = null } j = false }) }, hide: function () { this.picker.hide(); this.picker.remove() } }; c.fn.init.prototype = c.fn; c.defaultOptions = { "z-index": 0, offsetTop: 0, offsetLeft: 0, colors: ["#ffffff", "#cccccc", "#c0c0c0", "#999999", "#666666", "#333333", "#000000", "#ffcccc", "#ff6666", "#ff0000", "#cc0000", "#990000", "#660000", "#330000", "#ffcc99", "#ff9966", "#ff9900", "#ff6600", "#cc6600", "#993300", "#663300", "#ffff99", "#ffff66", "#ffcc66", "#ffcc33", "#cc9933", "#996633", "#663333", "#ffffcc", "#ffff33", "#ffff00", "#ffcc00", "#999900", "#666600", "#333300", "#99ff99", "#66ff99", "#33ff33", "#33cc00", "#009900", "#006600", "#003300", "#99FFFF", "#33FFFF", "#66CCCC", "#00CCCC", "#339999", "#336666", "#003333", "#CCFFFF", "#66FFFF", "#33CCFF", "#3366FF", "#3333FF", "#000099", "#000066", "#CCCCFF", "#9999FF", "#6666CC", "#6633FF", "#6600CC", "#333399", "#330099", "#FFCCFF", "#FF99FF", "#CC66CC", "#CC33CC", "#993399", "#663366", "#330033"], colorChosen: null} })(jQuery);

// Numeric plugin: http://www.texotela.co.uk/code/jquery/numeric/
(function (b) { b.fn.numeric = function (a, c) { "boolean" === typeof a && (a = { decimal: a }); a = a || {}; "undefined" == typeof a.negative && (a.negative = !0); var g = !1 === a.decimal ? "" : a.decimal || ".", e = !0 === a.negative ? !0 : !1; return this.data("numeric.decimal", g).data("numeric.negative", e).data("numeric.callback", "function" == typeof c ? c : function () { }).keypress(b.fn.numeric.keypress).keyup(b.fn.numeric.keyup).blur(b.fn.numeric.blur) }; b.fn.numeric.keypress = function () { return !0 }; b.fn.numeric.keyup = function () { var a = b(this).val(); if (a && 0 < a.length) { var c = b.fn.getSelectionStart(this), g = b.fn.getSelectionEnd(this), e = b.data(this, "numeric.decimal"), h = b.data(this, "numeric.negative"); if ("" != e) { var i = a.indexOf(e); 0 == i && (this.value = "0" + a); 1 == i && "-" == a.charAt(0) && (this.value = "-0" + a.substring(1)); a = this.value } for (var k = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "-", e], l = a.length, i = a.indexOf(e), d = l - 1; 0 <= d; d--) { var f = a.charAt(d); "," == f && -1 == i && (a = a.substring(0, d) + e + a.substring(d + 1), f = e); 0 != d && "-" == f ? a = a.substring(0, d) + a.substring(d + 1) : 0 == d && (!h && "-" == f) && (a = a.substring(1)); for (var m = !1, j = 0; j < k.length; j++) if (f == k[j]) { m = !0; break } if (!m || " " == f) a = a.substring(0, d) + a.substring(d + 1) } h = a.indexOf(e); if (0 < h) for (d = l - 1; d > h; d--) f = a.charAt(d), f == e && (a = a.substring(0, d) + a.substring(d + 1)); try { this.innerText = a } catch (n) { } this.value != a && (this.value = a); b.fn.setSelection(this, [c, g]) } }; b.fn.numeric.blur = function () { var a = b.data(this, "numeric.decimal"), c = b.data(this, "numeric.callback"), g = this.value; "" != g && (RegExp("^\\d+$|\\d*" + a + "\\d+").exec(g) || c.apply(this)) }; b.fn.removeNumeric = function () { return this.data("numeric.decimal", null).data("numeric.negative", null).data("numeric.callback", null).unbind("keypress", b.fn.numeric.keypress).unbind("blur", b.fn.numeric.blur) }; b.fn.getSelectionStart = function (a) { if (a.createTextRange) { var c = document.selection.createRange().duplicate(); c.moveEnd("character", a.value.length); return "" == c.text ? a.value.length : a.value.lastIndexOf(c.text) } return a.selectionStart }; b.fn.getSelectionEnd = function (a) { if (a.createTextRange) { var c = document.selection.createRange().duplicate(); c.moveStart("character", -a.value.length); return c.text.length } return a.selectionEnd }; b.fn.setSelection = function (a, c) { "number" == typeof c && (c = [c, c]); if (c && c.constructor == Array && 2 == c.length) if (a.createTextRange) { var b = a.createTextRange(); b.collapse(!0); b.moveStart("character", c[0]); b.moveEnd("character", c[1]); b.select() } else a.setSelectionRange && (a.focus(), a.setSelectionRange(c[0], c[1])) } })(jQuery);

// Masked input plugin: http://digitalbush.com/projects/masked-input-plugin
//(function (a) { var c = (a.browser.msie ? "paste" : "input") + ".mask"; var b = (window.orientation != undefined); a.mask = { definitions: { "9": "[0-9]", a: "[A-Za-z]", "*": "[A-Za-z0-9]"} }; a.fn.extend({ caret: function (e, f) { if (this.length == 0) { return } if (typeof e == "number") { f = (typeof f == "number") ? f : e; return this.each(function () { if (this.setSelectionRange) { this.focus(); this.setSelectionRange(e, f) } else { if (this.createTextRange) { var g = this.createTextRange(); g.collapse(true); g.moveEnd("character", f); g.moveStart("character", e); g.select() } } }) } else { if (this[0].setSelectionRange) { e = this[0].selectionStart; f = this[0].selectionEnd } else { if (document.selection && document.selection.createRange) { var d = document.selection.createRange(); e = 0 - d.duplicate().moveStart("character", -100000); f = e + d.text.length } } return { begin: e, end: f} } }, unmask: function () { return this.trigger("unmask") }, mask: function (j, d) { if (!j && this.length > 0) { var f = a(this[0]); var g = f.data("tests"); return a.map(f.data("buffer"), function (l, m) { return g[m] ? l : null }).join("") } d = a.extend({ placeholder: "_", completed: null }, d); var k = a.mask.definitions; var g = []; var e = j.length; var i = null; var h = j.length; a.each(j.split(""), function (m, l) { if (l == "?") { h--; e = m } else { if (k[l]) { g.push(new RegExp(k[l])); if (i == null) { i = g.length - 1 } } else { g.push(null) } } }); return this.each(function () { var r = a(this); var m = a.map(j.split(""), function (x, y) { if (x != "?") { return k[x] ? d.placeholder : x } }); var n = false; var q = r.val(); r.data("buffer", m).data("tests", g); function v(x) { while (++x <= h && !g[x]) { } return x } function t(x) { while (!g[x] && --x >= 0) { } for (var y = x; y < h; y++) { if (g[y]) { m[y] = d.placeholder; var z = v(y); if (z < h && g[y].test(m[z])) { m[y] = m[z] } else { break } } } s(); r.caret(Math.max(i, x)) } function u(y) { for (var A = y, z = d.placeholder; A < h; A++) { if (g[A]) { var B = v(A); var x = m[A]; m[A] = z; if (B < h && g[B].test(x)) { z = x } else { break } } } } function l(y) { var x = a(this).caret(); var z = y.keyCode; n = (z < 16 || (z > 16 && z < 32) || (z > 32 && z < 41)); if ((x.begin - x.end) != 0 && (!n || z == 8 || z == 46)) { w(x.begin, x.end) } if (z == 8 || z == 46 || (b && z == 127)) { t(x.begin + (z == 46 ? 0 : -1)); return false } else { if (z == 27) { r.val(q); r.caret(0, p()); return false } } } function o(B) { if (n) { n = false; return (B.keyCode == 8) ? false : null } B = B || window.event; var C = B.charCode || B.keyCode || B.which; var z = a(this).caret(); if (B.ctrlKey || B.altKey || B.metaKey) { return true } else { if ((C >= 32 && C <= 125) || C > 186) { var x = v(z.begin - 1); if (x < h) { var A = String.fromCharCode(C); if (g[x].test(A)) { u(x); m[x] = A; s(); var y = v(x); a(this).caret(y); if (d.completed && y == h) { d.completed.call(r) } } } } } return false } function w(x, y) { for (var z = x; z < y && z < h; z++) { if (g[z]) { m[z] = d.placeholder } } } function s() { return r.val(m.join("")).val() } function p(y) { var z = r.val(); var C = -1; for (var B = 0, x = 0; B < h; B++) { if (g[B]) { m[B] = d.placeholder; while (x++ < z.length) { var A = z.charAt(x - 1); if (g[B].test(A)) { m[B] = A; C = B; break } } if (x > z.length) { break } } else { if (m[B] == z[x] && B != e) { x++; C = B } } } if (!y && C + 1 < e) { r.val(""); w(0, h) } else { if (y || C + 1 >= e) { s(); if (!y) { r.val(r.val().substring(0, C + 1)) } } } return (e ? B : i) } if (!r.attr("readonly")) { r.one("unmask", function () { r.unbind(".mask").removeData("buffer").removeData("tests") }).bind("focus.mask", function () { q = r.val(); var x = p(); s(); setTimeout(function () { if (x == j.length) { r.caret(0, x) } else { r.caret(x) } }, 0) }).bind("blur.mask", function () { p(); if (r.val() != q) { r.change() } }).bind("keydown.mask", l).bind("keypress.mask", o).bind(c, function () { setTimeout(function () { r.caret(p(true)) }, 0) }) } p() }) } }) })(jQuery);

// Date Format  http://www.360doc.com/content/09/0210/17/36491_2507972.shtml 
//Date.prototype.format = function (format) {var returnStr = ''; var replace = Date.replaceChars; for (var i = 0; i < format.length; i++) { var curChar = format.charAt(i); if (replace[curChar]) { returnStr += replace[curChar].call(this); } else { returnStr += curChar; } } return returnStr; }; 
//Date.replaceChars = { shortMonths: lang.datepicker.monthNamesShort, longMonths: lang.datepicker.monthNames, shortDays: lang.datepicker.dayNamesMin, longDays: lang.datepicker.dayNames, d: function () { return (this.getDate() < 10 ? '0' : '') + this.getDate(); }, D: function () { return Date.replaceChars.shortDays[this.getDay()]; }, j: function () { return this.getDate(); }, l: function () { return Date.replaceChars.longDays[this.getDay()]; }, N: function () { return this.getDay() + 1; }, S: function () { return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th'))); }, w: function () { return this.getDay(); }, z: function () { return "Not Yet Supported"; }, W: function () { return "Not Yet Supported"; }, F: function () { return Date.replaceChars.longMonths[this.getMonth()]; }, m: function () { return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1); }, M: function () { return Date.replaceChars.shortMonths[this.getMonth()]; }, n: function () { return this.getMonth() + 1; }, t: function () { return "Not Yet Supported"; }, L: function () { return "Not Yet Supported"; }, o: function () { return "Not Supported"; }, Y: function () { return this.getFullYear(); }, y: function () { return ('' + this.getFullYear()).substr(2); }, a: function () { return this.getHours() < 12 ? 'am' : 'pm'; }, A: function () { return this.getHours() < 12 ? 'AM' : 'PM'; }, B: function () { return "Not Yet Supported"; }, g: function () { return this.getHours() % 12 || 12; }, G: function () { return this.getHours(); }, h: function () { return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12); }, H: function () { return (this.getHours() < 10 ? '0' : '') + this.getHours(); }, i: function () { return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes(); }, s: function () { return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds(); }, e: function () { return "Not Yet Supported"; }, I: function () { return "Not Supported"; }, O: function () { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + '00'; }, T: function () { var m = this.getMonth(); this.setMonth(0); var result = this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1'); this.setMonth(m); return result; }, Z: function () { return -this.getTimezoneOffset() * 60; }, c: function () { return "Not Yet Supported"; }, r: function () { return this.toString(); }, U: function () { return this.getTime() / 1000; } };
//Date.prototype.toMSJSON = function () { var date = '/Date(' + this.getTime() + ')/'; return date; };
//Date.prototype.withoutTime = function () { var d = new Date(this); d.setHours(0, 0, 0, 0, 0); return d; };

// File Style Plugin: http://www.appelsiini.net/projects/filestyle
//Makes file upload window pretty
(function ($) { $.fn.filestyle = function (options) { var settings = { width: 250 }; if (options) { $.extend(settings, options); }; return this.each(function () { var self = this; var wrapper = $("<div>").css({ "width": settings.imagewidth + "px", "height": settings.imageheight + "px", "background": "url(" + settings.image + ") 0 0 no-repeat", "background-position": "right", "display": "inline", "position": "absolute", "overflow": "hidden" }); var filename = $('<input class="file">').addClass($(self).attr("class")).css({ "display": "inline", "width": settings.width + "px" }); $(self).before(filename); $(self).wrap(wrapper); $(self).css({ "position": "relative", "height": settings.imageheight + "px", "width": settings.width + "px", "display": "inline", "cursor": "pointer", "opacity": "0.0" }); if ($.browser.mozilla) { if (/Win/.test(navigator.platform)) { $(self).css("margin-left", "-142px"); } else { $(self).css("margin-left", "-168px"); }; } else { $(self).css("margin-left", settings.imagewidth - settings.width + "px"); }; $(self).bind("change", function () { filename.val($(self).val()); }); }); }; })(jQuery);

// Array Remove - By John Resig (MIT Licensed)
//Array.prototype.remove = function (a, b) { var c = this.slice((b || a) + 1 || this.length); this.length = a < 0 ? this.length + a : a; return this.push.apply(this, c) };

// Watermark v3.1.3 (March 22, 2011) plugin for jQuery - http://jquery-watermark.googlecode.com/
(function (a, h, y) { var w = "function", v = "password", j = "maxLength", n = "type", b = "", c = true, u = "placeholder", i = false, t = "watermark", g = t, f = "watermarkClass", q = "watermarkFocus", l = "watermarkSubmit", o = "watermarkMaxLength", e = "watermarkPassword", d = "watermarkText", k = /\r/g, s = "input:data(" + g + "),textarea:data(" + g + ")", m = "input:text,input:password,input[type=search],input:not([type]),textarea", p = ["Page_ClientValidate"], r = i, x = u in document.createElement("input"); a.watermark = a.watermark || { version: "3.1.3", runOnce: c, options: { className: t, useNative: c, hideBeforeUnload: c }, hide: function (b) { a(b).filter(s).each(function () { a.watermark._hide(a(this)) }) }, _hide: function (a, r) { var p = a[0], q = (p.value || b).replace(k, b), l = a.data(d) || b, m = a.data(o) || 0, i = a.data(f); if (l.length && q == l) { p.value = b; if (a.data(e)) if ((a.attr(n) || b) === "text") { var g = a.data(e) || [], c = a.parent() || []; if (g.length && c.length) { c[0].removeChild(a[0]); c[0].appendChild(g[0]); a = g } } if (m) { a.attr(j, m); a.removeData(o) } if (r) { a.attr("autocomplete", "off"); h.setTimeout(function () { a.select() }, 1) } } i && a.removeClass(i) }, show: function (b) { a(b).filter(s).each(function () { a.watermark._show(a(this)) }) }, _show: function (g) { var p = g[0], u = (p.value || b).replace(k, b), h = g.data(d) || b, s = g.attr(n) || b, t = g.data(f); if ((u.length == 0 || u == h) && !g.data(q)) { r = c; if (g.data(e)) if (s === v) { var m = g.data(e) || [], l = g.parent() || []; if (m.length && l.length) { l[0].removeChild(g[0]); l[0].appendChild(m[0]); g = m; g.attr(j, h.length); p = g[0] } } if (s === "text" || s === "search") { var i = g.attr(j) || 0; if (i > 0 && h.length > i) { g.data(o, i); g.attr(j, h.length) } } t && g.addClass(t); p.value = h } else a.watermark._hide(g) }, hideAll: function () { if (r) { a.watermark.hide(m); r = i } }, showAll: function () { a.watermark.show(m) } }; a.fn.watermark = a.fn.watermark || function (p, o) { var t = "string"; if (!this.length) return this; var s = i, r = typeof p === t; if (r) p = p.replace(k, b); if (typeof o === "object") { s = typeof o.className === t; o = a.extend({}, a.watermark.options, o) } else if (typeof o === t) { s = c; o = a.extend({}, a.watermark.options, { className: o }) } else o = a.watermark.options; if (typeof o.useNative !== w) o.useNative = o.useNative ? function () { return c } : function () { return i }; return this.each(function () { var B = "dragleave", A = "dragenter", z = this, i = a(z); if (!i.is(m)) return; if (i.data(g)) { if (r || s) { a.watermark._hide(i); r && i.data(d, p); s && i.data(f, o.className) } } else { if (x && o.useNative.call(z, i) && (i.attr("tagName") || b) !== "TEXTAREA") { r && i.attr(u, p); return } i.data(d, r ? p : b); i.data(f, o.className); i.data(g, 1); if ((i.attr(n) || b) === v) { var C = i.wrap("<span>").parent(), t = a(C.html().replace(/type=["']?password["']?/i, 'type="text"')); t.data(d, i.data(d)); t.data(f, i.data(f)); t.data(g, 1); t.attr(j, p.length); t.focus(function () { a.watermark._hide(t, c) }).bind(A, function () { a.watermark._hide(t) }).bind("dragend", function () { h.setTimeout(function () { t.blur() }, 1) }); i.blur(function () { a.watermark._show(i) }).bind(B, function () { a.watermark._show(i) }); t.data(e, i); i.data(e, t) } else i.focus(function () { i.data(q, 1); a.watermark._hide(i, c) }).blur(function () { i.data(q, 0); a.watermark._show(i) }).bind(A, function () { a.watermark._hide(i) }).bind(B, function () { a.watermark._show(i) }).bind("dragend", function () { h.setTimeout(function () { a.watermark._show(i) }, 1) }).bind("drop", function (e) { var c = i[0], a = e.originalEvent.dataTransfer.getData("Text"); if ((c.value || b).replace(k, b).replace(a, b) === i.data(d)) c.value = a; i.focus() }); if (z.form) { var w = z.form, y = a(w); if (!y.data(l)) { y.submit(a.watermark.hideAll); if (w.submit) { y.data(l, w.submit); w.submit = function (c, b) { return function () { var d = b.data(l); a.watermark.hideAll(); if (d.apply) d.apply(c, Array.prototype.slice.call(arguments)); else d() } } (w, y) } else { y.data(l, 1); w.submit = function (b) { return function () { a.watermark.hideAll(); delete b.submit; b.submit() } } (w) } } } } a.watermark._show(i) }) }; if (a.watermark.runOnce) { a.watermark.runOnce = i; a.extend(a.expr[":"], { data: function (c, d, b) { return !!a.data(c, b[3]) } }); (function (c) { a.fn.val = function () { var e = this; if (!e.length) return arguments.length ? e : y; if (!arguments.length) if (e.data(g)) { var f = (e[0].value || b).replace(k, b); return f === (e.data(d) || b) ? b : f } else return c.apply(e, arguments); else { c.apply(e, arguments); a.watermark.show(e); return e } } })(a.fn.val); p.length && a(function () { for (var b, c, d = p.length - 1; d >= 0; d--) { b = p[d]; c = h[b]; if (typeof c === w) h[b] = function (b) { return function () { a.watermark.hideAll(); return b.apply(null, Array.prototype.slice.call(arguments)) } } (c) } }); a(h).bind("beforeunload", function () { a.watermark.options.hideBeforeUnload && a.watermark.hideAll() }) } })(jQuery, window);

// jQuery blockUI plugin, Version 2.37: http://jquery.malsup.com
//(function (b) { function q(c, a) { var e = c == window, d = a && a.message !== undefined ? a.message : undefined; a = b.extend({}, b.blockUI.defaults, a || {}); a.overlayCSS = b.extend({}, b.blockUI.defaults.overlayCSS, a.overlayCSS || {}); var g = b.extend({}, b.blockUI.defaults.css, a.css || {}), i = b.extend({}, b.blockUI.defaults.themedCSS, a.themedCSS || {}); d = d === undefined ? a.message : d; e && k && n(window, { fadeOut: 0 }); if (d && typeof d != "string" && (d.parentNode || d.jquery)) { var h = d.jquery ? d[0] : d, f = {}; b(c).data("blockUI.history", f); f.el = h; f.parent = h.parentNode; f.display = h.style.display; f.position = h.style.position; f.parent && f.parent.removeChild(h) } f = a.baseZ; var l = b.browser.msie || a.forceIframe ? b('<iframe class="blockUI" style="z-index:' + f++ + ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + a.iframeSrc + '"></iframe>') : b('<div class="blockUI" style="display:none"></div>'); h = b('<div class="blockUI blockOverlay" style="z-index:' + f++ + ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'); f = b(a.theme && e ? '<div class="blockUI ' + a.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + f + ';display:none;position:fixed"><div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (a.title || "&nbsp;") + '</div><div class="ui-widget-content ui-dialog-content"></div></div>' : a.theme ? '<div class="blockUI ' + a.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + f + ';display:none;position:absolute"><div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (a.title || "&nbsp;") + '</div><div class="ui-widget-content ui-dialog-content"></div></div>' : e ? '<div class="blockUI ' + a.blockMsgClass + ' blockPage" style="z-index:' + f + ';display:none;position:fixed"></div>' : '<div class="blockUI ' + a.blockMsgClass + ' blockElement" style="z-index:' + f + ';display:none;position:absolute"></div>'); if (d) if (a.theme) { f.css(i); f.addClass("ui-widget-content") } else f.css(g); if (!a.applyPlatformOpacityRules || !(b.browser.mozilla && /Linux/.test(navigator.platform))) h.css(a.overlayCSS); h.css("position", e ? "fixed" : "absolute"); if (b.browser.msie || a.forceIframe) l.css("opacity", 0); g = [l, h, f]; var y = e ? b("body") : b(c); b.each(g, function () { this.appendTo(y) }); a.theme && a.draggable && b.fn.draggable && f.draggable({ handle: ".ui-dialog-titlebar", cancel: "li" }); g = z && (!b.boxModel || b("object,embed", e ? null : c).length > 0); if (r || g) { e && a.allowBodyStretch && b.boxModel && b("html,body").css("height", "100%"); if ((r || !b.boxModel) && !e) { g = parseInt(b.css(c, "borderTopWidth")) || 0; i = parseInt(b.css(c, "borderLeftWidth")) || 0; var s = g ? "(0 - " + g + ")" : 0, t = i ? "(0 - " + i + ")" : 0 } b.each([l, h, f], function (A, B) { var j = B[0].style; j.position = "absolute"; if (A < 2) { e ? j.setExpression("height", "Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:" + a.quirksmodeOffsetHack + ') + "px"') : j.setExpression("height", 'this.parentNode.offsetHeight + "px"'); e ? j.setExpression("width", 'jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"') : j.setExpression("width", 'this.parentNode.offsetWidth + "px"'); t && j.setExpression("left", t); s && j.setExpression("top", s) } else if (a.centerY) { e && j.setExpression("top", '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'); j.marginTop = 0 } else if (!a.centerY && e) { var C = "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + " + (a.css && a.css.top ? parseInt(a.css.top) : 0) + ') + "px"'; j.setExpression("top", C) } }) } if (d) { a.theme ? f.find(".ui-widget-content").append(d) : f.append(d); if (d.jquery || d.nodeType) b(d).show() } if ((b.browser.msie || a.forceIframe) && a.showOverlay) l.show(); if (a.fadeIn) { g = a.onBlock ? a.onBlock : o; l = a.showOverlay && !d ? g : o; g = d ? g : o; a.showOverlay && h._fadeIn(a.fadeIn, l); d && f._fadeIn(a.fadeIn, g) } else { a.showOverlay && h.show(); d && f.show(); a.onBlock && a.onBlock() } u(1, c, a); if (e) { k = f[0]; m = b(":input:enabled:visible", k); a.focusInput && setTimeout(v, 20) } else D(f[0], a.centerX, a.centerY); if (a.timeout) { d = setTimeout(function () { e ? b.unblockUI(a) : b(c).unblock(a) }, a.timeout); b(c).data("blockUI.timeout", d) } } function n(c, a) { var e = c == window, d = b(c), g = d.data("blockUI.history"), i = d.data("blockUI.timeout"); if (i) { clearTimeout(i); d.removeData("blockUI.timeout") } a = b.extend({}, b.blockUI.defaults, a || {}); u(0, c, a); var h; h = e ? b("body").children().filter(".blockUI").add("body > .blockUI") : b(".blockUI", c); if (e) k = m = null; if (a.fadeOut) { h.fadeOut(a.fadeOut); setTimeout(function () { w(h, g, a, c) }, a.fadeOut) } else w(h, g, a, c) } function w(c, a, e, d) { c.each(function () { this.parentNode && this.parentNode.removeChild(this) }); if (a && a.el) { a.el.style.display = a.display; a.el.style.position = a.position; a.parent && a.parent.appendChild(a.el); b(d).removeData("blockUI.history") } typeof e.onUnblock == "function" && e.onUnblock(d, e) } function u(c, a, e) { var d = a == window; a = b(a); if (!(!c && (d && !k || !d && !a.data("blockUI.isBlocked")))) { d || a.data("blockUI.isBlocked", c); !e.bindEvents || c && !e.showOverlay || (c ? b(document).bind("mousedown mouseup keydown keypress", e, x) : b(document).unbind("mousedown mouseup keydown keypress", x)) } } function x(c) { if (c.keyCode && c.keyCode == 9) if (k && c.data.constrainTabKey) { var a = m, e = c.shiftKey && c.target === a[0]; if (!c.shiftKey && c.target === a[a.length - 1] || e) { setTimeout(function () { v(e) }, 10); return false } } a = c.data; if (b(c.target).parents("div." + a.blockMsgClass).length > 0) return true; return b(c.target).parents().children().filter("div.blockUI").length == 0 } function v(c) { if (m) (c = m[c === true ? m.length - 1 : 0]) && c.focus() } function D(c, a, e) { var d = c.parentNode, g = c.style, i = (d.offsetWidth - c.offsetWidth) / 2 - (parseInt(b.css(d, "borderLeftWidth")) || 0); c = (d.offsetHeight - c.offsetHeight) / 2 - (parseInt(b.css(d, "borderTopWidth")) || 0); if (a) g.left = i > 0 ? i + "px" : "0"; if (e) g.top = c > 0 ? c + "px" : "0" } if (/1\.(0|1|2)\.(0|1|2)/.test(b.fn.jquery) || /^1.1/.test(b.fn.jquery)) alert("blockUI requires jQuery v1.2.3 or later! You are using v" + b.fn.jquery); else { b.fn._fadeIn = b.fn.fadeIn; var o = function () { }, p = document.documentMode || 0, z = b.browser.msie && (b.browser.version < 8 && !p || p < 8), r = b.browser.msie && /MSIE 6.0/.test(navigator.userAgent) && !p; b.blockUI = function (c) { q(window, c) }; b.unblockUI = function (c) { n(window, c) }; b.growlUI = function (c, a, e, d) { var g = b('<div class="growlUI"></div>'); c && g.append("<h1>" + c + "</h1>"); a && g.append("<h2>" + a + "</h2>"); if (e == undefined) e = 3E3; b.blockUI({ message: g, fadeIn: 700, fadeOut: 1E3, centerY: false, timeout: e, showOverlay: false, onUnblock: d, css: b.blockUI.defaults.growlCSS }) }; b.fn.block = function (c) { return this.unblock({ fadeOut: 0 }).each(function () { if (b.css(this, "position") == "static") this.style.position = "relative"; if (b.browser.msie) this.style.zoom = 1; q(this, c) }) }; b.fn.unblock = function (c) { return this.each(function () { n(this, c) }) }; b.blockUI.version = 2.37; b.blockUI.defaults = { message: "<h1>Please wait...</h1>", title: null, draggable: true, theme: false, css: { padding: 0, margin: 0, width: "30%", top: "40%", left: "35%", textAlign: "center", color: "#000", border: "3px solid #aaa", backgroundColor: "#fff", cursor: "wait" }, themedCSS: { width: "30%", top: "40%", left: "35%" }, overlayCSS: { backgroundColor: "#000", opacity: 0.6, cursor: "wait" }, growlCSS: { width: "350px", top: "10px", left: "", right: "10px", border: "none", padding: "5px", opacity: 0.6, cursor: "default", color: "#fff", backgroundColor: "#000", "-webkit-border-radius": "10px", "-moz-border-radius": "10px", "border-radius": "10px" }, iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank", forceIframe: false, baseZ: 1E3, centerX: true, centerY: true, allowBodyStretch: true, bindEvents: true, constrainTabKey: true, fadeIn: 200, fadeOut: 400, timeout: 0, showOverlay: true, focusInput: true, applyPlatformOpacityRules: true, onBlock: null, onUnblock: null, quirksmodeOffsetHack: 4, blockMsgClass: "blockMsg" }; var k = null, m = [] } })(jQuery);
//$.blockUI.defaults.message = '';
//$.blockUI.defaults.overlayCSS = { backgroundColor: '#fff', opacity: 0.4, cursor: 'wait' };

// Parse query string http://plugins.jquery.com/project/parseQuery
//jQuery.parseQuery = function (c, e) { var f = typeof c === "string" ? c : window.location.search, d = { f: function (b) { return unescape(b).replace(/\+/g, " ") } }, d = jQuery.extend({}, d, typeof c === "object" && typeof e === "undefined" ? c : e), b = {}; jQuery.each(f.match(/^\??(.*)$/)[1].split("&"), function (c, a) { a = a.split("="); a[1] = d.f(a[1]); b[a[0]] = b[a[0]] ? b[a[0]] instanceof Array ? (b[a[0]].push(a[1]), b[a[0]]) : [b[a[0]], a[1]] : a[1] }); return b };

// Tinycon
(function () { var Tinycon = {}; var currentFavicon = null; var originalFavicon = null; var originalTitle = document.title; var faviconImage = null; var canvas = null; var options = {}; var defaults = { width: 7, height: 9, font: '10px arial', colour: '#ffffff', background: '#F03D25', fallback: true, abbreviate: true }; var ua = (function () { var agent = navigator.userAgent.toLowerCase(); return function (browser) { return agent.indexOf(browser) !== -1 } }()); var browser = { ie: ua('msie'), chrome: ua('chrome'), webkit: ua('chrome') || ua('safari'), safari: ua('safari') && !ua('chrome'), mozilla: ua('mozilla') && !ua('chrome') && !ua('safari') }; var getFaviconTag = function () { var links = document.getElementsByTagName('link'); for (var i = 0, len = links.length; i < len; i++) { if ((links[i].getAttribute('rel') || '').match(/\bicon\b/)) { return links[i] } } return false }; var removeFaviconTag = function () { var links = document.getElementsByTagName('link'); var head = document.getElementsByTagName('head')[0]; for (var i = 0, len = links.length; i < len; i++) { var exists = (typeof (links[i]) !== 'undefined'); if (exists && (links[i].getAttribute('rel') || '').match(/\bicon\b/)) { head.removeChild(links[i]) } } }; var getCurrentFavicon = function () { if (!originalFavicon || !currentFavicon) { var tag = getFaviconTag(); originalFavicon = currentFavicon = tag ? tag.getAttribute('href') : '/favicon.ico' } return currentFavicon }; var getCanvas = function () { if (!canvas) { canvas = document.createElement("canvas"); canvas.width = 16; canvas.height = 16 } return canvas }; var setFaviconTag = function (url) { removeFaviconTag(); var link = document.createElement('link'); link.type = 'image/x-icon'; link.rel = 'icon'; link.href = url; document.getElementsByTagName('head')[0].appendChild(link) }; var log = function (message) { if (window.console) window.console.log(message) }; var drawFavicon = function (label, colour) { if (!getCanvas().getContext || browser.ie || browser.safari || options.fallback === 'force') { return updateTitle(label) } var context = getCanvas().getContext("2d"); var colour = colour || '#000000'; var src = getCurrentFavicon(); faviconImage = new Image(); faviconImage.onload = function () { context.clearRect(0, 0, 16, 16); context.drawImage(faviconImage, 0, 0, faviconImage.width, faviconImage.height, 0, 0, 16, 16); if ((label + '').length > 0) drawBubble(context, label, colour); refreshFavicon() }; if (!src.match(/^data/)) { faviconImage.crossOrigin = 'anonymous' } faviconImage.src = src }; var updateTitle = function (label) { if (options.fallback) { if ((label + '').length > 0) { document.title = '(' + label + ') ' + originalTitle } else { document.title = originalTitle } } }; var drawBubble = function (context, label, colour) { if (typeof label == 'number' && label > 99 && options.abbreviate) { label = abbreviateNumber(label) } var len = (label + '').length - 1; var width = options.width + (6 * len); var w = 16 - width; var h = 16 - options.height; context.font = (browser.webkit ? 'bold ' : '') + options.font; context.fillStyle = options.background; context.strokeStyle = options.background; context.lineWidth = 1; context.fillRect(w, h, width - 1, options.height); context.beginPath(); context.moveTo(w - 0.5, h + 1); context.lineTo(w - 0.5, 15); context.stroke(); context.beginPath(); context.moveTo(15.5, h + 1); context.lineTo(15.5, 15); context.stroke(); context.beginPath(); context.strokeStyle = "rgba(0,0,0,0.3)"; context.moveTo(w, 16); context.lineTo(15, 16); context.stroke(); context.fillStyle = options.colour; context.textAlign = "right"; context.textBaseline = "top"; context.fillText(label, 15, browser.mozilla ? 7 : 6) }; var refreshFavicon = function () { if (!getCanvas().getContext) return; setFaviconTag(getCanvas().toDataURL()) }; var abbreviateNumber = function (label) { var metricPrefixes = [['G', 1000000000], ['M', 1000000], ['k', 1000]]; for (var i = 0; i < metricPrefixes.length; ++i) { if (label >= metricPrefixes[i][1]) { label = round(label / metricPrefixes[i][1]) + metricPrefixes[i][0]; break } } return label }; var round = function (value, precision) { var number = new Number(value); return number.toFixed(precision) }; Tinycon.setOptions = function (custom) { options = {}; for (var key in defaults) { options[key] = custom.hasOwnProperty(key) ? custom[key] : defaults[key] } return this }; Tinycon.setImage = function (url) { currentFavicon = url; refreshFavicon(); return this }; Tinycon.setBubble = function (label, colour) { label = label || ''; drawFavicon(label, colour); return this }; Tinycon.reset = function () { setFaviconTag(originalFavicon) }; Tinycon.setOptions(defaults); window.Tinycon = Tinycon })();

// Text length limit: http://unwrongest.com/projects/limit/
(function ($) {
    $.fn.extend({
        limit: function (limit, element) {
            var interval, f; var self = $(this); $(this).focus(function () { interval = window.setInterval(substring, 100) }); $(this).blur(function () { clearInterval(interval); substring() }); var substringFunction = "function substring(){ var val = $(self).val();var length = val.length;if(length > limit){$(self).val($(self).val().substring(0,limit));}"; if (typeof element != "undefined") substringFunction += "if($(element).html() != limit-length){$(element).html((limit-length<=0)?'0':limit-length);}";
            substringFunction += "}"; eval(substringFunction); substring()
        }
    })
})(jQuery);

// Url parsing, working with parameters
// http://benalman.com/projects/jquery-bbq-plugin/
(function ($, p) { var i, m = Array.prototype.slice, r = decodeURIComponent, a = $.param, c, l, v, b = $.bbq = $.bbq || {}, q, u, j, e = $.event.special, d = "hashchange", A = "querystring", D = "fragment", y = "elemUrlAttr", g = "location", k = "href", t = "src", x = /^.*\?|#.*$/g, w = /^.*\#/, h, C = {}; function E(F) { return typeof F === "string" } function B(G) { var F = m.call(arguments, 1); return function () { return G.apply(this, F.concat(m.call(arguments))) } } function n(F) { return F.replace(/^[^#]*#?(.*)$/, "$1") } function o(F) { return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1") } function f(H, M, F, I, G) { var O, L, K, N, J; if (I !== i) { K = F.match(H ? /^([^#]*)\#?(.*)$/ : /^([^#?]*)\??([^#]*)(#?.*)/); J = K[3] || ""; if (G === 2 && E(I)) { L = I.replace(H ? w : x, "") } else { N = l(K[2]); I = E(I) ? l[H ? D : A](I) : I; L = G === 2 ? I : G === 1 ? $.extend({}, I, N) : $.extend({}, N, I); L = a(L); if (H) { L = L.replace(h, r) } } O = K[1] + (H ? "#" : L || !K[1] ? "?" : "") + L + J } else { O = M(F !== i ? F : p[g][k]) } return O } a[A] = B(f, 0, o); a[D] = c = B(f, 1, n); c.noEscape = function (G) { G = G || ""; var F = $.map(G.split(""), encodeURIComponent); h = new RegExp(F.join("|"), "g") }; c.noEscape(",/"); $.deparam = l = function (I, F) { var H = {}, G = { "true": !0, "false": !1, "null": null }; $.each(I.replace(/\+/g, " ").split("&"), function (L, Q) { var K = Q.split("="), P = r(K[0]), J, O = H, M = 0, R = P.split("]["), N = R.length - 1; if (/\[/.test(R[0]) && /\]$/.test(R[N])) { R[N] = R[N].replace(/\]$/, ""); R = R.shift().split("[").concat(R); N = R.length - 1 } else { N = 0 } if (K.length === 2) { J = r(K[1]); if (F) { J = J && !isNaN(J) ? +J : J === "undefined" ? i : G[J] !== i ? G[J] : J } if (N) { for (; M <= N; M++) { P = R[M] === "" ? O.length : R[M]; O = O[P] = M < N ? O[P] || (R[M + 1] && isNaN(R[M + 1]) ? {} : []) : J } } else { if ($.isArray(H[P])) { H[P].push(J) } else { if (H[P] !== i) { H[P] = [H[P], J] } else { H[P] = J } } } } else { if (P) { H[P] = F ? i : "" } } }); return H }; function z(H, F, G) { if (F === i || typeof F === "boolean") { G = F; F = a[H ? D : A]() } else { F = E(F) ? F.replace(H ? w : x, "") : F } return l(F, G) } l[A] = B(z, 0); l[D] = v = B(z, 1); $[y] || ($[y] = function (F) { return $.extend(C, F) })({ a: k, base: k, iframe: t, img: t, input: t, form: "action", link: k, script: t }); j = $[y]; function s(I, G, H, F) { if (!E(H) && typeof H !== "object") { F = H; H = G; G = i } return this.each(function () { var L = $(this), J = G || j()[(this.nodeName || "").toLowerCase()] || "", K = J && L.attr(J) || ""; L.attr(J, a[I](K, H, F)) }) } $.fn[A] = B(s, A); $.fn[D] = B(s, D); b.pushState = q = function (I, F) { if (E(I) && /^#/.test(I) && F === i) { F = 2 } var H = I !== i, G = c(p[g][k], H ? I : {}, H ? F : 2); p[g][k] = G + (/#/.test(G) ? "" : "#") }; b.getState = u = function (F, G) { return F === i || typeof F === "boolean" ? v(F) : v(G)[F] }; b.removeState = function (F) { var G = {}; if (F !== i) { G = u(); $.each($.isArray(F) ? F : arguments, function (I, H) { delete G[H] }) } q(G, 2) }; e[d] = $.extend(e[d], { add: function (F) { var H; function G(J) { var I = J[D] = c(); J.getState = function (K, L) { return K === i || typeof K === "boolean" ? l(I, K) : l(I, L)[K] }; H.apply(this, arguments) } if ($.isFunction(F)) { H = F; return G } else { H = F.handler; F.handler = G } } }) })(jQuery, this);

// jQuery animateNumber plugin v0.0.10  https://github.com/aishek/jquery-animateNumber
(function (d) {
    var p = function (b) { return b.split("").reverse().join("") }, l = { numberStep: function (b, a) { var e = Math.floor(b); d(a.elem).text(e) } }, h = function (b) { var a = b.elem; a.nodeType && a.parentNode && (a = a._animateNumberSetter, a || (a = l.numberStep), a(b.now, b)) }; d.Tween && d.Tween.propHooks ? d.Tween.propHooks.number = { set: h } : d.fx.step.number = h; d.animateNumber = {
        numberStepFactories: {
            append: function (b) { return function (a, e) { var k = Math.floor(a); d(e.elem).prop("number", a).text(k + b) } }, separator: function (b, a) {
                b = b || " "; a =
                a || 3; return function (e, k) { var c = Math.floor(e).toString(), s = d(k.elem); if (c.length > a) { for (var f = c, g = a, l = f.split("").reverse(), c = [], m, q, n, r = 0, h = Math.ceil(f.length / g) ; r < h; r++) { m = ""; for (n = 0; n < g; n++) { q = r * g + n; if (q === f.length) break; m += l[q] } c.push(m) } f = c.length - 1; g = p(c[f]); c[f] = p(parseInt(g, 10).toString()); c = c.join(b); c = p(c) } s.prop("number", e).text(c) }
            }
        }
    }; d.fn.animateNumber = function () {
        for (var b = arguments[0], a = d.extend({}, l, b), e = d(this), k = [a], c = 1, h = arguments.length; c < h; c++) k.push(arguments[c]); if (b.numberStep) {
            var f =
            this.each(function () { this._animateNumberSetter = b.numberStep }), g = a.complete; a.complete = function () { f.each(function () { delete this._animateNumberSetter }); g && g.apply(this, arguments) }
        } return e.animate.apply(e, k)
    }
})(jQuery);

// Live search https://github.com/awbush/jquery-fastLiveFilter
jQuery.fn.fastLiveFilter = function (e, t) { t = t || {}, e = jQuery(e); var n, l = this, i = "", o = t.timeout || 0, a = t.callback || function () { }, s = e.children(), r = s.length, c = r > 0 ? s[0].style.display : "block"; return a(r), l.change(function () { for (var e, n, i = l.val().toLowerCase(), o = 0, y = 0; r > y; y++) e = s[y], n = t.selector ? $(e).find(t.selector).text() : e.textContent || e.innerText || "", n.toLowerCase().indexOf(i) >= 0 ? ("none" == e.style.display && (e.style.display = c), o++) : "none" != e.style.display && (e.style.display = "none"); return a(o), !1 }).keydown(function () { clearTimeout(n), n = setTimeout(function () { l.val() !== i && (i = l.val(), l.change()) }, o) }), this };

// Username/email checker Plugin
// 0 - username+tenant nick, 1 - email, 2 - username+email
$.fn.checkAvailability = function (type, resultContainer) { return this.each(function () { var $this = $(this); $this.blur(function () { $this.val($this.val().trim()); $.fn.checkAvailability.validate(type, $this.val(), resultContainer); }); }); }
$.fn.checkAvailability.validate = function (validationType, value, resultContainer) {
    if (value == '' || value == null) { resultContainer.empty(); return; }
    value = value.trim();

    if (validationType == 0) {
        var expression = "^([a-zA-Z0-9_\-]+)$";
        if (!value.match(expression)) { resultContainer.empty(); return; }
    }
    if (validationType == 1 || validationType == 2) {
        var expression = "^([a-zA-Z0-9_\\-\\.\']+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$";
        if (!value.match(expression)) { resultContainer.empty(); return; }
    }
    $.ajax({
        url: applicationPath + '/Services/soap/v1.0/Frontend.asmx/CheckAvailability?value="' + value + '"&validationType=' + validationType, type: 'GET', dataType: 'json', contentType: 'application/json; charset=utf-8',
        success: function (data) {
            var valid = data.d;
            resultContainer.empty();
            if (valid) { resultContainer.append($('<span class="valid"></span>')); }
            else { resultContainer.append($('<span class="invalid"></span>')); }
        },
        error: function (data, status, e) { resultContainer.empty(); }
    });
}

// Group collapser/checkboxer plugin
$.fn.groupCollapser = function (container, allowMultiple, checkCallback, expandCallback, beforeGroupCheckCallback, collapseCallback) {
    return this.each(function () {
        var $this = $(this);
        var groupId = $this.attr('groupId');
        var tds = $('td.collapser', $this);
        $('a', tds).click(function (e) { e.stopPropagation(); });

        // Expand/collapse toggler
        tds.click(function (e) { $.fn.groupCollapser.toggle($this, container, e, expandCallback, collapseCallback); });

        // Groups checkboxes
        $('input[groupId="' + groupId + '"]', container).on('change', function () { $.fn.groupCollapser.check($(this), container, allowMultiple, checkCallback, beforeGroupCheckCallback); });
    });
}
$.fn.groupCollapser.toggle = function ($this, container, event, expandCallback, collapseCallback) {
    var td = $('td.group', $this);
    if (td.length == 0)
        td = $this;

    var groupId = $this.attr('groupId');
    if (td.hasClass('collapsed')) {
        if (typeof expandCallback == 'function') {
            expandCallback($this);
        }

        $('tr.subgroup[groupId="' + groupId + '"]', container).show();
        td.removeClass('collapsed');
    }
    else {
        if (typeof collapseCallback == 'function') {
            collapseCallback($this);
        }

        $('tr.subgroup[groupId="' + groupId + '"]', container).hide();
        td.addClass('collapsed');
    }
}

$.fn.groupCollapser.attachLazyCheck = function ($this, container, allowMultiple, checkCallback, groupId) {
    $('input.subgroup-control[groupId="' + groupId + '"]', container).click(function () { $.fn.groupCollapser.check($(this), container, allowMultiple, checkCallback, null); });
}

$.fn.groupCollapser.refreshGroupCheck = function ($this, container, allowMultiple, checkCallback, groupId) {
    var checked = $('input[groupId="' + groupId + '"]', container).is(':checked');
    var subItems = $('input.subgroup-control[groupId="' + groupId + '"]', container);
    $.each(subItems, function (i, e) {
        var el = $(e);
        if (!el.is(':disabled') && (!el.hasClass('no-select') || !checked))
            el.attr('checked', checked);
    })
}

$.fn.groupCollapser.check = function ($this, container, allowMultiple, callback, beforeGroupCheckCallback) {
    var checked = $this.is(':checked');
    var groupId = $this.attr('groupId');
    if (typeof (allowMultiple) != undefined && allowMultiple);
    else
        $('input[groupId!="' + groupId + '"]', container).attr('checked', false); // clear all checks in other groups
    
    if ($this.hasClass('group-control')) {
        if (typeof beforeGroupCheckCallback == 'function') {
            beforeGroupCheckCallback($this);
        }

        var subItems = $('input.subgroup-control[groupId="' + groupId + '"]', container);
        $.each(subItems, function (i, e) {
            var el = $(e);
            if (!el.is(':disabled') && (!el.hasClass('no-select') || !checked))
                el.attr('checked', checked);
        })
    }
    else {
        var groupItem = $('input.group-control[groupId="' + groupId + '"]', container);
        if (groupItem.length > 0) {
            groupItem.attr('checked', $('input.subgroup-control:not(.no-select):checked[groupId="' + groupId + '"]', container).length == $('input.subgroup-control:not(.no-select)[groupId="' + groupId + '"]', container).length);
        }
    }

    if (typeof callback == 'function') {
        callback($('input.subgroup-control:checked', container), $('input.group-control:checked', container), $('input.group-control', container));
    }
}

// Group check plugin
$.fn.groupCheck = function (container, callback) {
    return this.each(function () {
        $('input[type="checkbox"]', container).click(function () { $.fn.groupCheck.check($(this), container, callback); });
    });
}

$.fn.groupCheck.check = function ($this, container, callback) {
    var checked = $this.is(':checked');

    if ($this.hasClass('group-control')) {
        // Check/uncheck all visible not disabled objects
        var subItems = $('input.subgroup-control:not(:disabled,.no-select)', container);
        subItems.attr('checked', checked);

        // Uncheck all hidden objects
        $('input.subgroup-control:not(:disabled,.no-select):not(:visible)', container).attr('checked', false);
    }
    else {
        var groupItem = $('input.group-control', container);
        if (groupItem.length > 0) {
            var pagesCount = parseInt(groupItem.attr('pages'), 10);
            groupItem.attr('checked', $('input.subgroup-control:checked:not(:disabled,.no-select):visible', container).length == $('input.subgroup-control:not(:disabled,.no-select):visible', container).length && (isNaN(pagesCount) || pagesCount <= 1));
        }
    }

    if (typeof callback == 'function') {
        callback($('input.subgroup-control:checked', container));
    }
}

$.fn.groupCheck.refreshGroupCheck = function ($this, container, callback) {
    var groupItem = $('input.group-control', container);
    if (groupItem.length > 0) {
        var pagesCount = parseInt(groupItem.attr('pages'), 10);
        groupItem.attr('checked', $('input.subgroup-control:checked:not(:disabled,.no-select)', container).length == $('input.subgroup-control:not(:disabled,.no-select)', container).length && (isNaN(pagesCount) || pagesCount <= 1));
    }
    if (typeof callback == 'function') {
        callback($('input.subgroup-control:checked', container));
    }
}

// Item selector plugin
$.fn.itemSelector = function () {
    return this.each(function () {
        var $this = $(this);
        var items = $('li', $this);
        items.click(function () {
            var item = $(this);
            if (item.hasClass('selected'))
                item.removeClass('selected')
            else {
                $('li.selected', $this).removeClass('selected');
                item.addClass('selected');
            }

            $('input[type="hidden"]', $this).val(item.hasClass('selected') ? item.text() : '');
        });

        if (items.length == 1) {
            $(items[0]).click();
        }
    });
}

// Collapsible pane plugin
$.fn.collapsible = function () {
    return this.each(function () {
        var $this = $(this);
        var header = $('.header', $this);
        var content = $('.content', $this);
        header.prepend($('<div>').addClass('collapse-icon'));

        header.click(function () {
            content.slideToggle('fast', function () {
                if (content.is(":hidden"))
                    $this.removeClass('expanded');
                else
                    $this.addClass('expanded');
            });
        });

    });
}

// Dropdown
$.fn.dropDown = function () {
    return this.each(function () {
        var $this = $(this)
        $this.on('click', function (e) { $.fn.dropDown.toggle($this, e); return false;});
        $this.on('keydown', function (e) {
            if (!/(27)/.test(e.keyCode)) return;
            e.preventDefault();
            e.stopPropagation();
            if (e.keyCode == 27 && $this.hasClass('active')) {
                $.fn.dropDown.toggle($this, e);
                $this.blur();
            }
        });
    });
}

$.fn.dropDown.toggle = function ($this, e) {
    var menu = $('.dropdown-menu', $this.parent());
    if (menu.is(':visible')) {
        menu.removeClass('active');
        $this.removeClass('active');
    }
    else {
        menu.addClass('active');
        $this.addClass('active');
    }
    $this.focus();
    e.stopPropagation();
}

var unloading = false;
window.onbeforeunload = function () {
    unloading = true;
}

// Plugins initialisation
$(document).ready(function () {
    // Tips plugin
    if ($('body').qtip) {
        $('.tip').qtip({ style: { name: 'cream', tip: true, width: { max: 450 }, border: { radius: 3, width: 1 }, 'font-size': 11 }, position: { corner: { target: 'bottomLeft', tooltip: 'topLeft'}} });
    }

    // Dropdown button plugin
    var dropDownSelector = '.btn-group .dropdown-toggle';
    $(dropDownSelector).dropDown();
    $(document).on('click', function () {
        $(dropDownSelector).each(function (i, el) {
            var $this = $(el);
            $this.removeClass('active');
            $('.dropdown-menu',$this.parent()).removeClass('active');
        });
    });

    // Datepicker plugin
    // if ($.datepicker) {
    //     $.datepicker.setDefaults({
    //         duration: 'fast',
    //         showAnim: 'fadeIn',
    //         showOn: 'button',
    //         buttonImage: applicationPath + '/App_Themes/' + theme + '/images/icons/calendar2.gif',
    //         buttonImageOnly: true,
    //         firstDay: 1,
    //         dateFormat: 'dd/mm/yy',
    //         monthNames: lang.datepicker.monthNames,
    //         monthNamesShort: lang.datepicker.monthNamesShort,
    //         dayNames: lang.datepicker.dayNames,
    //         dayNamesMin: lang.datepicker.dayNamesMin
    //     });

    //     $('.datePicker').datepicker();
    //     $('.datePicker').mask('99/99/9999');
    // }
    //$('input.time').mask('99:99');

    // Collapsible pane
    $('.collapsible').collapsible();

    // if ($('body').htmlarea) {
    //     $('textarea.htmlarea').htmlarea({
    //         css: applicationPath + '/App_Themes/' + theme + '/jHtmlArea.Editor.css',
    //         toolbar: [
    //                 ["html"], ["bold", "italic", "underline", "strikethrough", "|", "subscript", "superscript", "forecolor"],
    //                 ["increasefontsize", "decreasefontsize"],
    //                 ["orderedlist", "unorderedlist"],
    //                 ["indent", "outdent"],
    //                 ["justifyleft", "justifycenter", "justifyright"],
    //                 ["link", "unlink", "image", "horizontalrule"],
    //                 ["p", "h1", "h2", "h3", "h4", "h5", "h6"],
    //                 ["cut", "copy", "paste"]
    //             ]
    //     });
    // }

    if ($.fn.numeric) {
        $('input.numeric').numeric();
    }

    // Watermark plugin
    $("[watermark]").each(function (num, el) {
        $(el).watermark($(el).attr("watermark"));
    });

    // Unread messages - show in favicon
    if (typeof unreadMessagesCount != 'undefined' && unreadMessagesCount > 0)
        Tinycon.setBubble(unreadMessagesCount);

    //TinyMCE     
    if ($.fn.tinymce) {
        $('textarea.tinymce').tinymce({
            plugins: [
                   "advlist autolink lists link image charmap print preview anchor",
                   "searchreplace visualblocks code fullscreen",
                   "insertdatetime media table contextmenu paste"
            ],
            extended_valid_elements:'script[language|type|src]',
            toolbar: "styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent table | link image | code fullscreen visualblocks",
            menubar: false,
            convert_urls: false,
            file_browser_callback: function (field_name, url, type, win) {
                if (type != 'image')
                    return false;
                $('#' + win.tinymce.activeEditor.windowManager.windows[0]._id).css('z-index', 99);
                $('#mce-modal-block').css('z-index', 98);
                insertImageDialog(function(url) {win.document.getElementById(field_name).value = url});
                //win.document.getElementById(field_name).value = 'my browser value'; 
                //alert("Field_Name: " + field_name + "nURL: " + url + "nType: " + type + "nWin: " + win);
            },
            language: currentLanguage
        });
    }

    //autohide    
    if ($('.autohide').length > 0) {
        setTimeout(function () { $('.autohide').hide(700); }, 10000);
    }

    // Message expanding
    $('.message.condensed .expand a').click(function () {
        var $this = $(this);
        $this.parent().parent().removeClass('condensed');
        $this.parent().hide();
        return false;
    });

    // Email confirmation
    $('#aSendEmailConfirm').click(function () {
        $('#lConfirmEmail').hide();
        $('#lSendingConfirmEmail').show();

        $.ajax({
            url: applicationPath + '/Services/wcf/v1.0/Backend.svc/SendEmailConfirmation',
            data: { "tenantId": tenantId == null ? null : '\"' + tenantId + '\"' },
            dataType: 'json',
            cache: false,
            contentType: 'application/json; charset=utf-8',
        })
        .always(function () {
            $('#lSendingConfirmEmail').hide();
            $('#lConfirmEmailSent').show();
        });
        ;
        return false;
    });
});

// Currency conversion
function convertCurrency(from, to, amount) {
    var result = amount;
    if (amount && amount != 0) {
        for (var i = 0; i < Bunddler.defaults.currencyRates.length; i++) {
            var e = Bunddler.defaults.currencyRates[i];
            if (e.From == from && e.To == to) {
                return amount * e.Rate;
            }
        }
    }

    return result;
}

Bunddler.defaults.weightRates = [
    {
        From : 0,
        To : 1,
        Rate : 2.2 //Kg to Pound
    },
    {
        From: 1,
        To: 0,
        Rate: 1/2.2 //Pound to Kg
    }];

//Convert Weight
function convertWeight(from, to, amount) {
    if (typeof amount == "undefined" || amount == null)
        amount = 0;

    from = parseFloat(from);
    to = parseFloat(to);
    var result = amount;
    if (amount && amount != 0) {
        for (var i = 0; i < Bunddler.defaults.weightRates.length; i++) {
            var e = Bunddler.defaults.weightRates[i];
            if (e.From == from && e.To == to) {
                return parseFloat((amount * e.Rate).toFixed(2));
            }
        }
    }

    return result;
}

function formatCurrency(amount, currencyCode) {
    var result = amount + ' ' + currencyCode;
    var currency = Bunddler.defaults.currencies[getCurrencyIndex(currencyCode)];
    if (currency != null)
        result = currency.Format.replace('0.00', amount.toFixed(2));

    return result;
}

function formatWeight(weight, weightUnit) {
    var result = weight.toFixed(2) + ' ' + getWeightUnitById(weightUnit);
    return result;
}

function formatDate(value) {
    var result = '';
    var format = 'd/m/Y';
    if (typeof value == 'string') {
        value = value.substring(0, 10).split('-');
        var date = new Date(value[0], parseInt(value[1]) - 1, parseInt(value[2]));
        result = date.format(format);
    } else
        result = value.format(format);

    return result;
}

function getCurrencyIndex(curencyCode) {
    for (var i = 0; i < Bunddler.defaults.currencies.length; i++) {
        if (Bunddler.defaults.currencies[i].CurrencyCode == curencyCode)
            return i;
    }

    return 0;
}

function getShipTypeIcon(shipTypeId) {
    var result = '';
    switch (shipTypeId) {
        case 1: result = "fa-plane";
            break;
        case 2: result = "fa-anchor";
            break;
        case 3: result = "fa-truck";
            break;
    }

    return result;
}

// Clone sales order items
function cloneSalesOrderItems(source) {
    var data = [];
    for (var i = 0; i < source.length; i++)
        data.push(cloneSalesOrderItem(source[i]));

    return data;
}

function cloneSalesOrderItem(source) {
    var newItem = $.extend({}, source);
    newItem.element = null;
    newItem.Parent = null;

    if (typeof source.Substitutions != 'undefined' && source.Substitutions != null && source.Substitutions.length > 0) {
        newItem.Substitutions = [];
        for (var j = 0; j < source.Substitutions.length; j++) {
            newItem.Substitutions.push(cloneSalesOrderItem(source.Substitutions[j]));
        }
    }
    return newItem;
}

function cloneSalesOrderItemValues(source, dest) {
    dest.Name = source.Name;
    dest.Article = source.Article;
    dest.Url = source.Url;
    dest.Color = source.Color;
    dest.Size = source.Size;
    dest.CurrencyCode = source.CurrencyCode;
    dest.CustomerPrice = source.CustomerPrice;
    dest.RealPrice = source.RealPrice;
    dest.Quantity = source.Quantity;
    dest.Index = source.Index;
}

// Attach image preview tips
function attachImagePreview(handler, images) {
    try { handler.qtip("destroy"); } catch (err) { }

    if (handler == null || images == null || images.length == 0)
        return;

    var content = '';
    for (var i = 0; i < images.length; i++) {
        content += '<div class="preview-image"><img src="' + images[i].Url + '" /></div>';
    }

    handler.qtip({
        content: { prerender: false, title: { text: lang.t.itemPhoto }, text: content },
        style: { name: 'cream', tip: true, width: { max: 900 }, border: { radius: 3, width: 1 }, 'font-size': 11 },
        hide: { fixed: true },
        //show: { ready: true },
        position: { adjust: { x: 10, y: 5 }, corner: { target: 'bottomLeft', tooltip: 'topLeft' } }       
    });
}

function attachTenantOrderPreview(handler, orderId, target, tooltip) {
    try { handler.qtip("destroy"); } catch (err) { }

    if (handler == null || orderId == null)
        return;

    if (target == null)
        target = 'rightMiddle';

    if (tooltip == null)
        tooltip = 'leftMiddle';

    handler.qtip({
        content: {
            text: lang.loading,
            url: applicationPath + '/Services/wcf/v1.0/Backend.Tenant.svc/PreviewOrder?id=' + orderId,
            title: { text: lang.t.order + ' #' + orderId }
        },
        position: {
            corner: { target: target, tooltip: tooltip },
            adjust: { screen: false }
        },
        show: { when: 'mouseover', solo: true },
        hide: { fixed: true },
        style: { tip: true, border: { width: 1, radius: 3 }, name: 'cream', width: 800 }
    });
}

// Opens OAuth window
function OAuth(provider) {
    var width = 750;
    var height = 450;
    var left = (screen.width / 2) - (width / 2);
    var top = (screen.height / 2) - (height / 2);
    window.open(provider, "Authentification", "width=" + width + ",height=" + height + ",top=" + top + ",left=" + left);
    return false;
}