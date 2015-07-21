/*jshint browser: true, jquery: true*/
/**
 * Created by vlad on 15-02-10.
 */
var translate;
var CLIP_TEXT;
var MISSMATCHED_QUOTES_MESSAGE;
var YANDEX_TRANSLATOR_KEY;

function swapInClass(elem, toAdd, toRemove) {
    'use strict';
    return elem.removeClass(toRemove).addClass(toAdd);
}

function swapOutClass(elem, toRemove, toAdd) {
    'use strict';
    return elem.removeClass(toRemove).addClass(toAdd);
}

function swapClass(elem, swapDir, toAdd, toRemove) {
    'use strict';
    return swapDir ? swapInClass(elem, toAdd, toRemove) : swapOutClass(elem, toAdd, toRemove);
}

String.prototype.toCapitalCase = function () {
    "use strict";
    return this.replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
    });
};

String.prototype.toLocaleCapitalCase = function () {
    "use strict";
    return this.replace(/(?:^|\s)\S/g, function (a) {
        return a.toLocaleUpperCase();
    });
};

$(document).ready(function () {
    'use strict';
    var elem;

    translate = function (fromLoc, fromText, toLoc, onTranslate) {
        var ERR_OK = 200,
            ERR_KEY_INVALID = 401,
            ERR_KEY_BLOCKED = 402,
            ERR_DAILY_REQ_LIMIT_EXCEEDED = 403,
            ERR_DAILY_CHAR_LIMIT_EXCEEDED = 404,
            ERR_TEXT_TOO_LONG = 413,
            ERR_UNPROCESSABLE_TEXT = 422,
            ERR_LANG_NOT_SUPPORTED = 501,
            errCodes = {
                200: 'Operation completed successfully.',
                401: 'Invalid API key.',
                402: 'This API key has been blocked.',
                403: 'You have reached the daily limit for requests (including calls of the detect method).',
                404: 'You have reached the daily limit for the volume of translated text (including calls of the detect method).',
                413: 'The text size exceeds the maximum.',
                422: 'The text could not be translated.',
                501: 'The specified translation direction is not supported.'
            };

        var jqxhr = $.getJSON("https://translate.yandex.net/api/v1.5/tr.json/translate", {
                key: YANDEX_TRANSLATOR_KEY,
                lang: fromLoc + '-' + toLoc,
                text: fromText
            },
            function (json) {
                var sample = {
                    code: 200,
                    lang: "en-ru",
                    text: [
                        "Быть или не быть?",
                        "Вот в чем вопрос."
                    ]
                };

                if (json.code === ERR_OK) {
                    onTranslate(json.text.join("\n"));
                }
                else {
                    window.console.log("Yandex API: " + json.code + ': ' + errCodes[json.code] + "\n");
                }
            });

        jqxhr.done(function () {
        });

        jqxhr.fail(function () {
        });
    };

    function validateXEdit(value) {
        // check for open or mismatched quotes in href=  and src=, attributes if any
        var regex = /\b(href=|src=)\s*("|')?([^"'>]*)("|')?/;
        var regexErr = /:string/g;
        var message = MISSMATCHED_QUOTES_MESSAGE || "mismatched or missing quotes in :string attribute";
        var messages = [];
        var offs = 0, pos;
        var matches, val = value, maxlen = value.length;
        var elemDivErr;

        while (offs < maxlen && (pos = val.indexOf('href=', offs)) !== -1 || (pos = val.indexOf('src=', offs)) !== -1) {
            offs = pos;
            val = val.substr(offs > 0 ? offs - 1 : 0);
            matches = val.match(regex);
            if (!matches) {
                break;
            }
            // see if any are missmatched or missing
            if (matches[2] === undefined || matches[2] !== matches[4]) {
                messages.push(message.replace(regexErr, matches[0]));
            }
            offs += matches[0].length;
        }
        if (messages.length) {
            elemDivErr = $(".editableform .editable-error-block");
            if (elemDivErr.length) {
                window.setTimeout(function () {
                    elemDivErr.html(val);
                }, 50);
            }
            val = "<ul><li>" + messages.join('</li><li>') + "</li></ul>";
            return " ";
        }
    }

    $.fn.editableContainer.defaults.placement = 'top';
    $.fn.editableContainer.defaults.onblur = 'submit';
    $.fn.editableContainer.defaults.validate = function (value) {
        return validateXEdit(value);
    };
    $.fn.editableform.template = '' +
        '<form class="form-inline editableform">' +
        '<div class="control-group">' +
        '<div><div class="editable-buttons"></div><br><br><div id="x-trans-edit" class="editable-input"></div></div>' +
        '<div class="editable-error-block"></div>' +
        '</div>' +
        '</form>';

    $.fn.editableform.buttons = '' +
        '<button type="submit" class="editable-submit btn btn-sm btn-success"><i class="glyphicon glyphicon-ok"></i></button>' +
        '&nbsp;<button type="button" class="editable-cancel btn btn-sm btn-danger"><i class="glyphicon glyphicon-remove"></i></button>' +
        '&nbsp;&nbsp;<button id="x-translate" type="button" class="editable-translate btn btn-sm btn-warning hidden"><i class="glyphicon glyphicon-share-alt"></i></button>' +
        '<button id="x-nodash" type="button" class="editable-translate btn btn-sm btn-warning hidden">⚛➦Ab</button>' +
        '&nbsp;&nbsp;<button id="x-plurals" type="button" class="editable-translate btn btn-sm btn-warning">|</i></button>' +
        '&nbsp;&nbsp;<button id="x-capitalize" type="button" class="editable-translate btn btn-sm btn-info">ab➦Ab</button>' +
        '<button id="x-lowercase" type="button" class="editable-translate btn btn-sm btn-info">AB➦ab</button>' +
        '&nbsp;&nbsp;<button id="x-copy" type="button" class="editable-translate btn btn-sm btn-primary"><i class="glyphicon glyphicon-copy"></i></button>' +
        '<button id="x-paste" type="button" class="editable-translate btn btn-sm btn-primary"><i class="glyphicon glyphicon-paste"></i></button>' +
        '&nbsp;&nbsp;<button id="x-reset-open" type="button" class="editable-translate btn btn-sm btn-success"><i class="glyphicon glyphicon-open"></i></button>' +
        '<button id="x-reset-saved" type="button" class="editable-translate btn btn-sm btn-success"><i class="glyphicon glyphicon-floppy-open"></i></button>' +
        '';

    function textAreaSelectedText(elemTextArea) {
        var selectedText;
        // IE version
        if (document.selection !== undefined) {
            elemTextArea.focus();
            var sel = document.selection.createRange();
            selectedText = sel.text;
            return selectedText;
        }
        // Mozilla version
        else {
            if (elemTextArea.selectionStart !== undefined) {
                var startPos = elemTextArea.selectionStart;
                var endPos = elemTextArea.selectionEnd;
                selectedText = elemTextArea.value.substring(startPos, endPos);
                return selectedText;
            }
        }
    }

    function startsWithWord2(word1, word2, prefix) {
        return word2.toLocaleLowerCase().indexOf(prefix) === 0 && word1.toLocaleLowerCase().indexOf(prefix) !== 0;
    }

    function extractSecondWord(text) {
        var word1, word2, pos = text.indexOf(' ');

        if (pos !== -1) {
            word1 = text.substr(0, pos);
            word2 = text.substr(pos + 1);
            if (startsWithWord2(word1, word2, 'од') || startsWithWord2(word1, word2, 'дв') || startsWithWord2(word1, word2, 'пя')) {
                text = word1;
            } else {
                text = word2;
            }
        }
        return text;
    }

    function extractPluralForm(pluralForms, index) {
        if (pluralForms.length > index) {
            return extractSecondWord(pluralForms[index]);
        }
        return '';
    }

    var srcText, srcLoc, dstLoc, dstElem, elemRow, inEditable = 0,
        xtranslate = function (srcLoc, srcText, dstLoc, dstElem, errElem) {
            return function () {
                var pos, single, plural, havePlural, src = srcText;
                if ((pos = srcText.indexOf('|')) !== -1) {
                    // have pluralization
                    single = srcText.substr(0, pos);
                    plural = srcText.substr(pos + 1);
                    src = 'one ' + single + '\ntwo ' + plural + '\nfive ' + plural;
                    havePlural = true;
                }
                translate(srcLoc, src, dstLoc, function (text) {
                    var single, plural, plural2, pluralForms, result = text;
                    if (havePlural) {
                        var trans = text.replace(/$\s*/mg, '|');
                        if (trans.substr(trans.length - 1, 1) === '|') {
                            trans = trans.substr(0, trans.length - 1);
                        }
                        errElem.html(trans);
                        errElem.css('display', 'block');
                        //errElem.css('max-width', '1000px');
                        pluralForms = result.split('\n', 3);
                        single = extractPluralForm(pluralForms, 0);
                        plural = extractPluralForm(pluralForms, 1);
                        plural2 = extractPluralForm(pluralForms, 2);
                        result = single + '|' + plural + '|' + plural2;
                    }
                    dstElem.val(result);
                    dstElem.focus();
                });
            };
        },
        xedit = function (dstElem, editOp, params) {
            return function () {
                var sel = textAreaSelectedText(dstElem[0]);
                if (sel) {
                    dstElem.selection('replace', {text: editOp.apply(sel, params)});
                }
                else {
                    dstElem.val(editOp.apply(dstElem.val(), params));
                }
                dstElem.focus();
            };
        },
        xeditplurals = function (dstElem, editOp, params) {
            return function () {
                var sel = textAreaSelectedText(dstElem[0]);
                if (sel) {
                    dstElem.selection('replace', {text: editOp.apply(sel, params)});
                }
                else {
                    var pluralForms;

                    if (dstElem.val().indexOf('|') !== -1) {
                        pluralForms = dstElem.val().split('|');
                        pluralForms.forEach(function (val, index, arr) {
                            arr[index] = editOp.apply(val, params);
                        });

                        dstElem.val(pluralForms.join('|'));
                    }
                    else {
                        dstElem.val(editOp.apply(dstElem.val(), params));
                    }
                }
                dstElem.focus();
            };
        },
        xfull = function (dstElem, editOp, params) {
            return function () {
                dstElem.val(editOp.apply(dstElem.val(), params));
                dstElem.focus();
            };
        };

    $.fn.vsch_editable = function (options) {
        var defaults = {},
            settings = $.extend({}, defaults, options);

        this.each(function () {
            var elem = $(this);

            if (elem.offset().top < 300) {
                elem.editable({placement: 'bottom'});
            }
            else {
                elem.editable({placement: 'top'});
            }

            elem.editable().on('hidden', function (e, reason) {
                var locale = $(this).data('locale');
                if (reason === 'save') {
                    $(this).removeClass('status-0').addClass('status-1');
                }
                if (reason === 'save' || reason === 'nochange') {
                }

                if (!--inEditable) {
                    $(".editing").removeClass('editing');
                }

                //window.console.log("editable hidden: " + inEditable);
            });

            elem.editable().on('shown', function (e, editable) {
                var key, srcId, elemXerr, elemXtrans, elemXcap, elemXlow, elemXnodash, elemXcopy, elemXpaste, elemXresetopen, elemXresetsaved, elemXplurals, srcElem,
                    savedValue = $(this).data('saved_value'), openedValue,
                    dstId = $(this).attr('id'),
                    regexnodash = /-|_/g,
                    value;

                dstLoc = $(this).data('locale');
                srcLoc = dstLoc === 'en' ? '' : 'en';

                inEditable++;
                //window.console.log("editable shown: " + inEditable);

                srcId = srcLoc + dstId.substr(dstLoc.length);
                key = dstId.substr(dstLoc.length + 1);
                elemRow = $('tr#' + key.replace(/\./, '-')).first();
                value = key.replace(regexnodash, ' ').toCapitalCase();

                var divElem = $(this).find('+ div.editable-container');

                dstElem = divElem.find('#x-trans-edit').first().find('textarea.editable-input').first();
                elemXerr = divElem.find('.editable-error-block').first();
                elemXtrans = divElem.find('#x-translate').first();
                elemXcap = divElem.find('#x-capitalize').first();
                elemXlow = divElem.find('#x-lowercase').first();
                elemXnodash = divElem.find('#x-nodash').first();
                elemXcopy = divElem.find('#x-copy').first();
                elemXpaste = divElem.find('#x-paste').first();
                elemXresetopen = divElem.find('#x-reset-open').first();
                elemXresetsaved = divElem.find('#x-reset-saved').first();
                elemXplurals = divElem.find('#x-plurals').first();
                openedValue = dstElem.val().trim();
                dstElem.val(openedValue);

                if (elemRow.length) {
                    $(".editing").removeClass('editing');
                    elemRow.addClass('editing');
                }

                if (elemXtrans.length && dstElem.length) {
                    if (srcLoc !== '') {
                        srcElem = elemRow.find('#' + srcId.replace(/\./, '-')).first();
                        if (srcElem.length) {
                            srcText = srcElem.text();

                            elemXtrans.html(srcLoc + ' <i class="glyphicon glyphicon-share-alt"></i> ' + dstLoc);
                            elemXtrans.removeClass('hidden');
                            elemXtrans.on('click', xtranslate(srcLoc, srcText, dstLoc, dstElem, elemXerr));
                        }
                    }
                }
                if (elemXnodash.length && dstLoc === 'en') {
                    elemXnodash.removeClass('hidden');
                    elemXnodash.on('click', xfull(dstElem, function () {
                        return value;
                    }));
                }
                if (elemXcap.length) {
                    elemXcap.on('click', xeditplurals(dstElem, String.prototype.toLocaleCapitalCase));
                }
                if (elemXlow.length) {
                    elemXlow.on('click', xedit(dstElem, String.prototype.toLocaleLowerCase));
                }
                if (elemXcopy.length) {
                    elemXcopy.on('click', xedit(dstElem, function () {
                        CLIP_TEXT = this;
                        return this;
                    }));
                }
                if (elemXpaste.length) {
                    elemXpaste.on('click', xedit(dstElem, function () {
                        return CLIP_TEXT;
                    }));
                }
                if (elemXresetopen.length) {
                    elemXresetopen.on('click', xfull(dstElem, function () {
                        return openedValue;
                    }));
                }
                if (elemXresetsaved.length) {
                    elemXresetsaved.on('click', xfull(dstElem, function () {
                        return savedValue;
                    }));
                }
                if (elemXplurals.length) {
                    elemXplurals.on('click', xfull(dstElem, function () {
                        var val;
                        if (dstLoc === 'ru') {
                            val = this + '|' + this + '|' + this;
                        }
                        else {
                            if (this === '') {
                                val = value.singularize() + '|' + value.pluralize();
                            }
                            else {
                                val = this.singularize() + '|' + this.pluralize();
                            }
                        }
                        return val.toLocaleLowerCase();
                    }));
                }
            });
        });
    };

    $('.vsch_editable').vsch_editable();

})
;