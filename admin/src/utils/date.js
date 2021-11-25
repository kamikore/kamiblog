export function convertTime(date) {
    const Year = date.getFullYear(); 
    const Month = date.getMonth()+1;
    const Date = date.getDate();
    const Hour = date.getHours();
    const Minute = date.getMinutes();
    const Second = date.getSeconds();
    const result = `${Year}-${Month>10?Month:'0'+Month}-${Date>10?Date:'0'+Date} ${Hour>10?Hour:'0'+Hour}:${Minute>10?Minute:'0'+Minute}:${Second>10?Second:'0'+Second}`;
    return result;
}

