
export function getWeekNumberByDate(date:any)
{
    date = new Date(date);
    const firstJanuary: any = new Date(date.getFullYear(), 0, 1);
    const dayNr: number = Math.ceil((date - firstJanuary) / (24 * 60 * 60 * 1000));
    const weekNr: number = Math.ceil((dayNr + firstJanuary.getDay()) / 7);
    return weekNr;
}

