/**
 * @author changye@thinkerx.com
 */
angular
    .module('athena.autoComplete')
    .controller('AutoCompleteCtrl', AutoCompleteCtrl);

AutoCompleteCtrl.$inject = ['$scope'];

function AutoCompleteCtrl($scope) {
    var vm = this;

    vm.isPopup = false;

    vm.showPopup = showPopup;
    vm.hidePopup = hidePopup;

    vm.$onInit = function() {
    };

    function showPopup(popupOnBlur) {
        if(popupOnBlur) {
            vm.isPopup = true;
        }
    }

    function hidePopup() {
        vm.isPopup = false;
    }
}
