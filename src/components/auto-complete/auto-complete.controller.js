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

    function showPopup() {
        vm.isPopup = true;
    }

    function hidePopup() {
        console.log(777);
        vm.isPopup = false;
    }
}
