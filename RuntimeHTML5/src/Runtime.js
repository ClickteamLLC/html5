
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

