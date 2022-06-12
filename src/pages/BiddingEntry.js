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
  bid: 0,
  bnorth1: '',
  beast1: '',
  bsouth1: '',
  bwest1: '',
  bnorth2: '',
  beast2: '',
  bsouth2: '',
  bwest2: '',
  bnorth3: '',
  beast3: '',
  bsouth3: '',
  bwest3: '',
  bnorth4: '',
  beast4: '',
  bsouth4: '',
  bwest4: '',
  bnorth5: '',
  beast5: '',
  bsouth5: '',
  bwest5: ''
}
const HandrecordForEdit = {
  bid: 0,
  bnorth1: '',
  beast1: '',
  bsouth1: '',
  bwest1: '',
  bnorth2: '',
  beast2: '',
  bsouth2: '',
  bwest2: '',
  bnorth3: '',
  beast3: '',
  bsouth3: '',
  bwest3: '',
  bnorth4: '',
  beast4: '',
  bsouth4: '',
  bwest4: '',
  bnorth5: '',
  beast5: '',
  bsouth5: '',
  bwest5: ''
}
//
// Debug Settings
//
const g_log1 = debugSettings()
//=====================================================================================
export default function BiddingEntry(props) {
  const { bid } = props
  initialFValues.bid = bid
  HandrecordForEdit.bid = bid
  //...................................................................................
  //
  // Validate the fields
  //
  const validate = (fieldValues = values) => {
    //
    //  Load previous errors
    //
    let errorsUpd = { ...errors }
    //
    //  Validate current field
    //
    if ('bnorth1' in fieldValues)
      errorsUpd.bnorth1 = fieldValues.bnorth1 ? '' : 'This field is required.'
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
      // HandaddOrEdit(UpdateValues, resetForm)
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
    if (HandrecordForEdit !== null) {
      if (g_log1) console.log('HandrecordForEdit ', HandrecordForEdit)
      setValues({
        ...HandrecordForEdit
      })
    }
    // eslint-disable-next-line
  }, [HandrecordForEdit])

  //
  //  Disable entry of Owner/Key on update, allow for Entry
  //
  let actionUpdate = false
  if (values.bid !== 0) actionUpdate = true
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
        {/*------------------------------------------------------------------------------ */}
        {actionUpdate ? (
          <Grid item xs={12}>
            <MyInput name='bid' label='ID' value={values.bid} disabled={true} />
          </Grid>
        ) : null}
        {/*------------------------------------------------------------------------------ */}
        {/*  round 1 */}
        {/*------------------------------------------------------------------------------ */}

        <Grid item xs={3}>
          <MyInput
            name='bnorth1'
            label='North'
            value={values.bnorth1}
            onChange={handleInputChange}
            error={errors.bnorth1}
          />
        </Grid>
        {/*------------------------------------------------------------------------------ */}
        <Grid item xs={3}>
          <MyInput
            name='beast1'
            label='East'
            value={values.beast1}
            onChange={handleInputChange}
            error={errors.beast1}
          />
        </Grid>
        {/*------------------------------------------------------------------------------ */}
        <Grid item xs={3}>
          <MyInput
            name='bsouth1'
            label='South'
            value={values.bsouth1}
            onChange={handleInputChange}
            error={errors.bsouth1}
          />
        </Grid>
        {/*------------------------------------------------------------------------------ */}
        <Grid item xs={3}>
          <MyInput
            name='bwest1'
            label='West'
            value={values.bwest1}
            onChange={handleInputChange}
            error={errors.bwest1}
          />
        </Grid>

        {/*------------------------------------------------------------------------------ */}
        {/*  round 2 */}
        {/*------------------------------------------------------------------------------ */}
        <Grid item xs={3}>
          <MyInput
            name='bnorth2'
            label='North'
            value={values.bnorth2}
            onChange={handleInputChange}
            error={errors.bnorth2}
          />
        </Grid>
        {/*------------------------------------------------------------------------------ */}
        <Grid item xs={3}>
          <MyInput
            name='beast2'
            label='East'
            value={values.beast2}
            onChange={handleInputChange}
            error={errors.beast2}
          />
        </Grid>
        {/*------------------------------------------------------------------------------ */}
        <Grid item xs={3}>
          <MyInput
            name='bsouth2'
            label='South'
            value={values.bsouth2}
            onChange={handleInputChange}
            error={errors.bsouth2}
          />
        </Grid>
        {/*------------------------------------------------------------------------------ */}
        <Grid item xs={3}>
          <MyInput
            name='bwest2'
            label='West'
            value={values.bwest2}
            onChange={handleInputChange}
            error={errors.bwest2}
          />
        </Grid>
        {/*------------------------------------------------------------------------------ */}

        {/*  round 3 */}
        {/*------------------------------------------------------------------------------ */}
        <Grid item xs={3}>
          <MyInput
            name='bnorth3'
            label='North'
            value={values.bnorth3}
            onChange={handleInputChange}
            error={errors.bnorth3}
          />
        </Grid>
        {/*------------------------------------------------------------------------------ */}
        <Grid item xs={3}>
          <MyInput
            name='beast3'
            label='East'
            value={values.beast3}
            onChange={handleInputChange}
            error={errors.beast3}
          />
        </Grid>
        {/*------------------------------------------------------------------------------ */}
        <Grid item xs={3}>
          <MyInput
            name='bsouth3'
            label='South'
            value={values.bsouth3}
            onChange={handleInputChange}
            error={errors.bsouth3}
          />
        </Grid>
        {/*------------------------------------------------------------------------------ */}
        <Grid item xs={3}>
          <MyInput
            name='bwest3'
            label='West'
            value={values.bwest3}
            onChange={handleInputChange}
            error={errors.bwest3}
          />
        </Grid>
        {/*------------------------------------------------------------------------------ */}
        {/*------------------------------------------------------------------------------ */}
        {/*  round 4 */}
        {/*------------------------------------------------------------------------------ */}
        <Grid item xs={3}>
          <MyInput
            name='bnorth4'
            label='North'
            value={values.bnorth4}
            onChange={handleInputChange}
            error={errors.bnorth4}
          />
        </Grid>
        {/*------------------------------------------------------------------------------ */}
        <Grid item xs={3}>
          <MyInput
            name='beast4'
            label='East'
            value={values.beast4}
            onChange={handleInputChange}
            error={errors.beast4}
          />
        </Grid>
        {/*------------------------------------------------------------------------------ */}
        <Grid item xs={3}>
          <MyInput
            name='bsouth4'
            label='South'
            value={values.bsouth4}
            onChange={handleInputChange}
            error={errors.bsouth4}
          />
        </Grid>
        {/*------------------------------------------------------------------------------ */}
        <Grid item xs={3}>
          <MyInput
            name='bwest4'
            label='West'
            value={values.bwest4}
            onChange={handleInputChange}
            error={errors.bwest4}
          />
        </Grid>
        {/*------------------------------------------------------------------------------ */}
        {/*------------------------------------------------------------------------------ */}
        {/*  round 5 */}
        {/*------------------------------------------------------------------------------ */}
        <Grid item xs={3}>
          <MyInput
            name='bnorth5'
            label='North'
            value={values.bnorth5}
            onChange={handleInputChange}
            error={errors.bnorth5}
          />
        </Grid>
        {/*------------------------------------------------------------------------------ */}
        <Grid item xs={3}>
          <MyInput
            name='beast5'
            label='East'
            value={values.beast5}
            onChange={handleInputChange}
            error={errors.beast5}
          />
        </Grid>
        {/*------------------------------------------------------------------------------ */}
        <Grid item xs={3}>
          <MyInput
            name='bsouth5'
            label='South'
            value={values.bsouth5}
            onChange={handleInputChange}
            error={errors.bsouth5}
          />
        </Grid>
        {/*------------------------------------------------------------------------------ */}
        <Grid item xs={3}>
          <MyInput
            name='bwest5'
            label='West'
            value={values.bwest5}
            onChange={handleInputChange}
            error={errors.bwest5}
          />
        </Grid>
        {/*------------------------------------------------------------------------------ */}

        {/*------------------------------------------------------------------------------ */}
        <Grid item xs={6}>
          <div>
            <MyButton type='submit' text={submitButtonText} />
          </div>
        </Grid>
        {/*------------------------------------------------------------------------------ */}
      </Grid>
    </MyForm>
  )
}
