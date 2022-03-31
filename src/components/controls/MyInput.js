//
//  Libraries
//
import { TextField } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
// Debug Settings
//
const g_log1 = debugSettings(true)
//=====================================================================================
export default function MyInput(props) {
  if (g_log1) console.log('Start MyInput')

  const { name, label, value, error = null, onChange, ...other } = props
  if (g_log1) console.log('name ', name, 'value ', value, 'label ', label)
  return (
    <TextField
      variant='outlined'
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  )
}
