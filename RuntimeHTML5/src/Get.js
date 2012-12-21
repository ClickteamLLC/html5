
/* Get object (James) */
/* Copyright (c) 1996-2012 Clickteam
*
* This source code is part of the HTML5 exporter for Clickteam Multimedia Fusion 2.
* 
* Permission is hereby granted to any person obtaining a legal copy 
* of Clickteam Multimedia Fusion 2 to use or modify this source code for 
* debugging, optimizing, or customizing applications created with 
* Clickteam Multimedia Fusion 2. Any other use of this source code in prohibited.
* 
* Any other use of this source code is prohibited. This source code may not be redistributed.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
* IN THE SOFTWARE.
*/

this.Get = CRunGet;

function CRunGet()
{	
    this.postData = {};
    this.response = '';
    this.pending = false;

    this.completeEvent = -1;
}

CRunGet.prototype = CServices.extend(new CRunExtension(),
{
	getNumberOfConditions:function()
	{
		return 3;
	},

    action: function(num, act)
    {
        switch(num)
        {
        case 0: /* Request URL */

            if (this.pending)
                return;

            var url = act.getParamExpString(this.rh, 0),
                request = new XMLHttpRequest(),
                that = this;

            request.onreadystatechange = function()
            {
                if(request.readyState !== 4)
                    return;

                that.pending = false;

                that.response = request.status !== 200 ? '' : request.responseText;

                that.completeEvent = that.ho.getEventCount();
                that.ho.generateEvent(0, 0);
            }

            var data = '';

            for(var key in this.postData)
            {
                if(data.length)
                    data += '&';

                data += key + '=' + encodeURI(this.postData[key]);
            }

            this.postData = {};

            if(data.length)
            {
                request.open('POST', url, true);

                request.setRequestHeader
                    ('Content-Type', 'application/x-www-form-urlencoded');

                request.setRequestHeader
                    ('Content-Length', data.length);

                request.send(data);
            }
            else
            {
                request.open('GET', url, true);
                request.send(null);
            }

            this.pending = true;

            break;

        case 1: /* Add POST data */

            var key = act.getParamExpString(this.rh, 0),
                value = act.getParamExpString(this.rh, 1);

            this.postData[key] = value;

            break;
        };
    },

	condition: function(num, cnd)
	{
		switch (num)
		{
        case 0: /* On request complete */

            return (this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0 ||
                        (this.ho.getEventCount() == this.completeEvent);

        case 1: /* Request pending? */

            return this.pending;
		};

		return false;
	},
	
	expression:function(num)
	{
		switch (num)
		{
        case 0: /* Response$ */
            return this.response;

        case 1: /* URLEncode$ */
            return encodeURI('' + this.ho.getExpParam());
		};
	}
});

