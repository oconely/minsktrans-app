export const checkRoutesCondition = r => 
    (r[3] !== "tram" || r[3] !== "trol" || r[3] === "" || r[3] === "bus") && r[8] === "A>B";


export const toGPS = (bs) => {
    if (!bs) return;
    const tmp = bs.split('');
    tmp.splice(2, 0, '.');
    return parseFloat(tmp.join(''));
}