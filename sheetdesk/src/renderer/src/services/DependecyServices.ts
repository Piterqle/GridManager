const formatDate = (date: string) => {
    const [YYYY, MM, dd] = date.split("-")
    
    const foramtedDate = `${dd}/${MM}/${YYYY}`
    return foramtedDate
}

const formatCalendar = (date: string) => {
    const [dd, MM, YYYY] = date.split("/")

    const foramtedDate = `${YYYY}-${MM}-${dd}`
    return foramtedDate
}


export { formatDate, formatCalendar }