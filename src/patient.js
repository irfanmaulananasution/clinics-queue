class Patient {
    constructor(name, doctor_preferences) {
        this.name = name;
        this.doctor_preferences = doctor_preferences;
        this.wait_estimation_second = undefined;
    }
}

module.exports = Patient;
