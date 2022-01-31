!(function (o) {
  'use strict'
  var e = {
    root: o(':root'),
    init: function () {
      e.BgImg(),
        e.rightPanelScroll(),
        e.rightNav(),
        e.tabs(),
        e.cursor(),
        e.portfolioCarousel(),
        e.movingPlaceholder(),
        e.scrollToAnchor(),
        e.pageWidthAnimation(),
        e.modal(),
        e.typed()
    },
    typed: function () {
      o('.animated_title').each(function () {
        var e = o(this),
          t = e.find('.title_in')
        if ('' !== t) {
          var n = []
          t.each(function () {
            n.push(o(this).text())
          }),
            e.typed({
              strings: n,
              loop: !0,
              smartBackspace: !1,
              typeSpeed: 40,
              startDelay: 700,
              backDelay: 3e3,
            })
        }
      })
    },
    modal: function () {
      var e = this,
        t = o('.resumo_fn_modalbox'),
        n = o('.modal_item'),
        a = t.find('.closer,.extra_closer'),
        s = t.find('.fn__nav')
      t
        .find('.extra_closer')
        .on('mouseenter', function () {
          t.addClass('hovered')
        })
        .on('mouseleave', function () {
          t.removeClass('hovered')
        }),
        n.on('click', function () {
          var n = o(this),
            a = n.find('.fn__hidden').html(),
            r = n.closest('.modal_items'),
            i = n.attr('data-index'),
            l = r.attr('data-from')
          return (
            s.attr('data-index', i),
            s.attr('data-from', l),
            o('body').addClass('modal'),
            t.addClass('opened'),
            t.find('.modal_in').html(a),
            e.modal_prevnext(s, t),
            e.BgImg(),
            !1
          )
        }),
        e.modal_prevnext(s, t),
        a.on('click', function () {
          return (
            t.removeClass('opened hovered'),
            t.find('.modal_in').html(''),
            o('body').removeClass('modal'),
            !1
          )
        })
    },
    modal_prevnext: function (e, t) {
      var n = this
      e.find('a')
        .off()
        .on('click', function () {
          var a = o(this),
            s = e.attr('data-from'),
            r = parseInt(e.attr('data-index')),
            i = o('.modal_items[data-from="' + s + '"]'),
            l = parseInt(i.attr('data-count'))
          a.hasClass('prev') ? r-- : r++, r < 1 && (r = l), r > l && (r = 1)
          var c = i.find('.modal_item[data-index="' + r + '"] .fn__hidden').html()
          return (
            e.removeClass('disabled'),
            e.attr('data-index', r),
            setTimeout(function () {
              t.find('.modal_in').fadeOut(500, function () {
                o(this).html('').html(c).fadeIn(500)
              })
            }, 500),
            o('.resumo_fn_modalbox .modal_content').stop().animate({ scrollTop: 0 }, 500, 'swing'),
            n.modal_prevnext(e, t),
            n.BgImg(),
            !1
          )
        })
    },
    scrollToAnchor: function () {
      o('a[href^="#"]')
        .not('[href="#"]')
        .not('[href^="#tab"]')
        .on('click', function () {
          var e = o(this),
            t = o(e.attr('href'))
          if (t.length)
            return (
              o('html, body').animate({ scrollTop: t.offset().top }, 1e3),
              o('#nav ul li').css({ transitionDelay: '0ms' }),
              o('.resumo_fn_wrapper').removeClass('nav-opened nav-hover-close'),
              o('.resumo_fn_navigation .nav_footer').removeClass('ready'),
              !1
            )
        }),
        o('.resumo_fn_totop').on('click', function () {
          o('html, body').animate({ scrollTop: 0 }, 1500)
        })
    },
    pageWidthAnimation: function () {
      e.changeWidth(),
        o(window).on('scroll', function () {
          e.changeWidth()
        })
    },
    changeWidth: function () {
      var t = o(window).scrollTop(),
        n = 0
      t > 0 && !o('body').hasClass('scrolled')
        ? (o('body').addClass('scrolled'), n++)
        : 0 === t && o('body').hasClass('scrolled') && (o('body').removeClass('scrolled'), n++),
        n > 0 &&
          setTimeout(function () {
            e.portfolioCarousel()
          }, 500)
    },
  
    movingPlaceholder: function () {
      o('.resumo_fn_contact .input_wrapper').each(function () {
        var e = o(this),
          t = e.find('input, textarea')
        '' === t.val() && e.removeClass('active'),
          t
            .on('focus', function () {
              e.addClass('active')
            })
            .on('blur', function () {
              '' === t.val() && e.removeClass('active')
            })
      })
    },
 

    portfolioCarousel: function () {
      o('#portfolio .owl-carousel').each(function () {
        var e = o(this),
          t = e.closest('#portfolio')
        e.owlCarousel({
          autoplay: !0,
          autoplayTimeout: 7e3,
          smartSpeed: 1e3,
          margin: 20,
          nav: !1,
          loop: !0,
          autoWidth: !0,
          items: 4,
          dots: !1,
          responsive: { 0: { autoWidth: !1, items: 1 }, 700: { autoWidth: !0, items: 4 } },
        }),
          e.trigger('refresh.owl.carousel'),
          e.on('changed.owl.carousel', function () {
            e.trigger('stop.owl.autoplay'), e.trigger('play.owl.autoplay')
          })
        var n = t.find('.my__nav .prev'),
          a = t.find('.my__nav .next')
        n.off().on('click', function () {
          return e.trigger('prev.owl'), !1
        }),
          a.off().on('click', function () {
            return e.trigger('next.owl'), !1
          })
      }),
        e.BgImg()
    },
    cursor: function () {
      if (o('.frenify-cursor').length) {
        const n = document.querySelector('.cursor-inner'),
          a = document.querySelector('.cursor-outer')
        var e = "a, input[type='submit'], .cursor-link, button, .modal_item",
          t = '.owl-carousel, .swiper-container, .cursor-link'
        ;(window.onmousemove = function (o) {
          ;(a.style.transform = 'translate(' + o.clientX + 'px, ' + o.clientY + 'px)'),
            (n.style.transform = 'translate(' + o.clientX + 'px, ' + o.clientY + 'px)'),
            o.clientY,
            o.clientX
        }),
          o('body').on('mouseenter', e, function () {
            n.classList.add('cursor-hover'), a.classList.add('cursor-hover')
          }),
          o('body').on('mouseleave', e, function () {
            ;(o(this).is('a') && o(this).closest('.cursor-link').length) ||
              (n.classList.remove('cursor-hover'), a.classList.remove('cursor-hover'))
          }),
          (n.style.visibility = 'visible'),
          (a.style.visibility = 'visible'),
          o('body')
            .on('mouseenter', t, function () {
              n.classList.add('cursor-slider'), a.classList.add('cursor-slider')
            })
            .on('mouseleave', t, function () {
              n.classList.remove('cursor-slider'), a.classList.remove('cursor-slider')
            }),
          o('body')
            .on('mousedown', t, function () {
              n.classList.add('mouse-down'), a.classList.add('mouse-down')
            })
            .on('mouseup', t, function () {
              n.classList.remove('mouse-down'), a.classList.remove('mouse-down')
            }),
          o('body')
            .on('mouseenter', '.dark-section', function () {
              n.classList.add('dark'), a.classList.add('dark')
            })
            .on('mouseleave', '.dark-section', function () {
              n.classList.remove('dark'), a.classList.remove('dark')
            })
      }
    },
  
    tabs: function () {
      o('.resumo_fn_tabs .tab_header a')
        .off()
        .on('click', function () {
          var t = o(this),
            n = t.parent(),
            a = t.closest('.resumo_fn_tabs')
          return (
            !n.hasClass('active') &&
            (n.siblings().removeClass('active'),
            a.find('.tab_content').children().removeClass('active'),
            n.addClass('active'),
            o(t.attr('href')).addClass('active'),
            !1)
          )
        })
    },
    rightNav: function () {
      var e = o('.resumo_fn_navigation .closer,.resumo_fn_nav_overlay'),
        t = o('.resumo_fn_nav_overlay'),
        n = o('.resumo_fn_right .menu_trigger'),
        a = o('.resumo_fn_wrapper'),
        s = o('.resumo_fn_navigation .nav_footer'),
        r = o('#nav ul li'),
        i = 200 * (r.length + 1) + 700
      n.on('click', function () {
        return (
          a.addClass('nav-opened'),
          r.each(function (e, t) {
            o(t).css({ transitionDelay: 200 * e + 700 + 'ms' })
          }),
          setTimeout(function () {
            s.addClass('ready')
          }, i),
          !1
        )
      }),
        e.on('click', function () {
          return (
            r.css({ transitionDelay: '0ms' }),
            a.removeClass('nav-opened nav-hover-close'),
            s.removeClass('ready'),
            !1
          )
        }),
        t
          .on('mouseenter', function () {
            a.addClass('nav-hover-close')
          })
          .on('mouseleave', function () {
            a.removeClass('nav-hover-close')
          })
    },
    rightPanelScroll: function () {
      var e = o('.resumo_fn_right .right_in'),
        t = o('.resumo_fn_navigation .nav_in'),
        n = o('#nav'),
        a = o('.resumo_fn_navigation .nav_footer')
      e.css({ height: o(window).height() }),
        n.css({ height: t.height() - a.outerHeight() }),
        o().niceScroll &&
          (e.niceScroll({
            touchbehavior: !1,
            cursorwidth: 0,
            autohidemode: !0,
            cursorborder: '0px solid #333',
          }),
          n.niceScroll({
            touchbehavior: !1,
            cursorwidth: 0,
            autohidemode: !0,
            cursorborder: '1px solid #333',
          }))
    },

    BgImg: function () {
      o('*[data-bg-img]').each(function () {
        var e = o(this),
          t = e.attr('data-bg-img')
        void 0 !== t && e.css({ backgroundImage: 'url(' + t + ')' })
      }),
        o('*[data-fn-bg-img]').each(function () {
          var e = o(this),
            t = e.attr('data-fn-bg-img')
          void 0 !== t && e.css({ backgroundImage: 'url(' + t + ')' })
        })
    },
  }
  o(document).ready(function () {
    e.init()
  }),
    o(window).on('resize', function () {
      e.rightPanelScroll()
    }),
    o(window).on('load', function () {
      setTimeout(function () {}, 10)
    }),
    o(window).on('scroll', function () {})
})(jQuery)
