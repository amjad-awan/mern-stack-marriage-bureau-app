import React, { useEffect, useState } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useGrooms } from "../../context/groomContext";

const PaginationCom = () => {
  const { setPage, page, totalGrooms } = useGrooms();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(6);
  const [currentItem, setCurrentItem] = useState(0);
  const [firstRender, setFirstRender] = useState(true);
  const totalPages = Math.ceil(totalGrooms / 5);
  const handlePage = (page, index) => {
    setCurrentItem(index);
    setPage(page);
  };
  const handleNextPrev = (action) => {
    // console.log("action",action)

    if (action !== "next" && page < 7) {
      return;
    }

    setPage(action == "next" ? page + 6 : page - 6);
    setStart(action == "next" ? start + 6 : start - 6);
    setEnd(action == "next" ? end + 6 : end - 6);
  };

  function generateSequentialArray(num) {
    const resultArray = [];
    for (let i = 1; i <= num; i++) {
      resultArray.push(i);
    }
    return resultArray;
  }

  if (totalGrooms <= 5) return <></>;
  return (
    <Pagination aria-label="Page navigation example" size="sm">
      {/* <PaginationItem>
        <PaginationLink
          first
          href="#"
        />
      </PaginationItem> */}
      <PaginationItem>
        <PaginationLink
          disabled={page === 1}
          previous
          onClick={() => handleNextPrev("prev")}
        />
      </PaginationItem>
      {generateSequentialArray(totalGrooms)
        .slice(totalPages < 7 ? 0 : end - 6, totalPages < 7 ? 3 : end)
        .map((p, index) => {
          return (
            <PaginationItem key={index}>
              <PaginationLink
                className={`${index == currentItem ? "active" : ""}`}
                active={index == currentItem ? true : false}
                onClick={() => {
                  handlePage(
                    start + index === 0 ? 1 : start + index + 1,
                    index
                  );
                }}
              >
                {start + index === 0 ? 1 : start + index + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}
      <PaginationItem>
        <PaginationLink
          disabled={page === totalPages || totalPages < 7}
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
  );
};

export default PaginationCom;
