export class Error{

    ok: boolean;
    status: Number;
    statusText: string;
    type:Number;
    url: string;
    _body: string;


// 401 Unauthorized
// user isn't logged in.

// 409 Conflict
// unique name is token like username, email, classroom name, etc.

// 403 Forbidden
// this functionallity is not allowed to this user.

// 400 Bad Request
// the data stream sent by the client to the server didn't follow the rules.

// 304 Not Modified
// redirect without doing the request.

// 404 Not Found

    errorType(){
        if(this.status== 401){
            return 
        }
    }
}