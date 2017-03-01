'use strict';
/*===========================
Framework 7
===========================*/
window.Framework7 = function (params) {
    // App
    var app = this;

    // Version
    app.version = '1.4.2';

    // Default Parameters
    app.params = {
        cache: true,
        cacheIgnore: [],
        cacheIgnoreGetParameters: false,
        cacheDuration: 1000 * 60 * 10, // Ten minutes
        preloadPreviousPage: true,
        uniqueHistory: false,
        uniqueHistoryIgnoreGetParameters: false,
        dynamicPageUrl: 'content-{{index}}',
        allowDuplicateUrls: false,
        router: true,
        // Push State
        pushState: false,
        pushStateRoot: undefined,
        pushStateNoAnimation: false,
        pushStateSeparator: '#!/',
        pushStateOnLoad: true,
        // Fast clicks
        fastClicks: true,
        fastClicksDistanceThreshold: 10,
        fastClicksDelayBetweenClicks: 50,
        // Tap Hold
        tapHold: false,
        tapHoldDelay: 750,
        tapHoldPreventClicks: true,
        // Active State
        activeState: true,
        activeStateElements: 'a, button, label, span',
        // Animate Nav Back Icon
        animateNavBackIcon: false,
        // Swipe Back
        swipeBackPage: true,
        swipeBackPageThreshold: 0,
        swipeBackPageActiveArea: 30,
        swipeBackPageAnimateShadow: true,
        swipeBackPageAnimateOpacity: true,
        // Ajax
        ajaxLinks: undefined, // or CSS selector
        // External Links
        externalLinks: '.external', // CSS selector
        // Sortable
        sortable: true,
        // Scroll toolbars
        hideNavbarOnPageScroll: false,
        hideToolbarOnPageScroll: false,
        hideTabbarOnPageScroll: false,
        showBarsOnPageScrollEnd: true,
        showBarsOnPageScrollTop: true,
        // Swipeout
        swipeout: true,
        swipeoutActionsNoFold: false,
        swipeoutNoFollow: false,
        // Smart Select Back link template
        smartSelectOpenIn: 'page', // or 'popup' or 'picker'
        smartSelectBackText: 'Back',
        smartSelectPopupCloseText: 'Close',
        smartSelectPickerCloseText: 'Done',
        smartSelectSearchbar: false,
        smartSelectBackOnSelect: false,
        // Tap Navbar or Statusbar to scroll to top
        scrollTopOnNavbarClick: false,
        scrollTopOnStatusbarClick: false,
        // Panels
        swipePanel: false, // or 'left' or 'right'
        swipePanelActiveArea: 0,
        swipePanelCloseOpposite: true,
        swipePanelOnlyClose: false,
        swipePanelNoFollow: false,
        swipePanelThreshold: 0,
        panelsCloseByOutside: true,
        // Modals
        modalButtonOk: 'OK',
        modalButtonCancel: 'Cancel',
        modalUsernamePlaceholder: 'Username',
        modalPasswordPlaceholder: 'Password',
        modalTitle: 'Framework7',
        modalCloseByOutside: false,
        actionsCloseByOutside: true,
        popupCloseByOutside: true,
        modalPreloaderTitle: 'Loading... ',
        modalStack: true,
        // Lazy Load
        imagesLazyLoadThreshold: 0,
        imagesLazyLoadSequential: true,
        // Name space
        viewClass: 'view',
        viewMainClass: 'view-main',
        viewsClass: 'views',
        // Notifications defaults
        notificationCloseOnClick: false,
        notificationCloseIcon: true,
        notificationCloseButtonText: 'Close',
        // Animate Pages
        animatePages: true,
        // Template7
        templates: {},
        template7Data: {},
        template7Pages: false,
        precompileTemplates: false,
        // Material
        material: false,
        materialPageLoadDelay: 0,
        materialPreloaderSvg: '<svg xmlns="http://www.w3.org/2000/svg" height="75" width="75" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg>',
        materialPreloaderHtml:
            '<span class="preloader-inner">' +
                '<span class="preloader-inner-gap"></span>' +
                '<span class="preloader-inner-left">' +
                    '<span class="preloader-inner-half-circle"></span>' +
                '</span>' +
                '<span class="preloader-inner-right">' +
                    '<span class="preloader-inner-half-circle"></span>' +
                '</span>' +
            '</span>',
        materialRipple: true,
        materialRippleElements: '.ripple, a.link, a.item-link, .button, .modal-button, .tab-link, .label-radio, .label-checkbox, .actions-modal-button, a.searchbar-clear, a.floating-button, .floating-button > a, .speed-dial-buttons a',
        // Auto init
        init: true,
    };

    // Extend defaults with parameters
    for (var param in params) {
        app.params[param] = params[param];
    }

    // DOM lib
    var $ = Dom7;

    // Template7 lib
    var t7 = Template7;
    app._compiledTemplates = {};

    // Touch events
    app.touchEvents = {
        start: app.support.touch ? 'touchstart' : 'mousedown',
        move: app.support.touch ? 'touchmove' : 'mousemove',
        end: app.support.touch ? 'touchend' : 'mouseup'
    };

    // Link to local storage
    app.ls = window.localStorage;

    // RTL
    app.rtl = $('body').css('direction') === 'rtl';
    if (app.rtl) $('html').attr('dir', 'rtl');

    // Overwrite statusbar overlay
    if (typeof app.params.statusbarOverlay !== 'undefined') {
        if (app.params.statusbarOverlay) $('html').addClass('with-statusbar-overlay');
        else $('html').removeClass('with-statusbar-overlay');
    }
/*===========================
Compile Template7 Templates On App Init
===========================*/
app.initTemplate7Templates = function () {
    if (!window.Template7) return;
    Template7.templates = Template7.templates || app.params.templates || {};
    Template7.data = Template7.data || app.params.template7Data || {};
    Template7.cache = Template7.cache || {};

    app.templates = Template7.templates;
    app.template7Data = Template7.data;
    app.template7Cache = Template7.cache;

    // Precompile templates on app init
    if (!app.params.precompileTemplates) return;
    $('script[type="text/template7"]').each(function () {
        var id = $(this).attr('id');
        if (!id) return;
        Template7.templates[id] = Template7.compile($(this).html());
    });
};

/*===========================
Template7 Template engine
===========================*/
window.Template7 = (function () {
    function isArray(arr) {
        return Object.prototype.toString.apply(arr) === '[object Array]';
    }
    function isObject(obj) {
        return obj instanceof Object;
    }
    function isFunction(func) {
        return typeof func === 'function';
    }
    var cache = {};
    function helperToSlices(string) {
        var helperParts = string.replace(/[{}#}]/g, '').split(' ');
        var slices = [];
        var shiftIndex, i, j;
        for (i = 0; i < helperParts.length; i++) {
            var part = helperParts[i];
            if (i === 0) slices.push(part);
            else {
                if (part.indexOf('"') === 0) {
                    // Plain String
                    if (part.match(/"/g).length === 2) {
                        // One word string
                        slices.push(part);
                    }
                    else {
                        // Find closed Index
                        shiftIndex = 0;
                        for (j = i + 1; j < helperParts.length; j++) {
                            part += ' ' + helperParts[j];
                            if (helperParts[j].indexOf('"') >= 0) {
                                shiftIndex = j;
                                slices.push(part);
                                break;
                            }
                        }
                        if (shiftIndex) i = shiftIndex;
                    }
                }
                else {
                    if (part.indexOf('=') > 0) {
                        // Hash
                        var hashParts = part.split('=');
                        var hashName = hashParts[0];
                        var hashContent = hashParts[1];
                        if (hashContent.match(/"/g).length !== 2) {
                            shiftIndex = 0;
                            for (j = i + 1; j < helperParts.length; j++) {
                                hashContent += ' ' + helperParts[j];
                                if (helperParts[j].indexOf('"') >= 0) {
                                    shiftIndex = j;
                                    break;
                                }
                            }
                            if (shiftIndex) i = shiftIndex;
                        }
                        var hash = [hashName, hashContent.replace(/"/g,'')];
                        slices.push(hash);
                    }
                    else {
                        // Plain variable
                        slices.push(part);
                    }
                }
            }
        }
        return slices;
    }
    function stringToBlocks(string) {
        var blocks = [], i, j, k;
        if (!string) return [];
        var _blocks = string.split(/({{[^{^}]*}})/);
        for (i = 0; i < _blocks.length; i++) {
            var block = _blocks[i];
            if (block === '') continue;
            if (block.indexOf('{{') < 0) {
                blocks.push({
                    type: 'plain',
                    content: block
                });
            }
            else {
                if (block.indexOf('{/') >= 0) {
                    continue;
                }
                if (block.indexOf('{#') < 0 && block.indexOf(' ') < 0 && block.indexOf('else') < 0) {
                    // Simple variable
                    blocks.push({
                        type: 'variable',
                        contextName: block.replace(/[{}]/g, '')
                    });
                    continue;
                }
                // Helpers
                var helperSlices = helperToSlices(block);
                var helperName = helperSlices[0];
                var isPartial = helperName === '>';
                var helperContext = [];
                var helperHash = {};
                for (j = 1; j < helperSlices.length; j++) {
                    var slice = helperSlices[j];
                    if (isArray(slice)) {
                        // Hash
                        helperHash[slice[0]] = slice[1] === 'false' ? false : slice[1];
                    }
                    else {
                        helperContext.push(slice);
                    }
                }
                
                if (block.indexOf('{#') >= 0) {
                    // Condition/Helper
                    var helperStartIndex = i;
                    var helperContent = '';
                    var elseContent = '';
                    var toSkip = 0;
                    var shiftIndex;
                    var foundClosed = false, foundElse = false, foundClosedElse = false, depth = 0;
                    for (j = i + 1; j < _blocks.length; j++) {
                        if (_blocks[j].indexOf('{{#') >= 0) {
                            depth ++;
                        }
                        if (_blocks[j].indexOf('{{/') >= 0) {
                            depth --;
                        }
                        if (_blocks[j].indexOf('{{#' + helperName) >= 0) {
                            helperContent += _blocks[j];
                            if (foundElse) elseContent += _blocks[j];
                            toSkip ++;
                        }
                        else if (_blocks[j].indexOf('{{/' + helperName) >= 0) {
                            if (toSkip > 0) {
                                toSkip--;
                                helperContent += _blocks[j];
                                if (foundElse) elseContent += _blocks[j];
                            }
                            else {
                                shiftIndex = j;
                                foundClosed = true;
                                break;
                            }
                        }
                        else if (_blocks[j].indexOf('else') >= 0 && depth === 0) {
                            foundElse = true;
                        }
                        else {
                            if (!foundElse) helperContent += _blocks[j];
                            if (foundElse) elseContent += _blocks[j];
                        }

                    }
                    if (foundClosed) {
                        if (shiftIndex) i = shiftIndex;
                        blocks.push({
                            type: 'helper',
                            helperName: helperName,
                            contextName: helperContext,
                            content: helperContent,
                            inverseContent: elseContent,
                            hash: helperHash
                        });
                    }
                }
                else if (block.indexOf(' ') > 0) {
                    if (isPartial) {
                        helperName = '_partial';
                        if (helperContext[0]) helperContext[0] = '"' + helperContext[0].replace(/"|'/g, '') + '"';
                    }
                    blocks.push({
                        type: 'helper',
                        helperName: helperName,
                        contextName: helperContext,
                        hash: helperHash
                    });
                }
            }
        }
        return blocks;
    }
    var Template7 = function (template) {
        var t = this;
        t.template = template;
        
        function getCompileFn(block, depth) {
            if (block.content) return compile(block.content, depth);
            else return function () {return ''; };
        }
        function getCompileInverse(block, depth) {
            if (block.inverseContent) return compile(block.inverseContent, depth);
            else return function () {return ''; };
        }
        function getCompileVar(name, ctx) {
            var variable, parts, levelsUp = 0, initialCtx = ctx;
            if (name.indexOf('../') === 0) {
                levelsUp = name.split('../').length - 1;
                var newDepth = ctx.split('_')[1] - levelsUp;
                ctx = 'ctx_' + (newDepth >= 1 ? newDepth : 1);
                parts = name.split('../')[levelsUp].split('.');
            }
            else if (name.indexOf('@global') === 0) {
                ctx = 'Template7.global';
                parts = name.split('@global.')[1].split('.');
            }
            else if (name.indexOf('@root') === 0) {
                ctx = 'root';
                parts = name.split('@root.')[1].split('.');
            }
            else {
                parts = name.split('.');
            }
            variable = ctx;
            for (var i = 0; i < parts.length; i++) {
                var part = parts[i];
                if (part.indexOf('@') === 0) {
                    if (i > 0) {
                        variable += '[(data && data.' + part.replace('@', '') + ')]';
                    }
                    else {
                        variable = '(data && data.' + name.replace('@', '') + ')';
                    }
                }
                else {
                    if (isFinite(part)) {
                        variable += '[' + part + ']';
                    }
                    else {
                        if (part.indexOf('this') === 0) {
                            variable = part.replace('this', ctx);
                        }
                        else {
                            variable += '.' + part;       
                        }
                    }
                }
            }

            return variable;
        }
        function getCompiledArguments(contextArray, ctx) {
            var arr = [];
            for (var i = 0; i < contextArray.length; i++) {
                if (contextArray[i].indexOf('"') === 0) arr.push(contextArray[i]);
                else {
                    arr.push(getCompileVar(contextArray[i], ctx));
                }
            }

            return arr.join(', ');
        }
        function compile(template, depth) {
            depth = depth || 1;
            template = template || t.template;
            if (typeof template !== 'string') {
                throw new Error('Template7: Template must be a string');
            }
            var blocks = stringToBlocks(template);
            if (blocks.length === 0) {
                return function () { return ''; };
            }
            var ctx = 'ctx_' + depth;
            var resultString = '';
            if (depth === 1) {
                resultString += '(function (' + ctx + ', data, root) {\n';
            }
            else {
                resultString += '(function (' + ctx + ', data) {\n';
            }
            if (depth === 1) {
                resultString += 'function isArray(arr){return Object.prototype.toString.apply(arr) === \'[object Array]\';}\n';
                resultString += 'function isFunction(func){return (typeof func === \'function\');}\n';
                resultString += 'function c(val, ctx) {if (typeof val !== "undefined" && val !== null) {if (isFunction(val)) {return val.call(ctx);} else return val;} else return "";}\n';
                resultString += 'root = root || ctx_1 || {};\n';
            }
            resultString += 'var r = \'\';\n';
            var i, j, context;
            for (i = 0; i < blocks.length; i++) {
                var block = blocks[i];
                // Plain block
                if (block.type === 'plain') {
                    resultString += 'r +=\'' + (block.content).replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/'/g, '\\' + '\'') + '\';';
                    continue;
                }
                var variable, compiledArguments;
                // Variable block
                if (block.type === 'variable') {
                    variable = getCompileVar(block.contextName, ctx);
                    resultString += 'r += c(' + variable + ', ' + ctx + ');';
                }
                // Helpers block
                if (block.type === 'helper') {
                    if (block.helperName in t.helpers) {
                        compiledArguments = getCompiledArguments(block.contextName, ctx);
                        
                        resultString += 'r += (Template7.helpers.' + block.helperName + ').call(' + ctx + ', ' + (compiledArguments && (compiledArguments + ', ')) +'{hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth + 1) + ', inverse: ' + getCompileInverse(block, depth + 1) + ', root: root});';
                        
                    }
                    else {
                        if (block.contextName.length > 0) {
                            throw new Error('Template7: Missing helper: "' + block.helperName + '"');
                        }
                        else {
                            variable = getCompileVar(block.helperName, ctx);
                            resultString += 'if (' + variable + ') {';
                            resultString += 'if (isArray(' + variable + ')) {';
                            resultString += 'r += (Template7.helpers.each).call(' + ctx + ', ' + variable + ', {hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth+1) + ', inverse: ' + getCompileInverse(block, depth+1) + ', root: root});';
                            resultString += '}else {';
                            resultString += 'r += (Template7.helpers.with).call(' + ctx + ', ' + variable + ', {hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth+1) + ', inverse: ' + getCompileInverse(block, depth+1) + ', root: root});';
                            resultString += '}}';
                        }
                    }
                }
            }
            resultString += '\nreturn r;})';
            return eval.call(window, resultString);
        }
        t.compile = function (template) {
            if (!t.compiled) {
                t.compiled = compile(template);
            }
            return t.compiled;
        };
    };
    Template7.prototype = {
        options: {},
        partials: {},
        helpers: {
            '_partial' : function (partialName, options) {
                var p = Template7.prototype.partials[partialName];
                if (!p || (p && !p.template)) return '';
                if (!p.compiled) {
                    p.compiled = t7.compile(p.template);
                }
                var ctx = this;
                for (var hashName in options.hash) {
                    ctx[hashName] = options.hash[hashName];
                }
                return p.compiled(ctx, options.data, options.root);
            },
            'escape': function (context, options) {
                if (typeof context !== 'string') {
                    throw new Error('Template7: Passed context to "escape" helper should be a string');
                }
                return context
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;');
            },
            'if': function (context, options) {
                if (isFunction(context)) { context = context.call(this); }
                if (context) {
                    return options.fn(this, options.data);
                }
                else {
                    return options.inverse(this, options.data);
                }
            },
            'unless': function (context, options) {
                if (isFunction(context)) { context = context.call(this); }
                if (!context) {
                    return options.fn(this, options.data);
                }
                else {
                    return options.inverse(this, options.data);
                }
            },
            'each': function (context, options) {
                var ret = '', i = 0;
                if (isFunction(context)) { context = context.call(this); }
                if (isArray(context)) {
                    if (options.hash.reverse) {
                        context = context.reverse();
                    }
                    for (i = 0; i < context.length; i++) {
                        ret += options.fn(context[i], {first: i === 0, last: i === context.length - 1, index: i});
                    }
                    if (options.hash.reverse) {
                        context = context.reverse();
                    }
                }
                else {
                    for (var key in context) {
                        i++;
                        ret += options.fn(context[key], {key: key});
                    }
                }
                if (i > 0) return ret;
                else return options.inverse(this);
            },
            'with': function (context, options) {
                if (isFunction(context)) { context = context.call(this); }
                return options.fn(context);
            },
            'join': function (context, options) {
                if (isFunction(context)) { context = context.call(this); }
                return context.join(options.hash.delimiter || options.hash.delimeter);
            },
            'js': function (expression, options) {
                var func;
                if (expression.indexOf('return')>=0) {
                    func = '(function(){'+expression+'})';
                }
                else {
                    func = '(function(){return ('+expression+')})';
                }
                return eval.call(this, func).call(this);
            },
            'js_compare': function (expression, options) {
                var func;
                if (expression.indexOf('return')>=0) {
                    func = '(function(){'+expression+'})';
                }
                else {
                    func = '(function(){return ('+expression+')})';
                }
                var condition = eval.call(this, func).call(this);
                if (condition) {
                    return options.fn(this, options.data);
                }
                else {
                    return options.inverse(this, options.data);   
                }
            }
        }
    };
    var t7 = function (template, data) {
        if (arguments.length === 2) {
            var instance = new Template7(template);
            var rendered = instance.compile()(data);
            instance = null;
            return (rendered);
        }
        else return new Template7(template);
    };
    t7.registerHelper = function (name, fn) {
        Template7.prototype.helpers[name] = fn;
    };
    t7.unregisterHelper = function (name) {
        Template7.prototype.helpers[name] = undefined;  
        delete Template7.prototype.helpers[name];
    };
    t7.registerPartial = function (name, template) {
        Template7.prototype.partials[name] = {template: template};
    };
    t7.unregisterPartial = function (name, template) {
        if (Template7.prototype.partials[name]) {
            Template7.prototype.partials[name] = undefined;
            delete Template7.prototype.partials[name];
        }
    };
    
    t7.compile = function (template, options) {
        var instance = new Template7(template, options);
        return instance.compile();
    };
    
    t7.options = Template7.prototype.options;
    t7.helpers = Template7.prototype.helpers;
    t7.partials = Template7.prototype.partials;
    return t7;
})();
/*===========================
Dom7 Library
===========================*/
var Dom7 = (function () {
    var Dom7 = function (arr) {
        var _this = this, i = 0;
        // Create array-like object
        for (i = 0; i < arr.length; i++) {
            _this[i] = arr[i];
        }
        _this.length = arr.length;
        // Return collection with methods
        return this;
    };
    var $ = function (selector, context) {
        var arr = [], i = 0;
        if (selector && !context) {
            if (selector instanceof Dom7) {
                return selector;
            }
        }
        if (selector) {
            // String
            if (typeof selector === 'string') {
                var els, tempParent, html;
                selector = html = selector.trim();
                if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
                    var toCreate = 'div';
                    if (html.indexOf('<li') === 0) toCreate = 'ul';
                    if (html.indexOf('<tr') === 0) toCreate = 'tbody';
                    if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
                    if (html.indexOf('<tbody') === 0) toCreate = 'table';
                    if (html.indexOf('<option') === 0) toCreate = 'select';
                    tempParent = document.createElement(toCreate);
                    tempParent.innerHTML = html;
                    for (i = 0; i < tempParent.childNodes.length; i++) {
                        arr.push(tempParent.childNodes[i]);
                    }
                }
                else {
                    if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
                        // Pure ID selector
                        els = [document.getElementById(selector.split('#')[1])];
                    }
                    else {
                        // Other selectors
                        els = (context || document).querySelectorAll(selector);
                    }
                    for (i = 0; i < els.length; i++) {
                        if (els[i]) arr.push(els[i]);
                    }
                }
            }
            // Node/element
            else if (selector.nodeType || selector === window || selector === document) {
                arr.push(selector);
            }
            //Array of elements or instance of Dom
            else if (selector.length > 0 && selector[0].nodeType) {
                for (i = 0; i < selector.length; i++) {
                    arr.push(selector[i]);
                }
            }
        }
        return new Dom7(arr);
    };

    
    
    return $;
})();

// Export Dom7 to Framework7
Framework7.$ = Dom7;

// Export to local scope
var $ = Dom7;

// Export to Window
window.Dom7 = Dom7;

/*======================================================
************   Messages   ************
======================================================*/
var Messages = function (container, params) {
    var defaults = {
        autoLayout: true,
        newMessagesFirst: false,
        messageTemplate: 
            '{{#if day}}' +
            '<div class="messages-date">{{day}} {{#if time}}, <span>{{time}}</span>{{/if}}</div>' +
            '{{/if}}' +
            '<div class="message message-{{type}} {{#if hasImage}}message-pic{{/if}} {{#if avatar}}message-with-avatar{{/if}} {{#if position}}message-appear-from-{{position}}{{/if}}">' +
                '{{#if name}}<div class="message-name">{{name}}</div>{{/if}}' +
                '<div class="message-text">{{text}}{{#if date}}<div class="message-date">{{date}}</div>{{/if}}</div>' +
                '{{#if avatar}}<div class="message-avatar" style="background-image:url({{avatar}})"></div>{{/if}}' +
                '{{#if label}}<div class="message-label">{{label}}</div>{{/if}}' +
            '</div>'
    };
    params = params || {};
    for (var def in defaults) {
        if (typeof params[def] === 'undefined' || params[def] === null) {
            params[def] = defaults[def];
        }
    }

    // Instance
    var m = this;

    // Params
    m.params = params;

    // Container
    m.container = $(container);
    if (m.container.length === 0) return;

    // Autolayout
    if (m.params.autoLayout) m.container.addClass('messages-auto-layout');

    // New messages first
    if (m.params.newMessagesFirst) m.container.addClass('messages-new-first');

    // Is In Page
    m.pageContainer = m.container.parents('.page').eq(0);
    m.pageContent = m.pageContainer.find('.page-content');

    // Compiled template
    m.template = Template7.compile(m.params.messageTemplate);

    // Auto Layout
    m.layout = function () {
        if (!m.container.hasClass('messages-auto-layout')) m.container.addClass('messages-auto-layout');
        m.container.find('.message').each(function () {
            var message = $(this);
            if (message.find('.message-text img').length > 0) message.addClass('message-pic');
            if (message.find('.message-avatar').length > 0) message.addClass('message-with-avatar');
        });
        m.container.find('.message').each(function () {
            var message = $(this);
            var isSent = message.hasClass('message-sent');
            var next = message.next('.message-' + (isSent ? 'sent' : 'received'));
            var prev = message.prev('.message-' + (isSent ? 'sent' : 'received'));
            if (next.length === 0) {
                message.addClass('message-last message-with-tail');
            }
            else message.removeClass('message-last message-with-tail');

            if (prev.length === 0) {
                message.addClass('message-first');
            }
            else message.removeClass('message-first');

            if (prev.length > 0 && prev.find('.message-name').length > 0 && message.find('.message-name').length > 0) {
                if (prev.find('.message-name').text() !== message.find('.message-name').text()) {
                    prev.addClass('message-last message-with-tail');
                    message.addClass('message-first');
                }
            }
        });
        
    };

    // Add Message
    m.appendMessage = function (props, animate) {
        return m.addMessage(props, 'append', animate);
    };
    m.prependMessage = function (props, animate) {
        return m.addMessage(props, 'prepend', animate);
    };
    m.addMessage = function (props, method, animate) {
        return m.addMessages([props], method, animate);
    };
    m.addMessages = function (newMessages, method, animate) {
        if (typeof animate === 'undefined') {
            animate = true;
        }
        if (typeof method === 'undefined') {
            method = m.params.newMessagesFirst ? 'prepend' : 'append';
        }
        var newMessagesHTML = '', i;
        for (i = 0; i < newMessages.length; i++) {
            var props = newMessages[i] || {};
            props.type = props.type || 'sent';
            if (!props.text) continue;
            props.hasImage = props.text.indexOf('<img') >= 0;
            if (animate) props.position = method === 'append' ? 'bottom' : 'top';

            newMessagesHTML += m.template(props);
        }
        var heightBefore, scrollBefore;
        if (method === 'prepend') {
            heightBefore = m.pageContent[0].scrollHeight;
            scrollBefore = m.pageContent[0].scrollTop;
        }
        m.container[method](newMessagesHTML);
        if (m.params.autoLayout) m.layout();
        if (method === 'prepend') {
            m.pageContent[0].scrollTop = scrollBefore + (m.pageContent[0].scrollHeight - heightBefore);
        }
        if ((method === 'append' && !m.params.newMessagesFirst) || (method === 'prepend' && m.params.newMessagesFirst)) {
            m.scrollMessages(animate ? undefined : 0);
        }
        var messages = m.container.find('.message');
        if (newMessages.length === 1) {
            return method === 'append' ? messages[messages.length - 1] : messages[0];
        }
        else {
            var messagesToReturn = [];
            if (method === 'append') {
                for (i = messages.length - newMessages.length; i < messages.length; i++) {
                    messagesToReturn.push(messages[i]);
                }
            }
            else {
                for (i = 0; i < newMessages.length; i++) {
                    messagesToReturn.push(messages[i]);
                }   
            }
            return messagesToReturn;
        }
        
    };
    m.removeMessage = function (message) {
        message = $(message);
        if (message.length === 0) {
            return false;
        }
        else {
            message.remove();
            if (m.params.autoLayout) m.layout();
            return true;
        }
    };
    m.removeMessages = function (messages) {
        m.removeMessage(messages);
    };
    m.clean = function () {
        m.container.html('');
    };

    // Scroll
    m.scrollMessages = function (duration, scrollTop) {
        if (typeof duration === 'undefined') duration = 400;
        var currentScroll = m.pageContent[0].scrollTop;
        var newScroll;
        if (typeof scrollTop !== 'undefined') newScroll = scrollTop;
        else {
            newScroll = m.params.newMessagesFirst ? 0 : m.pageContent[0].scrollHeight - m.pageContent[0].offsetHeight;
            if (newScroll === currentScroll) return;
        }
        m.pageContent.scrollTop(newScroll, duration);
    };

    // Init Destroy
    m.init = function () {
        if (m.params.messages) {
            m.addMessages(m.params.messages, undefined, false);
        }
        else {
            if (m.params.autoLayout) m.layout();    
            m.scrollMessages(0);
        }
        
    };
    m.destroy = function () {
        m = null;
    };

    // Init
    m.init();

    m.container[0].f7Messages = m;
    return m;
};
app.messages = function (container, params) {
    return new Messages (container, params);
};
app.initPageMessages = function (pageContainer) {
    pageContainer = $(pageContainer);
    var messages = pageContainer.find('.messages');
    if (messages.length === 0) return;
    if (!messages.hasClass('messages-init')) {
        return;
    }
    var m = app.messages(messages, messages.dataset());

    // Destroy on page remove
    function pageBeforeRemove() {
        m.destroy();
        pageContainer.off('pageBeforeRemove', pageBeforeRemove);
    }
    if (pageContainer.hasClass('page')) {
        pageContainer.on('pageBeforeRemove', pageBeforeRemove);
    }
};
/*======================================================
************   Messagebar   ************
======================================================*/
var Messagebar = function (container, params) {
    var defaults = {
        textarea: null,
        maxHeight: null,
    };
    params = params || {};
    for (var def in defaults) {
        if (typeof params[def] === 'undefined' || params[def] === null) {
            params[def] = defaults[def];
        }
    }
    
    // Instance
    var m = this;

    // Params
    m.params = params;

    // Container
    m.container = $(container);
    if (m.container.length === 0) return;

    // Textarea
    m.textarea = m.params.textarea ? $(m.params.textarea) : m.container.find('textarea');

    // Is In Page
    m.pageContainer = m.container.parents('.page').eq(0);
    m.pageContent = m.pageContainer.find('.page-content');

    // Initial Sizes
    m.pageContentPadding = parseInt(m.pageContent.css('padding-bottom'));
    m.initialBarHeight = m.container[0].offsetHeight;
    m.initialAreaHeight = m.textarea[0].offsetHeight;
    

    // Resize textarea
    m.sizeTextarea = function () {
        // Reset
        m.textarea.css({'height': ''});
        
        var height = m.textarea[0].offsetHeight;
        var diff = height - m.textarea[0].clientHeight;
        var scrollHeight = m.textarea[0].scrollHeight;

        // Update
        if (scrollHeight + diff > height) {
            var newAreaHeight = scrollHeight + diff;
            var newBarHeight = m.initialBarHeight + (newAreaHeight - m.initialAreaHeight);
            var maxBarHeight = m.params.maxHeight || m.container.parents('.view')[0].offsetHeight - 88;
            if (newBarHeight > maxBarHeight) {
                newBarHeight = parseInt(maxBarHeight, 10);
                newAreaHeight = newBarHeight - m.initialBarHeight + m.initialAreaHeight;
            }
            m.textarea.css('height', newAreaHeight + 'px');
            m.container.css('height', newBarHeight + 'px');
            var onBottom = (m.pageContent[0].scrollTop === m.pageContent[0].scrollHeight - m.pageContent[0].offsetHeight);
            if (m.pageContent.length > 0) {
                m.pageContent.css('padding-bottom', newBarHeight + 'px');
                if (m.pageContent.find('.messages-new-first').length === 0 && onBottom) {
                    m.pageContent.scrollTop(m.pageContent[0].scrollHeight - m.pageContent[0].offsetHeight);
                }
            }
        }
        else {
            if (m.pageContent.length > 0) {
                m.container.css({'height': '', 'bottom': ''});
                m.pageContent.css({'padding-bottom': ''});
            }
        }
    };
    
    // Clear
    m.clear = function () {
        m.textarea.val('').trigger('change');
    };
    m.value = function (value) {
        if (typeof value === 'undefined') return m.textarea.val();
        else m.textarea.val(value).trigger('change');  
    };
    
    // Handle textarea
    m.textareaTimeout = undefined;
    m.handleTextarea = function (e) {
        clearTimeout(m.textareaTimeout);
        m.textareaTimeout = setTimeout(function () {
            m.sizeTextarea();
        }, 0);
    };

    //Events
    function preventSubmit(e) {
        e.preventDefault();
    }

    m.attachEvents = function (destroy) {
        var method = destroy ? 'off' : 'on';
        m.container[method]('submit', preventSubmit);
        m.textarea[method]('change keydown keypress keyup paste cut', m.handleTextarea);
    };
    m.detachEvents = function () {
        m.attachEvents(true);
    };
    
    // Init Destroy
    m.init = function () {
        m.attachEvents();
    };
    m.destroy = function () {
        m.detachEvents();
        m = null;
    };

    // Init
    m.init();

    m.container[0].f7Messagebar = m;
    return m;
};
app.messagebar = function (container, params) {
    return new Messagebar(container, params);
};
app.initPageMessagebar = function (pageContainer) {
    pageContainer = $(pageContainer);
    var messagebar = pageContainer.hasClass('messagebar') ? pageContainer : pageContainer.find('.messagebar');
    if (messagebar.length === 0) return;
    if (!messagebar.hasClass('messagebar-init')) return;
    var mb = app.messagebar(messagebar, messagebar.dataset());

    // Destroy on page remove
    function pageBeforeRemove() {
        mb.destroy();
        pageContainer.off('pageBeforeRemove', pageBeforeRemove);
    }
    if (pageContainer.hasClass('page')) {
        pageContainer.on('pageBeforeRemove', pageBeforeRemove);
    }
};
    //Return instance        
    return app;
};
