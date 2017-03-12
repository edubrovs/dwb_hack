$(document).ready(() => {
  console.log('dom loaded')
  $('#thanks-image').on('mouseenter', (e) => {
    $('#social-container').show()
  })

  $('#thanks-image').on('mouseleave', (e) => {
    console.log(e.target.attributes[0])
    $('#social-container').hide()
  })

  $('#twitter').on('mouseenter', (e) => {
    $('#thanks-image').addClass('opaque')
  })

  $('#twitter').on('mouseleave', (e) => {
    $('#thanks-image').removeClass('opaque')
  })

  $('#twitter').on('click', (e) => {
    window.open("https://twitter.com", "_blank");
  })

  $('#facebook').on('mouseenter', (e) => {
    $('#thanks-image').addClass('opaque')
  })

  $('#facebook').on('mouseleave', (e) => {
    $('#thanks-image').removeClass('opaque')
    // $('#social-container').hide();
  })

  $('#facebook').on('click', (e) => {
    window.open("https://facebook.com", "_blank");
  })

  $('#instagram').on('mouseenter', (e) => {
    $('#thanks-image').addClass('opaque')
  })

  $('#instagram').on('mouseleave', (e) => {
    $('#thanks-image').removeClass('opaque')
  })

  $('#instagram').on('click', (e) => {
    window.open("https://www.instagram.com", "_blank");
  })
})
