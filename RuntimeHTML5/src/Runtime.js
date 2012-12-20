/* Copyright (c) 1996-2012 Clickteam
*
* This source code is part of the XXXX exporter for Clickteam Multimedia Fusion 2.
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
var scripts = document.getElementsByTagName("script");
var path=scripts[scripts.length-1].src;
document.srcPath = path.substring(0, path.lastIndexOf("/")+1);

function Runtime(canvasName, appName)
{
	var file=new CFile();
	if (file.openFile(appName))
	{
		window.application=new CRunApp(canvasName, file);
		window.application.load();	
		window.application.startApplication();
	}
}
window['Runtime']=Runtime;
function updateApplication()
{
	window.application.stepApplication();
}
window['updateApplication']=updateApplication;

