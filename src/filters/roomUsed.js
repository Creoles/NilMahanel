/**
 * Created by rancongjie@126.com on 17/2/27.
 */
export default function(arr, option) {
    let sum = 0;
    arr.forEach(item => {
        sum += item.used;
    });
    if (option) {
        return Math.floor(sum / option);
    } else {
        return sum
    }
}