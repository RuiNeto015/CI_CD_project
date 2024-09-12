import AdmZip from 'adm-zip';

try {
    const zip = new AdmZip();

    if (process.argv.length < 3) {
        throw new Error('Output file path argument is missing.');
    }

    const outputFile = process.argv[2];

    zip.addLocalFile("./README.pdf", "");
    zip.addLocalFile("./JenkinsFile", "");
    zip.addLocalFolder("./swagger_docs/", "swagger-docs");
    zip.addLocalFolder("./tsdocs/", "tsdocs");
    zip.addLocalFolder("./integration_tests_artifacts/", "integration_tests_artifacts");
    zip.addLocalFolder("./code_quality_artifacts/", "code_quality_artifacts");
    zip.addLocalFolder("./unit_tests_artifacts/", "unit_tests_artifacts");
    zip.addLocalFolder("./dist/", "dist");

    try {
        zip.addLocalFile("./self-assessment-g016.pdf", "");
    } catch (e) {
        console.warn(`The Self Assessment file was not found - Tolerable and ignored.`);
    }

    zip.writeZip(outputFile);
    console.log(`Created ${outputFile} successfully`);
} catch (e) {
    throw new Error(`Something went wrong: ${e.message}`);
}
