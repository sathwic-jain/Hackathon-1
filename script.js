function getdata()
{   
    return new Promise((resolve,reject)=>{
    var url='https://makeup-api.herokuapp.com/api/v1/products.json';
    fetch(url).then((data)=>data.json()).then((jdata)=>{resolve(jdata)}).catch((error)=>reject("error"));
});
}

var result=getdata();
var product_types=[];
result.then((jdata)=>{

    product_types[0]="";
    let count=0
    let flag=0;
    for(let i in jdata){
        flag=0;
        if(jdata[i].product_type==null)continue;
        for(let j in product_types){
            if(product_types[j]==jdata[i].product_type){
                flag=1;
            }
        }
        if(flag===0){
            product_types[count]=jdata[i].product_type;
            count++
        }
    }
    //console.log(product_types);

    
   

     //product types
     var container_product=document.createElement('div');
     container_product.setAttribute('class','container');
     container_product.setAttribute('class','ml-n0')
     var prh4=document.createElement('h4');
     prh4.innerHTML="Product types";
     container_product.append(prh4);
     var row_product=document.createElement('div');
     row_product.setAttribute('class','row');
 
     for(let i in product_types){
         var col_product=document.createElement('div');
         col_product.setAttribute('class','col-3');
         var input=document.createElement('input');
         input.setAttribute('type','checkbox');
         input.setAttribute('id',`${product_types[i]}`);
         input.setAttribute('name','productscheckbox');
         input.setAttribute('value',`${product_types[i]}`);
         input.style.margin="10px";
 
         var label=document.createElement('label');
         label.setAttribute('for',`${product_types[i]}`);
         label.innerHTML=`${product_types[i]}`;
         
         col_product.append(input,label);
         row_product.append(col_product);
         container_product.append(row_product);
     }
    
     
     document.body.append(container_product);

     var opt=document.createElement('div');
     var option1=document.createElement('input');
     option1.setAttribute('type','checkbox');
     option1.setAttribute('id','category')
     option1.setAttribute('name','options');
     option1.setAttribute('value','category');
     var label1=document.createElement('label');
     label1.setAttribute('for','category');
     label1.innerHTML="Display categories";
     

     
     var option2=document.createElement('input');
     option2.setAttribute('type','checkbox');
     option2.setAttribute('id','tag')
     option2.setAttribute('name','options');
     option2.setAttribute('value','tag');
     var label2=document.createElement('label');
     label2.setAttribute('for','tag');
     label2.innerHTML="Display tags";
     opt.append(option1,label1);
     opt.append(option2,label2)

     document.body.append(opt);

     var buttonclear=document.createElement('button');
     buttonclear.innerHTML="clear";
     buttonclear.addEventListener('click',()=>{
        uncheckAll();
        clearall();
     });
     document.body.append(buttonclear);

     function uncheckAll() {
        document.querySelectorAll('input[type="checkbox"]')
          .forEach(el => el.checked = false);
      }
     
     
 //getting checkbox elements
     function checkbox(checkboxname){
         var checkboxes=document.getElementsByName(checkboxname);
         var checkboxesChecked=[];
         let count=0;
         
         for(let i in checkboxes){
             if(checkboxes[i].checked){
                 checkboxesChecked[count]=checkboxes[i].value;
                 count++;
             }
         }
         
        return checkboxesChecked;
        
     }
 
     //submit button
     var box_products;
     var opted;
     var submit=document.createElement('button');
     submit.innerHTML="Submit";
     submit.addEventListener('click',()=>{
        opted=checkbox("options");
        console.log(opted);

        box_products=checkbox("productscheckbox");
        console.log(box_products);
        var url_products=[];
        for(let i in box_products){
         url_products[i]=`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${box_products[i]}`;

        }
        for(let i in box_products){
            let tags=[];
            let flag,count=0;

            let categories=[];
            fetch(url_products[i]).then((data)=>data.json()).then((pdata)=>{
             
                tags[0]="";
                count=0;
                flag=0;
                let eachitem=[];
                for(let i in pdata){
                    flag=0;
                    if(pdata[i].tag_list==null)continue;
                    eachitem=pdata[i].tag_list
                    for(let k in eachitem){
                        flag=0;
                    for(let j in tags){
                        if(tags[j]===eachitem[k]){
                            flag=1;
                        }
                    }
                    if(flag===0){
                        tags[count]=eachitem[k];
                        count++
                    }
                }
                }
                //tags

                categories[0]="";
                count=0
                flag=0;
                for(let i in pdata){
                    flag=0;
                    if(pdata[i].category==null)continue;
                    for(let j in categories){
                        if(categories[j]==pdata[i].category){
                            flag=1;
                        }
                    }
                    if(flag===0){
                        categories[count]=pdata[i].category;
                        count++
                    }
                }
                //category
    if(opted=="tag" || opted.length===2){
    var container_tags=document.createElement('div');
    container_tags.setAttribute('id','clear');
    container_tags.setAttribute('class','container');
    container_tags.setAttribute('class','ml-n0')
    var tagh4=document.createElement('h4');
    tagh4.innerHTML=`Tags-${box_products[i]}`;
    container_tags.append(tagh4);
    var row_tags=document.createElement('div');
    row_tags.setAttribute('class','row');

    for(let j in tags){
        var col_tags=document.createElement('div');
        col_tags.setAttribute('class','col-3');
        var input=document.createElement('input');
        input.setAttribute('type','checkbox');
        input.setAttribute('id',`${tags[j]}-${box_products[i]}`);
        input.setAttribute('name',`tagscheckbox ${box_products[i]}`);
        input.setAttribute('value',`${tags[j]}`);
        input.style.margin="10px";

        var label=document.createElement('label');
        label.setAttribute('for',`${tags[j]}-${box_products[i]}`);
        label.innerHTML=`${tags[j]}`;
        
        col_tags.append(input,label);
        row_tags.append(col_tags);
        container_tags.append(row_tags);
    }
    document.body.append(container_tags);
    }
    if(opted=="category" || opted.length===2){
    var container_category=document.createElement('div');
    container_category.setAttribute('class','container');
    container_category.setAttribute('id','clear2');
    container_category.setAttribute('class','ml-n0')
    var cath4=document.createElement('h4');
    cath4.innerHTML=`Category-${box_products[i]}`;
    container_category.append(cath4);
    var row_cat=document.createElement('div');
    row_cat.setAttribute('class','row');

    for(let j in categories){
        var col_cat=document.createElement('div');
        col_cat.setAttribute('class','col-3');
        var input=document.createElement('input');
        input.setAttribute('type','checkbox');
        input.setAttribute('id',`${categories[j]}-${box_products[i]}`);
        input.setAttribute('name',`catcheckbox ${box_products[i]}`);
        input.setAttribute('value',`${categories[j]}`);
        input.style.margin="10px";

        var label=document.createElement('label');
        label.setAttribute('for',`${categories[j]}-${box_products[i]}`);
        label.innerHTML=`${categories[j]}`;
        
        col_cat.append(input,label);
        row_cat.append(col_cat);
        container_category.append(row_cat);
    }
    document.body.append(container_category);
} 
    var tag_box,cat_box;
    
    var submit=document.createElement('button');
    submit.setAttribute('id','clear3');
    submit.innerHTML=`Submit ` ;
    submit.addEventListener('click',()=>
    {
               
        tag_box=checkbox(`tagscheckbox ${box_products[i]}`);
        cat_box=checkbox(`catcheckbox ${box_products[i]}`);
        console.log(tag_box,cat_box);
        if(opted=="tag" || opted.length===2){
            
                for(let l in tag_box){
                    var finalurl=`https://makeup-api.herokuapp.com/api/v1/products?product_tags=${tag_box[l]}&product_type=${box_products[i]}`;
                    var anchor=document.createElement('a');
                    anchor.setAttribute('href',`${finalurl}`);
                    anchor.setAttribute('target','_blank');
                    var button=document.createElement('button');
                    button.setAttribute('id','clear4');
                    button.innerHTML=`CLICK : ${box_products[i]}--${tag_box[l]}`;
                    anchor.append(button);
                    document.body.append(anchor);
                }
    
            
        }
         if(opted=="category" || opted.length===2){
            for(let k in cat_box){
                
                    var finalurl=`https://makeup-api.herokuapp.com/api/v1/products?product_category=${cat_box[k]}&product_type=${box_products[i]}`;
                    var anchor=document.createElement('a');
                    anchor.setAttribute('href',`${finalurl}`);
                    anchor.setAttribute('target','_blank');
                    var button=document.createElement('button');
                    button.setAttribute('id','clear5');
                    button.innerHTML=`${box_products[i]}--${cat_box[k]}`;
                    anchor.append(button);
                    document.body.append(anchor);
                }
    
        }
        

    });
    document.body.append(submit);
    

})
        
        
        
    }


    });
    

    
 document.body.append(submit);
      
     

});