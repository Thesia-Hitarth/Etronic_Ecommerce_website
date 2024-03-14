import { useState } from "react";

export const UsePagination=(perPagerecords,totalPagerecords)=>{
    const totalPages = Math.ceil(totalPagerecords/perPagerecords);
    const[startPageIndex,setstartPageIndex]=useState(0);
    const[endPageIndex,setendPageIndex]=useState(perPagerecords -1);
    const[currentPageIndex,setcurrentPageIndex]=useState(1);

    const displaypage=(pageNo)=>{
        setcurrentPageIndex(pageNo);
        let end_page_index=(perPagerecords * pageNo)-1;
        let start_page_index=(perPagerecords * pageNo)-perPagerecords;
        setstartPageIndex(start_page_index);
        if(end_page_index>totalPagerecords){
            setendPageIndex(end_page_index);
        }else{
            setendPageIndex(end_page_index);
        }
    }
    return(
        totalPages,startPageIndex,endPageIndex,currentPageIndex,displaypage
    )
}