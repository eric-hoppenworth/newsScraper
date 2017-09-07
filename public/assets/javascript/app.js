$('#crawlerContainer').mousewheel(function(e, delta) {
    this.scrollLeft -= (delta * 40);
    e.preventDefault();
});
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})