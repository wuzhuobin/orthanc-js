const PACS = require("../src/pacs");
PACS.serieInfo("8fc4af35-81453fdd-94399d36-7cc2c958-a6965de4", 
    function(json){
        let instancesPromises = [];
        for (let i = 0; i < json.Instances.length; ++i) {
            instancesPromises.push(PACS.instanceInfo(json.Instances[i]));
            PACS.instanceSimplifiedInfo(json.Instances[i], function (json) {
                console.log(json)
            });
        }
        Promise.all(instancesPromises).then(
            function (instancesJsons) {
                console.log(instancesJsons);
                for (let i = 0; i < instancesJsons.length; ++i) {
                    console.log("InstanceAcquisitionNumber: " + instancesJsons[i].MainDicomTags.AcquisitionNumber);
                    console.log("InstanceImagePositionPatient: " + instancesJsons[i].MainDicomTags.ImagePositionPatient);
                    console.log("InstanceNumber: " + instancesJsons[i].MainDicomTags.InstanceNumber);
                    console.log("SOPInstanceUID: " + instancesJsons[i].MainDicomTags.SOPInstanceUID);
                }
            }
        );
    }
)