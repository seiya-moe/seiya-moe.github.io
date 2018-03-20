// onload.min.js
function bindReady(handler){var called=false;function ready(){if(called)return;called=true;handler();}
function tryScroll(){if(called)return;if(!document.body)return;try{document.documentElement.doScroll('left');ready();}
catch(e){setTimeout(tryScroll,0);}}if(document.addEventListener){document.addEventListener('DOMContentLoaded',function(){ready();},false);}
else if(document.attachEvent){if(document.documentElement.doScroll&&window==window.top){tryScroll();}
document.attachEvent('onreadystatechange',function(){if(document.readyState==='complete'){ready();}});}
if(window.addEventListener)window.addEventListener('load',ready,false);else if(window.attachEvent)
window.attachEvent('onload',ready);else window.onload=ready;}var readyList=[];function onReady(handler)
{if(!readyList.length){bindReady(function(){for(var i=0;i<readyList.length;i++){readyList[i]();}});}readyList.push(handler);}

function b64EncodeUnicode(str) {
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,function(p0,p1){
		if(p0){} return String.fromCharCode('0x'+p1);
	}));
}

var editor, schema_url;
onReady(function(){
	JSONEditor.defaults.theme = 'bootstrap3';
	JSONEditor.defaults.iconlib = 'fontawesome4';
	schema_url = location.origin+'/assets/json/projects.json';
	editor = new JSONEditor(document.querySelector('#editor_holder'),{
		no_additional_properties: true,
		disable_edit_json: true,
		ajax: true,
		schema: {
			"$schema": "http://json-schema.org/draft-04/schema#",
			"title": "Projects",
			"type": "object",
			"properties": {
				"ongoing": {
					"title": "Ongoing",
					"$ref": schema_url,
					"options": {
						"collapsed": true
					}
				},
				"stalled": {
					"title": "Stalled",
					"$ref": schema_url,
					"options": {
						"collapsed": true
					}
				},
				"planned": {
					"title": "Planned",
					"$ref": schema_url,
					"options": {
						"collapsed": true
					}
				},
				"completed": {
					"title": "Completed",
					"$ref": schema_url,
					"options": {
						"collapsed": true
					}
				},
				"dropped": {
					"title": "Dropped",
					"$ref": schema_url,
					"options": {
						"collapsed": true
					}
				}
			}
		}
	});
	document.querySelector('#cfg_file').onchange = function(e) {
		filename = document.querySelector('#cfg_file').files[0].name;
		mimetype = document.querySelector('#cfg_file').files[0].type;
		var reader = new FileReader();
		reader.readAsText(e.target.files[0]);
		reader.onload = function(e){
			projects_json = JSON.parse(e.target.result);
			editor.setValue(projects_json);
		};
	}
	document.querySelector('#submit').addEventListener('click',function() {
		var cfg = '\ufeff'+(JSON.stringify(editor.getValue(),null,'\t').replace(/\n/g,'\r\n'));
		var jlink = document.createElement('a');
		jlink.id = 'download_cfg';
		jlink.download = 'projects.json';
		jlink.href = 'data:application/json;base64,'+b64EncodeUnicode(cfg);
		document.body.appendChild(jlink);
		jlink.click();
		document.body.removeChild(jlink);
	});
});