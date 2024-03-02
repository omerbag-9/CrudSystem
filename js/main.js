
/////////////////revision

var productNameInput = document.getElementById("productName")
var productPriceInput = document.getElementById("productPrice")
var productCategoryInput = document.getElementById("productCategory")
var productsaleInput = document.getElementById("productSale")
var productDescInput = document.getElementById("productDescription")
var searchInput = document.getElementById("searchInput")
var alertName = document.getElementById("alertName")
var alertPrice = document.getElementById("alertPrice")
var currentIndex;
var regexName = /^[A-Z][a-z]{1,20}[0-9]{0,4}$/
var regexPrice = /^([1-9][0-9]{1,5}|1000000)$/

var productList = [];
if(localStorage.getItem("DataList") != null){
    productList = JSON.parse(localStorage.getItem("DataList"))
}//mokhtasara

// if(localStorage.getItem(JSON.parse("DataList") == null)){
//     productList = [] //3shan lw system gded my3mlesh error an dh msh array
// }else{
//     productList = localStorage.getItem(JSON.parse("DataList"))
// }  //code dh lw sebt al productList; kda bs feh tare2a a7sn



function addProduct(){ //tlt kahtawat a7ot el variables f object a7ot al data f array b3den a3rd al array
    if(valid(regexName,productNameInput,alertName) == true && valid(regexPrice,productPriceInput,alertPrice) == true){
        var product = {
            name:productNameInput.value,
            price:productPriceInput.value,
            category:productCategoryInput.value,
            sale:productsaleInput.checked,
            description:productDescInput.value,
        }
        productList.push(product)
        displayProduct()
        localStorage.setItem("DataList",JSON.stringify(productList))
        clearform()
        // console.log(productList);
    }  
}

function displayProduct(){
    var temp = ""
    for (let i = 0; i < productList.length; i++) {
       temp += `<tr>
       <td>${i}</td>
       <td>`+productList[i].name+`</td>
       <td>`+productList[i].price+`</td>
       <td>`+productList[i].category+`</td>
       <td class="${(productList[i].sale == true) ? 'text-success' : ''}">${(productList[i].sale == true) ? 'sale' : 'noSale'}</td>
       <td>`+productList[i].description+`</td>
       <td>
           <button onclick="update(`+i+`)" class="btn btn-warning">Update</button>
       </td>
       <td>
           <button onclick="deleteProduct(`+i+`)" class="btn btn-danger">Delete</button>
       </td>
   </tr> `
    }
    document.getElementById('myData').innerHTML = temp
}
displayProduct()

function deleteProduct(x){
    productList.splice(x,1) //hbt3lo parameter asmo x by3br 3n al rkm bta3 al index 3shan a3rf ams7 al product
    localStorage.setItem("DataList",JSON.stringify(productList))
    displayProduct()
}

function clearform() {
    productNameInput.value = ''
    productPriceInput.value = ''
    productCategoryInput.value = 'mobile'
    productsaleInput.checked = false
    productDescInput.value = ''
}

function search() { //h7wl al 7rf ally bdkhlo f al input bta3 al search l small b3den a2olo hl al asma2 ally 3ndy f al product t7twy 3al 7rf dh lw ah azhrholy
    var temp = '' // al search hya function display + if condition
    var searchVal = searchInput.value.toLowerCase()
for (var i= 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(searchVal) == true) { // hl al 7rf all 3ndy f al asmaa ally 7wlto l small mwdod aw true
        temp += `<tr>
        <td>${i}</td>
        <td>`+productList[i].name.toLowerCase().replace(searchVal,`<span class="bg-info">`+searchVal+`</span>`)+`</td>
        <td>`+productList[i].price+`</td>
        <td>`+productList[i].category+`</td>
        <td>`+productList[i].sale+`</td>
        <td>`+productList[i].description+`</td>
        <td>
            <button onclick="update(`+i+`)" class="btn btn-warning">Update</button>
        </td>
        <td>
            <button onclick="deleteProduct(`+i+`)" class="btn btn-danger">Delete</button>
        </td>
    </tr> `
     }
     document.getElementById('myData').innerHTML = temp
    }
}

function update(ind) {
    for(var i=0 ; i<productList.length;i++){
        productNameInput.value = productList[ind].name
        productPriceInput.value = productList[ind].price
        productCategoryInput.value = productList[ind].category
        productsaleInput.checked = productList[ind].sale
        productDescInput.value = productList[ind].description
    }
    currentIndex=ind;
    document.getElementById("addData").classList.add('d-none')
    document.getElementById("editData").classList.remove('d-none')
}

function addEdit(){
    if(valid(regexName,productNameInput,alertName) == true && valid(regexPrice,productPriceInput,alertPrice) == true){
    var product = {
        name:productNameInput.value,
        price:productPriceInput.value,
        sale:productCategoryInput.value,
        category:productsaleInput.checked,
        description:productDescInput.value,
    }
    productList.splice(currentIndex, 1, product)
    displayProduct()
    localStorage.setItem("DataList",JSON.stringify(productList))
    document.getElementById("addData").classList.remove('d-none')
    document.getElementById("editData").classList.add('d-none')
}
}

function valid(regexName,inputEl,alert){
    if(regexName.test(inputEl.value) == true){
        inputEl.classList.add('is-valid')
        inputEl.classList.remove('is-invalid')
        alert.classList.add('d-none')
        return true
    }else{
        inputEl.classList.add('is-invalid')
        inputEl.classList.remove('is-valid')
        alert.classList.remove('d-none')
        return false
    }
}

productNameInput.addEventListener('change',function(){
    valid(regexName,productNameInput,alertName)
})

productPriceInput.addEventListener('change',function(){
    valid(regexPrice,productPriceInput,alertPrice)
})

// function validName(){
//     var regexName = /^[A-Z][a-z]{1,20}[0-9]{0,4}$/
//     if(regexName.test(productNameInput.value) == true){
//         productNameInput.classList.add('is-valid')
//         productNameInput.classList.remove('is-invalid')
//         alertName.classList.add('d-none')
//         return true
//     }else{
//         productNameInput.classList.add('is-invalid')
//         productNameInput.classList.remove('is-valid')
//         alertName.classList.remove('d-none')
//         return false
//     }
// }


// function validPrice(){
//     var regexPrice = /^([1-9][0-9]{1,5}|1000000)$/
//     if(regexPrice.test(productPriceInput.value) == true){
//         productPriceInput.classList.add('is-valid')
//         productPriceInput.classList.remove('is-invalid')
//         alertPrice.classList.add('d-none')
//         return true
//     }else{
//         productPriceInput.classList.add('is-invalid')
//         productPriceInput.classList.remove('is-valid')
//         alertPrice.classList.remove('d-none')
//         return false
//     }
// }