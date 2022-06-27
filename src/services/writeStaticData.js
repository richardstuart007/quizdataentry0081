//
// file system module to perform file operations
//
const fs = require('browserify-fs')
//
//  Debug
//
const g_log1 = true
//===================================================================================
function writeStaticData(props) {
  if (g_log1) console.log('Start writeStaticData')
  //
  //  Try
  //
  try {
    //
    //  Deconstruct props
    //
    if (g_log1) console.log('props: ', props)
    const { path, file, data } = props
    const filePath = `${path}${file}`
    if (g_log1) console.log('filePath ', filePath)
    //
    //  Create new file
    //
    fs.writeFileSync(filePath, 'test', 'utf8')
    //
    // parse json
    //
    var jsonObj = JSON.parse(data)
    if (g_log1) console.log(jsonObj)
    //
    // stringify JSON Object
    //
    var jsonContent = JSON.stringify(jsonObj)
    if (g_log1) console.log(jsonContent)
    //
    //  Append file data
    //
    fs.appendFileSync(filePath, jsonContent, 'utf8')

    if (g_log1)
      console.log(`JSON file ${file} has been saved in directory ${path}.`)
  } catch (err) {
    console.log('An error occured while writing JSON Object to File.')
    console.log(err.message)
    return null
  }
}

export default writeStaticData
