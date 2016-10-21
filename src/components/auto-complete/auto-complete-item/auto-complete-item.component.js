/**
 * @author changye@thinkerx.com
 */
angular
    .module('athena.autoComplete')
    .component('autoCompleteItem', {
        //templateUrl: function (element, attrs) {
        //    console.log(999,    element.type);
        //    return attrs.templateUrl || 'views/components/cs-auto-complete-' + attrs.type + '.view.html';
        //},
        template: '<div ng-include="getTemplate()"></div>',
        controller: 'AutoCompleteItemCtrl',
        controllerAs: 'complete',
        bindings: {
            key: '<',
            type: '<',
            item: '<',
            onSelect: '&'
        }
    });

