//
//  Libraries
//
import { useEffect } from 'react'
import { Grid } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Controls
//
import MyButton from '../components/controls/MyButton'
import MyInput from '../components/controls/MyInput'
import { useMyForm, MyForm } from '../components/useMyForm'
//
//  Form Initial Values
//
const initialFValues = {
  hid: 0,
  hnorth: ''
}
//
// Debug Settings
//
const g_log1 = debugSettings(true)
//=====================================================================================
export default function HandEntry(props) {
  const { HandaddOrEdit, HandrecordForEdit } = props
  //...................................................................................
  //
  // Validate the fields
  //
  const validate = (fieldValues = values) => {
    if (g_log1) console.log(fieldValues)
    //
    //  Load previous errors
    //
    let errorsUpd = { ...errors }
    //
    //  Validate current field
    //
    if ('hnorth' in fieldValues)
      errorsUpd.hnorth = fieldValues.hnorth ? '' : 'This field is required.'
    //
    //  Set the errors
    //
    setErrors({
      ...errorsUpd
    })
    //
    //  Check if every element within the errorsUpd object is blank, then return true (valid), but only on submit when the fieldValues=values
    //
    if (fieldValues === values)
      return Object.values(errorsUpd).every(x => x === '')
  }
  //...................................................................................
  //
  //  UseMyForm
  //
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useMyForm(initialFValues, true, validate)
  //...................................................................................
  //.  Submit form
  //...................................................................................
  const handleSubmit = e => {
    e.preventDefault()
    //
    //  Validate & Update
    //
    if (validate()) {
      if (g_log1) console.log('values ', values)
      const UpdateValues = { ...values }
      //
      //  Update database
      //
      HandaddOrEdit(UpdateValues, resetForm)
      if (g_log1) console.log('UpdateValues ', UpdateValues)
    }
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  On change of record, set State
  //
  useEffect(() => {
    if (g_log1) console.log('useEffect')
    if (HandrecordForEdit !== null)
      setValues({
        ...HandrecordForEdit
      })
    // eslint-disable-next-line
  }, [HandrecordForEdit])
  if (g_log1) console.log('HandrecordForEdit ', HandrecordForEdit)
  //
  //  Disable entry of Owner/Key on update, allow for Entry
  //
  let actionUpdate = false
  if (values.hid !== 0) actionUpdate = true
  if (g_log1) console.log('actionUpdate input ', actionUpdate)
  //
  //  Button Text
  //
  let submitButtonText
  actionUpdate ? (submitButtonText = 'Update') : (submitButtonText = 'Add')
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <MyForm onSubmit={handleSubmit}>
      <Grid container>
        {actionUpdate ? (
          <Grid item xs={2}>
            <MyInput name='hid' label='ID' value={values.hid} disabled={true} />
          </Grid>
        ) : null}

        <Grid item xs={12}>
          <MyInput
            name='hnorth'
            label='North'
            value={values.hnorth}
            onChange={handleInputChange}
            error={errors.hnorth}
          />
        </Grid>

        <Grid item xs={6}>
          <div>
            <MyButton type='submit' text={submitButtonText} />
          </div>
        </Grid>
      </Grid>
    </MyForm>
  )
}
