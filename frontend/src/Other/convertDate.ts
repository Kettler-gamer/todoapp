export function convertToLocalDateFormat(date: string): string{
    return date.split("T").join(" ").substring(0,16);
}