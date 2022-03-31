//
//  Utilities
//
import apiAxios from './apiAxios'
//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
// Constants
//
const sqlClient = 'Quiz/rowUpsert'
const { URL_BASE } = require('./constants.js')
const { URL_QUESTIONS } = require('./constants.js')
const { SQL_TABLE } = require('./constants.js')
//
// Debug Settings
//
const g_log1 = debugSettings()
//===================================================================================
async function rowUpsert(row) {
  if (g_log1) console.log('Start rowUpsert')
  //
  //  Database Update
  //
  const updateDatabase = async () => {
    try {
      //
      //  Setup actions
      //
      const method = 'post'
      const body = {
        sqlClient: sqlClient,
        sqlTable: SQL_TABLE,
        sqlAction: 'UPSERT',
        sqlKeyName: ['qowner', 'qkey'],
        sqlRow: row
      }
      const URL = URL_BASE + URL_QUESTIONS
      if (g_log1) console.log('URL ', URL)
      //
      //  SQL database
      //
      const resultData = await apiAxios(method, URL, body)
      if (g_log1) console.log('data returned ', resultData)
      //
      // No data
      //
      if (!resultData[0]) {
        throw Error('No data received')
      }
      const rowReturned = resultData[0]
      if (g_log1) console.log('row ', rowReturned)
      return resultData
      //
      // Errors
      //
    } catch (err) {
      console.log(err.message)
      return null
    }
  }
  //--------------------------------------------------------------------
  //-  Main Line
  //--------------------------------------------------------------------
  if (g_log1) console.log('Start rowUpsert')
  if (g_log1) console.log('Row ', row)
  //
  // Database Update
  //
  const promise = updateDatabase()
  //
  // Return promise
  //
  if (g_log1) console.log('Return promise', promise)
  return promise
}

export default rowUpsert
