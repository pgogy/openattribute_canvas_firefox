triplesHtml = "";

var n = document;
var rootNode = n;
var triple_store = new Array();
var license_found = false; 
var img_counter = 0;

function add_triple(data_triple){
		
	if (triple_store.length == 0) {
	
		triple_store.push(data_triple);	
		
	}else{
				
		var triple_not_found = false;
	
		for (var x = 0; x < triple_store.length; x++) {
			
			if (triple_store[x][0] != data_triple[0]) {
					
				triple_store.push(data_triple);
				triple_not_found = false;
				break;
			
			}
		
			if(triple_store[x][1]!=data_triple[1]){
							
				triple_not_found = true;
				
			}else{
				
				triple_not_found = false;
				break;
				
			}
			
		}
		
		if(triple_not_found){
	
			triple_store.push(data_triple);
			if(data_triple[1]=="license"){
			
				license_found = true;
			
			}
			
		}
		
	}
	
}

meta_passed = false;

var page_process = new function page_process() {

	this.init = function (content){
	
		triple_store = new Array();
			
		var n = content;
								
		var rootNode = n;
		
		while (n) {

			if (n.nodeName != "LINK") {
			
				if (n.hasAttributes()) {
				
					temp_attr = {};
					
					if (n.attributes.length != 1) {
					
						var attr_names = ['title', 'class','license cc:license', 'about', 'src', 'resource', 'href', 'instanceof', 'typeof', 'rel', 'rev', 'property', 'content', 'datatype'];
						rdfa_found = 0;
						
						//if (n.getAttribute("class") == "external text" && n.getAttribute("rel") == "nofollow") {
										
						//	value = n.getAttribute("href");
						//	attribute = "license";
						//	asset = document.location.href;
							
						//	triple_array = Array(asset, "license", value);
						//	add_triple(triple_array);
						
						//}
						
						for (var i = 0; i < attr_names.length; i++) {
						
							if (n.getAttribute(attr_names[i]) != null) {
							
								temp_attr[attr_names[i]] = n.getAttribute(attr_names[i]);
								
								if (n.getAttribute(attr_names[i]) != "nofollow") {
								
									asset = "";
									attribute = "";
									value = "";
									
									if (n.getAttribute(attr_names[i]).indexOf(":") == 2) {
									
										attribute = n.getAttribute(attr_names[i]).substring(3);
										
									}
									
									if(n.getAttribute(attr_names[i]).indexOf("wikipedia.org/wiki/public_domain") != -1){
									
										value = n.innerHTML;
										attribute = "license";
										asset = content.location.href;
																			
									}
									
									if(n.getAttribute("class")=="licensetpl_short"){
									
										value = n.innerHTML;
										attribute = "license";
										asset = content.location.href;
									
									}
									
									if (attr_names[i] == "property") {
									
										value = n.innerHTML;
										
									}
									
									if (n.getAttribute(attr_names[i]) == "dc:type") {
									
										break;
										
									}
																
									if (attr_names[i] == "rel" && n.getAttribute(attr_names[i]).indexOf("license") != -1) {
																		
										value = n.getAttribute("href");
										attribute = "license";
										
										if(asset==""){
										
											asset = content.location.href;
										
										}
										
									}
									
									if (attr_names[i] == "title" && n.getAttribute(attr_names[i]).indexOf("License") != -1) {
																		
										value = n.getAttribute("href");
										attribute = "license";
										
										if(asset==""){
										
											asset = content.location.href;
										
										}
										
									}
									
									if (attr_names[i] == "href" && n.getAttribute(attr_names[i]).indexOf("http://") != -1) {
									
										value = n.getAttribute("href");
										
									}																		
									
									if (attribute == "type") {
									
										value = n.getAttribute("href")
										
									}
									
									if (attribute == "attributionURL") {
									
										value = n.getAttribute("href")
										
									}
									
									if (attribute == "attributionName") {
									
										value = n.innerHTML;
										
									}
									
									if (value != attribute) {
									
										if (asset != null && attribute != null && value != null) {
										
											if (asset.length != 0 && attribute.length != 0 && value.length != 0) {
																	
												if(asset.indexOf("http")==0){
																								
													triple_array = Array(asset, attribute, value);
													add_triple(triple_array)
													triple_array = Array();													
													
												}
												
												asset = "";
												attribute = "";
												value = "";
												
											}
											
										}
										
									}
									
								}
								
							}
							
						}
						
					}
					
				}
				
			}
			
			if (n.v) {
				n.v = false;
				if (n == rootNode) {
					break;
				}
				if (n.nextSibling) {
					n = n.nextSibling;
				}
				else {
					n = n.parentNode;
				}
			}
			else {
				if (n.firstChild) {
					n.v = true;
					n = n.firstChild;
				}
				else 
					if (n.nextSibling) {
						n = n.nextSibling;
					}
					else {
						n = n.parentNode;
					}
			}
			
		}
		
		n = content;
								
		rootNode = n;		
				
		while (n) {

			if (n.v) {
				n.v = false;
				if (n == rootNode) {
					break;
				}
				if (n.nextSibling) {
					next = n.nextSibling;
				}
				else {
					next = n.parentNode;
				}
			}else {
				if (n.firstChild) {
					n.v = true;
					next = n.firstChild;
				}
				else if (n.nextSibling) {
					next = n.nextSibling;
				}else {
					next = n.parentNode;
				}
			}

			if (n.nodeName == "IMG") {
								
				if(n.width>200&&n.height>200){
			
					if (n.offsetWidth != 0) {
										
						curWidth = n.offsetWidth;
						
					}
						
					if (n.offsetHeight != 0) {
						
						curHeight = n.offsetHeight;				
						
					}
					
					license_value  = "";
										
					while(value = triple_store.pop()){
																							
						if(value[1]=="license"){

							license_value = value[2];
												
						}								
										
					}
					
					if (n.offsetWidth != 0) {
									
						curWidth = n.offsetWidth;
					
					}
					
					if (n.offsetHeight != 0) {
					
						curHeight = n.offsetHeight;				
					
					}
					
					var canvas = content.createElement("canvas");				

					canvas.setAttribute('width',curWidth);  
					canvas.setAttribute('height',curHeight); 
								
					n.parentNode.appendChild(canvas);	
														
					var ctx = canvas.getContext("2d");
						  
					ctx.drawImage(n, 0, 0);
								
					//if(license_found){
												
						if(license_value==""){
								
							license_value  = "No License found";
								
						}
										
						ctx.fillRect(0, (curHeight-25), curWidth, (curHeight-25));
						ctx.fillStyle = "White";
										
						ctx.fillText(n.src,0, (curHeight-18));
						ctx.fillText(license_value,0, (curHeight-5));
												
						n.parentNode.removeChild(n);
								
					//}
															
				}							
										
			}
			
			n = next;
												
		}

	}; 
		
};

window.addEventListener("load", function() { myExtension.init(); }, false);

var myExtension = {
  init: function() {
    var appcontent = document.getElementById("appcontent");   // browser
    if(appcontent)
      appcontent.addEventListener("DOMContentLoaded", myExtension.onPageLoad, true);
    var messagepane = document.getElementById("messagepane"); // mail
    if(messagepane)
      messagepane.addEventListener("load", function(event) { myExtension.onPageLoad(event); }, true);
  },

  onPageLoad: function(aEvent) {
    var doc = aEvent.originalTarget; // doc is document that triggered "onload" event
    // do something with the loaded page.
    // doc.location is a Location object (see below for a link).
    // You can use it to make your code executed on certain pages only.
   
	page_process.init(doc);      
	    // add event listener for page unload 
    aEvent.originalTarget.defaultView.addEventListener("unload", function(event){ myExtension.onPageUnload(event); }, true);
  },

  onPageUnload: function(aEvent) {
    // do something
  }
}		