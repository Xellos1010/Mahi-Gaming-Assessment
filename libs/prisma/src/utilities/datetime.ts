export function convertDateTimeToDatabaseFormat(date: Date)
{
    return date.toISOString();
}