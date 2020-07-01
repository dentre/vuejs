import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import 'jquery-ui'

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: {
    App
  },
  template: '<App/>'
})
// JQUERY JQUERY 

var currentPage = 1;
var maxPages = 8; // numberstep
var minPages = 1;


$(document).ready(function () {
  terminal();
  track();
  accordion();
});

function terminal() {
  var text_1 = 'Vous allez être redirigé vers une page d’inscription ...',
    text_2 = 'cliquez sur votre choix',
    text_3 = 'cela prendra 10 minutes...';
  repeat(text_1, 1);
  setTimeout(function () {
    repeat(text_2, 2);
  }, text_1.length * 100 + 1000);
  setTimeout(function () {
    repeat(text_3, 3);
  }, text_2.length * 300 + 1000);

  function repeat(text, n) {
    var i = 0,
      repeatable = setInterval(function () {
        $('#text_' + n).text($('#text_' + n).text() + text[i]);
        i++;
        if (i >= text.length) {
          clearInterval(repeatable);
        }
      }, 100);
  }
}

function track() {
  $('.master-enrollment-footer').addClass(`page-${currentPage}`);
  listenNextPage();
  listenPrevPage();
};

function accordion() {
  $(function () {
    $(".accordion").accordion({
      heightStyle: "content",
      collapsible: true,
      active: false
    });
    $(".accordion").accordion();
  });
};

function listenNextPage() {
  $('.button-valider').on("click", function (e) {
    e.preventDefault();
    if (currentPage < maxPages) {
      currentPage++;
      $('.master-enrollment-footer').addClass(`page-${currentPage}`);
    }
  })
}

function listenPrevPage() {
  $('.button-delete').on("click", function (e) {
    e.preventDefault();
    if (currentPage > minPages) {
      $('.master-enrollment-footer').removeClass(`page-${currentPage}`);
      currentPage--;
    }
  });
}
