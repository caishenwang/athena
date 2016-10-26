/**
 * @author zhangboxuan@thinkerx.com
 */
angular
    .module('athena.simpleTable')
    .controller('SimpleTable', SimpleTable);

SimpleTable.$inject = [];

function SimpleTable() {
    var vm = this;
    
    vm.isShow = false;

    vm.showDetail = showDetail;

    function showDetail(item) {
        item.isShow = !item.isShow;
    }
}
