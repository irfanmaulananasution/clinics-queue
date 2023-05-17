const Doctor = require("./doctor");
const Patient = require("./patient");

// doctor_name is assumed to be unique
class Clinic {
    constructor() {
        this.doctors = {};
        this.general_queue = [];
    }

    add_doctors(doctors) {
        for (var doctor of doctors) {
            this.doctors[doctor.name] = doctor;
        }
    }

    list_doctor() {
        return Object.keys(this.doctors);
    }

    // preferences is either 1 doctor or all doctor
    book_doctor(patient) {
        if (patient.doctor_preferences.length !== 1) {
            var doctor_name = this.get_earliest_doctor_available(patient.doctor_preferences);
            var estimation_second = this.doctors[doctor_name].book_queue_slot("GENERAL_SLOT");
            this.general_queue.push(patient)
        } else {
            var doctor_name = patient.doctor_preferences[0];
            var estimation_second = this.doctors[doctor_name].book_queue_slot(patient);
        }
        patient.estimation_second = estimation_second;
        return estimation_second;
    }

    get_earliest_doctor_available(doctor_preferences) {
        var shortest_queue_second = Infinity;
        var shortest_queue_doctor = undefined;
        for (let doctor_name of doctor_preferences) {
            var doctor_queue_second = this.doctors[doctor_name].get_estimation_second();
            if (doctor_queue_second < shortest_queue_second) {
                shortest_queue_second = doctor_queue_second;
                shortest_queue_doctor = doctor_name;
            }
        }

        return shortest_queue_doctor;
    }

    get_general_queue() {
        return this.general_queue;
    }
}

module.exports = Clinic;
