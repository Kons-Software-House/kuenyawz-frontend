export const formatToIdr = (num: number) => {
    return 'IDR ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

export const formatDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const formatPhoneNumber = (phoneNumber: string) => {
    return '+62 ' + phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
}