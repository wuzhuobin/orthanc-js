// import fetch from "node-fetch"
// class PACS {
//     static URL() {
//         return "http://223.255.146.2:8042/orthanc/";
//     }
//     static allPatients(action) {
//         fetch(PACS.URL() + "patients/").
//             then((res) => { return res.json(); }).
//             then((json) => { action(json); });
//     }
//     static patientInfo(id, action) {
//         fetch(PACS.URL() + "patients/" + id).
//             then((res) => { return res.json(); }).
//             then((json) => { action(json); });
//     }

//     static studyInfo(id, action) {
//         fetch(PACS.URL() + "studies/" + id).
//             then((res) => { return res.json(); }).
//             then((json) => { action(json); });
//     }

//     static serieInfo(id, action) {
//         fetch(PACS.URL() + "series/" + id).
//             then((res) => { return res.json(); }).
//             then((json) => { action(json); });
//     }

//     static serieImages(id, action) {
//         fetch(PACS.URL() + "series/" + id).
//             then((res) => { return res.json(); }).
//             then((json) => {
//                 let paths = [];
//                 json.Instances.forEach(element => {
//                     paths.push(URL() + "instances/" + element + "/file");
//                 });
//                 action(paths);
//             });
//     }
// }

const fetch = require("node-fetch");
var PACS = {
    URL: function () { 
        return "http://223.255.146.2:8042/orthanc"
    },
    allPatients: function (action = undefined){
        fetch(this.URL() + "/patients/").then(
            (res) => { return res.json(); }).then((json) => { action(json); })
    },
    patientInfo: function (id, action = undefined) {
        let ret = fetch(this.URL() + "/patients/" + id).then(
            function (res)  { return res.json(); });
        if(action == undefined){
            return ret;
        }
        ret.then(function(json) { action(json); });
    },
    studyInfo: function (id, action = undefined) {
        let ret = fetch(this.URL() + "/studies/" + id).then(
            function (res) { return res.json(); });
        if(action == undefined){
            return ret;
        }
        ret.then(function (json){ action(json); });
    },
    serieInfo: function (id, action = undefined) {
        let ret = fetch(this.URL() + "/series/" + id).then(
           function (res) { return res.json(); });
           if(action == undefined){
               return ret;
           }
        ret.then(function(json) { action(json); });
    },
    orderedSlice: function (id, action = undefined) {
        let ret = fetch(this.URL() + "/series/" + id + "/ordered-slices").then(
            function(res) { return res.json(); }).then(
                function (json) {
                    let paths = [];
                    json.Dicom.forEach(function (element) { paths.push(PACS.URL() + element); })
                    return paths;
                });
        if(action == undefined){
            return ret;
        }
        ret.then(function (paths) { action(paths); })
    }
}
module.exports = PACS;
// Print a patien's all studies' json
// PACS.patientInfo("b8b478d2-1d077cae-d1641120-c0819824-c7c8baaf", (json)=>{
//     for(let x in json.Studies){
//         PACS.studyInfo(json.Studies[x], json_=>console.log(json_));
//     }
// });
// PACS.orderedSlice("8fc4af35-81453fdd-94399d36-7cc2c958-a6965de4", (json)=>{console.log(json);})
console.log("All patients info: ");
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
console.log("All images info of a patients");
PACS.patientInfo("b8b478d2-1d077cae-d1641120-c0819824-c7c8baaf", 
    function (json) {
        let studiesPromises = [];
        for(let i = 0; i < json.Studies.length; ++i){
            studiesPromises.push(PACS.studyInfo(json.Studies[i]));
        }
        // console.log(studiesPromises);
        Promise.all(studiesPromises).then(
            function(studiesJsons){
                let seriesPromises = [];
                for(let i = 0; i < studiesJsons.length; ++i){
                    for(let j = 0; j < studiesJsons[i].Series.length; ++j){
                        seriesPromises.push(PACS.serieInfo(studiesJsons[i].Series[j]));
                    }
                }
                Promise.all(seriesPromises).then(
                    function(seriesJsons){
                        for(let i in seriesJsons){
                            console.log("SeriesID: " + seriesJsons[i].MainDicomTags.SeriesInstanceUID);
                            console.log("StationName: " + seriesJsons[i].MainDicomTags.StationName);
                            console.log("SeriesDate: " + seriesJsons[i].MainDicomTags.SeriesDate);
                            console.log("StudyID: " + seriesJsons[i].ParentStudy); 
                            console.log("SeriesModality" + seriesJsons[i].MainDicomTags.Modality);
                            console.log("SeriesNumber" + seriesJsons[i].MainDicomTags.SeriesNumber);
                        }
                    }
                );
            }
        )
    }
);
