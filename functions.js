
function calculateBase(salary, inclusive) {
    let base = 0;
    if (inclusive == 'yes') {
        base = salary/1.095;
    }
    else {
        base = salary*1;
    }
    return base.toFixed(2);
}

function calculateSuper(salary, inclusive) {
    let sup = 0;
    if (inclusive == 'yes') {
        sup = salary - (salary/1.095);
    }
    else {
        sup = salary * 0.095;
    }
    return sup.toFixed(2);
}

function calculateAnnual(salary, threshold="yes", helpdebt="no") {
    let tax = 0;
    let table = createTaxTable();

    let bracket = "b1";
    if (salary > table.b5.lower) bracket = "b5";
    else if (salary > table.b4.lower) bracket = "b4";
    else if (salary > table.b3.lower) bracket = "b3";
    else if (salary > table.b2.lower) bracket = "b2";
    else bracket = "b1";

    tax = (salary - table[bracket].lower) * table[bracket].rate + table[bracket].base; 

    if (threshold != "yes") {
        //this isn't exactly how tax free theshold works, merely for illustration purposes
        if (salary < table.b1.upper)
            tax += salary * table.b2.rate;
        else
            tax += table.b1.upper *  table.b2.rate;
    }

    if (helpdebt == "yes") {
        //this isn't exactly how help debts work, merely for illustration purposes
        tax += salary * table[bracket].help;
    }

    return tax.toFixed(2);
}

function createTaxTable() {
    let bracket1 = {
        "lower" : 0,
        "upper" : 18200,
        "rate" : 0,
        "base" : 0,
        "help" : 0
    }

    let bracket2 = {
        "lower" : 18200,
        "upper" : 37000,
        "rate" : 0.19,
        "base" : 0,
        "help" : 0
    }

    let bracket3 = {
        "lower" : 37000,
        "upper" : 90000,
        "rate" : 0.325,
        "base" : 3572,
        "help" : 0.05
    }

    let bracket4 = {
        "lower" : 90000,
        "upper" : 180000,
        "rate" : 0.37,
        "base" : 20797,
        "help" : 0.06
    }

    let bracket5 = {
        "lower" : 180000,
        "upper" : 0,
        "rate" : 0.45,
        "base" : 54097,
        "help" : 0.07
    }

    let taxTable = {
        "b1" : bracket1,
        "b2" : bracket2,
        "b3" : bracket3,
        "b4" : bracket4,
        "b5" : bracket5,
    }

    return taxTable;
}

/* tests */

function testTax (expected, salaryIn, threshold="yes", helpdebt="no") {
    let taxCalculated = calculateAnnual(salaryIn, threshold, helpdebt);
    if (taxCalculated == expected) {
        return "PASS";
    }
    else return `FAIL salary=${salaryIn} expectedtax=${expected} resulttax=${taxCalculated}`;
}

function testSuper (expected, salaryIn, inclusive="no") {
    let supCalculated = calculateSuper(salaryIn, inclusive);
    if (supCalculated == expected) {
        return "PASS";
    }
    else return `FAIL salary=${salaryIn} expectedsuper=${expected} resultsuper=${supCalculated}`;
}