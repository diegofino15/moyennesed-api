// Util //
const prefixes = ["Mme", "M."];
const firstNames = {
    "M": ["John", "Joe", "Daniel", "Bob", "Michael", "Alex", "Oscar"],
    "F": ["Jane", "Mary", "Sara", "Lisa", "Laura", "Jessica", "Sophie"],
};
const lastNames = ["Doe", "Smith", "Williams", "Jones", "Brown", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Gon"];
const classes = ["Première", "Seconde", "Troisième", "Quatrième", "Cinquième", "Sixième"];
const disciplines = {
    "MATH": "Mathématiques",
    "PHY": "Physique",
    "CHI": "Chimie",
    "ENG": "Anglais",
    "HIS": "Histoire",
    "GEO": "Géographie",
    "FRA": "Français",
    "SP": "Sport",
};
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};
function getRandomUUID() {
    var dt = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
};
function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
};
function getRandomPhoneNumber() {
    return ("0" + getRandomItem("67") + parseInt(Math.random().toFixed(8).replace("0.", ""))).replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3-$4-$5');
};
function getRandomDate() {
    const from = new Date("2024", "09", "04");
    const to = new Date("2025", "09", "04");
    return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime())).toISOString().split("T")[0];
};
function getRandomPersonName() {
    const gender = getRandomItem(["M", "F"]);
    return getRandomItem(prefixes) + " " + (getRandomItem(lastNames) + " " + getRandomItem(firstNames[gender]).charAt(0) + ".").toUpperCase();
};
function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
};


module.exports = {
    getRandomInt, getRandomUUID, getRandomItem, getRandomPhoneNumber, getRandomDate, getRandomPersonName, getRandomColor, prefixes, firstNames, lastNames, classes, disciplines
}