export function formatNumber(num: number): string {
    if (Number.isInteger(num)) {
        return num.toString();
    } 
    let rounded = num.toFixed(8);
    let trimmed = rounded.replace(/\.?0+$/, '');
    return trimmed;
}