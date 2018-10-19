const PACS = require("../src/pacs");
console.log("");
console.log(__filename);
console.log(PACS.URL());
require("./test_all_patients_info");
require("./test_ordered_slices");
require("./test_patient_all_series");
require("./test_patient_all_studies");
require("./test_patient_info");
require("./test_study_all_series")
require("./test_series_preview")