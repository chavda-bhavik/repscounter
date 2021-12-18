export const toggleOverflowHidden = (show: boolean) => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
};

type DateFormats = 'YYYY-MM-DD' | 'DD/MM/YYYY';
let WeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const formatDateToString = (
    date: Date | string,
    format: DateFormats,
    addWeekDay = false
) => {
    // create date object and get date parameters
    date = new Date(date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let d = ('0' + date.getDate()).slice(-2);
    // formatting date
    let formattedDate = '';
    if (format === 'YYYY-MM-DD') formattedDate = `${year}-${month}-${d}`;
    else if (format === 'DD/MM/YYYY') formattedDate = `${d}/${month}/${year}`;
    // adding weekday
    if (addWeekDay) formattedDate += ` (${WeekDays[date.getDay()]})`;
    // returning formatted date
    return formattedDate;
};
