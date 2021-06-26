export const getDateTimeStamp = (timeStamp: string) => {
    const date = getDateString(timeStamp);
    const time = getTimeString(timeStamp);

    return `${date} ${time}`;
}

export const getDateString = (timeStamp: string) => {
    return timeStamp ? new Date(timeStamp).toLocaleDateString() : '';
}

export const getTimeString = (timeStamp: string) => {
    return timeStamp ? new Date(timeStamp).toLocaleTimeString() : '';
}