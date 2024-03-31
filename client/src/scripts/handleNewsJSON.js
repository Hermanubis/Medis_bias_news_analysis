import sourceFile from './SourceReliability.json'

let source = []

for(var key in sourceFile) {
  source.push([sourceFile[key]["Source"], sourceFile[key]["Reliability"], sourceFile[key]["Bias"]])
}

let leftLeaning = [[],[],[]]
let centerLeaning = [[],[],[]]
let rightLeaning = [[],[],[]]
for (let i = 0; i < source.length; i++) {
  if (source[i][2] < -2.5) {
    leftLeaning[0].push(source[i][0])
    leftLeaning[1].push(source[i][1])
    leftLeaning[2].push(source[i][2])
  } else if (source[i][2] > 2.5) {
    rightLeaning[0].push(source[i][0])
    rightLeaning[1].push(source[i][1])
    rightLeaning[2].push(source[i][2])
  } else {
    centerLeaning[0].push(source[i][0])
    centerLeaning[1].push(source[i][1])
    centerLeaning[2].push(source[i][2])
  }
}


export default function handleNewsJSON(newsData) {
    const leftLeaningArticles = []
    const centerLeaningArticles =[]
    const rightLeaningArticles = []
    const usedLeftLeaningSources =[[],[],[]]
    const usedCenterLeaningSources =[[],[],[]]
    const usedRightLeaningSources =[[],[],[]]

    for(var key in newsData) {
        for (var key1 in newsData[key]) {
        if (newsData[key][key1]) {
            var x = newsData[key][key1].source
            if (newsData[key][key1].source) {
            for (let i = 0; i < leftLeaning[0].length; i++) {
                if (leftLeaning[0][i].toUpperCase() === (newsData[key][key1].source.name.toUpperCase())) {
                leftLeaningArticles.push(newsData[key][key1])
                if (!usedLeftLeaningSources[0].includes(leftLeaning[0][i].toUpperCase())) {
                    usedLeftLeaningSources[0].push(leftLeaning[0][i].toUpperCase())
                    usedLeftLeaningSources[1].push(leftLeaning[1][i])
                    usedLeftLeaningSources[2].push(leftLeaning[2][i])
                }
                }
            }
            for (let i = 0; i < rightLeaning[0].length; i++) {
                if (rightLeaning[0][i].toUpperCase() === (newsData[key][key1].source.name.toUpperCase())) {
                rightLeaningArticles.push(newsData[key][key1])
                if (!usedRightLeaningSources[0].includes(rightLeaning[0][i].toUpperCase())) {
                    usedRightLeaningSources[0].push(rightLeaning[0][i].toUpperCase())
                    usedRightLeaningSources[1].push(rightLeaning[1][i])
                    usedRightLeaningSources[2].push(rightLeaning[2][i])
                }
                }
            }
            for (let i = 0; i < centerLeaning[0].length; i++) {
                if (centerLeaning[0][i].toUpperCase() === (newsData[key][key1].source.name.toUpperCase())) {
                centerLeaningArticles.push(newsData[key][key1])
                if (!usedCenterLeaningSources[0].includes(centerLeaning[0][i].toUpperCase())) {
                    usedCenterLeaningSources[0].push(centerLeaning[0][i].toUpperCase())
                    usedCenterLeaningSources[1].push(centerLeaning[1][i])
                    usedCenterLeaningSources[2].push(centerLeaning[2][i])
                }
                }
            }
            }
        }
        }
    }
    return {leftLeaningArticles, usedLeftLeaningSources, centerLeaningArticles, usedCenterLeaningSources,rightLeaningArticles, usedRightLeaningSources}
}


