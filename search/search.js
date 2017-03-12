var searchSteps = {
  {
    title: 'What company do you work for?',
    //need to boldify
    subtitle: 'Why do we want to know? If you company offers 401K options, ' +
      'your company might be helping Pfizer and GSK stocks indirectly by offering funds with their stocks to you.',
    searchTitle: 'If your company offers 401K, enter your company here',
    checkboxLabel: 'My company doesn\'t offer 401K',
    onsubmit: searchCompany,
    searchPlaceholder: 'e.g. Goldman Sachs',
    checkbox: 'companies_checkbox',
    nextButton: 'Next'
  },
  {
    title: 'What\'s in your 401K portfolio?',
    subtitle: 'Find your most recent investment statement or ask your advisor to provide you with one. ' +
    'Look through your statement and enter the names of the items you invest in. ',
    searchTitle: 'Enter a ticker or fund name.',
    onsubmit: searchInvestmentData,
    searchPlaceholder: 'e.g. PTTAX or Pimco Total Return',
    table: 'investments_table',
    nextButton: 'Finish'
  }
}

var InvestmentTypes = [
  'GSK_etf',
  'GSK_inst',
  'GSK_mfund',
  'PFE_etf',
  'PFE_inst',
  'PFE_mfund'
]

loadCompanies(); //dropdown!!!!!!!!
loadInvestmentData(); //dropdown!!!!!!!!
//callback?? async?
console.log('loaded data')

var searchViewCounter = 0;
var submitInput;
var getSearchPlaceholder;
loadDisplayText();
console.log('loaded search view')

var company;
var tickerMap = {};
var nameMap = {};
var dataMap = {};

function refresh () {
  console.log('refresh')
  incrementSearchView();
  loadDisplayText();
}

function incrementSearchView () {
  searchViewCounter++;
}

function loadDisplayText () {
  $('.header').val('STEP ' + (searchViewCounter + 1))
  $('.title').val(steps[searchViewCounter].title);
  $('.subtitle').val(steps[searchViewCounter].subtitle);
  $('.search_title').val(steps[searchViewCounter].searchTitle); 
  $('.checkbox_label').val(steps[searchViewCounter].checkboxLabel); //optional
  $('.next_button').val(steps[searchViewCounter].nextButton); 

  var checkbox = steps[searchViewCounter].checkbox
  if (checkbox) {
    $(`.${checkbox}`).show()
  } else {
    $(`.${checkbox}`).hide()
  }

  var table = steps[searchViewCounter].table
  if (table) {
    $(`.${table}`).show()
  } else {
    $(`.${table}`).hide()
  }

  submitInput = function () {
    event.preventDefault(); 
    steps[searchViewCounter].onsubmit()
  }
  getSearchPlaceholder = function () {
    return steps[searchViewCounter].searchPlaceholder
  }
}

function searchInvestmentData () {
  var input = $('.form-control').val()
  console.log('search arg', input)
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

function searchCompany () {
  var input = $('.form-control').val()
  company = input
}

function loadCompanies () {
  $.ajax({
      url: "../csv/companies.csv",
      async: false,
      success: function (csvd) {
          companies = $.csv.toArrays(csvd);
      },
      dataType: "text" 
  });
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