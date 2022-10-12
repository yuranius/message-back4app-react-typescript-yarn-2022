import React, {useState} from 'react'
import {Pagination} from "react-bootstrap";
import {PaginatorPropsTypes} from "../../types/pageTypes";

let Paginator:React.FC<PaginatorPropsTypes> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    //- границы для диапазона вывода страниц------------>

    //? границы для диапазона вывода страниц ------------------>:
    let portionCount = Math.ceil(totalItemsCount / portionSize) //? portionSize - размер порции
    let [portionNumber, setPortionNumber] = useState(1);

    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1; //* левая граница
    let rightPortionPageNumber = portionNumber * portionSize; //* правая граница

    //? <-------------------- границы для диапазона вывода страниц

    let pages = []

    for (let index = 1; index <= pagesCount; index++) {
        pages.push(index)
    }

    
    const disabledPrevLeft = portionNumber <= 1
    let disabledPrevRight = false

    if (pages.length < 0) {
        disabledPrevRight = true
    } else {
        disabledPrevRight = rightPortionPageNumber >= pagesCount
    }



    return (
        <Pagination className='mt-1 d-flex justify-content-center' style={{color: 'red'}}>
            <Pagination.Prev disabled={disabledPrevLeft} onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}/>
            {pages.filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map((p) => {
                return (
                    <Pagination.Item key={p} onClick={() => {
                        onPageChanged(p)
                    }} active={currentPage === p}>{p}</Pagination.Item>
                )
            })}
            <Pagination.Next disabled={disabledPrevRight} onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}/>
        </Pagination>
    )
}

export default Paginator
