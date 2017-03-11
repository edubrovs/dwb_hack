var types = [
  'GSK_etf',
  'GSK_inst',
  'GSK_mfund',
  'PFE_etf',
  'PFE_inst',
  'PFE_mfund'
]

var tickerMap = {};
var nameMap = {};
var dataMap = {};

loadTickerData();
console.log('loaded data')

function searchData (arg) {
  event.preventDefault(); 
  var input = $('.form-control').val()
  console.log('search arg', input)
  var dataFound = dataMap[tickerMap[input]] || dataMap[nameMap[input]]
  console.log('dataFound',dataFound)

  if (dataFound) {
    $('.table_ticker').text(dataFound.ticker)
    $('.table_name').text(dataFound.name)    
    if (dataFound.type === 'GSK') {
      $('.table_gsk').text(dataFound.expense_ratio)
    } else {
      $('.table_pfe').text(dataFound.expense_ratio)
    }
  }
}

function loadTickerData() {
  var uuid = 0;
  var i;
  var k;

  var type;
  for (i = 0; i < types.length; i++) {
    type = types[i];
    $.getJSON(`json/${type}_holders.json`, function(file) {
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