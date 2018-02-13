// AssembleSumsWithDates
var d = [
    {
        date: "2011-01-01",
        data: [
            {id: 12, title: "LSK", sum: 6000, tags: []},
            {id: 13, title: "LSK", sum: 4500, tags: []},
            {id: 14, title: "LSK", sum: 300, tags: []}
        ]
    },
    {
        date: "2011-01-02",
        data: []
    }
];

// summerize v1
var s = [
    {
        year: "2011",
        income: 632100,
        incomeAverage: 35600, // months
        filteredIncomeAverage: 0,
        expense: -6834725,
        expenseAverage: -236020, // months
        filteredExpenseAverage: 0,
        filterTags: [],
        data: [
            {
                month: "01",
                income: 56200,
                incomeAverage: 4000, // days
                filteredIncomeAverage: 0,
                expense: -452340,
                expenseAverage: -26000, // days
                filteredExpenseAverage: 0,
                filterTags: [],
                data: [
                    {
                        day: "01",
                        income: 22500,
                        expense: 0,
                        data: [
                            {id: 233, title: "OE ösztöndíj", sum: 16500, tags: [
                                    {id: 2, title: "Fix"},
                                    {id: 3, title: "OE"}
                                ]},
                            {id: 12, title: "LSK", sum: 6000, tags: []}
                        ]
                    }, {
                        day: "02",
                        income: 0,
                        expense: 0,
                        data: []
                    }
                ]
            },
            {
                month: "02",
                incomeAverage: 0, // days
                filteredIncomeAverage: 0,
                expenseAverage: 0, // days
                filteredExpenseAverage: 0,
                filterTags: [],
                data: [
                    {
                        day: "01",
                        income: 0,
                        expense: 0,
                        data: []
                    }
                ]
            }
        ]
    }
];

// v2
var data = [
    {
        "date": "2010-10-10",
        "data": {
            "incomeBars": {
                "sum": 22500,
                "data": [
                    {"id": 233, "title": "OE ösztöndíj", "sum": 16500, "tags": [
                            {"id": 2, "title": "Fix"},
                            {"id": 3, "title": "OE"}
                        ]},
                    {"id": 12, "title": "LSK", "sum": 6000, "tags": []}
                ],
                "graphic": easelJS.element
            },
            "expenseBars": {
                "sum": 3000,
                "data": [
                    {"id": 56, "title": "Felöltőkártya", "sum": 3000, "tags": []}
                ],
                "graphic": easelJS.element
            }
        }
    },
    {
        "date": "2010-10-11",
        "data": {
            "incomeBars": {
                "sum": 0,
                "data": [],
                "graphic": easelJS.element
            },
            "expenseBars": {
                "sum": 0,
                "data": [],
                "graphic": easelJS.element
            }
        }
    }
];

// v1
var startingSum = 180460;
var dataMeta = {
    "maxValue": 231055
};
var options = {
    // ...
};
var data = [
    {
        "date": "2010-10-10",
        "data": {
            "incomeBars": {
                "sum": 22500,
                "data": [
                    {"id": 233, "title": "OE ösztöndíj", "sum": 16500, "tags": [
                            {"id": 2, "title": "Fix"},
                            {"id": 3, "title": "OE"}
                        ]},
                    {"id": 12, "title": "LSK", "sum": 6000, "tags": []}
                ],
                "graphic": easelJS.element
            },
            "expenseBars": {
                "sum": 3000,
                "data": [
                    {"id": 56, "title": "Felöltőkártya", "sum": 3000, "tags": []}
                ],
                "graphic": easelJS.element //?
            },
            "incomeGraph": {
                "sum": 22500, // could omit, but makes it faster to update (at update, update all instance! (due to it being redundant))
                "graphic": easelJS.element //?
            },
            "expenseGraph": {
                "sum": 13000, // could omit, but makes it faster to update (at update, update all instance! (due to it being redundant))
                "graphic": easelJS.element //?
            },
            "flowGraph": {
                "sum": 25500, // could omit, but makes it faster to update (at update, update all instance! (due to it being redundant))
                "graphic": easelJS.element //?
            }
        }
    }
];

/*
 var data = [
 {
 "date" : "2010-10-10",
 "data" : {
 "incomeBars" : {
 "sum" : 22500,
 "data" : [
 {"id" : 233, "title" : "OE ösztöndíj", "sum" : 16500, "tags" : ["Fix", "OE"]},
 {"id" : 12, "title" : "LSK", "sum" : 6000, "tags" : []}
 ],
 "graphic" : easelJS.element
 },
 "expenseBars" : {
 "sum" : 3000,
 "data" : [
 {"id" : 56, "title" : "Felöltőkártya", "sum" : 3000, "tags" : []}
 ],
 "graphic" : easelJS.element
 },
 "incomeGraph" : {
 "sum" : AddThisAndPrevIncomeSums(), // could omit, but makes it faster to update (at update, update all instance! (due to it being redundant))                
 "graphic" : easelJS.element
 },
 "expenseGraph" : {
 "sum" : AddThisAndPrevExpenseSums(), // could omit, but makes it faster to update (at update, update all instance! (due to it being redundant))                
 "graphic" : easelJS.element
 },
 "flowGraph" : {
 "sum" : 25500, // could omit, but makes it faster to update (at update, update all instance! (due to it being redundant))
 "graphic" : easelJS.element
 }
 }
 }
 ];
 */


