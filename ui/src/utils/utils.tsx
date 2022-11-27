
export function getWeekNumberByDate(date:any)
{
    date = new Date(date);
    const firstJanuary: any = new Date(date.getFullYear(), 0, 1);
    const dayNumber: number = Math.ceil((date - firstJanuary) / (24 * 60 * 60 * 1000));
    const weekNumber: number = Math.ceil((dayNumber + firstJanuary.getDay()) / 7);
    return weekNumber;
}

