function initCustom() {

    if (document.getElementById("sk_page_sticky_card") != null) {
        window.addEventListener('scroll', function (e) {
            let pageTop = document.getElementById("sk_page_sticky_card").getBoundingClientRect().top;
            let subHeaderTop = document.getElementById("sk_subheader").getBoundingClientRect().top + document.getElementById("sk_subheader").getBoundingClientRect().y;
            if (subHeaderTop >= pageTop) {
                document.getElementsByTagName('body')[0].classList.add("card-sticky-on");
                document.querySelector('.card-header').style.width = `${document.getElementById("sk_page_sticky_card").offsetWidth}px`;
            } else {
                document.getElementsByTagName('body')[0].classList.remove("card-sticky-on");
                document.querySelector('.card-header').style.width = '';
            }
        });
    }
    const tableCollapseDetail = document.querySelectorAll('.table-collapse-detail');
    if (tableCollapseDetail != null)
        tableCollapseDetail.forEach(clickCollpaseDetail => {
            clickCollpaseDetail.addEventListener('click', function (e) {
                this.classList.toggle("table-collapse-icon")
                this.closest('tr').nextElementSibling.classList.toggle("table-collapse-detail-active");

            });
        });

    const portletsMaximizeIcon = document.querySelectorAll('.portlet-maximize');
    if (portletsMaximizeIcon != null)
        portletsMaximizeIcon.forEach(clickPortletsDetail => {
            clickPortletsDetail.removeEventListener('click', makePortletFull);
            clickPortletsDetail.addEventListener('click', makePortletFull);

        });
    const windowMaximizeIcon = document.querySelectorAll('.window-maximize');
    if (windowMaximizeIcon != null)
        windowMaximizeIcon.forEach(clickWindowDetail => {
            clickWindowDetail.removeEventListener('click', modalWindowToggle);
            clickWindowDetail.addEventListener('click', modalWindowToggle);
        });
    if (document.getElementById('sk_aside_menu') != null)
        new PerfectScrollbar('#sk_aside_menu');

    $('.tbody-scroll').each(function () { if (!this.classList.contains('ps')) new PerfectScrollbar($(this)[0]); });
    $('.modal-scroll').each(function () { if (!this.classList.contains('ps')) new PerfectScrollbar($(this)[0]); });
    $('.portlet-scroll').each(function () { if (!this.classList.contains('ps')) new PerfectScrollbar($(this)[0]); });
}
function makePortletFull(e) {
    let portletsMaximize = document.querySelector('.portlet-windows');
    e.stopPropagation();
    this.closest('.portlet-windows').classList.toggle("portlet-full");
    document.body.classList.toggle("portlet-fullscreen");

}

initCustom();
function modalWindowToggle(e) {
    let windowMaximize = document.querySelector('.modal-windows');
    e.stopPropagation();
    this.closest('.modal .modal-windows').classList.toggle("modal-full");
}
function menuItem() {


    const asideToggle = document.getElementById('sk_aside_toggle');
    const brandToggle = document.querySelector('.brand-toggle');
    const asideHover = document.querySelector('#sk_aside');
 
    if (asideToggle != null)
        asideToggle.addEventListener('click', function () {
            if (!document.body.classList.contains('aside-minimize')) {
                document.body.classList.add("aside-minimize");
                brandToggle.classList.add("active");
                document.querySelector('.brand button i.fa').classList.remove('fa-angle-left');
                document.querySelector('.brand button i.fa').classList.add('fa-angle-right');
            } else {
                document.body.classList.remove("aside-minimize");
                brandToggle.classList.remove("active");
                document.querySelector('.brand button i.fa').classList.remove('fa-angle-right');
                document.querySelector('.brand button i.fa').classList.add('fa-angle-left');
            }
        });
    if (asideToggle != null)
        asideToggle.addEventListener('click', function () {
            if (document.body.classList.contains('aside-minimize-hover')) {
                document.body.classList.remove("aside-minimize-hover");
                document.body.classList.remove("aside-minimize");
                document.querySelector('.brand button i.fa').classList.remove('fa-angle-right');
                document.querySelector('.brand button i.fa').classList.add('fa-angle-left');
                brandToggle.classList.remove("active");
            }
        });
    if (asideHover != null) {


        asideHover.addEventListener('mouseover', function () {
            if (document.body.classList.contains('aside-minimize')) {
                document.body.classList.add("aside-minimize-hover");
                document.body.classList.remove("aside-minimize");

            } else {
                document.body.classList.remove("aside-minimize-hover");

            }
        });

        asideHover.addEventListener('mouseout', function () {
            if (document.body.classList.contains('aside-minimize-hover')) {
                document.body.classList.add("aside-minimize");
                document.body.classList.remove("aside-minimize-hover");

            } else {
                document.body.classList.remove("aside-minimize-hover");

            }
        });
    }
    const menuDropDown = document.querySelectorAll('.bpms-menu-segment-open-dropdown');
    const onClickBody = document.querySelectorAll('.bpms-menu-segment-open-dropdown.bpms-menu-segment-hover');
    if (menuDropDown != null)
        menuDropDown.forEach(itemDropDown => {

            itemDropDown.addEventListener('click', function (event) {
                if (!this.classList.contains('bpms-menu-segment-hover')) {
                    this.parentElement.querySelectorAll('.bpms-menu-segment-open-dropdown').forEach(removeOpen => {
                        removeOpen.classList.remove("bpms-menu-segment-hover");

                    });

                }
                document.onclick = function (e) {
                    if (onClickBody) {
                        itemDropDown.classList.remove("bpms-menu-segment-hover");
                    }

                };
                this.classList.toggle('bpms-menu-segment-hover');
                event.stopPropagation();

            });


        });

    const menuSubClassic = document.querySelectorAll('.menu-down-simple .menu-down-segment');
    if (menuSubClassic != null)
        menuSubClassic.forEach(itemClassic => {
            itemClassic.addEventListener('mouseover', function () {
                this.classList.add('bpms-menu-segment-hover');
            });
            itemClassic.addEventListener('mouseout', function () {
                this.classList.remove('bpms-menu-segment-hover');
            })
        });



    let elm = document.querySelectorAll('.menu-down-segment');
    for (let i = 0; i < elm.length; i++) {

        elm[i].addEventListener('click', function (e) {
            if (event.target.closest('a') == null || event.target.closest('a').classList.contains('menu-toggle')) {

                if (!this.classList.contains('bpms-menu-segment-open')) {
                    this.parentElement.querySelectorAll('.menu-down-segment').forEach(removeOpen => {
                        removeOpen.classList.remove("bpms-menu-segment-open");
                    });
                }
                this.classList.toggle('bpms-menu-segment-open');
                e.stopPropagation();
            }
        }, false);
    }
     
    const mobileTopbar = document.querySelector('#sk_header_mobile_topbar_toggle');
    if (mobileTopbar != null) {
        mobileTopbar.addEventListener('click', function () {

            if (!document.body.classList.contains('topbar-mobile-on')) {
                document.body.classList.add("topbar-mobile-on");
                mobileTopbar.classList.add("active");
            } else {
                document.body.classList.remove("topbar-mobile-on");
                mobileTopbar.classList.remove("active");
            }

        });
    }
    const headerMobileToggle = document.querySelector('#sk_header_mobile_toggle');
    const headerMenuWrapper = document.querySelector('.bpms-top-menu-container');
    if (headerMobileToggle != null) {

        headerMobileToggle.addEventListener('click', function () {

            if (!headerMenuWrapper.classList.contains('bpms-top-menu-container-on')) {
                headerMenuWrapper.classList.add("bpms-top-menu-container-on");
                headerMenuWrapper.insertAdjacentHTML('afterend', '<div class="bpms-top-menu-container-overlay"></div>');
                document.querySelector('.bpms-top-menu-container-overlay').onclick = function () {
                    document.querySelector('.bpms-top-menu-container-overlay').remove();
                    headerMenuWrapper.classList.remove("bpms-top-menu-container-on");
                }
            } else {

                headerMenuWrapper.classList.remove("bpms-top-menu-container-on");
            }
            event.preventDefault();
        });
    }

    const asideMobileToggle = document.querySelector('#sk_aside_mobile_toggle');
    const asideMobile = document.querySelector('.aside');
    if (asideMobileToggle != null) {
        asideMobileToggle.addEventListener('click', function () {
            if (!asideMobile.classList.contains('aside-on')) {
                asideMobile.classList.add("aside-on");
                asideMobile.insertAdjacentHTML('afterend', '<div class="aside-overlay"></div>');
                document.querySelector('.aside-overlay').onclick = function () {
                    document.querySelector('.aside-overlay').remove();
                    asideMobile.classList.remove("aside-on");
                }
            } else {

                asideMobile.classList.remove("aside-overlay");
            }
            event.preventDefault();
        });
    } 
} menuItem();

$(document).ready(function () {

    $('#openBtn').click(function () {
        $('#myModal').modal({
            show: true
        })
    });

    $(document).on({
        'show.bs.modal': function () {
            var zIndex = 1040 + (10 * $('.modal:visible').length);
            $(this).css('z-index', zIndex);
            setTimeout(function () {
                $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
            }, 0);
        },
        'hidden.bs.modal': function () {
            if ($('.modal:visible').length > 0) {
                // restore the modal-open class to the body element, so that scrolling works
                // properly after de-stacking a modal.
                setTimeout(function () {
                    $(document.body).addClass('modal-open');
                }, 0);
            }
        }
    }, '.modal');
});
