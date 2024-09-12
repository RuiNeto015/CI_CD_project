import markdownpdf from "markdown-pdf";

// Remove the first two 'keywords' ('node generate-pdf.ts')
const inputFiles = process.argv.slice(2);

// Check if remains files to be searched
if (inputFiles.length === 0) {
    console.error("Please provide input Markdown files. Usage: node generate-pdf.mjs FILE1.md FILE2.md .... ");
    process.exit(1);
}

// Convert each md file to pdf, assigning the same name
inputFiles.forEach((inputFile) => {
    const outputFile = `${inputFile.replace(/\.[^/.]+$/, "")}.pdf`;
    markdownpdf().from(inputFile).to(outputFile, function () {
        console.log(`File converted to PDF! The converted file is ${outputFile}`);
    });
});
