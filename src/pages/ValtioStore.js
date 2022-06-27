import { proxy } from 'valtio'

const ValtioStore = proxy({
  //
  //  Options
  //
  v_OptionsOwner: [],
  v_OptionsRefLinks: [],
  v_OptionsGroup1: [],
  v_OptionsGroup2: [],
  v_OptionsGroup3: [],
  //
  //  State
  //
  v_Page: 'QuestionList',
  v_PagePrevious: ''
})

export { ValtioStore }