AUI.add("aui-editor-toolbar-plugin",function(s){var aj=s.Lang,D=aj.isArray,t=aj.isFunction,ae=s.ClassNameManager.getClassName,I="editortoolbar",ah="toolbar",w="alignment",E="align-left",W="align-inline",v="align-block",ai="align-right",K="color",P="content",p="font",ad="indent",l="input",R="insert",G="insertimage",X="insertlink",S="list",x="select",c="source",m="styles",Z="subscript",Y="text",N="circle-check",a="close",ab={backcolor:true,forecolor:true,format:true,insertimage:true,insertlink:true,source:true,styles:true},z=["b","big","font","em","i","small","s","strike","strong","sub","sup","u"],q=ae("button","holder"),r=ae("field",l),y=ae("field",l,"text"),h=ae("field","label"),H=ae("field","numeric"),n=ae(I,"align","node"),B=ae(I,G),k=ae(I,X),b=ae(I,x,"fontname"),ac=ae(I,x,"fontsize"),f=ae(I,"size","separator"),i=ae(I,c,"textarea"),e=ae("state","active"),j=ae(I),C=ae(I,P),Q='<div class="'+n+'"></div>',o="<a></a>",F="<img />",M='<a href="{0}"{2}>{1}</a>',g='<textarea class="'+i+'"></textarea>',ag='<div class="'+j+'"><div class="'+C+'"></div></div>',U='<div class="'+q+'"></div>',af='<select class="'+b+'">{0}</select>',u='<option selected="selected"></option>'+"<option>Arial</option>"+"<option>Arial Black</option>"+"<option>Comic Sans MS</option>"+"<option>Courier New</option>"+"<option>Lucida Console</option>"+"<option>Tahoma</option>"+"<option>Times New Roman</option>"+"<option>Trebuchet MS</option>"+"<option>Verdana</option>",V='<select class="'+ac+'">{0}</select>',O='<option selected="selected"></option>'+'<option value="1">10</option>'+'<option value="2">13</option>'+'<option value="3">16</option>'+'<option value="4">18</option>'+'<option value="5">24</option>'+'<option value="6">32</option>'+'<option value="7">48</option>',L='<span class="'+f+'">x</span>';var J=s.Component.create({NAME:I,NS:ah,EXTENDS:s.Plugin.Base,ATTRS:{append:{value:null},groups:{value:[{type:p},{type:Y},{type:K},{type:w},{type:ad},{type:S},{type:R},{type:c}]}},_alignNode:null,prototype:{initializer:function(){var aB=this;var ak=s.Node.create(Q);var az=aB.get("append");var an=s.Node.create(ag);var aq=an.one("."+C);var aC=aB.get("groups");var ar=aB.get("host");var ap=ar.frame.get("container");ap.placeBefore(an);aB._boundingBox=an;aB._contentBox=aq;ak.hide();s.getBody().append(ak);aB._alignNode=ak;var at=[];if(az!=null&&D(az)){var au=az.length;for(var ax=0;ax<au;ax++){var aA=az[ax];if(aA.index!=null){var al=aB._isGroupIncluded("type",aC,aA.type);if(al!=-1){aC.splice(al,1);}aC.splice(Math.min(aA.index,aC.length),0,aA);}else{aC.push(aA);}}}for(ax=0;ax<aC.length;ax++){var am=aC[ax];var av=T[am.type]||am;var ay=[];if(D(am.include)){var A=am.include.length;for(var aw=0;aw<A;aw++){al=aB._isGroupIncluded("icon",av.children,am.include[aw]);if(al!=-1){ay.push(av.children[al]);}}}else{ay=av.children;}var ao=aB._addGroup(am,av,ay);if(ao){at.push(ao);}}aB._toolbars=at;aq.delegate("click",function(aG){var aE=this;var aF=s.Widget.getByNode(aG.currentTarget);if(aF){var aD=aF.get("icon").split("-");if(!ab[aD[0]]){aE.execCommand(aD[0],(aD[1]?aD[1]:""));aE.focus();}}},"button",ar);},addGroup:function(al){var A=this;var ak=T[al.type]||al;A._addGroup(al,ak);},addGroupType:function(ak,al){var A=this;if(!T[ak]){T[ak]=al;}},_addGroup:function(an,au,ay){var aB=this;var ak=(ay==null&&an.index!=null);ay=ay||au.children;if(D(ay)){var aq=aB.get("host");var ap=aB._contentBox;var al=[];var ao;var at={boundingBox:aB._boundingBox,contentBox:ap};for(var ax=0;ax<ay.length;ax++){var A=ay[ax];if(!A.select){var aD=YUI.AUI.defaults.EditorToolbar.STRINGS[A._titleKey];A.title=(aD!=null?aD:aa[A._titleKey]);al.push(A);}}if(al.length){ao=new s.Toolbar(s.merge(au.config,an.toolbar,{children:al})).render(ap);}var av=au.generate;if(av&&t(av.init)){av.init.call(aB,aq,at);}al=(al.length?al:ay);for(ax=0;ax<al.length;ax++){var aA=al[ax];var az=aA.icon;if(av&&t(av[az])){var aC=(an.config?an.config[az]:null);at.button=(aA.select||!ao?null:ao.item(ax));av[az].call(aB,aq,at,aC);}}if(ak){var ar=ap.get("childNodes");var aw=ar.size();var am=an.index;if(am<aw-1){ap.insert(ar.item(aw-1),ar.item(am));}}return ao;}return null;},_isGroupIncluded:function(ak,am,an){var A=this;for(var al=0;al<am.length;al++){if(am[al][ak]==an){return al;}}return -1;},_openOverlayToAlignNode:function(al,ak,am){var ao=this;var aq=am.get("docScrollX");var ap=am.get("docScrollY");var ar=ak.getXY();var an=am.getXY();ar=[ar[0]+an[0]-aq,ar[1]+an[1]-ap];var A=ao._alignNode;A.setStyle("width",am.get("offsetWidth"));A.setStyle("height",am.get("offsetHeight"));A.setXY(ar);A.show();al.set("align",{node:A,points:["tl","bc"]});al.show();},_updateToolbar:function(A,ap){var aq=this;if(A.changedNode){var al=A.commands;var ar=aq.toolbars;var au=function(aw,av,ay){var ax=!!(al[aw.get("icon")]);aw.StateInteraction.set("active",ax);};if(ar){for(var an=0;an<ar.length;an++){ar[an].each(au);}}var ak=A.fontFamily;var ao=ap._fontNameOptions;var at=A.fontSize;var am=ap._fontSizeOptions;if(ao){ao.item(0).set("selected",true);ao.each(function(aw,av,ay){var ax=aw.get("value").toLowerCase();if(ax===ak.toLowerCase()){aw.set("selected",true);}});}if(am){at=at.replace("px","");am.item(0).set("selected",true);am.each(function(ax,aw,az){var ay=ax.get("value").toLowerCase();var av=ax.get("text");if(av===at){ax.set("selected",true);}});}}}}});function d(al){var A=this;var an=al.currentTarget;var ak=an.get("className");var am=ak.substring(ak.lastIndexOf("-")+1);var ao=an.get("value");A.execCommand(am,ao);A.focus();}J.generateOverlay=function(am,al,A){var ak=new s["OverlayContext"+(A?"Panel":"")](s.merge({align:{node:am,points:["tl","bl"]},hideOn:"click",showOn:"click",trigger:am},al)).render();return ak;};J.generateColorPicker=function(ap,am,al,aq){var ao=am.button;var ak=ao.get("boundingBox");var A=new s.ColorPicker(s.merge({align:{node:ak,points:["tl","bl"]},trigger:ak},al));if(al&&al.plugins){for(var an=0;an<al.plugins.length;an++){A.plug(al.plugins[an],al);}}A.render(s.getBody());A.on("colorChange",function(au){var ar=this;var at=A.get("rgb");
ap.execCommand(aq,at.hex);ap.focus();});};var aa={ALIGN:"Align",ALIGN_BLOCK:"Block",ALIGN_LEFT:"Left",ALIGN_INLINE:"Inline",ALIGN_RIGHT:"Right",BACKCOLOR:"Background Color",BOLD:"Bold",BORDER:"Border",DESCRIPTION:"Description",EDIT_IMAGE:"Edit Image",EDIT_LINK:"Edit Link",FORECOLOR:"Foreground Color",IMAGE_URL:"Image URL",INDENT:"Indent",INSERT:"Insert",INSERT_IMAGE:"Insert Image",INSERT_LINK:"Insert Link",INSERT_ORDERED_LIST:"Insert Numbered List",INSERT_UNORDERED_LIST:"Insert Bulleted List",ITALIC:"Italic",JUSTIFY_LEFT:"Justify Left",JUSTIFY_CENTER:"Justify Center",JUSTIFY_RIGHT:"Justify Right",LINE_THROUGH:"Line Through",LINK_URL:"Link URL",OPEN_IN_NEW_WINDOW:"Open in new window",OUTDENT:"Outdent",PADDING:"Padding",REMOVE_FORMAT:"Format Source",SAVE:"Save",SIZE:"Size",SOURCE:"Source",SUBSCRIPT:"Subscript",SUPERSCRIPT:"Superscript",STYLES:"Styles",UNDERLINE:"Underline"};if(!YUI.AUI.defaults.EditorToolbar){YUI.AUI.defaults.EditorToolbar={STRINGS:{}};}s.mix(YUI.AUI.defaults.EditorToolbar.STRINGS,aa);var T={};T[w]={children:[{icon:"justifyleft",_titleKey:"JUSTIFY_LEFT"},{icon:"justifycenter",_titleKey:"JUSTIFY_CENTER"},{icon:"justifyright",_titleKey:"JUSTIFY_RIGHT"}]};T[K]={children:[{icon:"forecolor",_titleKey:"FORECOLOR"},{icon:"backcolor",_titleKey:"BACKCOLOR"}],generate:{forecolor:function(am,al,ak){var A=this;J.generateColorPicker(am,al,ak,"forecolor");},backcolor:function(am,al,ak){var A=this;J.generateColorPicker(am,al,ak,"backcolor");}}};T[p]={children:[{icon:"fontname",select:true},{icon:"fontsize",select:true}],generate:{init:function(am,al){var A=this;var ak=al.contentBox;am.after("nodeChange",function(ao){var an=this;switch(ao.changedType){case"keyup":case"mousedown":an._updateToolbar(ao,al);break;}},A);},fontname:function(ao,an,am){var A=this;var ak=an.contentBox;var ap;var aq=[u];if(am&&am.optionHtml){aq[0]=am.optionHtml;}ap=s.Node.create(aj.sub(af,aq));ak.append(ap);ap.on("change",d,ao);var al=ak.all("."+b+" option");an._fontNameOptions=al;return ap;},fontsize:function(ao,an,am){var A=this;var ak=an.contentBox;var ap;var aq=[O];if(am&&am.optionHtml){aq[0]=am.optionHtml;}ap=s.Node.create(aj.sub(V,aq));ak.append(ap);ap.on("change",d,ao);var al=ak.all("."+ac+" option");an._fontSizeOptions=al;return ap;}}};T[ad]={children:[{icon:"indent",_titleKey:"INDENT"},{icon:"outdent",_titleKey:"OUTDENT"}]};T[R]={children:[{icon:"insertimage",_titleKey:"INSERT_IMAGE"},{icon:"insertlink",_titleKey:"INSERT_LINK"}],generate:{insertimage:function(am,av,aE){var aC=this;var A=av.button;var ap=A.get("boundingBox");var aB=J.generateOverlay(ap,aE,true);var ay=aB.get("contentBox");var at=new s.Panel({collapsible:false,title:YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT_IMAGE,icons:[{icon:a,handler:{fn:aB.hide,context:aB}}]}).render(ay);ay=at.bodyNode;if(aE&&aE.dataBrowser){aE.dataBrowser.render(ay);}else{var ao;var aF;var aD=new s.Form({cssClass:B,labelAlign:"left"}).render(ay);var ar=[{labelText:"none",value:"none"}];for(var az=1;az<6;az++){ar.push({labelText:az+"px",value:az+"px solid"});}aD.add([{id:"imageURL",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.IMAGE_URL},{id:"size",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.SIZE,type:"hidden"},{id:"width",labelText:false,cssClass:H},{id:"height",labelText:false,cssClass:H},{id:"padding",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.PADDING},new s.Select({id:"border",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.BORDER,options:ar}),{id:"align",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.ALIGN,type:"hidden"},{id:"description",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.DESCRIPTION},{id:"linkURL",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.LINK_URL},{id:"openInNewWindow",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.OPEN_IN_NEW_WINDOW,type:"checkbox"}],true);aD.getField("width").get("boundingBox").placeAfter(L);var an=aD.get("contentBox");var aA=s.Node.create(U);var au=aD.getField("openInNewWindow");var ax=new s.ButtonItem({icon:N,label:YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT}).render(aA);ax.on("click",function(aH){var aR=this;var aI;var aL;var aP;if(ao){aL=ao;aP=ao.get("parentNode");if(aP.get("tagName").toLowerCase()=="a"){aI=aP;}}else{aL=s.Node.create(F);}var aK=aD.get("fieldValues");var aQ=aK.description;var aM={src:aK.imageURL,title:aQ,alt:aQ};var aO={border:aK.border};var aS=parseInt(aK.height,10);var aJ=parseInt(aK.width,10);if(!isNaN(aS)){aM.height=aS;}if(!isNaN(aJ)){aM.width=aJ;}var aN=parseInt(aK.padding,10);if(!isNaN(aN)){aO.padding=aN;}aw.some(function(aV,aU,aX){var aT=this;var aW=aV.StateInteraction.get("active");if(aW){aO.display="";switch(aU){case 0:aM.align="left";break;case 1:aM.align="";break;case 2:aM.align="center";aO.display="block";break;case 3:aM.align="right";break;}return true;}return false;});aL.setAttrs(aM);aL.setStyles(aO);var aG=aK.linkURL;if(aG){if(!aI){aI=s.Node.create(o);if(ao){aP.insert(aI,ao);}aI.append(aL);}aI.setAttribute("href",aG);aI.setAttribute("target",(au.get("node").get("checked")?"_blank":""));aL=aI;}else{if(ao&&aI){aP.insert(ao,aI);aI.remove(true);}}if(!ao&&aF&&aF.anchorNode){aF.anchorNode.append(aL);}aB.hide();});var aq=s.Node.create(F);var ak=aD.getField("height");var al=aD.getField("width");aq.on("load",function(aH){var aG=aH.currentTarget;if(!ak.get("value")||!al.get("value")){aD.set("values",{height:aG.get("height"),width:aG.get("width")});}});aD.getField("imageURL").get("node").on("blur",function(aG){aq.set("src",this.val());});an.append(aA);var aw=new s.Toolbar({activeState:true,children:[{icon:E,title:YUI.AUI.defaults.EditorToolbar.STRINGS.ALIGN_LEFT},{icon:W,title:YUI.AUI.defaults.EditorToolbar.STRINGS.ALIGN_INLINE},{icon:v,title:YUI.AUI.defaults.EditorToolbar.STRINGS.ALIGN_BLOCK},{icon:ai,title:YUI.AUI.defaults.EditorToolbar.STRINGS.ALIGN_RIGHT}]});aw.after("buttonitem:click",function(aH){var aG=aH.target;aw.each(function(aJ,aI,aK){if(aJ!=aG){aJ.StateInteraction.set("active",false);}});});aw.render(aD.getField("align").get("contentBox"));aB.on("show",function(aG){if(!aF||!aF.anchorNode){var aH=am.getInstance();
am.focus();aF=new aH.Selection();}});aB.after("hide",function(aG){aD.resetValues();aw.each(function(aI,aH,aJ){aI.StateInteraction.set("active",false);});au.get("node").set("checked",false);at.set("title",YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT_IMAGE);ax.set("label",YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT);aC._alignNode.hide();aB.set("align",{node:ap,points:["tl","bl"]});ao=null;});am.on("toolbar:ready",function(){var aG=am.frame._iframe;var aH=am.getInstance();aG.on("mouseout",function(aI){aF=new aH.Selection();});aH.one("body").delegate("click",s.bind(function(aN){var aI=this;if(ao!=aN.currentTarget){var aK=aN.currentTarget;var aM=aK.get("parentNode");var aJ=aK.getStyle("borderWidth");var aO=aK.getStyle("padding");var aP=(aM.get("tagName").toLowerCase()=="a");aD.set("values",{border:(aJ?aJ+" solid":""),description:aK.get("alt"),height:aK.get("height"),imageURL:aK.get("src"),linkURL:(aP?aM.get("href"):""),width:aK.get("width"),padding:(aO?parseInt(aO):"")});var aL=1;switch(aK.getAttribute("align")){case"left":aL=0;break;case"center":aL=2;break;case"right":aL=3;break;}aw.item(aL).StateInteraction.set("active",true);au.get("node").attr("checked",(aP&&aM.getAttribute("target")=="_blank"));at.set("title",YUI.AUI.defaults.EditorToolbar.STRINGS.EDIT_IMAGE);ax.set("label",YUI.AUI.defaults.EditorToolbar.STRINGS.SAVE);ao=aK;aI._openOverlayToAlignNode(aB,aG,aK);}},aC),"img");});}},insertlink:function(ar,ay,ak){var az=this;var aq=ay.button;var an=aq.get("boundingBox");var ao=J.generateOverlay(an,ak,true);var aw=ao.get("contentBox");var A=new s.Panel({collapsible:false,title:YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT_LINK,icons:[{icon:a,handler:{fn:ao.hide,context:ao}}]}).render(aw);aw=A.bodyNode;var am=ar.frame._iframe;var av;var ax;var ap=new s.Form({cssClass:k,labelAlign:"left"}).render(aw);ap.add([{id:"description",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.DESCRIPTION},{id:"linkURL",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.LINK_URL},{id:"openInNewWindow",labelText:YUI.AUI.defaults.EditorToolbar.STRINGS.OPEN_IN_NEW_WINDOW,type:"checkbox"}],true);var au=ap.get("contentBox");var at=s.Node.create(U);var aA=ap.getField("openInNewWindow");var al=new s.ButtonItem({icon:N,label:YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT}).render(at);al.on("click",function(aD){var aB=this;var aC=ap.get("fieldValues");if(av){av.setAttribute("href",aC.linkURL);av.set("innerHTML",aC.description);if(aA.get("node").get("checked")){av.setAttribute("target","_blank");}else{av.setAttribute("target","");}}else{ar.execCommand("inserthtml",aj.sub(M,[aC.linkURL,aC.description,(aA.get("node").get("checked")?' target="_blank"':"")]));}ao.hide();});au.append(at);ao.after("hide",function(aB){ap.resetValues();aA.get("node").set("checked",false);A.set("title",YUI.AUI.defaults.EditorToolbar.STRINGS.CREATE_LINK);al.set("label",YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT);az._alignNode.hide();ao.set("align",{node:an,points:["tl","bl"]});av=null;});ar.on("toolbar:ready",function(){var aB=ar.getInstance();aB.one("body").delegate("click",s.bind(function(aF){var aC=this;if(av!=aF.currentTarget){var aE=aF.currentTarget;if(!aE.one("img")){var aD=aE.get("parentNode");ap.set("values",{description:aE.get("innerHTML"),linkURL:aE.getAttribute("href")});aA.get("node").attr("checked",(aE.getAttribute("target")=="_blank"));A.set("title",YUI.AUI.defaults.EditorToolbar.STRINGS.EDIT_LINK);al.set("label",YUI.AUI.defaults.EditorToolbar.STRINGS.SAVE);av=aE;aC._openOverlayToAlignNode(ao,am,aE);}}},az),"a");});}}};T[S]={children:[{icon:"insertunorderedlist",_titleKey:"INSERT_UNORDERED_LIST"},{icon:"insertorderedlist",_titleKey:"INSERT_ORDERED_LIST"}],generate:{init:function(ak){var A=this;ak.plug(s.Plugin.EditorLists);}}};T[c]={children:[{icon:"format",_titleKey:"REMOVE_FORMAT"},{icon:"source",_titleKey:"SOURCE"}],generate:{format:function(an,al,ak){var A=this;var am=al.button;am.on("click",function(ar){var ao=this;var at=ao.getInstance();var aq=new at.Selection();var ap=aq.getSelected();if(!aq.isCollapsed&&ap.size()){ap.each(function(aA,aw,aB){var au=this;aA.removeAttribute("style");var ay=aA.get("innerHTML");ay=ay.replace(/<([a-zA-Z0-9]*)\b[^>]*>/g,"<$1>");for(var ax=0;ax<z.length;ax++){var av=new RegExp("(<"+z[ax]+">|<\\/"+z[ax]+">)","ig");ay=ay.replace(av,"");}aA.set("innerHTML",ay);var az=aA.get("parentNode");if(!az.test("body")){az.removeAttribute("style");}});}},an);},source:function(ap,an,am){var A=this;var al=an.contentBox;var ao=an.button;var aq;var ak=s.Node.create(g);ap.on("toolbar:ready",function(){var ar=this;var au=ap.frame;var at=au.get("container");ak.hide();at.append(ak);});ao._visible=false;ao.on("click",function(aw){var ar=this;var ax=ap.frame;var au=ao._visible;if(au){ar.set("content",ak.val());ak.hide();ak.val("");ax.show();}else{var av=ax._iframe;ak.val(ar.getContent());var at=av.get("offsetHeight")-ak.getPadding("tb");ak.setStyle("height",at);ax.hide();ak.show();}au=!au;ao._visible=au;al.all("select").attr("disabled",au);al.all("button").attr("disabled",au);ao.get("contentBox").attr("disabled",false);},ap);}}};T[m]={children:[{icon:"styles",_titleKey:"STYLES"}],generate:{styles:function(ao,am,al){var A=this;var an=am.button;var ak=an.get("boundingBox");ao.plug(s.Plugin.EditorMenu);ao.menu.add(s.merge({align:{node:ak,points:["tl","bl"]},hideOn:"click",showOn:"click",trigger:ak},al));}}};T[Z]={children:[{icon:"subscript",_titleKey:"SUBSCRIPT"},{icon:"superscript",_titleKey:"SUPERSCRIPT"}]};T[Y]={children:[{icon:"bold",_titleKey:"BOLD"},{icon:"italic",_titleKey:"ITALIC"},{icon:"underline",_titleKey:"UNDERLINE"},{icon:"strikethrough",_titleKey:"LINE_THROUGH"}]};s.namespace("Plugin").EditorToolbar=J;},"@VERSION@",{requires:["aui-base","aui-button-item","aui-color-picker","aui-editor-menu-plugin","aui-editor-tools-plugin","aui-form-select","aui-overlay-context-panel","aui-panel","aui-toolbar","createlink-base","editor-lists","editor-base","plugin"]});