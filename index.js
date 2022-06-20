const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { body, validationResult } = require('express-validator');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('./public'));

	
const tasks = [
		{title: 'Hear out the customer', id: 1},
		{title: 'Triage Task', id: 2},
		{title: 'Troubleshoot', id: 3}
		]
 
//READ Request Handlers

app.get('/', (req, res) => {
res.send('Welcome to tech support REST api!!');
});
 
app.get('/api/tasks', (req,res)=> {
res.send(tasks);
});
 
/*  List Tasks from API*/

app.post('/get', (req, res) => {
		console.log('User Clicked Get button');
		const task = tasks.find(c => c.id === parseInt(req.body.tasktoget));
 
		if (!task) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Cannot find any task!</h2>');
		res.send(task);
});
 
/* Add a task */

app.post('/add', (req, res)=> {
	const inputButton=req.body.TaskSelection;
	if(inputButton === "AddTask")
	{
		console.log('Add Task Button clicked');
	} 
	const { error } = validationResult(req.body);
	if (error)
	{
		res.status(400).send(error.details[0].message)
		return;
	}
	const task =
	{
		title:req.body.tasktoadd,
		id: tasks.length + 1
	};
	tasks.push(task);
	res.send(task);
	console.log('Task Added '+ req.body.tasktoadd);
});

/* Delete Task */
app.post('/delete', (req, res)=> {
	const inputButton1=req.body.TaskSelection;
	if(inputButton1 === "DelTask"){
		console.log('Del Task Button clicked');
		console.log('id:'+req.body.tasktodelete);
		const task = tasks.find( c=> c.id === parseInt(req.body.tasktodelete));
		if(!task) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');
		const index = tasks.indexOf(task);
		tasks.splice(index,1); 
		res.send(task);
}});
 
/* This update task is not implemented */
app.post('/put', (req, res) => {
const task = tasks.find(c=> c.id === parseInt(req.body.tasktomodify));
if (!task) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>'); 
const { error } = validationResult(req.body);
if (error){
res.status(400).send(error.details[0].message);
return;
} 
task.title = req.body.tasktomodify;
res.send(task);
});

 
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}..`));