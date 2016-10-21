/**
 * @author changye@thinkerx.com
 */
angular
    .module('athena.autoComplete', [])
    .component('autoComplete', {
        templateUrl: 'auto-complete.view.html',
        controller: 'AutoCompleteCtrl',
        controllerAs: 'complete',
        bindings: {
            key: '@',
            type: '@',
            placeholder: '@',
            itemList: '<',
            popupOnFocus: '<',
            selectedItem: '=',
            keywords: '='
        }
    });

