window.formatNumStr = function (num) {
    var numStrParts = (num + '').split('.');
    var [numStr, numFracStr] = numStrParts;
    var numStrLen = numStr.length;
    var args = [];
    while(numStrLen > 3) {
        args.unshift(numStr.slice(numStrLen - 3)); 
        numStr = numStr.slice(0, numStrLen - 3);
        numStrLen = numStr.length;
    }
    args.unshift(numStr);
    var newNumStr = args.join(',');
    return numFracStr ? `${newNumStr}.${numFracStr}` : numFracStr;
};