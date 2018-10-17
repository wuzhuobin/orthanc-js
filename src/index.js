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
    allPatients: function (action){
        fetch(this.URL() + "/patients/").then(
            (res) => { return res.json(); }).then((json) => { action(json); })
    },
    patientInfo: function (id, action) {
        fetch(this.URL() + "/patients/" + id).then(
            (res) => { return res.json(); }).then(
                (json) => { action(json); });
    },
    studyInfo: function (id, action) {
        fetch(this.URL() + "/studies/" + id).then(
            (res) => { return res.json(); }).then(
                (json) => { action(json); });
    },
    serieInfo: function (id, action) {
        fetch(this.URL() + "/series/" + id).then(
            (res) => { return res.json(); }).then(
                (json) => { action(json); });
    },
    orderedSlice: function (id, action) {
        fetch(this.URL() + "/series/" + id + "/ordered-slices").then(
            (res) => { return res.json(); }).then(
                (json) => {
                    let paths = [];
                    json.Dicom.forEach((element) => {
                        paths.push(this.URL() + element);
                    })
                });
    }
}
module.exports = PACS;
// Print a patien's all studies' json
PACS.patientInfo("b8b478d2-1d077cae-d1641120-c0819824-c7c8baaf", (json)=>{
    for(let x in json.Studies){
        PACS.studyInfo(json.Studies[x], json_=>console.log(json_));
    }
});
PACS.orderedSlice("8fc4af35-81453fdd-94399d36-7cc2c958-a6965de4", (json)=>{console.log(json);})