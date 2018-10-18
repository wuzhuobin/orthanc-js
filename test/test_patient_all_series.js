const PACS = require("../src/pacs");
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
                        console.log(seriesJsons);
                        for(let i in seriesJsons){
                            console.log("SeriesID: " + seriesJsons[i].MainDicomTags.SeriesInstanceUID);
                            console.log("StationName: " + seriesJsons[i].MainDicomTags.StationName);
                            console.log("SeriesDate: " + seriesJsons[i].MainDicomTags.SeriesDate);
                            console.log("SeriesModality: " + seriesJsons[i].MainDicomTags.Modality);
                            console.log("SeriesNumber: " + seriesJsons[i].MainDicomTags.SeriesNumber);
                        }
                    }
                );
            }
        )
    }
);

