var productName = document.getElementById('name');
var price = document.getElementById('price');
var type = document.getElementById('type');
var desc = document.getElementById('desc');
var img = document.getElementById('image');
var file = document.getElementById('file');
var tableBody = document.getElementById('tableBody');
var product;
var products = [];
var editImg = document.getElementById('edit-img');
var editFile = document.getElementById('edit-file');
var searchIN = document.getElementById('search');

// Load from local storage if available
if (localStorage.getItem("products")) {
    products = JSON.parse(localStorage.getItem("products"));
    display();
}


function addProduct(){

    if(!inputValidation(productName.value, price.value, type.value, desc.value)){
        return;
    }

    let fileLink = "";
    if (file.files.length > 0) {
        const selectedFile = file.files[0];
        const fileURL = URL.createObjectURL(selectedFile);
        fileLink = `<a href="${fileURL}" target="_blank">📎 ${selectedFile.name}</a>`;
    } else {
        fileLink = "No file attached";
    }

    let imgTag = "";
    if (img.files.length > 0) {
        const selectedImg = img.files[0];
        const imgURL = URL.createObjectURL(selectedImg);
        imgTag = `<img src="${imgURL}" alt="Product Image" width="50" height="40">`;
    } else {
        imgTag = "No image";
    }
    product = {
        name: productName.value,
        price: price.value,
        type: type.value,
        desc: desc.value,
        img: imgTag,
        file: fileLink
    };
    products.push(product);
    saveToLocalStorage();
    display();
}

function display(){
    var box = "";
    for(var i = 0; i<products.length; i++){
            box += `<tr>
                        <th scope="row">${i+1}</th>
                        <td>${products[i].name}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].type}</td>
                        <td>${products[i].desc}</td>
                        <td>${products[i].img}</td>
                        <td>${products[i].file}</td>
                        <td>
                            <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#editModal${i}" onclick="editProduct(${i})">
                                Edit
                            </button>
                        <!-- Modal -->
                            <div class="modal fade" id="editModal${i}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editModalLabel${i}" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-scrollable">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="editModalLabel${i}">Edit Product</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body add-modal">
                                            <label for="productName">Enter Product Name</label>
                                            <input type="text" id="edit-name${i}" class="form-control" placeholder="Product Name">
                                            <label for="productPrice">Enter Product Price</label>
                                            <input type="text" id="edit-price${i}" class="form-control" placeholder="Product Price">
                                            <label for="productType">Enter Product Type</label>
                                            <input type="text" id="edit-type${i}" class="form-control" placeholder="Product Type">
                                            <label for="productDesc">Enter Product Description</label>
                                            <input type="text" id="edit-desc${i}" class="form-control" placeholder="Product Description">
                                            <label for="productImage" class="form-label">Upload Product Image</label>
                                            <input type="file" class="form-control" id="edit-img${i}" accept="image/*">
                                            <label for="productFile" class="form-label">Attach File</label>
                                            <input type="file" class="form-control" id="edit-file${i}" accept=".pdf,.doc,.docx,.txt,.zip">
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancel</button>
                                            <button type="button" class="btn btn-outline-secondary" onclick="saveEdit(${i})">Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button>
                        </td>
                    </tr>
`;

    }

tableBody.innerHTML = box;
clear();
}

function clear(){
    productName.value = '';
    price.value = '';
    type.value = '';
    desc.value = '';
    img.value = '';
    file.value = '';
}

function editProduct(index){
    document.getElementById('edit-name' + index).value = products[index].name;
    document.getElementById('edit-price' + index).value = products[index].price;
    document.getElementById('edit-type' + index).value = products[index].type;
    document.getElementById('edit-desc' + index).value = products[index].desc;
}

function saveEdit(index){

    let editName = document.getElementById('edit-name' + index).value;
    let editPrice = document.getElementById('edit-price' + index).value;
    let editType = document.getElementById('edit-type' + index).value;
    let editDesc = document.getElementById('edit-desc' + index).value;

    if(!inputValidation(editName, editPrice, editType, editDesc)){
        return;
    }


    let fileInput = document.getElementById('edit-file' + index);
    let imgInput = document.getElementById('edit-img' + index);

    let fileLink = products[index].file;
    if (fileInput.files.length > 0) {
        const selectedFile = fileInput.files[0];
        const fileURL = URL.createObjectURL(selectedFile);
        fileLink = `<a href="${fileURL}" target="_blank">📎 ${selectedFile.name}</a>`;
    }

    let imgTag = products[index].img;
    if (imgInput.files.length > 0) {
        const selectedImg = imgInput.files[0];
        const imgURL = URL.createObjectURL(selectedImg);
        imgTag = `<img src="${imgURL}" alt="Product Image" width="50" height="40">`;
    } 

    products[index].name = document.getElementById('edit-name' + index).value;
    products[index].price = document.getElementById('edit-price' + index).value;
    products[index].type = document.getElementById('edit-type' + index).value;
    products[index].desc = document.getElementById('edit-desc' + index).value;
    products[index].img = imgTag;
    products[index].file = fileLink;

saveToLocalStorage();

display();
}

function deleteProduct(index){
    // products[index].name = "";
    // products[index].price = "";
    // products[index].type = "";
    // products[index].desc = "";
    // products[index].img = "";
    // products[index].file = "";
    products.splice(index, 1);

saveToLocalStorage();

display();
}

function searchProduct(){
    var box = '';
    var input = searchIN.value.toLowerCase();

    for(var i = 0; i < products.length; i++){
        if(products[i].name.toLowerCase().includes(input)){
            box += `<tr>
                        <th scope="row">${i+1}</th>
                        <td>${products[i].name}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].type}</td>
                        <td>${products[i].desc}</td>
                        <td>${products[i].img}</td>
                        <td>${products[i].file}</td>
                        <td>
                            <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#editModal${i}" onclick="editProduct(${i})">
                                Edit
                            </button>
                            <div class="modal fade" id="editModal${i}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editModalLabel${i}" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-scrollable">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="editModalLabel${i}">Edit Product</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body add-modal">
                                            <label for="productName">Enter Product Name</label>
                                            <input type="text" id="edit-name${i}" class="form-control" placeholder="Product Name">
                                            <label for="productPrice">Enter Product Price</label>
                                            <input type="text" id="edit-price${i}" class="form-control" placeholder="Product Price">
                                            <label for="productType">Enter Product Type</label>
                                            <input type="text" id="edit-type${i}" class="form-control" placeholder="Product Type">
                                            <label for="productDesc">Enter Product Description</label>
                                            <input type="text" id="edit-desc${i}" class="form-control" placeholder="Product Description">
                                            <label for="productImage" class="form-label">Upload Product Image</label>
                                            <input type="file" class="form-control" id="edit-img${i}" accept="image/*">
                                            <label for="productFile" class="form-label">Attach File</label>
                                            <input type="file" class="form-control" id="edit-file${i}" accept=".pdf,.doc,.docx,.txt,.zip">
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancel</button>
                                            <button type="button" class="btn btn-outline-secondary" onclick="saveEdit(${i})">Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button>
                        </td>
                    </tr>`;
        }
    }

    tableBody.innerHTML = box;
}


function sortByNameAZ() {
    products.sort((a, b) => a.name.localeCompare(b.name));
    display();
}

function sortByNameZA() {
    products.sort((a, b) => b.name.localeCompare(a.name));
    display();
}

function sortByPriceLowHigh() {
    products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    display();
}

function sortByPriceHighLow() {
    products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    display();
}

function saveToLocalStorage() {
    localStorage.setItem("products", JSON.stringify(products));
}

function filterByType(){
    var box = '';
    var selected = document.getElementById('filterType').value.toLowerCase();

    for(var i = 0; i < products.length; i++){
        if(selected === "" || products[i].type.toLowerCase() === selected){
            box += `<tr>
                        <th scope="row">${i+1}</th>
                        <td>${products[i].name}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].type}</td>
                        <td>${products[i].desc}</td>
                        <td>${products[i].img}</td>
                        <td>${products[i].file}</td>
                        <td>
                            <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#editModal${i}" onclick="editProduct(${i})">
                                Edit
                            </button>
                            <button type="button" class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button>
                        </td>
                    </tr>`;
        }
    }

    tableBody.innerHTML = box;
}

function inputValidation(name, price, type, desc){
    name = name.trim();
    price = price.trim();
    type = type.trim();
    desc = desc.trim();

    const nameRegex = /^[A-Za-z\s]{3,10}$/;
    if(!nameRegex.test(name)){
        alert("Name must be 3-10 letters (letters and spaces only!!).");
        return false;
    }

    const priceRegex = /^(?!0+(\.0+)?$)\d+(\.\d+)?$/;
    if(!priceRegex.test(price)){
        alert("Price must be positive number!!");
        return false;
    }

    const typeRegex = /^(skincare|haircare|bodycare)$/i;
    if(!typeRegex.test(type)){
        alert("Type must be SkinCare, HairCare, or BodyCare.");
        return false;
    }

    const descRegex = /^[\w\s]{0,30}$/;
    if(!descRegex.test(desc)){
        alert("Description must be at most 30 characters!!");
        return false;
    }

    return true;
}