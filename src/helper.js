// Helper functions //
module.exports = function() {
    this.prefixes = ["Mme", "M."];
    this.firstNames = {
        "M": ["John", "Joe", "Daniel", "Bob", "Michael", "Alex", "Oscar"],
        "F": ["Jane", "Mary", "Sara", "Lisa", "Laura", "Jessica", "Sophie"],
    };
    this.lastNames = ["Doe", "Smith", "Williams", "Jones", "Brown", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Gon"];

    this.classes = ["Première", "Seconde", "Troisième", "Quatrième", "Cinquième", "Sixième"];
    this.disciplines = {
        "MATH": "Mathématiques",
        "PHY": "Physique",
        "CHI": "Chimie",
        "ENG": "Anglais",
        "HIS": "Histoire",
        "GEO": "Géographie",
        "FRA": "Français",
        "SP": "Sport",
    };

    this.getRandomInt = function (max){
        return Math.floor(Math.random() * max);
    };
    this.getRandomUUID = function (){
        var dt = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
    };
    this.getRandomItem = function (arr){
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    };
    this.getRandomPhoneNumber = function (){
        return ("0" + this.getRandomItem("67") + parseInt(Math.random().toFixed(8).replace("0.", ""))).replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3-$4-$5');
    };
    this.getRandomDate = function (){
        const from = new Date("2024", "09", "04");
        const to = new Date("2025", "09", "04");
        return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime())).toISOString().split("T")[0];
    };
    this.getRandomPersonName = function (){
        const gender = this.getRandomItem(["M", "F"]);
        return this.getRandomItem(prefixes) + " " + (this.getRandomItem(lastNames) + " " + this.getRandomItem(this.firstNames[gender]).charAt(0) + ".").toUpperCase();
    };
    this.getRandomColor = function (){
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    };
}