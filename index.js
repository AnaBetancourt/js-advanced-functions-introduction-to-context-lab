function createEmployeeRecord(employeeInfo){
    const record = {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return record
}

function createEmployeeRecords(recordsArray){
    return recordsArray.map(record => {
        return createEmployeeRecord(record)
    })
}

function createTimeInEvent(record, dateTime){
    const dateHour = dateTime.split(' ')

    record.timeInEvents.push({
        type: "TimeIn", 
        date: dateHour[0], 
        hour: parseInt(dateHour[1])
    })
    return record
}

function createTimeOutEvent(record, dateTime){
    const dateHour = dateTime.split(' ')

    record.timeOutEvents.push({
        type: "TimeOut", 
        date: dateHour[0], 
        hour: parseInt(dateHour[1])
    })
    return record
}

function hoursWorkedOnDate(employeeRecord, date){
    const timeInSplit = employeeRecord.timeInEvents.find(event => event.date === date).hour.toString().split('')
    const timeOutSplit = employeeRecord.timeOutEvents.find(event => event.date === date).hour.toString().split('')

    const clockIn = parseInt(timeInSplit.filter(num => num > 0).join(''))
    const clockOut = parseInt(timeOutSplit.filter(num => num > 0).join(''))
    
    return clockOut - clockIn
}

function wagesEarnedOnDate(employeeRecord, date){
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor(record){
    const inTimes = record.timeInEvents
    const wages = inTimes.map(card => {return card.date}).map(date => {
        return wagesEarnedOnDate(record, date)
    })

    return wages.reduce(function(total, current){return total + current})
}

function calculatePayroll(employees){
    const totalWages = employees.map(employee => {
        return allWagesFor(employee)
    })

    return totalWages.reduce(function(total, current){return total + current})
}

function findEmployeeByFirstName(employees, name){
    return employees.find(employee => employee.firstName === name)
}