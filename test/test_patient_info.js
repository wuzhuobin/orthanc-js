const PACS = require("../src/pacs");
PACS.patientInfo("b8b478d2-1d077cae-d1641120-c0819824-c7c8baaf", (json)=>{
    for(let x in json.Studies){
        PACS.studyInfo(json.Studies[x], json_=>console.log(json_));
    }
});