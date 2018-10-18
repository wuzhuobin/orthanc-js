const PACS = require("../src/pacs");
PACS.allPatients((patientIdjsons) => {
    let promises = [];
    for (let i = 0; i < patientIdjsons.length; ++i) {
        promises.push(PACS.patientInfo(patientIdjsons[i]));
    }
    Promise.all(promises).then((patientInfoJsons) => {
        for(let i in patientInfoJsons){
            console.log("PatientID: " + patientInfoJsons[i].MainDicomTags.PatientID);
            console.log("PatientName: " + patientInfoJsons[i].MainDicomTags.PatientName);
            console.log("PatientBirthday: " + patientInfoJsons[i].MainDicomTags.PatientBirthday);
            console.log("PatientSex: " + patientInfoJsons[i].MainDicomTags.PatientSex);
        }
    });
});