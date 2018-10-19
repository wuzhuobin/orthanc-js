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
function overload(promise, action){
    if(action == undefined){
        return promise
    }
    else{
        promise.then(function (json) { action(json); });
        return;
    }
}

var PACS = {
    URL: function () { 
        return "http://223.255.146.2:8042/orthanc"
    },
    allPatients: function (action = undefined){
        let ret = fetch(this.URL() + "/patients/").then(
            (res) => { return res.json(); });
        return overload(ret, action);
    },
    patientInfo: function (id, action = undefined) {
        let ret = fetch(this.URL() + "/patients/" + id).then(
            function (res)  { return res.json(); });
        return overload(ret, action);
    },
    studyInfo: function (id, action = undefined) {
        let ret = fetch(this.URL() + "/studies/" + id).then(
            function (res) { return res.json(); });
        return overload(ret, action);
    },
    serieInfo: function (id, action = undefined) {
        let ret = fetch(this.URL() + "/series/" + id).then(
            function (res) { return res.json(); });
        return overload(ret, action);
    },
    instanceInfo: function(id, action = undefined){
        let ret = fetch(this.URL() + "/instances/" + id).then(
            function (res) { return res.json(); }
        );
        return overload(ret, action);
    },
    instanceSimplifiedInfo: function(id, action = undefined){
        let ret = fetch(this.URL() + "/instances/" + id + "/simplified-tags").then(
            function (res){ return res.json();}
        );
        return overload(ret, action);
    },
    orderedSlice: function (id, action = undefined) {
        let ret = fetch(this.URL() + "/series/" + id + "/ordered-slices").then(
            function (res) { return res.json(); }
        ).then(
            function (json) {
                let paths = [];
                json.Dicom.forEach(function (element) { paths.push(PACS.URL() + element); })
                return paths;
            }
        );
        return overload(ret, action);
    },
    seriesPreview: function(id, action = undefined, partial = 0.5){
        this.orderedSlice(id, function(orderedSlices){
            console.log(orderedSlices);
            let slice = Math.round(orderedSlices.length * partial);
            let str = orderedSlices[slice];
            str = str.substring(0, str.length - 5);
            str = str + "/preview";
            action(str);
        });
    }
}
module.exports = PACS;
// Print a patien's all studies' json
