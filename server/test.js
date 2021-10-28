import csv from 'csv-parser';
import { createReadStream } from 'fs';
import { db } from './db.js'

function saveData(){
    db.query("INSERT INTO marks (studentId) VALUES ('221910308056');")
}
function saveOptionData(data,studentId){
    db.query(`UPDATE marks SET q${data['qnum']} = '${data['option'].slice(-1)}' WHERE studentId = '${studentId}';`)
}

saveOptionData({ qnum: 2, option: 'optionB' },'221910308056')

