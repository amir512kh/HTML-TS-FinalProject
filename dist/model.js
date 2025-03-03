import { importFromCSV, parsePatiensCSV, parseDoctorsCSV, parseLabsCSV, parseTestsCSV, parsePrescriptionsCSV, parseAppointmentsCSV } from "./loader.js";
const patientsStorageKey = "patients";
const currentPatientStorageKey = "currPatient";
const doctorsStorageKey = "doctors";
const appointmentsStorageKey = "appointments";
const perscriptionsStorageKey = "prescriptions";
const labsStorageKey = "labs";
const testsStorageKey = "tests";
let patients = loadPatients();
let doctors = loadDoctors();
let appointments = loadAppointments();
let labs = loadLabs();
let prescriptions = loadPrescriptions();
let tests = loadTests();
loadOnStart();
export function loadPatients() {
    const storedPatients = localStorage.getItem(patientsStorageKey);
    if (!storedPatients)
        return new Map();
    const patientsArray = JSON.parse(storedPatients);
    return new Map(patientsArray.map(([id, patient]) => [
        id,
        { ...patient, date: new Date(patient.dateOfBirth) } // Recreate Date object
    ]));
}
export function savePatients(patients) {
    console.log("saving patients");
    const patientsArray = Array.from(patients.entries());
    localStorage.setItem(patientsStorageKey, JSON.stringify(patientsArray));
}
export function addPatient(patient) {
    patients.set(patient.id, patient);
}
function loadDoctors() {
    const storedDoctors = localStorage.getItem(doctorsStorageKey);
    if (!storedDoctors)
        return new Map();
    const doctorsArray = JSON.parse(storedDoctors);
    return new Map(doctorsArray);
}
function saveDoctors(doctors) {
    console.log("saving doctors");
    const doctorsArray = Array.from(doctors.entries());
    localStorage.setItem(doctorsStorageKey, JSON.stringify(doctorsArray));
}
function loadLabs() {
    const storedLabs = localStorage.getItem(labsStorageKey);
    if (!storedLabs)
        return new Map();
    const labsArray = JSON.parse(storedLabs);
    return new Map(labsArray);
}
function saveLabs(labs) {
    console.log("saving labs");
    const labsArray = Array.from(labs.entries());
    localStorage.setItem(labsStorageKey, JSON.stringify(labsArray));
}
function loadAppointments() {
    const storedAppointments = localStorage.getItem(appointmentsStorageKey);
    if (!storedAppointments)
        return new Map();
    const appointmentsArray = JSON.parse(storedAppointments);
    return new Map(appointmentsArray.map(([id, appointment]) => [
        id,
        { ...appointment, date: new Date(appointment.date) } // Recreate Date object
    ]));
}
function saveAppointments(appointments) {
    console.log("saving Appointments");
    const appointmentsArray = Array.from(appointments.entries());
    localStorage.setItem(appointmentsStorageKey, JSON.stringify(appointmentsArray));
}
function loadPrescriptions() {
    const storedPrescriptions = localStorage.getItem(perscriptionsStorageKey);
    if (!storedPrescriptions)
        return new Map();
    const perscriptionsArray = JSON.parse(storedPrescriptions);
    return new Map(perscriptionsArray.map(([id, perscription]) => [
        id,
        { ...perscription, date: new Date(perscription.date) } // Recreate Date object
    ]));
}
function savePrescriptions(prescriptions) {
    console.log("saving Prescriptions");
    const prescriptionsArray = Array.from(prescriptions.entries());
    localStorage.setItem(perscriptionsStorageKey, JSON.stringify(prescriptionsArray));
}
function loadTests() {
    const storedTests = localStorage.getItem(testsStorageKey);
    if (!storedTests)
        return new Map();
    const testsArray = JSON.parse(storedTests);
    return new Map(testsArray.map(([id, test]) => [
        id,
        { ...test, date: new Date(test.date) } // Recreate Date object
    ]));
}
function saveTests(test) {
    console.log("saving Prescriptions");
    const testsArray = Array.from(test.entries());
    localStorage.setItem(testsStorageKey, JSON.stringify(testsArray));
}
export function testFunction() {
    console.log("test");
    // console.log(patients);
}
//Loads some pre generated data - for demo mode, if the local storage is empty
async function loadOnStart() {
    if (patients.size === 0) {
        const csvData = await importFromCSV("./data/patients.csv");
        const importedPatients = parsePatiensCSV(csvData);
        savePatients(importedPatients);
        console.log("saving imported patients to local storage");
        patients = loadPatients();
        console.log("loading imported patients from local storage");
    }
    else {
        console.log("There are patients in local storage.");
    }
    if (doctors.size === 0) {
        const csvData = await importFromCSV("./data/doctors.csv");
        const importedDoctors = parseDoctorsCSV(csvData);
        saveDoctors(importedDoctors);
        console.log("saving imported doctors to local storage");
        doctors = loadDoctors();
        console.log("loading imported doctors from local storage");
    }
    else {
        console.log("There are doctors in local storage.");
    }
    if (labs.size === 0) {
        const csvData = await importFromCSV("./data/laboratories.csv");
        const importedLabs = parseLabsCSV(csvData);
        saveLabs(importedLabs);
        console.log("saving imported labs to local storage");
        labs = loadLabs();
        console.log("loading imported labs from local storage");
    }
    else {
        console.log("There are labs in local storage.");
    }
    if (tests.size === 0) {
        const csvData = await importFromCSV("./data/tests.csv");
        const importedTests = parseTestsCSV(csvData);
        saveTests(importedTests);
        console.log("saving imported tests to local storage");
        tests = loadTests();
        console.log("loading imported tests from local storage");
    }
    else {
        console.log("There are tests in local storage.");
    }
    if (prescriptions.size === 0) {
        const csvData = await importFromCSV("./data/prescriptions.csv");
        const importedPrescriptions = parsePrescriptionsCSV(csvData);
        savePrescriptions(importedPrescriptions);
        console.log("saving imported prescriptions to local storage");
        prescriptions = loadPrescriptions();
        console.log("loading imported prescriptions from local storage");
    }
    else {
        console.log("There are prescriptions in local storage.");
    }
    if (appointments.size === 0) {
        const csvData = await importFromCSV("./data/appointments.csv");
        const importedPerscriptions = parseAppointmentsCSV(csvData);
        saveAppointments(importedPerscriptions);
        console.log("saving imported appointments to local storage");
        appointments = loadAppointments();
        console.log("loading imported appointments from local storage");
    }
    else {
        console.log("There are appointments in local storage.");
    }
}
