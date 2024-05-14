import React, { useEffect, useState } from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { useGrooms } from '../../context/groomContext'

const PaginationCom = () => {

  const { setPage, page, totalPages } = useGrooms()
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(6)
  const [firstRender, setFirstRender] = useState(true);
  const handlePage = (page) => {
  
    setPage(page)
  }
  const handleNextPrev = (action) => {
    // console.log("action",action)

    setPage(action == "next" ? page + 1 : page - 1)
    setStart(start + 6)
    setEnd(end + 6)
  }


  function generateSequentialArray(num) {
    const resultArray = [];
    for (let i = 1; i <= num; i++) {
      resultArray.push(i);
    }
    return resultArray;
  }

  if (totalPages<=10)  return <></>
  return (
    <Pagination
      aria-label="Page navigation example"
      size="sm"
    >
      {/* <PaginationItem>
        <PaginationLink
          first
          href="#"
        />
      </PaginationItem> */}
      <PaginationItem>
        <PaginationLink
          href="#"
          previous
          onClick={() => handleNextPrev("prev")}
        />
      </PaginationItem>
      {
        generateSequentialArray(50).slice(end-6, end ).map((page, index) => {
          return <PaginationItem key={index}>
            <PaginationLink href="#" onClick={() => handlePage(start+index===0?1:start+index+1)}>
              {start+index===0?1:start+index+1}
            </PaginationLink>
          </PaginationItem>
        })
      }


      <PaginationItem>
        <PaginationLink
          href="#"
          next
          onClick={() => handleNextPrev("next")}
        />
      </PaginationItem>
      {/* <PaginationItem>
        <PaginationLink
          href="#"
          last
        />
      </PaginationItem> */}
    </Pagination>
  )
}

export default PaginationCom