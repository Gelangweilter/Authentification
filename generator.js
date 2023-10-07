const Generate = (length) => {
    // generating random string for email verify
    const regex = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let string = ""
    for(let i = 0; i <= length; i++) {
        const random = Math.floor(Math.random() * regex.length);
        string += regex.substring(random, random +1);
    }
    return string;
}

module.exports = Generate