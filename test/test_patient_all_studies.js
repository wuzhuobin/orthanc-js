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
                    console.log("SeriesInstitution: " + studiesJsons[i].MainDicomTags.InstitutionName);
                    console.log("SeriesDescription: " );
                    console.log("SeriesRequestedProcedure: ");
                    console.log("SeriesStudyDate: " + studiesJsons[i].MainDicomTags.StudyDate);
                    console.log("StudyID: " + studiesJsons[i].MainDicomTags.StudyID);
                }
            }
        );
    }
)