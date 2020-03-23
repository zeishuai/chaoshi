export default {
    //格式化日期：yyyy-MM-dd h:s:m
    formatLongDate(date) {
        if (date == '' || date == null) {
            return '暂无时间'
        } else {
            var d = new Date(date);
            return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        }

    },
}
