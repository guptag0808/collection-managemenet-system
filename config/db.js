const mongoose= require('mongoose')
const connection= mongoose.connect('mongodb+srv://saurabh:saurabh@cluster0.hovcp.mongodb.net/collection-management?retryWrites=true&w=majority&appName=Cluster0')

module.exports={
	connection
}