// -*- coding: utf-8 -*-

// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.

// Licensed under the Amazon Software License (the "License"). You may not use this file except in
// compliance with the License. A copy of the License is located at

//    http://aws.amazon.com/asl/

// or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific
// language governing permissions and limitations under the License.

'use strict';

let uuid = require('uuid');


/**
 * Helper class to generate an AlexaResponse.
 * @class
 */
class AlisaResponse {

    /**
     * Check a value for validity or return a default.
     * @param value The value being checked
     * @param defaultValue A default value if the passed value is not valid
     * @returns {*} The passed value if valid otherwise the default value.
     */
    checkValue(value, defaultValue) {

        if (value === undefined || value === {} || value === "")
            return defaultValue;

        return value;
    }

    /**
     * Constructor for an Alexa Response.
     * @constructor
     * @param opts Contains initialization options for the response
     */
    
    constructor(opts,access_token) {
        
        const session = {
            "session": {
                "session_id": this.checkValue(opts.session_id,"session_id"),
                "message_id": this.checkValue(opts.message_id,"message_id"),                   //number
                "user_id": this.checkValue(opts.user_id,"user_id"),
                "access_token" : this.checkValue(access_token,"access_token"),
                },
        };

        if (opts === undefined)
            opts = {};

        if (opts.context !== undefined)
            this.context = this.checkValue(opts.context, undefined);

        if (opts.event !== undefined)
            this.event = this.checkValue(opts.event, undefined);
        else
            this.event = {
            "header": {
                "namespace": this.checkValue(opts.namespace, "Yandex.alisa"),
                "name": this.checkValue(opts.name, "Response"),
                "messageId": this.checkValue(opts.messageId, uuid()),
                
            },
            "session" : this.checkValue(session, {}),
            "payload": this.checkValue(opts.payload, {})
        };

    }

    
    createResponse(message,session, access_token) {
        
        
        const messageText = {
                        "text": this.checkValue(message, "text"),
                        "tts": this.checkValue(message, "tts"),
                        "end_session": this.checkValue(false, "end_session"),
        }
        //console.log("session what I send", session);
        return  { 
                    "response": messageText,
                    "session": 
                    {
                        ...session,
                        "access_token" : this.checkValue(access_token, ""),
                    },
                    "version": "1.0",
                    "data" : "hahahahahaha",
                }
    }
        
    


    createButtonReponse(opts, message, session) {
        return { 
                    "response": 
                    {
                        "text": this.checkValue(message, "text"),
                        "tts": this.checkValue(message, "tts"),
                        "end_session": this.checkValue(false, "end_session"),
                        "buttons": [
                            {
                                "title": this.checkValue(opts.buttons[0].button_title, "button_title"),
                                "payload": this.checkValue(opts.buttons[0].payload, "payload"),
                                /////"url": this.checkValue(opts.buttons.url, "url"),
                                //////"hide": this.checkValue(opts.buttons.hide, "hide"),
                            },
                            {
                                "title": this.checkValue(opts.buttons[1].button_title, "button_title"),
                                "payload": this.checkValue(opts.buttons[1].payload, "payload"),
                                /////"url": this.checkValue(opts.buttons.url, "url"),
                                //////"hide": this.checkValue(opts.buttons.hide, "hide"),
                            }
                            
                        ],

                    },
                    "session": session,
                    "version": "1.0",
                }
    }

    /**
     * Get the composed Alexa Response.
     * @returns {AlisaResponse}
     */
    get() {
        return this;
    }
}

module.exports = AlisaResponse;