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
