export const formatDateToString = (
    date: Date | string | number,
) => {
    // create date object and get date parameters
    date = new Date(date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let d = ('0' + date.getDate()).slice(-2);

    // formatting date
    return `${year}-${month}-${d}`;
};

export const toggleOverflowHidden = (show: boolean) => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
};
export const getWeek = function (date: Date) {
    var onejan = new Date(date.getFullYear(), 0, 1).valueOf();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).valueOf();
    var dayOfYear = ((today - onejan + 86400000) / 86400000);
    return Math.ceil(dayOfYear / 7)
};
export const parseDates = (inp: string) => {
    let year = parseInt(inp.slice(0, 4), 10);
    let week = parseInt(inp.slice(6), 10);

    let day = (1 + (week) * 7); // 1st of January + 7 days for each week

    let dayOffset = new Date(year, 0, 1).getDay(); // we need to know at what day of the week the year start

    dayOffset--;  // depending on what day you want the week to start increment or decrement this value. This should make the week start on a monday

    let days = [];
    for (let i = 0; i < 7; i++) // do this 7 times, once for every day
        days.push(new Date(year, 0, day - dayOffset + i)); // add a new Date object to the array with an offset of i days relative to the first day of the week
    return [days[0], days[6]];
}
