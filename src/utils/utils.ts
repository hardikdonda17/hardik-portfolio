export function getYearsBetween(startDate: Date, endDate: Date) {
    let years = endDate.getFullYear() - startDate.getFullYear();
    const monthDiff = endDate.getMonth() - startDate.getMonth();

    // Adjust if the birthday/anniversary hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && endDate.getDate() < startDate.getDate())) {
        years--;
    }
    return years;
}