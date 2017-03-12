var display = {
  title: 'What company do you work for?',
  //need to boldify
  subtitle: 'Why do we want to know? If you company offers 401K options, ' +
    'your company might be helping Pfizer and GSK stocks indirectly by offering funds with their stocks to you.',
  searchTitle: 'If your company offers 401K, enter your company here',
  checkboxLabel: 'My company doesn\'t offer 401K',
  onsubmit: searchCompany,
  searchPlaceholder: 'e.g. Goldman Sachs'
}

var submitInput;
var company;
var companies;
$(document).ready(function () {
  loadCompanies(); //dropdown!!!!!!!!
  //callback?? async?
  console.log('loaded companies data')

  loadDisplayText();
  console.log('loaded companies search view')
})


function loadDisplayText () {
  console.log('loading display')
  $('.header').text('STEP 1')
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

function searchCompany () {
  var input = $('.form-control').val()
  console.log('companies search arg', input)
  company = input
}

function loadCompanies () {
  companies = [
   'Round Stones Inc.', 
  'Factoring Inc.',
  '5PSolutions',
  'Abt Associates',
  'Goldman Sachs '
  ]
}