# Clinics Queue
This is a program to simulate a clinic queuing system.

### API Documentation
[Postman API Documentation](https://documenter.getpostman.com/view/14715306/2s93ebSqHr)

### Requirements
- npm
- node js

### Setup and Usage
```
# install dependencies
npm install express
npm install body-parser

# run code
node src/index.js
```


### Usage Notes
command/api available :
- POST /stateless/bonus-section
this is the api that you want to use to check the bonus section. It used to check the estimation waiting time if a patient book as the nth patient.
- POST /doctors
used to add the doctor to the clinic
- GET /doctors 
used to get a name list of the doctor in the clinic
- POST /book-doctor
used for patient to book a doctor. it also queue it and return the estimation waiting time in second.
- GET /general-queue
used to get the queue of the people who dont choose a specific doctor

Example best case flow (access curl command in the API documentation) :
- curl POST /doctors
- curl GET /doctor (to check if the doctors is inputted)
- curl GET /patient (you can do this several time with different patient name to see the difference of the waiting time)
- curl GET /general-queue (to check how many slots are already made for patient who dont choose a specific doctor)
- curl POST /stateless/bonus-section (you canse test case 2 question 1 here. take the command in the postman documentation)

### Notes
- This program only handle the best case. It hasnt handle any corner case yet.

### Author
- Irfan Maulana Nasution

### License
[MIT](./LICENSE)
