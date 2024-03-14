// import React, { useState } from 'react'
import Pagination from '@mui/material/Pagination';
import './css/style.css'

function Page({totalpds,pdperpage}) {
    
  return (
    <>
        <Pagination onChange={()=>{}}  count={Math.ceil(totalpds/pdperpage)} />
    </>
  )
}

export default Page
