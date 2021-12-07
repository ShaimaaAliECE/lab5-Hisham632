const express = require('express');
let jobsJSON  = require('./jobs.json');
const app = express();
app.use(express.static('FrontEnd'));



// Q1. The categories mentioned in all the jobs and how many times each category was mentioned.
app.get('/categories', (req, res) => {
    let count = {};

    for (let job in jobsJSON)
    {

        for(let num of jobsJSON[job].categories)
        {

            if(num in count)
            {
                count[num]++;
            }
            else
            {
                count[num] = 1;
            }
        }
    }

    res.send(JSON.stringify(count));

})



//Q3. All jobs in a given city (sent in the querystring)
app.get('/jobInCity', (req,res)=> {
    let jobsincity = [];

    for (let job in jobsJSON)
    {
        if (jobsJSON[job].title.includes(req.query.city))
        {
            jobsincity.push(job);   
        }
    }
    res.json(
        {
            ListAllJobCities: jobsincity
        }
    );
});



//Q2. All the jobs with a given category (sent as a parameter)

app.get('/:category', (req, res) => {
    let jobList = {};

    for (let job in jobsJSON)
    {
        for(let category of jobsJSON[job].categories)
        {

            if (req.params.category==category)
            {
                jobList[job] = jobsJSON[job];
            }
        }
    }

    res.send(jobList);

})




app.listen(80);