(function(){
  var header = document.querySelector('[data-header]');
  window.addEventListener('scroll', function(){
    header.classList.toggle('is-scrolled', window.scrollY > 4);
  }, {passive:true});

  var hamburger = document.querySelector('[data-hamburger]');
  var mobileNav = document.querySelector('[data-mobile-nav]');
  hamburger.addEventListener('click', function(){
    var open = mobileNav.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mobileNav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      mobileNav.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded','false');
    });
  });

  var searchOpen = document.querySelector('[data-search-open]');
  var searchClose = document.querySelector('[data-search-close]');
  var searchOverlay = document.querySelector('[data-search-overlay]');
  searchOpen.addEventListener('click', function(){
    searchOverlay.classList.add('is-open');
    var input = searchOverlay.querySelector('input');
    if(input) setTimeout(function(){ input.focus(); }, 150);
  });
  searchClose.addEventListener('click', function(){
    searchOverlay.classList.remove('is-open');
  });
  window.addEventListener('keydown', function(e){
    if(e.key === 'Escape') searchOverlay.classList.remove('is-open');
  });

  document.querySelectorAll('.ring-stage').forEach(function(stage){
    var ring = stage.querySelector('.ring');
    stage.addEventListener('click', function(){
      ring.classList.toggle('is-paused');
    });
  });

  document.querySelectorAll('[data-demo-form]').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var msg = form.parentElement.querySelector('[data-form-msg]');
      if(msg) msg.textContent = form.getAttribute('data-demo-form');
      form.reset();
    });
  });

  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.15});
    document.querySelectorAll('.fade-in').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.fade-in').forEach(function(el){ el.classList.add('in-view'); });
  }
})();
