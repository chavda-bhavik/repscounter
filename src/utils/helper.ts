export const toggleOverflowHidden = (show: boolean) => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
};
export const formatDateToString = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${('0' + date.getDate()).slice(-2)}`;
};
