// exports.findAll = function(req, res) {
//     res.send([{name:'wine1'}, {name:'wine2'}, {name:'wine3'}]);
// };

// exports.findById = function(req, res) {
//     res.send({id:req.params.id, name: "The Name", description: "description"});
// };

var mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient 

var Server = mongo.Server,
    // Db = mongo.Db,
    BSON = mongo.BSONPure;

// var server = new Server('localhost', 27017, {auto_reconnect: true});
// db = new Db('mainframe', server);

var db
MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
  if (err) return console.log(err)
  db = client.db('Login_DB') // whatever your database name is
});

// db.open(function(err, db) {
//     if(!err) {
//         console.log("Connected to 'Mainframe' database");
//         db.collection('customer', {strict:true}, function(err, collection) {
//             if (err) {
//                 console.log("The 'Customer' collection doesn't exist. Creating it with sample data...");
//                 populateDB();
//             }
//         });
//     }
// });

exports.findById = function(req, res) {
    
    // console.log('Retrieving customer: ' + ssn);
    db.collection('Login_Details', function(err, collection) {
        collection.findOne({ 'User_Name': User_Name }, function(err, item) {
            console.log(item);
            // if(User_Name == item.User_Name )
            // {
            //     console.log("Barobr data ahe");
                
            // }
            // else{
            //     console.log("Chukicha data ahe")
                
            // }
            // res.send(item);
            try {
                if(User_Name == item.User_Name)
                {
                    console.log("Barobr data ahe");
                }
                else{
                    console.log("Chukicha data ahe");
                }
            }
            catch(e) {
                e.error;
                console.log("Chukicha data ahe");
            }
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('Login_Details', function(err, collection) {
        collection.find().toArray(function(err, items) {
            console.log(items);
            res.send(items);
        });
    });
};

exports.authenticate = function(req, res) {
    var credentials=req.body;
    var data=JSON.stringify(credentials);
    console.log(credentials);
    console.log(data);

    db.collection('Login_Details', function(err, collection) {
        // collection.find().toArray(function(err, items) {
        //     console.log(credentials.User_Name);
        //     console.log(items);
        //     console.log(items[0]);
        //     console.log(items[0].Password);
            
        //     // console.log(items[3].User_Name);
        //     if(credentials.User_Name == items[3].User_Name && credentials.Password == 'items[3].Password'){
                
        //         console.log(credentials.User_Name);
        //         console.log(items[3].User_Name);
        //         console.log(credentials.Password);
        //         console.log(items[3].Password);
        //         console.log('match zala re');
        //     }
        //     else{
        //         console.log('nahi match zala');
        //         console.log(credentials.User_Name);
        //         console.log(items[3].User_Name);
        //         console.log(credentials.Password);
        //         console.log(items[3].Password);
        //     }
        //     // console.log(items);
        //     // res.send(items);
        // });



        collection.findOne({ User_Name: credentials.User_Name , Password:credentials.Password } , function(err, item) {
            
            console.log(credentials.User_Name);
            console.log(credentials.Password);
           
            
    //-------------------------- Actual Running Code--------------------------------------------------------------
            if (!item) {
                console.log('Record not found');
                res.send('Fail');
                console.log('match nahi hot ahe');
            }
            else{
                console.log('Record found');
                console.log(item);
                console.log(item.User_Name);
                console.log(item.Password);
                console.log(item.Is_Admin);
                console.log('Data match hotoy');
                if(item.Is_Admin == 1){
                  console.log('Ha tr super admin ahe');
                  res.send('Success with admin')
                     }
                 else {
                   console.log('Normal user ahe ha');
                   res.send('Success');
                     }
                 }
    //------------------------------------------------------------------------------------------------------       

            // if(err){ 
            //     res.send('Data not found');
            //     console.log('Username and password not found');
            // }


// Running code

//---------------------------------------------------------------------------------------------
            // try{
            //     console.log(item);
            //     console.log(item.User_Name);
            //     console.log(item.Password);
            //     console.log(item.Is_Admin);
            //     console.log('Data match hotoy');
            //     if(item.Is_Admin == 1){
            //         console.log('Ha tr super admin ahe');
            //     }
            //     else {
            //         console.log('Normal user ahe ha');
            //     }
            // }
            // catch(e){
            //     e.error;
            //     console.log(item);
            //     console.log(item.User_Name);
            //     console.log(item.Password);
            //     console.log('match nahi hot ahe');
            // }

//-----------------------------------------------------------------------------------------------



            // if(User_Name == item.User_Name 
            // {
            //     console.log("Barobr data ahe");
                
            // }
            // else{
            //     console.log("Chukicha data ahe")
                
            // }
            // res.send(item);
            // try {
            //     if(User_Name == item.User_Name)
            //     {
            //         console.log("Barobr data ahe");
            //     }
            //     else{
            //         console.log("Chukicha data ahe");
            //     }
            // }
            // catch(e) {
            //     e.error;
            //     console.log("Chukicha data ahe");
            // }
        })
        // .catch(err =>{
        //     console.log('error ahe ithe dada')
        // })
        ;

    });
};

exports.addWine = function(req, res) {
    var wines = req.body;
    console.log('Adding customer: ' + JSON.stringify(wines));
    db.collection('Login_Details', function(err, collection) {
        collection.insert(wines, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                // console.log('Success: ' + JSON.stringify(result[0]));
                console.log('Success');
                res.send(result[0]);
            }
        });
    });
}



