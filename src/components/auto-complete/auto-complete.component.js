/**
 * @author changye@thinkerx.com
 */
angular
    .module('athena.autoComplete', [])
    .component('autoComplete', {
        //template: '2223232',
        templateUrl: 'views/auto-complete.view.html',
        controller: 'AutoCompleteCtrl',
        controllerAs: 'complete',
        bindings: {
            key: '@',
            type: '@',
            placeholder: '@',
            itemList: '=',
            selectedItem: '='
        }
    });

