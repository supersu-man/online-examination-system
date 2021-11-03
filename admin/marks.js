

var csvData = []
$(()=>{
    $.get("http://localhost:3000/getGrades",(data) => {
        
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            getCSVdata(()=>{
                evaluate(element, (score) => {
                    setData(element['studentId'],score*10)
                    console.log(element)
                    console.log(score)
                })
            })
        }
    })

    
})



function getCSVdata(callback){
    $.get("http://localhost:3000/getCSV",(data) => {
        csvData = data
        callback()
    })
}

function evaluate(data, callback){
    var score = 0
    for (let index = 1; index <= 4; index++) {
        const element = data[`q${index}`];
        if(isAnswerTrue(element, getAnswer(index))){
            score++
        }
    }
    callback(score)
}

function isAnswerTrue(userOption, answer){
    if((userOption == 'A' && answer=="option1") || 
    (userOption == 'B' && answer=="option2") ||
    (userOption == 'C' && answer=="option3") ||
    (userOption == 'D' && answer=="option4")){
        return true
    } else{
        return false
    }
}


function setData(username, score){
    var q = `<tr> <td>${username}</td> <td>${score}</td> </tr>`
    $('.tablebody').append(q)
}

function getAnswer(num){
    try {
        const answer = csvData[num-1]['answer'];
        return answer
    } catch (error) {}
}