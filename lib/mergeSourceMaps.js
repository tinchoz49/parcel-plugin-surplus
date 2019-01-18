const sourceMap = require("source-map");
const fs = require("fs");

async function mergeToPostProcessedSourceMap(finalSourceMap, previousSourceMap) {
    let previousMap = await new sourceMap.SourceMapConsumer(previousSourceMap);
    let finalMap = await new sourceMap.SourceMapConsumer(finalSourceMap);
    let previousMappings = getMappings(previousMap);
    let finalMappings = getMappings(finalMap);
    let linesMappings = getLinesMappings(finalMappings, previousMappings);
    let resultMappings = unwrapLinesMappings(linesMappings);
    let mergedMap = new sourceMap.SourceMapGenerator();
    for (let i of resultMappings) {
        mergedMap.addMapping(toMapping(i));
    }
    let mergedJson = mergedMap.toJSON();
    let result = Object.assign({}, finalSourceMap);
    result.mappings = mergedJson.mappings;
    result.sourcesContent[0] = previousSourceMap.sourcesContent[0]
    return result;
}

function toMapping(i) {
    return {
        name: i.name,
        source: i.source,
        generated: {
            line: i.generatedLine,
            column: i.generatedColumn
        },
        original: {
            line: i.originalLine,
            column: i.originalColumn
        }
    };
}

function getLinesMappings(map1, map2) {
    let result = [];
    let generatedLines = {};
    for (let i = 0; i < map1.length; i++) {
        if (!generatedLines[map1[i].generatedLine]) {
            generatedLines[map1[i].generatedLine] = new Array();
        }
        generatedLines[map1[i].generatedLine].push(map1[i]);
    }
    for(let i in generatedLines) {
        let generatedLine = parseInt(i, 10)
        let sourceLine = getOriginalByGenerated(generatedLines[i][0].originalLine, map2)
        if (sourceLine !== null) {
            let r = {
                newOriginalLine: sourceLine,
                generatedLine: generatedLine,
                generated: generatedLines[i]
            }
            result.push(r)
        }
    }
    return result;
}

function unwrapLinesMappings(linesMappings) {
    let result = [];
    for (let i of linesMappings) {
        i.generated.forEach(m => {
            m.originalLine = i.newOriginalLine;
            result.push(m);
        });
    }
    return result;
}

function getByGeneratedLine(generatedLine, mappings) {
    let result = [];
    mappings.forEach(m => m.generatedLine === generatedLine && result.push(m));
    return result;
}

function getOriginalByGenerated(generatedLine, mappings) {
    let lines = getByGeneratedLine(generatedLine, mappings);
    if (lines && lines.length > 0) {
        return lines[0].originalLine;
    }
    return null;
}

function getMappings(map) {
    let result = [];
    map.eachMapping(mapping => {
        result.push(mapping);
    });
    return result;
}

module.exports.mergeToPostProcessedSourceMap = mergeToPostProcessedSourceMap