@echo off
setlocal EnableDelayedExpansion

set PLANTUML_PATH=../libs/plantuml-1.2023.1.jar
set INPUT_FOLDER=../docs

for /r "../docs" %%f in (*.puml) do (
    set INPUT_FILE=%%f
    echo Processing file !INPUT_FILE!
    set OUTPUT_FILE=!INPUT_FILE:%INPUT_FOLDER%=!
    set OUTPUT_FILE=!OUTPUT_FILE:.puml=.svg!
    set OUTPUT_FILE=%INPUT_FOLDER%\%OUTPUT_FILE%

    java -jar "%PLANTUML_PATH%" -tsvg "%%f" -o "%OUTPUT_FILE%" ../svg
)

echo Finished