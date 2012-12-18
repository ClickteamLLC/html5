
/* Get object (James) */

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

