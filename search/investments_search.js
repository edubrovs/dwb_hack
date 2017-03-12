var display = {
    title: 'What\'s in your 401K portfolio?',
    subtitle: 'Find your most recent investment statement or ask your advisor to provide you with one. ' +
    'Look through your statement and enter the names of the items you invest in. ',
    searchTitle: 'Enter a ticker or fund name.',
    onsubmit: searchInvestmentData,
    table: 'investments_table',
    nextButton: 'Finish'
}

var InvestmentTypes = [
  'GSK_etf',
  'GSK_inst',
  'GSK_mfund',
  'PFE_etf',
  'PFE_inst',
  'PFE_mfund'
]

var submitInput;
var tickerMap = {};
var nameMap = {};
var dataMap = {};

$(document).ready(function () {
  loadInvestmentData(); //dropdown!!!!!!!!
  //callback?? async?
  console.log('loaded investments data')

  loadDisplayText();
  console.log('loaded investments search view')
})

function loadDisplayText () {
  console.log('loading display')
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
    $('.table_ticker').text(dataFound.ticker)
    $('.table_name').text(dataFound.name)    
    if (dataFound.type === 'GSK') {
      $('.table_gsk').text('YES')
    } else {
      $('.table_pfe').text('YES')
    }
  }
}

function loadInvestmentData() {
  var uuid = 0;
  var i;
  var k;

  var type;
  for (i = 0; i < InvestmentTypes.length; i++) {
    type = InvestmentTypes[i];
    $.getJSON(`../json/${type}_holders.json`, function(file) {
        for (k = 0; k < file.length; k++) {
          uuid++;
          entry = file[k];
          entry.type = (type.indexOf('GSK') !== -1) ? 'GSK' : 'PFE'
          dataMap[uuid] = entry;
          nameMap[entry.name] = uuid;
          if (entry.ticker) {
            tickerMap[entry.ticker] = uuid;
          }                 
        }
    })
  }
}