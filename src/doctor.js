class Doctor {
    constructor(name, checkup_second) {
        this.name = name;
        this.checkup_second = checkup_second;
        this.queue = [];
    }

    get_estimation_second() {
        return this.queue.length * this.checkup_second;
    }

    book_queue_slot(patient) {
        var estimation_second = this.get_estimation_second()
        this.queue.push(patient)
        return estimation_second
    }
}

module.exports = Doctor;
