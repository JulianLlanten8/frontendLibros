import{_ as Y,r as u,o as J,u as K,a as H,b as Q,F as W,c,d as y,e as w,f as t,g as o,w as s,h as m,t as f,i as X,j as V,n as h,p as Z,k as ee}from"./index-2b433ac3.js";import{o as le,a as te,c as oe,e as ae}from"./clienteHttp-d22e04bb.js";const n=x=>(Z("data-v-b91b4cf8"),x=x(),ee(),x),ie={class:"grid"},se={class:"col-12"},ne={class:"card"},de={class:"my-2"},re={class:"flex flex-column md:flex-row md:justify-content-between md:align-items-center"},ue=n(()=>t("h5",{class:"m-0"},"Administracion de libros",-1)),ce={class:"block mt-2 md:mt-0 p-input-icon-left"},pe=n(()=>t("i",{class:"pi pi-search"},null,-1)),me=n(()=>t("span",{class:"p-column-title"},"titulo",-1)),ve=n(()=>t("span",{class:"p-column-title"},"descripcion",-1)),be=n(()=>t("span",{class:"p-column-title"},"Image",-1)),_e=["src","alt"],fe=n(()=>t("span",{class:"p-column-title"},"autor",-1)),he=n(()=>t("span",{class:"p-column-title"},"Genero",-1)),ge=n(()=>t("span",{class:"p-column-title"},"fecha_publicacion",-1)),ye=["src","alt"],we={class:"field"},xe=n(()=>t("label",{for:"titulo"},"Titulo",-1)),ke={key:0,class:"p-invalid"},Ce={class:"field"},Ve=n(()=>t("label",{for:"autor"},"Autor ",-1)),Se={class:"field"},Te=n(()=>t("label",{for:"descripcion"},"Descripcion",-1)),Le={class:"field"},Pe=n(()=>t("label",{for:"genero"},"Genero literario",-1)),Ue={class:"field"},De=n(()=>t("label",{for:"isbn"},"Isbn",-1)),Ee={class:"field"},Ie=n(()=>t("label",{for:"editorial"},"Editorial",-1)),Me={class:"field"},Ne=n(()=>t("label",{for:"fecha_publicacion"},"Fecha de publicacion",-1)),qe={class:"flex align-items-center justify-content-center"},je=n(()=>t("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1)),Be={key:0},Fe={class:"flex align-items-center justify-content-center"},Ae=n(()=>t("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1)),Ge={key:0},$e={__name:"Crud",setup(x){const L=u([]),k=async()=>{const i=await le("libros","application/json");L.value=JSON.parse(i)};J(()=>{k()});const v=K(),{contextPath:D}=H(),b=u(!1),g=u(!1),S=u(!1),l=u({}),P=u(null),U=u(null),C=u({}),d=u(!1);Q(()=>{j()});const E=()=>{l.value={},d.value=!1,b.value=!0},I=()=>{b.value=!1,d.value=!1},M=i=>{l.value={...i},b.value=!0},N=i=>{l.value=i,g.value=!0},q=()=>{U.value.exportCSV()},j=()=>{C.value={global:{value:null,matchMode:W.CONTAINS}}},B=async()=>{d.value=!0,l.value.titulo.trim()&&l.value.descripcion.trim()&&l.value.genero&&l.value.isbn&&(l.value.id?await te(`libros/${l.value.id}`,l.value).then(i=>{(i==null?void 0:i.status)===200?(k(),v.add({severity:"success",summary:"Exito",detail:"Libro editado",life:3e3})):v.add({severity:"error",summary:"Error",detail:"Up's no se ha podido editar el libro",life:3e3})}):await oe("libros",l.value,"application/json").then(i=>{(i==null?void 0:i.status)===201?(k(),v.add({severity:"success",summary:"Exito",detail:"Libro creado",life:3e3})):v.add({severity:"error",summary:"Error",detail:"Up's no se ha podido crear el libro",life:3e3})}),b.value=!1,l.value={},d.value=!1)},F=async()=>{await ae("libros",l.value.id).then(i=>{(i==null?void 0:i.status)===204?(k(),v.add({severity:"success",summary:"Exito",detail:"Libro eliminado",life:3e3})):v.add({severity:"error",summary:"Error",detail:"Up's no se ha podido eliminar el libro",life:3e3})}),l.value={},g.value=!1};return(i,a)=>{const A=c("Toast"),r=c("Button"),G=c("Toolbar"),_=c("InputText"),p=c("Column"),$=c("DataTable"),z=c("Textarea"),R=c("Calendar"),T=c("Dialog");return y(),w("div",ie,[t("div",se,[t("div",ne,[o(A),o(G,{class:"mb-4"},{start:s(()=>[t("div",de,[o(r,{label:"Nuevo",icon:"pi pi-plus",class:"p-button-success mr-2",onClick:E})])]),end:s(()=>[o(r,{label:"Export",icon:"pi pi-upload",class:"p-button-help",onClick:a[0]||(a[0]=e=>q(e))})]),_:1}),o($,{ref_key:"dt",ref:U,value:L.value,selection:P.value,"onUpdate:selection":a[2]||(a[2]=e=>P.value=e),dataKey:"id",paginator:!0,rows:10,filters:C.value,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:"Showing {first} to {last} of {totalRecords} products",responsiveLayout:"scroll"},{header:s(()=>[t("div",re,[ue,t("span",ce,[pe,o(_,{modelValue:C.value.global.value,"onUpdate:modelValue":a[1]||(a[1]=e=>C.value.global.value=e),placeholder:"Search..."},null,8,["modelValue"])])])]),default:s(()=>[o(p,{selectionMode:"multiple",headerStyle:"width: 3rem"}),o(p,{field:"titulo",header:"Titulo",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:s(e=>[me,m(" "+f(e.data.titulo),1)]),_:1}),o(p,{field:"descripcion",header:"Descripción",sortable:!0,headerStyle:"width:20%; min-width:20rem;"},{body:s(e=>[ve,m(" "+f(e.data.descripcion),1)]),_:1}),o(p,{header:"Imagen",headerStyle:"width:14%; min-width:10rem;"},{body:s(e=>[be,t("img",{src:e.data.image,alt:e.data.image,class:"shadow-2",width:"100"},null,8,_e)]),_:1}),o(p,{field:"autor",header:"Autor",sortable:!0},{body:s(e=>[fe,m(" "+f(e.data.autor),1)]),_:1}),o(p,{field:"genero",header:"Genero",sortable:!0},{body:s(e=>[he,m(" "+f(e.data.genero),1)]),_:1}),o(p,{field:"fecha_publicacion",header:"Fecha de publicacion",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:s(e=>[ge,m(" "+f(e.data.fecha_publicacion),1)]),_:1}),o(p,{headerStyle:"min-width:10rem;"},{body:s(e=>[o(r,{icon:"pi pi-pencil",class:"p-button-rounded p-button-success mr-2",onClick:O=>M(e.data)},null,8,["onClick"]),o(r,{icon:"pi pi-trash",class:"p-button-rounded p-button-warning mt-2",onClick:O=>N(e.data)},null,8,["onClick"])]),_:1})]),_:1},8,["value","selection","filters"]),o(T,{visible:b.value,"onUpdate:visible":a[10]||(a[10]=e=>b.value=e),style:{width:"450px"},header:"Informacio del nuevo Libro",modal:!0,class:"p-fluid"},{footer:s(()=>[o(r,{label:"Cancel",icon:"pi pi-times",class:"p-button-text",onClick:I}),o(r,{label:"Save",icon:"pi pi-check",class:"p-button-text",onClick:B,"loading-text":"Guardando...",loading:d.value},null,8,["loading"])]),default:s(()=>[l.value.image?(y(),w("img",{key:0,src:X(D)+"demo/images/libro/"+l.value.image,alt:l.value.image,width:"150",class:"mt-0 mx-auto mb-5 block shadow-2"},null,8,ye)):V("",!0),t("div",we,[xe,o(_,{id:"titulo",modelValue:l.value.titulo,"onUpdate:modelValue":a[3]||(a[3]=e=>l.value.titulo=e),modelModifiers:{trim:!0},required:"true",autofocus:"",class:h({"p-invalid":d.value&&!l.value.titulo})},null,8,["modelValue","class"]),d.value&&!l.value.titulo?(y(),w("small",ke,"titulo is required.")):V("",!0)]),t("div",Ce,[Ve,o(_,{id:"autor",modelValue:l.value.autor,"onUpdate:modelValue":a[4]||(a[4]=e=>l.value.autor=e),modelModifiers:{trim:!0},required:"true",class:h({"p-invalid":d.value&&!l.value.autor}),placeholder:"Escriba un autor"},null,8,["modelValue","class"])]),t("div",Se,[Te,o(z,{id:"descripcion",modelValue:l.value.descripcion,"onUpdate:modelValue":a[5]||(a[5]=e=>l.value.descripcion=e),modelModifiers:{trim:!0},required:"true",rows:"3",cols:"20"},null,8,["modelValue"])]),t("div",Le,[Pe,o(_,{id:"genero",modelValue:l.value.genero,"onUpdate:modelValue":a[6]||(a[6]=e=>l.value.genero=e),modelModifiers:{trim:!0},required:"true",class:h({"p-invalid":d.value&&!l.value.genero}),placeholder:"Escriba un genero literario"},null,8,["modelValue","class"])]),t("div",Ue,[De,o(_,{id:"isbn",modelValue:l.value.isbn,"onUpdate:modelValue":a[7]||(a[7]=e=>l.value.isbn=e),modelModifiers:{trim:!0},required:"true",useGrouping:!1,class:h({"p-invalid":d.value&&!l.value.isbn}),placeholder:"32324342"},null,8,["modelValue","class"])]),t("div",Ee,[Ie,o(_,{id:"editorial",modelValue:l.value.editorial,"onUpdate:modelValue":a[8]||(a[8]=e=>l.value.editorial=e),modelModifiers:{trim:!0},required:"true",class:h({"p-invalid":d.value&&!l.value.editorial}),placeholder:"Escriba un editorial literario"},null,8,["modelValue","class"])]),t("div",Me,[Ne,o(R,{modelValue:l.value.fecha_publicacion,"onUpdate:modelValue":a[9]||(a[9]=e=>l.value.fecha_publicacion=e),showIcon:"",class:h({"p-invalid":d.value&&!l.value.fecha_publicacion})},null,8,["modelValue","class"])])]),_:1},8,["visible"]),o(T,{visible:g.value,"onUpdate:visible":a[12]||(a[12]=e=>g.value=e),style:{width:"450px"},header:"Confirmar eliminacion",modal:!0},{footer:s(()=>[o(r,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:a[11]||(a[11]=e=>g.value=!1)}),o(r,{label:"Yes",icon:"pi pi-check",class:"p-button-text",onClick:F})]),default:s(()=>[t("div",qe,[je,l.value?(y(),w("span",Be,[m("¿Estás seguro de que quieres borrar "),t("b",null,f(l.value.titulo),1),m("?")])):V("",!0)])]),_:1},8,["visible"]),o(T,{visible:S.value,"onUpdate:visible":a[14]||(a[14]=e=>S.value=e),style:{width:"450px"},header:"Confirm",modal:!0},{footer:s(()=>[o(r,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:a[13]||(a[13]=e=>S.value=!1)}),o(r,{label:"Yes",icon:"pi pi-check",class:"p-button-text",onClick:i.deleteSelectedProducts},null,8,["onClick"])]),default:s(()=>[t("div",Fe,[Ae,l.value?(y(),w("span",Ge,"Are you sure you want to delete the selected products?")):V("",!0)])]),_:1},8,["visible"])])])])}}},Oe=Y($e,[["__scopeId","data-v-b91b4cf8"]]);export{Oe as default};