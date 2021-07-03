window.formatNumStr = function (num) {
    var numStr = num + '';
    var numStrLen = numStr.length;
    var args = [];
    while(numStrLen > 3) {
        args.unshift(numStr.slice(numStrLen - 3)); 
        numStr = numStr.slice(0, numStrLen - 3);
        numStrLen = numStr.length;
    }
    args.unshift(numStr);
    return args.join(',');
};