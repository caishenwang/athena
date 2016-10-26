/**
 * @author zhangboxuan@thinkerx.com
 */
angular
    .module('athena.simpleTable', [])
    .component('simpleTable',{
        templateUrl: 'simple-table.view.html',
        controller: 'SimpleTable',
        controllerAs: 'table',
        bindings: {
            tableConfig: '<',
            tableData: '<'
        }
    });
