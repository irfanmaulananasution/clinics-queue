const express = require("express");
const bodyParser = require("body-parser");
const Clinic = require("./clinic");
const Doctor = require("./doctor");
const Patient = require("./patient");

var app = express(); 
var clinic = new Clinic();

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.use(express.json());

app.post('/doctors', (req, res) => {
    console.log("POST /doctor starting");
    let names = [];
    let doctors = [];
    for (var doctor of req.body.doctors) {
        doctors.push(new Doctor(doctor.name, doctor.checkup_time));
        names.push(doctor.name);
    }

    clinic.add_doctors(doctors);

    console.log("POST /doctor finished");
    res.send(names + " added");
})

app.get('/doctors', (req, res) => {
    console.log("GET /doctor starting");
    doctors = clinic.list_doctor();

    console.log("GET /doctor finished");
    res.send(doctors);
})

app.post('/book-doctor', (req, res) => {
    console.log("POST /book-doctor starting");
    var name = req.body.patient.name;
    var doctor_preferences = req.body.patient.doctor_preferences;
    var patient = new Patient(name, doctor_preferences);
    var estimation_second = clinic.book_doctor(patient);

    console.log("POST /book-doctor starting");
    res.send(estimation_second.toString());
})

app.get('/general-queue', (req, res) => {
    console.log("GET /general-queue starting");
    console.log("GET /general-queue finished");
    res.send(clinic.get_general_queue());
})

// This one is a separate case made focusing to the request in the case study bonus section.
app.post('/stateless/bonus-section', (req, res) => {
    console.log("POST /stateless/bonus-section starting");
    tmp_clinic = new Clinic();

    // add doctors
    let doctors = [];
    for (var doctor of req.body.doctors) {
        doctors.push(new Doctor(doctor.name, doctor.checkup_time));
    }

    tmp_clinic.add_doctors(doctors);

    // create dummy patient
    var doctor_preferences = tmp_clinic.list_doctor();
    var nth_patient_estimation_second = undefined;
    for (var i = 0; i < req.body.patient_position_in_queue; i++) {
        var name = "patient" + i;
        var patient = new Patient(name, doctor_preferences);
        nth_patient_estimation_second = tmp_clinic.book_doctor(patient);
    }

    console.log("POST /stateless/bonus-section finished");
    res.send(nth_patient_estimation_second.toString());
})