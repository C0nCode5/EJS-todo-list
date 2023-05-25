// swap to import statements 
const express = require('express');
const mongoose = require('mongoose');
const day = require(__dirname + '/date.js')
const _ = require('lodash');

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

async function main() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/todolistDB'); // connection String with database specified
    await mongoose.connect('mongodb+srv://admin-connor:Test1234@todolist0.6gk1dsw.mongodb.net/todolistDB'); // connection String with database specified

}

main().then(async () => {

try {

    // creating schema for database 
    const itemsSchema = new mongoose.Schema({
        name: {
            type: String,
        }
    });
    const listSchema = new mongoose.Schema({
        name: {
            type: String,
        },
        items: []
    })

    // creating a model of the schema
    const itemModel = mongoose.model('Item', itemsSchema);
    const listModel = mongoose.model('List', listSchema);

    // dummy data for testing
    function dummyData(data) {
    return new itemModel({
        name: data
    })};

   const item1 = dummyData('Welcome to the todo List');
   const item2 = dummyData('Press the Button to add tasks');
   const item3 =  dummyData('<--- click here to delete tasks');
   const itemArr = [item1, item2, item3];
   let defaultItems = [item1, item2, item3];
   let currDate = day.getDay1(); 


app.get('/', async function(req, res,) {
    const items = await itemModel.find().then(items => {return items})
    if(items === "/favicon.ico"){
         res.redirect('/')
    }else if(items.length === 0) {
        itemModel.insertMany(itemArr).then(() => {console.log('items added')}).catch(err => console.log(err));
        res.redirect('/')
    }else {
        res.render('weekday', {listType: currDate, items: items});

    }
});

app.get('/About', function(req, res,) {
    res.render('aboutPage');
});

app.get('/:customListName', async function(req, res) {
    const customListName = _.capitalize(req.params.customListName);
    const data = await listModel.findOne({name: customListName});

       if(data === null) {
        const list = new listModel({
            name: customListName,
            items: defaultItems
        })
            list.save();
            res.redirect(`/${customListName}`);
    } else if(data.name === customListName) {
        res.render('weekday', {listType: customListName, items: data.items})
    }
})



app.post('/', async (req, res) => {

    const itemName = req.body.newTask
    const listName = req.body.button
    const newItem = dummyData(itemName)

    if(listName === currDate) {
        newItem.save().then(() => {console.log('new item added')}).catch(err => console.log(err));
        itemArr.push(newItem);
        res.redirect('/');
    }else {
        const list = await listModel.findOne({name: listName});
        list.items.push(newItem);
        list.save();
        res.redirect(`/${listName}`)
    }
});

app.post('/delete', async (req, res) => {
    const {checkbox, listName} = req.body;

    if(listName === currDate) {
        await itemModel.findOneAndDelete({name: checkbox}).then(() => console.log(`deleted entry with name: ${checkbox}`)).catch((err) => console.log(err));
        res.redirect('/')
    }else {
        const data = await listModel.findOneAndUpdate({name: listName}, {$pull: {items: {name: checkbox}}}).then((result) => {console.log(result)});
        console.log(data)
        //  const data = await listModel.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkbox}}}).then(console.log)
        res.redirect(`/${listName}`)
        // .then(() => {console.log(`item deleted with id ${checkbox}`)}).catch((err) => {console.log(err)})
    }


});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => {
    console.log('server running on port!' + port);
})
} catch (err) {
    console.log(err)
} finally {}
});