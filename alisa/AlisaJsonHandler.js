'use strict';

let uuid = require('uuid');

/**
 * Helper class to generate an AlexaResponse.
 * @class
 */
class AlisaJsonHandler {

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
    constructor(opts) {

        if (opts === undefined)
            opts = {};

        if (opts.context !== undefined)
            this.context = this.checkValue(opts.context, undefined);

        if (opts.request !== undefined)
            this.request = this.checkValue(opts.request, undefined);
        else
            this.request = {
            "header": {
            },
            ////"payload": this.checkValue(opts.payload, {})
        };

        // No endpoint in an AcceptGrant or Discover request
        ///if (this.request.header.name === "AcceptGrant.Response" || this.event.header.name === "Discover.Response")
            ////delete this.event.endpoint;

    }

    /**
     * Add a property to the context.
     * @param opts Contains options for the property.
     */
    addContextProperty(opts) {

        if (this.context === undefined)
            this.context = {properties: []};
        ////console.log("this.context",this.context);
        this.context.properties.push(opts);
    }

    

    /**
     * Creates a property for the context.
     * @param opts Contains options for the property.
     */
    createContextProperty(opts) {
        return {
            'namespace': this.checkValue(opts.namespace, "Alexa.EndpointHealth"),
            'name': this.checkValue(opts.name, "connectivity"),
            'value': this.checkValue(opts.value, {"value": "OK"}),
            'timeOfSample': new Date().toISOString(),
            'uncertaintyInMilliseconds': this.checkValue(opts.uncertaintyInMilliseconds, 0)
        };
    }

   


    /*
    
    클래스를 하나 만들고
    클래스 이름은 AlisaJsonHandler

    생성자에서 Response 제이슨을 넣어주면 
    이 랩핑 클래스가 그걸 갖고있고

    맵핑관계만 가지고 있어

    세션에 데이터를 어펜드 하고 삭제하고 
    프로퍼티를 읽어와야함

    writeJson이라는 메서드를 하면 

    Response로 줘야하는 json이 만들어져야함

    sessionAppend에 
    this.sessions에 어레이로 들어감

    기존에 있던 객체에 세션을 붙여버린다

    클래스의 롤은

    요청 제이슨을 가지고 응답 제이슨을 매니퓰레이션한다 
    
    id/pw
    
    암호화가 필요할수 있음

    다이나모 디비에 정상로긴한경우에만 생기게 변경하자
    


    */
   writeJson(){

   }

    /**
     * Get the composed Alexa Response.
     * @returns {AlisaJsonHandler}
     */
    get() {
        return this;
    }
}

module.exports = AlisaJsonHandler;