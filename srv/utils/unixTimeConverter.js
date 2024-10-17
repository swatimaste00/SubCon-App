// Example function to convert a given date to a Unix timestamp in seconds
function convertToUnixTimestamp(date) {
    const unixTimestamp = Math.floor(new Date(date).getTime() / 1000);
    return unixTimestamp;
}

// // Example usage:
// let date = '2024-10-15T12:00:00Z';  // ISO 8601 formatted date string
// let unixTimestamp = convertToUnixTimestamp(date);
// console.log(`Unix Timestamp: ${unixTimestamp}`);

module.exports ={convertToUnixTimestamp};