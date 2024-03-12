const dateFormat = (date, format) => {
    // 包装日期实例
    const dateInstance = new Date(date)
    const year = dateInstance.getFullYear(),
        month = dateInstance.getMonth() + 1,
        day = dateInstance.getDate()
    format = format.replace(/yyyy/, year)
    format = format.replace(/mm/, month)
    format = format.replace(/dd/, day)
    return format
}