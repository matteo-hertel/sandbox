define("config", [], function() {
    requirejs.config({
        paths: {
            jquery: '/bower_components/jquery/dist/jquery.min',
            bloodhound: "/bower_components/typeahead.js/dist/bloodhound.min",
            typeahead: "/bower_components/typeahead.js/dist/typeahead.jquery.min",
            stringMatcher: "/js/stringMatcher",
            states: "/js/states"
        },
        shim: {
            typeahead: {
                deps: ["jquery", "bloodhound"],
                exports: '$.fn.typeahead',
                init: function($) {

                    return require.s.contexts._.registry['typeahead.js'].factory($);

                }
            }
        }
    });
});

require(["config"], function() {
    require(["typeahead", "stringMatcher", "states"], function(t, substringMatcher, states) {

        $('#the-basics .typeahead').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        }, {
            name: 'states',
            source: substringMatcher(states)
        });
    });
});
