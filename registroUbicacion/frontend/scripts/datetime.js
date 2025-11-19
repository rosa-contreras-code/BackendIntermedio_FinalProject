
function formatDateShortToInput(dateCurrent) {
    const year = dateCurrent.getFullYear();
    const month = (dateCurrent.getMonth() + 1).toString().padStart(2, '0');
    const day = dateCurrent.getDate().toString().padStart(2, '0');
    const dateFormatted = `${year}-${month}-${day}`;

    return dateFormatted; 
}
