function date() {
    let day = new Date();
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long' 
    
    };
    day = day.toLocaleDateString('en-us', options);
    return day;
};
module.exports.getDay1 = date;

