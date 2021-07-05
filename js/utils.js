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
    return numFracStr ? `${newNumStr}.${numFracStr}` : newNumStr;
};

window.formatterWithTotal = function (params) {
    const {name, data: total} = params[0];
    const children = params.reduce((acc, cur, idx) => {
        const {marker, seriesName, data} = cur;
        const percent = ((data / total) * 100).toFixed(2);
        acc.push(`
            <div style="margin: ${idx > 0 ? 10 : 0}px 0 0;line-height:1;">
                ${marker}
                <span style="font-size:14px;color:#666;font-weight:400;margin-left:2px">${seriesName}</span>
                <span style="float:right;margin-left:20px;font-size:14px;color:#666;font-weight:900">${formatNumStr(data)}${idx > 0 ? ' (' + percent + '%)' : ''}</span>
                <div style="clear:both"></div>
            </div>
        `);
        return acc;
    }, []);
    return `
        <div style="font-size:14px;color:#666;font-weight:400;line-height:1;">${name}</div>
        <div style="margin: 10px 0 0;line-height:1;">
            ${children.join('')}
        </div>
    `;
}

window.formatterWithoutTotal = function (params) {
    const {name} = params[0];
    const total = params.reduce((acc, cur) => {
        acc += cur.data;
        return acc;
    }, 0);
    const children = params.reduce((acc, cur, idx) => {
        const {marker, seriesName, data} = cur;
        const percent = ((data / total) * 100).toFixed(2);
        acc.push(`
            <div style="margin: ${idx > 0 ? 10 : 0}px 0 0;line-height:1;">
                ${marker}
                <span style="font-size:14px;color:#666;font-weight:400;margin-left:2px">${seriesName}</span>
                <span style="float:right;margin-left:20px;font-size:14px;color:#666;font-weight:900">${formatNumStr(data)}${' (' + percent + '%)'}</span>
                <div style="clear:both"></div>
            </div>
        `);
        return acc;
    }, []);
    return `
        <div style="font-size:14px;color:#666;font-weight:400;line-height:1;">${name}</div>
        <div style="margin: 10px 0 0;line-height:1;">
            ${children.join('')}
        </div>
    `;
}