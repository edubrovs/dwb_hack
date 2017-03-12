var display = {
    title: 'What\'s in your 401K portfolio?',
    subtitle: 'Find your most recent investment statement or ask your advisor to provide you with one. ' +
    'Look through your statement and enter the names of the items you invest in. ',
    searchTitle: 'Enter a ticker or fund name.',
    onsubmit: searchInvestmentData,
    table: 'investments_table',
    nextButton: 'Finish'
}

var submitInput;
var tickerMap = {
  FAM: 0,
  VT: 1
};
var nameMap = {
  'Fisher Asset Management LLC': 0,
  'Vanguard Total LLC': 1
};
var dataMap = {
  0: {
    ticker: "FAM",
    name: "Fisher Asset Management LLC",
    type:"PFE"
  },
  1: {
    ticker: "VT",
    name: "Vanguard Total LLC",
    type:"PFE"
  }
};

$(document).ready(function () {
 // loadInvestmentData(); //dropdown!!!!!!!!
  //callback?? async?
  console.log('loaded investments data')

  loadDisplayText();
  console.log('loaded investments search view')
})

function loadDisplayText () {
  console.log('loading display')

  $('.investments_table').hide()
  $('.glyphon-gsk').hide()
  $('.glyphon-pfe').hide()
  $('.btn-finish').hide()
  $('.header').text('STEP 2')
  $('.title').text(display.title);
  $('.subtitle').text(display.subtitle);
  $('.search_title').text(display.searchTitle); 
  $('.checkbox_label').text(display.checkboxLabel); 
  $('.next_button').text(display.nextButton); 

  submitInput = function () {
    event.preventDefault(); 
    display.onsubmit()
  }
  placeholder = display.searchPlaceholder //fixme
}

function searchInvestmentData () {
  var input = $('.form-control').val()
  console.log('investments search arg', input)
  var dataFound = dataMap[tickerMap[input]] || dataMap[nameMap[input]]
  console.log('dataFound',dataFound)

  if (dataFound) {
    $('.btn-next').hide()
    $('.investments_table').show()
    $('.btn-finish').show()
    $('.table_ticker').text(dataFound.ticker)
    $('.table_name').text(dataFound.name)    
    if (dataFound.type === 'GSK') {
       $('.glyphon-gsk').show()
    } else {
        $('.glyphon-pfe').show()
    }
  }
}