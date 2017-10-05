/**
 * Safei Muslim
 * Yogyakarta , 4 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

 /** including dependencies */
 import React from 'react'
 import InfiniteCalendar from 'react-infinite-calendar'
 import windowSize from 'react-window-size'
 import locale from 'date-fns/locale/id'

 /** datePicker */
 const DatePicker = ({ windowWidth, date, windowHeight, isActive, datePickerPress, selectedDatePicker }) => {
   return (
     <DatePickerWrapper
       isActive={isActive}
       datePickerPress={(e, selected) => datePickerPress(e, selected)}>
       <InfiniteCalendar
         width={windowWidth}
         height={windowHeight}
         selected={date}
         onSelect={(date) => selectedDatePicker(date)}
         disabledDays={[0, 6]}
         autoFocus
         minDate={new Date(2005, 0, 1)}
         locale={{
           blank: 'Pilih tanggal...',
           locale,
           headerFormat: 'dddd, DD MMMM',
           todayLabel: {
             long: ''
           },
           weekdays: 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
           weekStartsOn: 1
         }}
         theme={{
           accentColor: '#ef5656',
           floatingNav: {
             background: 'rgb(193, 13, 13)',
             chevron: '#FFA726',
             color: '#FFF'
           },
           headerColor: '#ef5656',
           selectionColor: 'rgb(255, 139, 139)',
           textColor: {
             active: '#FFF',
             default: '#333'
           },
           todayColor: '#FFA726',
           weekdayColor: 'rgb(255, 139, 139)'
         }} />
     </DatePickerWrapper>
   )
 }

/** wrapper for datePicker */
 const DatePickerWrapper = ({ children, isActive, datePickerPress }) => {
   return (
     <div className={`modal modal-filter modal-dropship is-active effect-display`}>
       <div className='modal-card'>
         <header className='modal-card-head' style={{ backgroundColor: '#ef5656', borderBottom: '0px solid #fff' }}>
           <p className='modal-card-title' style={{ color: '#fff' }}>Pilih Tanggal</p>
           <span onClick={(e) => datePickerPress(e, null)} style={{ color: '#fff', fontWeight: 700 }}>Close</span>
         </header>
         <section className='modal-card-body' style={{ padding: 0, margin: 0, backgroundColor: '#ef5656' }}>
           {children}
         </section>
       </div>
     </div>
   )
 }

 export default windowSize(DatePicker)
