export default function(rule, value, callback) {
    var bool = /^-?[1-9]+(\.\d+)?$|^-?0(\.\d+)?$|^-?[1-9]+[0-9]*(\.\d+)?$/.test(value);
    if (!bool) {
        callback(new Error('价格必须为数字,可以有小数'));
    }
    callback();
}