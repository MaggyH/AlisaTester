
'use strict';


const app = require('express')();
const bodyParser = require('body-parser');
const AlisaResponse = require('./alisa/AlisaResponse');
const AlisaJsonHandler = require('./alisa/AlisaJsonHandler');


app.use(bodyParser.json());

const port = process.env.PORT || 5000;





app.post('/', async (req, res) => {
    // Returns hello message
    

    console.log("--------req.body.session-------",req.body.session);
    const { session_id, skill_id, user_id, message_id } = req.body.session;
    let message = "Welcome,please input your Yujin ID.";
    const access_token = "";

    let adr = new AlisaResponse(req.body.session,access_token);
    console.log("---------req.body.request----",req.body.request);
    //let Response = adr.createResponse(message, req.body.session);
    
    const payload = req.body.request.payload;
    const command = req.body.request.command;

    console.log("req.body.request.payload", payload );
    const opt = {
      "buttons": [
          {
            "button_title": "Yes,I'd love to",
            "payload" : "selected_A",
          },
          {
            "button_title": "No,I don't want",
            "payload" : "selected_B",
          }

      ],
    }

    
    let Response;

    /*
    if(payload)
    {
      if(payload == "selected_A")
      {
        message = "A is selected";
      }
      else{
        message = "B is selected";
      }
      
      Response = adr.createResponse(message, req.body.session);

    }
    else{
    
      Response = adr.createButtonReponse(opt, message, req.body.session);
    
    }

    */

    Response = adr.createResponse(whatResponse(command, req.body.request), req.body.session, access_token);

    console.log("----------response--------",Response);

    return res.json(Response);
});

let credentials;

const whatResponse = (command, request) => {

  const invokeSentences = [
    "",
    "hello",
    "hi",
    "welcome",
    "ask iclebo",
    "hey iclebo",
    "iclebo",
    "iclebo start",
  ];
  
  console.log("-------nlu------", request.nlu.entities);

  if(invokeSentences.includes(command))
  {
      //welcome
      return "Welcome,please enter your Yujin Account ID.";
  }
  else if(command == "Yes,I'd love to")
  {
      //accept
      return "okay. wait a second.";
  }
  else if(command == "No,I don't want")
  {
      //denied
      return "okay. bye~ ";
  }
  else
  {

      /// session value 
      /// id/pw session saved
      /// user input -> request
      /// we response
       
    if(credentials){
        credentials = {
          ...credentials,
          "pw" : command,
        }
    }
    else{
        credentials = {
          "id" : command
        }
    }

    let context = {properties: []};
    let ajh = new AlisaJsonHandler({request, context});
    ajh.addContextProperty(credentials);

    console.log("-------context------", context);




    return "please enter password.";
  }


}






app.use('*', function (req, res) {
  res.sendStatus(404);
});

app.listen(port);







const testAlexaJsonHandler = (request) => {
}
///testAlexaJsonHandler();



exports.handler = async function(event, context) {

    // Dump the request for logging - check the CloudWatch logs
    console.log("index.handler request  -----");
}

