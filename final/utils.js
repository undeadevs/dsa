export function compareString(str1, str2){
    const longestStrLen = str1.length > str2.length ? str1.length : str2.length;

    let res = 0;
    for(let i = 0; i < longestStrLen; ++i){
        const ci1 = str1.charCodeAt(i) || 0;
        const ci2 = str2.charCodeAt(i) || 0;
        res += (ci1 - ci2);
    }

    return res / (Math.abs(res) || 1);
}
