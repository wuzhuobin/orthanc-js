const PACS = require("../src/pacs");
PACS.patientInfo("b8b478d2-1d077cae-d1641120-c0819824-c7c8baaf", 
    function(json){
        let studiesPromises = [];
        for (let i = 0; i < json.Studies.length; ++i) {
            studiesPromises.push(PACS.studyInfo(json.Studies[i]));
        }
        Promise.all(studiesPromises).then(
            function (studiesJsons) {
                console.log(studiesJsons);
                for (let i = 0; i < studiesJsons.length; ++i) {
                    console.log("StudyInstitutionName: " + studiesJsons[i].MainDicomTags.InstitutionName);
                    console.log("StudyData: " + studiesJsons[i].MainDicomTags.StudyDate);
                    console.log("StudyTime: " + studiesJsons[i].MainDicomTags.StudyTime);
                }
            }
        );
    }
)