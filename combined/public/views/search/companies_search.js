var display = {
  title: 'What company do you work for?',
  //need to boldify
  subtitle: 'Why do we want to know? If you company offers 401K options, ' +
    'your company might be helping Pfizer and GSK stocks indirectly by offering funds with their stocks to you.',
  searchTitle: 'If your company offers 401K, enter your company here',
  onsubmit: searchCompany
}

var submitInput;
var company;
var companies;
$(document).ready(function () {

  loadDisplayText();
  console.log('hi')
  var companies = [
    'Goldasa',
    'Goldemo',
    'Goldfish',
    'Goldlaunch',
    'Goldman Sachs'
  ]

  var companies = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: companies
  });

  // Initializing the typeahead
  $('.typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'companies',
    source: companies
  });
})


function loadDisplayText () {
  console.log('loading display')
  $('.header').text('STEP 1')
  $('.title').text(display.title);
  $('.subtitle').text(display.subtitle);
  $('.search_title').text(display.searchTitle);
  $('.next_button').text(display.nextButton);

  submitInput = function () {
    event.preventDefault();
    display.onsubmit()
  }
}

function searchCompany () {
  var input = $('.form-control').val()
  console.log('companies search arg', input)
  company = input
  window.location.href = 'investments_search.html'
}
