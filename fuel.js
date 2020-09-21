window.onload = function() {
    document.getElementById("display").setAttribute("readonly", true);
    getCar();
};

function getCar() {
    if(document.getElementById("cars").value == 1) {
        document.getElementById("display").focus();
        document.getElementById("display").removeAttribute("readonly");
        document.getElementById("display").value = "";
        document.getElementById("display").setAttribute("type", "number");
        document.getElementById("display").setAttribute("step", "any");
        
    }
    else {
        document.getElementById("display").setAttribute("readonly", true);
        km100Car = parseFloat(document.getElementById("cars").value);
        document.getElementById("display").setAttribute("type", "text");
        document.getElementById("display").value = document.getElementById("cars").value + " liters/100km";
    }  
}

function getKm() {

    if(document.getElementById("cars").value == 1) {
        document.getElementById("display").setAttribute("required", true);
    }
    else {
        document.getElementById("display").removeAttribute("required");
    }

    var inputs = document.querySelectorAll("input");
    var inputRequired = 1;
    
    for(let inp = 0; inp < inputs.length; inp++) {
        
        if(inputs[inp].required && inputs[inp].value == "") {
            inputRequired = 0;
            inputs[inp].style.cssText = "border: 1px solid red";
        }
    }

    if(inputRequired == 1) {

        for(let inp = 0; inp < inputs.length; inp++) {
        
            inputs[inp].style.cssText = "none";
            
        }
       
        var people = parseFloat(document.getElementById("people").value)
        var km100Car = parseFloat(document.getElementById("display").value);
        var fuelPrice = parseFloat(document.getElementById("fuel").value);
        var kmHome = parseFloat(document.getElementById("kmHome").value);

        var kmOffice = parseFloat(document.getElementById("kmOffice").value);
        var kmPayedOffice = parseFloat(document.getElementById("kmPayedOffice").value);

        
        var negative = (Math.sign(people) == -1 || Math.sign(km100Car) == -1 || Math.sign(fuelPrice) == -1 || 
                        Math.sign(kmHome) == -1 || Math.sign(kmOffice) == -1 || Math.sign(kmPayedOffice) == -1);

        if(!Number(people)) {
            people = 1;
        }
        if(!Number(fuelPrice)) {
            fuelPrice = 0;
        }
        if(!Number(kmOffice)) {
            kmOffice = 0;
        }
        if(!Number(kmHome)) {
            kmHome = 0;
        }
        if(!Number(kmPayedOffice)) {
            kmPayedOffice = 0.2;
        }

        var totalKmHomePrice = (kmHome * km100Car / 100) * fuelPrice;
        var totalKmOfficePrice = (kmOffice * km100Car / 100) * fuelPrice;

        var totalFuelPrice = totalKmHomePrice + totalKmOfficePrice;
        var totalFuelLitter = (km100Car / 100) * (kmOffice + kmHome);

        var grossProfit = kmOffice * kmPayedOffice;
        var netProfit = kmOffice * kmPayedOffice - totalFuelPrice;

        if(!negative && km100Car >= 1) {

            document.getElementById("totalFuelLitters").innerHTML = "Fuel quantity = " + totalFuelLitter.toFixed(2) + " L";
            document.getElementById("totalFuel").innerHTML = "Fuel price = " + totalFuelPrice.toFixed(2) + " €";
            document.getElementById("grossProfit").innerHTML = "Gross profit = " + grossProfit.toFixed(2) + " €";
            document.getElementById("netProfit").innerHTML = "Net profit = " + netProfit.toFixed(2) + " €";
            document.getElementById("perPerson").innerHTML = "Net profit per person = " + (netProfit/people).toFixed(2) + " €";
            
            document.getElementById("print").style.display = "block";
        }
    }  
}

function back() {
    return window.history.back();
}

function openNav() {
    if(window.matchMedia("(min-width: 601px)").matches) {
        document.getElementById("mySidebar").style.width = "250px";
    }
    else {
        document.getElementById("mySidebar").style.width = "125px";
    }
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}