/**
 * 时间段过滤器
 * @author zhangboxuan@thinkerx.com
 */
angular
    .module('athena.datePicker')
    .filter('dateRange', dateRange);

dateRange.$inject = [];

function dateRange() {
    return function(input) {
        return input.startDate == input.endDate ? formatDate(input.startDate) : formatDate(input.startDate) + " 至 " + formatDate(input.endDate);
    };

    function formatDate(date) {
        date = date ? new Date(date) : new Date();

        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }
}
