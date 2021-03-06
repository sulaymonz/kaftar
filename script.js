/**
 * Created by sulaymonz on 10/2/17.
 */

window.onload = function(){

    var parcel        = document.querySelector('#parcel');
    var weight        = document.querySelector('#weight');
    var addCard       = document.querySelector('#add-card');
    var addButton     = document.querySelector('#add-button');
    var weightWrapper = document.querySelector('.weight-wrapper');
    var hamburger     = document.querySelector('.navbar-toggle');

    var toggle          = getAll('.tgl', document);
    var toggleLeft      = getAll('.tgl-label-left', document);
    var toggleRight     = getAll('.tgl-label-right', document);
    var togglewrapper   = getAll('.toggle-wrapper', document);
    var avatarHolder    = getAll('.avatar', document);
    var name            = getAll('.c-name', document);
    var from            = getAll('.c-from', document);
    var to              = getAll('.c-to', document);

    var navExpanded = false;

    // Show weight on parcel check
    parcel.addEventListener('click', toggleWeight);

    // Show float button on scroll
    window.addEventListener('scroll', function(){
        if(isScrolledIntoView(addCard))
            addButton.className = 'add-button add-hide';

        else addButton.className = 'add-button';
    });

    // Changing toggle class on state change
    toggle.forEach(function(tgl, i){
        tgl.addEventListener('click', function(){
            handleToggle(tgl, togglewrapper[i]);
        });
    });

    toggleLeft.forEach(function(left, i){
        left.addEventListener('click', function(){
            toggle[i].checked = false;
            handleToggle(toggle[i], togglewrapper[i]);
        });
    });

    toggleRight.forEach(function(right, i){
        right.addEventListener('click', function(){
            toggle[i].checked = true;
            handleToggle(toggle[i], togglewrapper[i]);
        });
    });

    // Show dark overlay on navbar expand
    hamburger.addEventListener('click', toggleNav);

    // Generating avatar for each card
    avatarHolder.forEach(function(avatar, i){
        generateAvatar(avatar, i);
    });

    /*-------------------------------FUNCTIONS--------------------------------*/

    function toggleWeight(){
        if(parcel.checked){
            weightWrapper.className = weightWrapper.className + ' show-weight';
            setTimeout(function(){
                weight.focus();  // focus to weight input
            },110);
        }
        else weightWrapper.className = 'col-md-6 weight-wrapper inline-flex';
    }

    function isScrolledIntoView(el) {
        var elemTop = el.getBoundingClientRect().top;
        var elemBottom = el.getBoundingClientRect().bottom;

        var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        return isVisible;
    }

    function handleToggle(el, parent){
        if(el.checked)
            parent.className = parent.className.replace(/\btoggledLeft\b/,'toggledRight');
        else
            parent.className = parent.className.replace(/\btoggledRight\b/,'toggledLeft');
    }

    function toggleNav(){
        if(!navExpanded) {
            document.body.className = document.body.className + ' nav-expanded';
            navExpanded = true;
        }
        else {
            document.body.className = document.body.className.replace(/\bnav-expanded\b/,'');
            navExpanded = false;
        }
    }

    function generateAvatar(cont, i){
        var hash = md5(name[i].innerHTML);
        var options = {
            // foreground: [0, 0, 0, 255],
            background: [255, 255, 255, 255],
            // margin: 0,
            // size: 128, // that's in pixels (64 by default)
            format: 'svg',
            saturation: 0.6,
            brightness: 0.7
        };
        var data = new Identicon(hash, options).toString();
        var img  = new Image();
        img.src = 'data:image/svg+xml;base64,' + data;
        cont.appendChild(img);
    }

    function getAll(selector, context){
        var nodes = context.querySelectorAll(selector);
        var arr = [];
        for(var i=0; i<nodes.length; i++){
            arr.push(nodes[i]);
        }
        return arr;
    }

};