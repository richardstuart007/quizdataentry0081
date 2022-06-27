//
//  Libraries
//
import { useState, useEffect } from 'react'
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone'
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Box
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CloseIcon from '@mui/icons-material/Close'
import RefreshIcon from '@mui/icons-material/Refresh'
import FilterListIcon from '@mui/icons-material/FilterList'
//
//  Pages
//
import Group2Entry from './Group2Entry'
//
//  Controls
//
import MyActionButton from '../../components/controls/MyActionButton'
import MyButton from '../../components/controls/MyButton'
import MyInput from '../../components/controls/MyInput'
import MySelect from '../../components/controls/MySelect'
//
//  Components
//
import Notification from '../../components/Notification'
import ConfirmDialog from '../../components/ConfirmDialog'
import Popup from '../../components/Popup'
import PageHeader from '../../components/PageHeader'
import useMyTable from '../../components/useMyTable'
//
//  Services
//
import MyQueryPromise from '../../services/MyQueryPromise'
import rowUpsert from '../../services/rowUpsert'
import rowUpdate from '../../services/rowUpdate'
import rowDelete from '../../services/rowDelete'
import rowSelect from '../../services/rowSelect'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Styles
//
const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  searchInput: {
    width: '40%'
  },
  searchInputTypeBox: {
    width: '10%',
    margin: `0 0 0 ${theme.spacing(2)}`
  },
  newButton: {
    position: 'absolute',
    right: '10px'
  }
}))
//
//  Group2 Table
//
const { SQL_TABLE_GROUP2 } = require('../../services/constants.js')
const { SQL_ROWS } = require('../../services/constants.js')
//
//  Table Heading
//
const headCells = [
  { id: 'g2id', label: 'Group2' },
  { id: 'g2title', label: 'Title' },
  { id: 'actions', label: 'Actions', disableSorting: true }
]
const searchTypeOptions = [
  { id: 'g2id', title: 'Group2' },
  { id: 'g2title', title: 'Title' }
]
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStartSetting = false
const debugFunEndSetting = false
const debugModule = 'Group2List'
let debugStack = []
//=====================================================================================
export default function Group2List() {
  //.............................................................................
  //.  Debug Logging
  //.............................................................................
  const debugLogging = (objtext, obj) => {
    if (debugLog) {
      //
      //  Object passed
      //
      let JSONobj = ''
      if (obj) {
        JSONobj = JSON.parse(JSON.stringify(obj))
      }
      //
      //  Output values
      //
      console.log('VALUES: Stack ', debugStack, objtext, JSONobj)
    }
  }
  //.............................................................................
  //.  function start
  //.............................................................................
  const debugFunStart = funname => {
    debugStack.push(funname)
    if (debugFunStartSetting)
      console.log('Stack: debugFunStart ==> ', funname, debugStack)
  }
  //.............................................................................
  //.  function End
  //.............................................................................
  const debugFunEnd = () => {
    if (debugStack.length > 1) {
      const funname = debugStack.pop()
      if (debugFunEndSetting)
        console.log('Stack: debugFunEnd <==== ', funname, debugStack)
    }
  }
  //.............................................................................
  //.  GET ALL
  //.............................................................................
  const getRowAllData = () => {
    debugFunStart('getRowAllData')
    //
    //  Process promise
    //
    const sqlRows = `FETCH FIRST ${SQL_ROWS} ROWS ONLY`
    const props = {
      sqlTable: SQL_TABLE_GROUP2,
      sqlOrderBy: ' order by g2id',
      sqlRows: sqlRows
    }
    var myPromiseGet = MyQueryPromise(rowSelect(props))
    //
    //  Resolve Status
    //
    myPromiseGet.then(function (data) {
      debugLogging('myPromiseGet data ', data)
      //
      //  Update Table
      //
      setRecords(data)
      //
      //  Filter
      //
      handleSearch()
      //
      //  Return
      //
      debugFunEnd()
      return
    })
    //
    //  Return Promise
    //
    debugFunEnd()
    return myPromiseGet
  }
  //.............................................................................
  //.  DELETE
  //.............................................................................
  const deleteRowData = g2id => {
    debugFunStart('deleteRowData')
    //
    //  Populate Props
    //
    const props = {
      sqlTable: SQL_TABLE_GROUP2,
      sqlWhere: `g2id = '${g2id}'`
    }
    var myPromiseDelete = MyQueryPromise(rowDelete(props))
    //
    //  Resolve Status
    //
    myPromiseDelete.then(function (data) {
      debugLogging('myPromiseDelete data ', data)
      //
      //  Update State - refetch data
      //
      getRowAllData()
      //
      //  Return
      //
      debugFunEnd()
      return
    })
    //
    //  Return Promise
    //
    debugFunEnd()
    return myPromiseDelete
  }
  //.............................................................................
  //.  INSERT
  //.............................................................................
  const insertRowData = data => {
    debugFunStart('insertRowData')
    //
    //  Data Received
    //
    debugLogging('insertRowData data ', data)
    //
    //  Strip out g2id as it will be populated by Insert
    //
    let { ...rowData } = data
    debugLogging('Upsert Database rowData ', rowData)
    //
    //  Build Props
    //
    const props = {
      sqlTable: SQL_TABLE_GROUP2,
      sqlKeyName: ['g2id'],
      sqlRow: rowData
    }
    //
    //  Process promise
    //
    debugLogging('rowUpsert')
    var myPromiseInsert = MyQueryPromise(rowUpsert(props))
    //
    //  Resolve Status
    //
    myPromiseInsert.then(function (data) {
      debugLogging('myPromiseInsert data ', data)
      //
      //  No data returned
      //
      if (!data) {
        console.log('No Data returned')
        throw Error
      } else {
        //
        //  Get ID
        //
        const rtn_g2id = data[0].g2id
        debugLogging(`Row (${rtn_g2id}) UPSERTED in Database`)
        //
        //  Update record for edit with returned data
        //
        setRecordForEdit(data[0])
        debugLogging(`recordForEdit `, recordForEdit)
      }
      //
      //  Update State - refetch data
      //
      getRowAllData()
      //
      //  Return
      //
      debugFunEnd()
      return
    })
    //
    //  Return Promise
    //
    debugFunEnd()
    return myPromiseInsert
  }
  //.............................................................................
  //.  UPDATE
  //.............................................................................
  const updateRowData = data => {
    debugFunStart('updateRowData')
    //
    //  Data Received
    //
    debugLogging('updateRowData Row ', data)
    //
    //  Populate Props
    //
    const props = {
      sqlTable: SQL_TABLE_GROUP2,
      sqlWhere: `g2id = '${data.g2id}'`,
      sqlRow: data
    }
    debugLogging('sqlWhere', props.sqlWhere)
    debugLogging('sqlRow', props.sqlRow)
    //
    //  Process promise
    //
    var myPromiseUpdate = MyQueryPromise(rowUpdate(props))
    //
    //  Resolve Status
    //
    myPromiseUpdate.then(function (data) {
      debugLogging('myPromiseUpdate data ', data)
      //
      //  No data
      //
      if (!data) {
        console.log('No Data returned')
        throw Error
      } else {
        //
        //  Get g2id
        //
        const rtn_g2id = data[0].g2id
        debugLogging(`Row (${rtn_g2id}) UPDATED in Database`)
      }
      //
      //  Update State - refetch data
      //
      getRowAllData()
      //
      //  Return
      //
      debugFunEnd()
      return
    })
    //
    //  Return Promise
    //
    debugFunEnd()
    return myPromiseUpdate
  }
  //.............................................................................
  //
  //  Styles
  //
  const classes = useStyles()
  //
  //  State
  //
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [records, setRecords] = useState([])
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items
    }
  })
  const [openPopup, setOpenPopup] = useState(false)
  const [searchType, setSearchType] = useState('g2id')
  const [searchValue, setSearchValue] = useState('')
  //
  //  Notification
  //
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    severity: 'info'
  })
  //
  //  Confirm Delete dialog box
  //
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: ''
  })
  //.............................................................................
  //
  //  Search/Filter
  //
  const handleSearch = () => {
    debugFunStart('handleSearch')
    setFilterFn({
      fn: items => {
        //
        //  Nothing to search, return rows
        //
        if (searchValue === '') {
          debugFunEnd()
          return items
        }
        //
        //  Filter
        //
        let itemsFilter = items
        switch (searchType) {
          case 'g2id':
            itemsFilter = items.filter(x =>
              x.g2id.toLowerCase().includes(searchValue.toLowerCase())
            )
            break
          case 'g2title':
            itemsFilter = items.filter(x =>
              x.g2title.toLowerCase().includes(searchValue.toLowerCase())
            )
            break

          default:
        }
        debugLogging('itemsFilter ', itemsFilter)
        debugFunEnd()
        return itemsFilter
      }
    })
  }
  //.............................................................................
  //
  //  Update Database
  //
  const addOrEdit = (row, resetForm) => {
    debugFunStart('addOrEdit')
    recordForEdit === null ? insertRowData(row) : updateRowData(row)

    setNotify({
      isOpen: true,
      message: 'Submitted Successfully',
      severity: 'success'
    })
    debugFunEnd()
  }
  //.............................................................................
  //
  //  Data Entry Popup
  //
  const openInPopup = row => {
    debugFunStart('openInPopup')
    setRecordForEdit(row)
    setOpenPopup(true)
    debugFunEnd()
  }
  //.............................................................................
  //
  //  Delete Row
  //
  const onDelete = g2id => {
    debugFunStart('onDelete')
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    deleteRowData(g2id)
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      severity: 'error'
    })
    debugFunEnd()
  }

  //...................................................................................
  //.  Main Line
  //...................................................................................
  debugStack = []
  debugFunStart(debugModule)
  //
  //  Initial Data Load
  //
  useEffect(() => {
    getRowAllData()
    // eslint-disable-next-line
  }, [])
  //.............................................................................
  //
  //  Populate the Table
  //
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useMyTable(records, headCells, filterFn)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <PageHeader
        title='Group2'
        subTitle='Data Entry and Maintenance'
        icon={<PeopleOutlineTwoToneIcon fontSize='large' />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <MyInput
            label='Search'
            name='Search'
            value={searchValue}
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            onChange={e => setSearchValue(e.target.value)}
          />
          <Box className={classes.searchInputTypeBox}>
            <MySelect
              fullWidth={true}
              name='SearchType'
              label='Column Heading'
              value={searchType}
              onChange={e => setSearchType(e.target.value)}
              options={searchTypeOptions}
            />
          </Box>
          <MyButton
            text='Filter'
            variant='outlined'
            startIcon={<FilterListIcon />}
            onClick={handleSearch}
          />
          <MyButton
            text='Refresh'
            variant='outlined'
            startIcon={<RefreshIcon />}
            onClick={getRowAllData}
          />

          <MyButton
            text='Add New'
            variant='outlined'
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true)
              setRecordForEdit(null)
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map(row => (
              <TableRow key={row.g2id}>
                <TableCell>{row.g2id}</TableCell>
                <TableCell>{row.g2title}</TableCell>

                <TableCell>
                  <MyActionButton
                    color='primary'
                    onClick={() => {
                      openInPopup(row)
                    }}
                  >
                    <EditOutlinedIcon fontSize='small' />
                  </MyActionButton>
                  <MyActionButton
                    color='secondary'
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure to delete this record?',
                        subTitle: "You can't undo this operation",
                        onConfirm: () => {
                          onDelete(row.g2id)
                        }
                      })
                    }}
                  >
                    <CloseIcon fontSize='small' />
                  </MyActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        title='Group2 Form'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <Group2Entry recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  )
}
